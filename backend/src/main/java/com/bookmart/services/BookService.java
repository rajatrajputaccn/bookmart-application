
package com.bookmart.services;

import com.bookmart.dto.request.BookRequest;
import com.bookmart.dto.response.BookResponse;
import com.bookmart.exceptions.ResourceNotFoundException;
import com.bookmart.models.Book;
import com.bookmart.repositories.BookRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Transactional
    public BookResponse createBook(BookRequest request) {

        Book book = new Book();

        book.setTitle(request.title());
        book.setAuthor(request.author());
        book.setCategory(request.category());
        book.setPrice(request.price());
        book.setStockQuantity(request.stockQuantity());
        book.setDescription(request.description());

        Book savedBook = bookRepository.save(book);

        return mapToResponse(savedBook);
    }

    @Transactional(readOnly = true)
    public List<BookResponse> getAllBooks() {

        return bookRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public BookResponse getBookById(Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found with ID: " + id));

        return mapToResponse(book);
    }

    @Transactional
    public BookResponse updateBook(Long id, BookRequest request) {

        Book existingBook = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found with ID: " + id));

        existingBook.setTitle(request.title());
        existingBook.setAuthor(request.author());
        existingBook.setCategory(request.category());
        existingBook.setPrice(request.price());
        existingBook.setStockQuantity(request.stockQuantity());
        existingBook.setDescription(request.description());

        Book updatedBook = bookRepository.save(existingBook);

        return mapToResponse(updatedBook);
    }

    @Transactional
    public void deleteBook(Long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Book not found with ID: " + id));

        bookRepository.delete(book);
    }

    @Transactional(readOnly = true)
    public List<BookResponse> searchBooks(String query) {

        return bookRepository.searchBooks(query.trim())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private BookResponse mapToResponse(Book book) {

        return new BookResponse(
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
    }
}
