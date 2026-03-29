package com.chaos.visualizer.controller;

import com.chaos.visualizer.service.AlgorithmService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/algorithms")
public class AlgorithmController {

    private final AlgorithmService algorithmService;

    public AlgorithmController(AlgorithmService algorithmService) {
        this.algorithmService = algorithmService;
    }

    /**
     * GET /api/algorithms/cookie-monster?input=3,4,7,8,2,1
     *
     * Returns a step-by-step narration of Cookie Monster Sort.
     * Defaults to a sample array if no input is provided.
     */
    @GetMapping("/cookie-monster")
    public List<String> cookieMonsterSort(
            @RequestParam(defaultValue = "3,8,5,2,7,4,1,6") String input) {

        int[] array = parseInput(input);
        return algorithmService.cookieMonsterSort(array);
    }

    private int[] parseInput(String input) {
        String[] parts = input.split(",");
        int[] result = new int[parts.length];
        for (int i = 0; i < parts.length; i++) {
            result[i] = Integer.parseInt(parts[i].trim());
        }
        return result;
    }
}
