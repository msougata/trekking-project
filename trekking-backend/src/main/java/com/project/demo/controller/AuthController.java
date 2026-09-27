package com.project.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.project.demo.model.User;
import com.project.demo.repository.UserRepository;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (user.getEmail() == null || user.getPassword() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and password are required"));
        }
        
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is already registered!"));
        }

        // Securely hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully!", "user", savedUser));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyCode(@RequestBody Map<String, Object> otpData) {
        return ResponseEntity.ok(Map.of("success", true, "message", "Verified successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam Map<String, String> formData) {
        String email = formData.get("email");
        String password = formData.get("password");

        if (email == null || password == null) {
            return ResponseEntity.status(400).body(Map.of("message", "Email and password are required"));
        }

        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            
            // Compare plain text password with the securely hashed database password
            if (user.getPassword() != null && passwordEncoder.matches(password, user.getPassword())) {
                return ResponseEntity.ok(Map.of(
                    "name", user.getName() != null ? user.getName() : "User",
                    "email", user.getEmail(),
                    "phone", user.getPhone() != null ? user.getPhone() : ""
                ));
            }
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid email or password"));
    }

    @GetMapping("/status")
    public ResponseEntity<Boolean> checkStatus() {
        return ResponseEntity.ok(true);
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam(required = false) String email) {
        if (email != null) {
            Optional<User> user = userRepository.findByEmail(email);
            if (user.isPresent()) {
                return ResponseEntity.ok(user.get());
            }
        }
        return ResponseEntity.status(404).body(Map.of("message", "User profile not found"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser() {
        return ResponseEntity.ok(true);
    }

    @PostMapping("/forgot-password-request")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> data) {
        return ResponseEntity.ok(Map.of("message", "OTP sent successfully"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> data) {
        return ResponseEntity.ok(Map.of("message", "Password reset successful"));
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        if (updatedUser.getEmail() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email is required for updating"));
        }
        
        Optional<User> optionalUser = userRepository.findByEmail(updatedUser.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            
            if (updatedUser.getName() != null) {
                user.setName(updatedUser.getName());
            }
            if (updatedUser.getPhone() != null) {
                user.setPhone(updatedUser.getPhone());
            }
            
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Profile updated successfully!", "user", savedUser));
        }
        return ResponseEntity.status(404).body(Map.of("message", "User not found"));
    }
}