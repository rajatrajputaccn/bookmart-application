
package com.bookmart.repositories;

import com.bookmart.models.ReadingListItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface ReadingListRepository extends JpaRepository<ReadingListItem, Long> {

    boolean existsByBook_Id(Long bookId);

    long count();

    void deleteByBook_Id(Long bookId);
}
