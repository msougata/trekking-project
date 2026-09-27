package com.project.demo.service;

import com.project.demo.model.TrekPreference;
import com.project.demo.repository.TrekPreferenceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrekPreferenceService {

    @Autowired
    private TrekPreferenceRepository repository;

    public TrekPreference saveTrekPreference(TrekPreference trekPreference) {
        return repository.save(trekPreference);
    }

    public List<TrekPreference> getAllTrekPreferences() {
        return repository.findAll();
    }
} 