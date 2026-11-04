
package com.bookmart.services;

import com.bookmart.dto.response.BookResponse;
import com.bookmart.dto.response.ReadingListResponse;
import com.bookmart.exceptions.ConflictException;
import com.bookmart.exceptions.BusinessException;
import com.bookmart.exceptions.ResourceNotFoundException;
import com.bookmart.models.Book;
import com.bookmart.models.ReadingListItem;
import com.bookmart.repositories.BookRepository;
import com.bookmart.repositories.ReadingListRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ReadingListService {

    private static final int MAX_READING_LIST_SIZE = 10;

    private final BookRepository bookRepository;
    private final ReadingListRepository readingListRepository;

    public ReadingListService(
            BookRepository bookRepository,
            ReadingListRepository readingListRepository) {

        this.bookRepository = bookRepository;
        this.readingListRepository = readingListRepository;
    }

    @Transactional
    public ReadingListResponse addBook(Long bookId) {

        Book book = bookRepository.findById(bookId)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found with ID: " + bookId));

        if (readingListRepository.existsByBook_Id(bookId)) {
            throw new ConflictException(
                    "Book is already present in the reading list");
        }

        if (readingListRepository.count() >= MAX_READING_LIST_SIZE) {
            throw new BusinessException(
                    "Reading list cannot contain more than 10 books");
        }

        ReadingListItem item = new ReadingListItem(book);

        ReadingListItem savedItem =
                readingListRepository.save(item);

        return mapToResponse(savedItem);
    }

    @Transactional(readOnly = true)
    public List<ReadingListResponse> getReadingList() {

        return readingListRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public void removeBook(Long bookId) {

        if (!bookRepository.existsById(bookId)) {
            throw new ResourceNotFoundException(
                    "Book not found with ID: " + bookId);
        }

        if (!readingListRepository.existsByBook_Id(bookId)) {
            throw new ResourceNotFoundException(
                    "Book is not present in the reading list");
        }

        readingListRepository.deleteByBook_Id(bookId);
    }

    private ReadingListResponse mapToResponse(
            ReadingListItem item) {

        Book book = item.getBook();

        BookResponse bookResponse = new BookResponse(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getCategory(),
                book.getPrice(),
                book.getStockQuantity(),
                book.getDescription(),
                book.getCreatedAt(),
                book.getUpdatedAt()
        );

        return new ReadingListResponse(
                item.getId(),
                bookResponse,
                item.getAddedAt()
        );
    }
}
