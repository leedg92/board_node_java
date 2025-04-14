package com.backend.module.controller;

import com.backend.module.domain.Hello;
import com.backend.module.service.HelloService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {
    
    @Autowired
    private HelloService helloService;
    
    @GetMapping("/")
    public String hello() {
        return "Hello from Spring Boot!";
    }
    
    @GetMapping("/health")
    public String health() {
        return "UP";
    }
    
    @GetMapping("/hellos")
    public List<Hello> getAllHellos() {
        return helloService.getAllHellos();
    }
    
    @GetMapping("/hellos/{id}")
    public Hello getHelloById(@PathVariable String id) {
        return helloService.getHelloById(id);
    }
} 