package com.chaos.visualizer.controller;

import com.chaos.visualizer.model.AlgorithmResponse;
import com.chaos.visualizer.service.AlgorithmService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmController {

    private final AlgorithmService algorithmService;

    public AlgorithmController(AlgorithmService algorithmService) {
        this.algorithmService = algorithmService;
    }

    @GetMapping("/cookie-monster")
    public AlgorithmResponse cookieMonsterSort(
            @RequestParam(defaultValue = "chocolate, cookie, pizza, tomato, cookies") String input) {
        return algorithmService.cookieMonsterSort(parseInput(input));
    }

    @GetMapping("/bank-sort")
    public AlgorithmResponse bankSort(@RequestParam double amount) {
        return algorithmService.bankSort(amount);
    }

    private String[] parseInput(String input) {
        return Arrays.stream(input.split(","))
                .map(String::trim)
                .toArray(String[]::new);
    }
}
