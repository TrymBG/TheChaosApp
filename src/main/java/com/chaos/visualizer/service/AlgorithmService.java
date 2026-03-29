package com.chaos.visualizer.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlgorithmService {

    /**
     * Cookie Monster Sort
     *
     * The Cookie Monster goes through the array looking for "cookies" (even numbers).
     * Odd numbers are ignored — he doesn't like those. Each step is narrated.
     *
     * @param input array of integers to process
     * @return list of strings describing each step
     */
    public List<String> cookieMonsterSort(int[] input) {
        List<String> steps = new ArrayList<>();
        List<Integer> cookieJar = new ArrayList<>();

        steps.add("Cookie Monster approaches the array: " + arrayToString(input));
        steps.add("OMNOMNOM. Time to find some cookies!");

        for (int i = 0; i < input.length; i++) {
            int value = input[i];
            if (value % 2 == 0) {
                cookieJar.add(value);
                steps.add("Step " + (i + 1) + ": Found " + value + " — COOKIE! Nom nom nom. Cookie jar: " + cookieJar);
            } else {
                steps.add("Step " + (i + 1) + ": Found " + value + " — not a cookie. Cookie Monster grumbles.");
            }
        }

        if (cookieJar.isEmpty()) {
            steps.add("No cookies found. Cookie Monster is devastated.");
        } else {
            steps.add("Done! Cookie Monster collected " + cookieJar.size() + " cookie(s): " + cookieJar);
        }

        return steps;
    }

    private String arrayToString(int[] arr) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < arr.length; i++) {
            sb.append(arr[i]);
            if (i < arr.length - 1) sb.append(", ");
        }
        sb.append("]");
        return sb.toString();
    }
}
