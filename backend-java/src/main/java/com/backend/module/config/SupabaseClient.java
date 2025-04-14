package com.backend.module.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class SupabaseClient {
    private final RestTemplate restTemplate;
    private final String supabaseUrl;
    private final String supabaseKey;

    public SupabaseClient(
            @Value("${supabase.url}") String supabaseUrl,
            @Value("${supabase.key}") String supabaseKey) {
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        this.restTemplate = new RestTemplate();
    }

    private HttpHeaders createHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("apikey", supabaseKey);
        headers.set("Authorization", "Bearer " + supabaseKey);
        return headers;
    }

    public Map<String, Object> signUp(String email, String password) {
        Map<String, String> body = Map.of(
                "email", email,
                "password", password
        );

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, createHeaders());

        return restTemplate.postForObject(
                supabaseUrl + "/auth/v1/signup",
                request,
                Map.class
        );
    }

    public Map<String, Object> signIn(String email, String password) {
        Map<String, String> body = Map.of(
                "email", email,
                "password", password
        );

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, createHeaders());

        return restTemplate.postForObject(
                supabaseUrl + "/auth/v1/token?grant_type=password",
                request,
                Map.class
        );
    }

    public void signOut(String accessToken) {
        HttpHeaders headers = createHeaders();
        headers.set("Authorization", accessToken);

        HttpEntity<Void> request = new HttpEntity<>(headers);

        restTemplate.postForObject(
                supabaseUrl + "/auth/v1/logout",
                request,
                Void.class
        );
    }

    public Map<String, Object> refreshToken(String refreshToken) {
        Map<String, String> body = Map.of("refresh_token", refreshToken);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, createHeaders());

        return restTemplate.postForObject(
                supabaseUrl + "/auth/v1/token?grant_type=refresh_token",
                request,
                Map.class
        );
    }
} 