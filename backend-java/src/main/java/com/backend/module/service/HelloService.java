package com.backend.module.service;

import com.backend.module.domain.Hello;
import com.backend.module.repository.HelloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class HelloService {
    
    @Autowired
    private HelloRepository helloRepository;
    
    public List<Hello> getAllHellos() {
        return helloRepository.findAll();
    }
    
    public Hello getHelloById(String id) {
        Optional<Hello> hello = helloRepository.findById(id);
        return hello.orElse(null);
    }
} 