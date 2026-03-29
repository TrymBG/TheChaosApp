package com.chaos.visualizer.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class AlgorithmServiceTest {

    private AlgorithmService service;

    @BeforeEach
    void setUp() {
        service = new AlgorithmService();
    }

    @Test
    void shouldCollectWordsContainingCookie() {
        String[] input = {"chocolate", "cookie", "pizza", "Cookies"};
        List<String> steps = service.cookieMonsterSort(input).getSteps();

        assertTrue(steps.stream().anyMatch(s -> s.contains("cookie") && s.contains("COOKIE!")));
        assertTrue(steps.stream().anyMatch(s -> s.contains("Cookies") && s.contains("COOKIE!")));
    }

    @Test
    void bankSortShouldAlwaysEndAtZero() {
        double initialAmount = 1000.0;
        List<String> steps = service.bankSort(initialAmount).getSteps();

        assertTrue(steps.get(steps.size() -1 ).contains("$0.0"));
        
    }
}
