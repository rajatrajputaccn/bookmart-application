package com.bookmart.controllers;

import com.bookmart.dto.response.ReadingListResponse;
import com.bookmart.services.ReadingListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reading-list")
public class ReadingListController {

    private final ReadingListService readingListService;

    public ReadingListController(ReadingListService readingListService) {
        this.readingListService = readingListService;
    }

    @PostMapping("/{bookId}")
    public ResponseEntity<ReadingListResponse> addBook(
            @PathVariable Long bookId) {

        ReadingListResponse response = readingListService.addBook(bookId);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<List<ReadingListResponse>> getReadingList() {
        return ResponseEntity.ok(readingListService.getReadingList());
    }

    @DeleteMapping("/{bookId}")
    public ResponseEntity<Void> removeBook(@PathVariable Long bookId) {
        readingListService.removeBook(bookId);
        return ResponseEntity.noContent().build();
    }
}