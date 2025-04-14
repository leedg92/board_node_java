package com.backend.module.controller;

import com.backend.module.dto.auth.AuthRequest;
import com.backend.module.dto.auth.AuthResponse;
import com.backend.module.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "인증 API", description = "사용자 인증 관련 API")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Operation(summary = "회원가입", description = "새로운 사용자를 등록합니다.")
    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signUp(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.signUp(request));
    }

    @Operation(summary = "로그인", description = "이메일과 비밀번호로 로그인합니다.")
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signIn(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.signIn(request));
    }

    @Operation(summary = "로그아웃", description = "현재 세션을 로그아웃합니다.")
    @PostMapping("/signout")
    public ResponseEntity<Void> signOut(@RequestHeader("Authorization") String token) {
        authService.signOut(token.replace("Bearer ", ""));
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "토큰 갱신", description = "리프레시 토큰으로 액세스 토큰을 갱신합니다.")
    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(authService.refreshToken(token.replace("Bearer ", "")));
    }
} 