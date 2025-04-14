package com.backend.module.service;

import com.backend.module.domain.Board;
import com.backend.module.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;

    @Transactional(readOnly = true)
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Page<Board> getBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Transactional(readOnly = true)
    public Page<Board> searchBoards(String keyword, Pageable pageable) {
        return boardRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
    }

    @Transactional(readOnly = true)
    public Board getBoard(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("게시글을 찾을 수 없습니다."));
    }

    @Transactional
    public Object createBoard(Board board) {
        return boardRepository.save(board);
    }

    @Transactional
    public Object updateBoard(Long id, Board board) {
        return boardRepository.save(board);
    }

    @Transactional
    public Object deleteBoard(Long id) {
        boardRepository.deleteById(id);
        return "게시글 삭제 완료";
    }
}
