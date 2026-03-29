package com.chaos.visualizer.model;

import java.time.LocalDateTime;
import java.util.List;

public class AlgorithmResponse {

    private String algorithm;
    private String input;
    private List<String> steps;
    private String result;
    private LocalDateTime executedAt;

    public AlgorithmResponse(String algorithm, String input, List<String> steps, String result) {
        this.algorithm = algorithm;
        this.input = input;
        this.steps = steps;
        this.result = result;
        this.executedAt = LocalDateTime.now();
    }

    public String getAlgorithm() { return algorithm; }
    public String getInput() { return input; }
    public List<String> getSteps() { return steps; }
    public String getResult() { return result; }
    public LocalDateTime getExecutedAt() { return executedAt; }
}
