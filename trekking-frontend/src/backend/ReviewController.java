package com.mytrek.backend.controller;

import com.mytrek.backend.model.Review;
import com.mytrek.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*") // For development - restrict in production
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // Get all reviews
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        try {
            List<Review> reviews = reviewRepository.findAll();
            return new ResponseEntity<>(reviews, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get review by ID
    @GetMapping("/{id}")
    public ResponseEntity<Review> getReviewById(@PathVariable("id") Long id) {
        Optional<Review> reviewData = reviewRepository.findById(id);
        return reviewData.map(review -> new ResponseEntity<>(review, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Create new review
    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody Review review) {
        try {
            Review newReview = reviewRepository.save(review);
            return new ResponseEntity<>(newReview, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Update review
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(@PathVariable("id") Long id, @RequestBody Review review) {
        Optional<Review> reviewData = reviewRepository.findById(id);
        
        if (reviewData.isPresent()) {
            Review updatedReview = reviewData.get();
            updatedReview.setName(review.getName());
            updatedReview.setRating(review.getRating());
            updatedReview.setComment(review.getComment());
            return new ResponseEntity<>(reviewRepository.save(updatedReview), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete review
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteReview(@PathVariable("id") Long id) {
        try {
            reviewRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
} 