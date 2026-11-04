
package com.bookmart.dto.response;

import java.time.LocalDateTime;

public record ReadingListResponse(

        Long id,
        BookResponse book,
        LocalDateTime addedAt

) {}
