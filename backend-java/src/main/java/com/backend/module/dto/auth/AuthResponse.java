package com.backend.module.dto.auth;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private String email;
    private String userId;
    private String userRole;
    private String userName;
    private String userAvatarUrl;
    private String sub;
} 
