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

    public AlgorithmRun() {}

public AlgorithmRun(String algorithm, String input, String result, LocalDateTime executedAt) {
    this.algorithm = algorithm;
    this.input = input;
    this.result = result;
    this.executedAt = executedAt;
}

    public Long getId() { return id; }
    public String getAlgorithm() { return algorithm; }
    public String getInput() { return input; }
    public String getResult() { return result; }
    public LocalDateTime getExecutedAt() { return executedAt; }
}