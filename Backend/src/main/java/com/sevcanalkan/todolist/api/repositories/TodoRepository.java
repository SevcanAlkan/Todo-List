package com.sevcanalkan.todolist.api.repositories;

import com.sevcanalkan.todolist.api.models.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Integer> {

    @Query(value = "SELECT * FROM [dbo].[todo] t WHERE is_deleted = 0 and is_completed = 0", nativeQuery = true)
    List<Todo> findAllUnCompleted();

    @Query(value = "SELECT * FROM [dbo].[todo] t WHERE (is_deleted = 0 OR is_deleted = ?1) and (is_completed = 0 OR is_completed = ?2)", nativeQuery = true)
    List<Todo> findAllIncludeDeletedAndCompleted(boolean showIsDeleted, boolean showIsCompleted);

    @Query(value = "SELECT * FROM [dbo].[todo] t WHERE is_deleted = 1", nativeQuery = true)
    List<Todo> findAllOnlyDeleted();

    @Query(value = "SELECT * FROM [dbo].[todo] t WHERE is_completed = 1", nativeQuery = true)
    List<Todo> findAllOnlyCompleted();

    @Query(value = "SELECT * FROM [dbo].[todo] t WHERE is_important = 1 AND is_completed = 0 AND is_deleted = 0", nativeQuery = true)
    List<Todo> findAllOnlyImportant();
}
