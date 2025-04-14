package com.backend.module.service;

import com.backend.module.config.SupabaseClient;
import com.backend.module.dto.auth.AuthRequest;
import com.backend.module.dto.auth.AuthResponse;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;

@Service
public class AuthService {
    private final SupabaseClient supabaseClient;
    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    public AuthService(SupabaseClient supabaseClient) {
        this.supabaseClient = supabaseClient;
    }

    public AuthResponse signUp(AuthRequest request) {
        Map<String, Object> response = supabaseClient.signUp(request.getEmail(), request.getPassword());
        Map<String, Object> user = (Map<String, Object>) response.get("user");
        Map<String, Object> userMetadata = (Map<String, Object>) user.get("user_metadata");
        
        return AuthResponse.builder()
                .accessToken((String) response.get("access_token"))
                .refreshToken((String) response.get("refresh_token"))
                .email((String) user.get("email"))
                .userId((String) user.get("id"))
                .userRole((String) user.get("role"))
                .userName(userMetadata != null ? (String) userMetadata.get("name") : null)
                .userAvatarUrl(userMetadata != null ? (String) userMetadata.get("avatar_url") : null)
                .sub((String) user.get("sub"))
                .build();
    }

    public AuthResponse signIn(AuthRequest request) {
        Map<String, Object> response = supabaseClient.signIn(request.getEmail(), request.getPassword());
        Map<String, Object> user = (Map<String, Object>) response.get("user");
        Map<String, Object> userMetadata = (Map<String, Object>) user.get("user_metadata");
        
        return AuthResponse.builder()
                .accessToken((String) response.get("access_token"))
                .refreshToken((String) response.get("refresh_token"))
                .email((String) user.get("email"))
                .userId((String) user.get("id"))
                .userRole((String) user.get("role"))
                .userName(userMetadata != null ? (String) userMetadata.get("name") : null)
                .userAvatarUrl(userMetadata != null ? (String) userMetadata.get("avatar_url") : null)
                .sub((String) user.get("sub"))
                .build();
    }

    public void signOut(String token) {
        try {
            supabaseClient.signOut(token);
        } catch (Exception e) {
            log.warn("Supabase logout failed (token may be expired): {}", e.getMessage());
        }
    }

    public AuthResponse refreshToken(String refreshToken) {
        Map<String, Object> response = supabaseClient.refreshToken(refreshToken);
        return AuthResponse.builder()
                .accessToken((String) response.get("access_token"))
                .refreshToken((String) response.get("refresh_token"))
                .build();
    }
} 