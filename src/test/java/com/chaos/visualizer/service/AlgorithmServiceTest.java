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
        List<String> steps = service.cookieMonsterSort(input);

        assertTrue(steps.stream().anyMatch(s -> s.contains("cookie") && s.contains("COOKIE!")));
        assertTrue(steps.stream().anyMatch(s -> s.contains("Cookies") && s.contains("COOKIE!")));
    }
}
