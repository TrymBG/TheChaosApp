package com.chaos.visualizer.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AlgorithmService {

    /**
     * Cookie Monster Sort
     *
     * The Cookie Monster goes through the string array looking for "cookies".
     * Any element containing "cookie" or "Cookie" gets collected. The rest are ignored.
     *
     * @param input array of strings to process
     * @return list of strings describing each step
     */
    public List<String> cookieMonsterSort(String[] input) {
        List<String> steps = new ArrayList<>();
        List<String> cookieJar = new ArrayList<>();

        steps.add("Cookie Monster approaches the array: " + String.join(", ", input));
        steps.add("OMNOMNOM. Time to find some cookies!");

        for (int i = 0; i < input.length; i++) {
            String value = input[i];
            if (value.contains("cookie") || value.contains("Cookie")) {
                cookieJar.add(value);
                steps.add("Step " + (i + 1) + ": Found \"" + value + "\" — COOKIE! Nom nom nom. Cookie jar: " + cookieJar);
            } else {
                steps.add("Step " + (i + 1) + ": Found \"" + value + "\" — not a cookie. Cookie Monster grumbles.");
            }
        }

        if (cookieJar.isEmpty()) {
            steps.add("No cookies found. Cookie Monster is devastated.");
        } else {
            steps.add("Done! Cookie Monster collected " + cookieJar.size() + " cookie(s): " + cookieJar);
        }

        return steps;
    }

    public List<String> bankSort(double amount) {
        List<String> steps = new ArrayList<>();
        steps.add("You deposit $" + amount + ". The bank teller smiles warmly.");

        steps.add("Weeell, thats fantastic. A really smart decision young man." + "We'll put that into a money-market mutual fund.");
        amount = amount * 0.6;
        steps.add ("Remaining: $" + amount);

        steps.add("Now we'll reinvest the earnings into foreign currency accounts with compounding interest...");
        amount = amount * 0.3;
        steps.add("Remaining: $" + amount);

        steps.add("And it's gone. Poof.");
        amount = 0;

        steps.add("I'm sorry sir, but this line is for bank members only. " +
              "You don't have any money invested in this bank, so please leave.");
        steps.add("Final balance: $" + amount);

        return steps;

    }
}
