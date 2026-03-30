package com.chaos.visualizer.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class AlgorithmRun {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String algorithm;
    private String input;
    private String result;
    private LocalDateTime executedAt;
}