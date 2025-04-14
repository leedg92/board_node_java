package com.backend.module.controller;

import com.backend.module.domain.Board;
import com.backend.module.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<Page<Board>> getBoards(
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(boardService.getBoards(pageable));
    }

    @GetMapping("/search")
    public ResponseEntity<Page<Board>> searchBoards(
            @RequestParam String keyword,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(boardService.searchBoards(keyword, pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoard(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.getBoard(id));
    }

    @PostMapping("/create")
    public ResponseEntity<Object> createBoard(@RequestBody Board board) {
        return ResponseEntity.ok(boardService.createBoard(board));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Object> updateBoard(@PathVariable Long id, @RequestBody Board board) {
        return ResponseEntity.ok(boardService.updateBoard(id, board));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Object> deleteBoard(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.deleteBoard(id));
    }   
}
        