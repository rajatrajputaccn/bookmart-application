
package com.bookmart.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record BookResponse(

        Long id,
        String title,
        String author,
        String category,
        BigDecimal price,
        Integer stockQuantity,
        String description,
        LocalDateTime createdAt,
        LocalDateTime updatedAt

) {}
