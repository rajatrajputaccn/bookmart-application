package com.bookmart.services;

import com.bookmart.dto.request.BookRequest;
import com.bookmart.dto.response.BookResponse;
import com.bookmart.exceptions.ResourceNotFoundException;
import com.bookmart.models.Book;
import com.bookmart.repositories.BookRepository;
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
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class BookServiceTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookService bookService;

    private Book book;
    private BookRequest bookRequest;

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

        bookRequest = new BookRequest(
                "Clean Code",
                "Robert C. Martin",
                "Programming",
                new BigDecimal("599.00"),
                15,
                "A guide to clean code."
        );
    }

    @Test
    void createBookShouldReturnCreatedBook() {
        when(bookRepository.save(any(Book.class))).thenReturn(book);

        BookResponse response = bookService.createBook(bookRequest);

        assertNotNull(response);
        assertEquals(1L, response.id());
        assertEquals("Clean Code", response.title());
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    void getAllBooksShouldReturnAllBooks() {
        when(bookRepository.findAll()).thenReturn(List.of(book));

        List<BookResponse> response = bookService.getAllBooks();

        assertEquals(1, response.size());
        assertEquals("Clean Code", response.get(0).title());
        verify(bookRepository).findAll();
    }

    @Test
    void getBookByIdShouldReturnBook() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        BookResponse response = bookService.getBookById(1L);

        assertEquals(1L, response.id());
        assertEquals("Clean Code", response.title());
    }

    @Test
    void getBookByIdShouldThrowWhenBookDoesNotExist() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> bookService.getBookById(99L)
        );
    }

    @Test
    void updateBookShouldUpdateExistingBook() {
        BookRequest updatedRequest = new BookRequest(
                "Clean Code Updated",
                "Robert C. Martin",
                "Programming",
                new BigDecimal("699.00"),
                20,
                "Updated description."
        );

        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        when(bookRepository.save(any(Book.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookResponse response = bookService.updateBook(1L, updatedRequest);

        assertEquals("Clean Code Updated", response.title());
        assertEquals(new BigDecimal("699.00"), response.price());
        assertEquals(20, response.stockQuantity());
        verify(bookRepository).save(book);
    }

    @Test
    void updateBookShouldThrowWhenBookDoesNotExist() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> bookService.updateBook(99L, bookRequest)
        );

        verify(bookRepository, never()).save(any(Book.class));
    }

    @Test
    void deleteBookShouldDeleteExistingBook() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        bookService.deleteBook(1L);

        verify(bookRepository).delete(book);
    }

    @Test
    void deleteBookShouldThrowWhenBookDoesNotExist() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(
                ResourceNotFoundException.class,
                () -> bookService.deleteBook(99L)
        );

        verify(bookRepository, never()).delete(any(Book.class));
    }

    @Test
    void searchBooksShouldReturnMatchingBooks() {
        when(bookRepository.searchBooks(eq("java"))).thenReturn(List.of(book));

        List<BookResponse> response = bookService.searchBooks("java");

        assertEquals(1, response.size());
        verify(bookRepository).searchBooks("java");
    }
}