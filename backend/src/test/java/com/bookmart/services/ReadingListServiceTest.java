package com.bookmart.services;

import com.bookmart.dto.response.ReadingListResponse;
import com.bookmart.exceptions.BusinessException;
import com.bookmart.exceptions.ConflictException;
import com.bookmart.exceptions.ResourceNotFoundException;
import com.bookmart.models.Book;
import com.bookmart.models.ReadingListItem;
import com.bookmart.repositories.BookRepository;
import com.bookmart.repositories.ReadingListRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReadingListServiceTest {

    @Mock
    private BookRepository bookRepository;

    @Mock
    private ReadingListRepository readingListRepository;

    @InjectMocks
    private ReadingListService readingListService;

    private Book book;

    @BeforeEach
    void setUp() {
        book = new Book();
        book.setId(1L);
        book.setTitle("Clean Code");
        book.setAuthor("Robert C. Martin");
        book.setCategory("Programming");
        book.setPrice(new BigDecimal("599.00"));
        book.setStockQuantity(15);
        book.setDescription("A guide to clean code.");
    }

    @Test
    void addBookShouldAddBookToReadingList() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        when(readingListRepository.existsByBook_Id(1L)).thenReturn(false);
        when(readingListRepository.count()).thenReturn(0L);
        when(readingListRepository.save(any(ReadingListItem.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        ReadingListResponse response = readingListService.addBook(1L);

        assertNotNull(response);
        assertEquals("Clean Code", response.book().title());
        verify(readingListRepository).save(any(ReadingListItem.class));
    }

    @Test
    void addBookShouldThrowWhenBookDoesNotExist() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> readingListService.addBook(99L)
        );

        verify(readingListRepository, never()).save(any(ReadingListItem.class));
    }

    @Test
    void addBookShouldThrowWhenBookAlreadyExists() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        when(readingListRepository.existsByBook_Id(1L)).thenReturn(true);

        assertThrows(
                ConflictException.class,
                () -> readingListService.addBook(1L)
        );

        verify(readingListRepository, never()).save(any(ReadingListItem.class));
    }

    @Test
    void addBookShouldThrowWhenReadingListIsFull() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        when(readingListRepository.existsByBook_Id(1L)).thenReturn(false);
        when(readingListRepository.count()).thenReturn(10L);

        assertThrows(
                BusinessException.class,
                () -> readingListService.addBook(1L)
        );

        verify(readingListRepository, never()).save(any(ReadingListItem.class));
    }

    @Test
    void getReadingListShouldReturnAllItems() {
        ReadingListItem item = new ReadingListItem(book);

        when(readingListRepository.findAll()).thenReturn(List.of(item));

        List<ReadingListResponse> response = readingListService.getReadingList();

        assertEquals(1, response.size());
        assertEquals("Clean Code", response.get(0).book().title());
    }

    @Test
    void removeBookShouldRemoveExistingItem() {
        when(bookRepository.existsById(1L)).thenReturn(true);
        when(readingListRepository.existsByBook_Id(1L)).thenReturn(true);

        readingListService.removeBook(1L);

        verify(readingListRepository).deleteByBook_Id(1L);
    }

    @Test
    void removeBookShouldThrowWhenBookDoesNotExist() {
        when(bookRepository.existsById(99L)).thenReturn(false);

        assertThrows(
                ResourceNotFoundException.class,
                () -> readingListService.removeBook(99L)
        );

        verify(readingListRepository, never()).deleteByBook_Id(anyLong());
    }

    @Test
    void removeBookShouldThrowWhenBookIsNotInReadingList() {
        when(bookRepository.existsById(1L)).thenReturn(true);
        when(readingListRepository.existsByBook_Id(1L)).thenReturn(false);

        assertThrows(
                ResourceNotFoundException.class,
                () -> readingListService.removeBook(1L)
        );

        verify(readingListRepository, never()).deleteByBook_Id(anyLong());
    }
}