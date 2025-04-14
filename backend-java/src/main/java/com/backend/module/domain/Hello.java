package com.backend.module.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "zdel_hello_test")
@Getter
@Setter
public class Hello {
    @Id
    private String id;
    private String content;
} 