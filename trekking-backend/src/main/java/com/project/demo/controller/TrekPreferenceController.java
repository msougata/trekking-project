package com.project.demo.controller;


import com.project.demo.service.TrekPreferenceService;
import com.project.demo.model.TrekPreference;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trek-preferences")
@CrossOrigin(origins = "http://localhost:3000")
public class TrekPreferenceController {

    @Autowired
    private TrekPreferenceService service;

    @PostMapping
    public ResponseEntity<TrekPreference> createTrekPreference(@RequestBody TrekPreference trekPreference) {
        TrekPreference savedPreference = service.saveTrekPreference(trekPreference);
        return ResponseEntity.ok(savedPreference);
    }

    @GetMapping
    public ResponseEntity<List<TrekPreference>> getAllTrekPreferences() {
        List<TrekPreference> preferences = service.getAllTrekPreferences();
        return ResponseEntity.ok(preferences);
    }
} 