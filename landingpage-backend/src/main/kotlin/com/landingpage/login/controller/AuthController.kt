package com.landingpage.login.controller

import com.landingpage.login.dto.AuthResponse
import com.landingpage.login.dto.LoginRequest
import com.landingpage.login.dto.RegisterRequest
import com.landingpage.login.entity.User
import com.landingpage.login.repository.UserRepository
import com.landingpage.login.config.JwtService
import jakarta.validation.Valid
import org.springframework.http.ResponseEntity
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/auth")
class AuthController(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService
) {

    @PostMapping("/register")
    fun register(@Valid @RequestBody request: RegisterRequest): ResponseEntity<String> {
        if (userRepository.existsByUsername(request.username)) {
            return ResponseEntity.badRequest().body("Username already taken")
        }
        if (userRepository.existsByEmail(request.email)) {
            return ResponseEntity.badRequest().body("Email already in use")
        }

        val user = User(
            username = request.username,
            email = request.email,
            password = passwordEncoder.encode(request.password)
        )
        userRepository.save(user)

        return ResponseEntity.ok("User registered successfully")
    }

    @PostMapping("/login")
    fun login(@Valid @RequestBody request: LoginRequest): ResponseEntity<AuthResponse> {
        val authentication = authenticationManager.authenticate(
            UsernamePasswordAuthenticationToken(request.username, request.password)
        )

        val token = jwtService.generateToken(request.username)
        return ResponseEntity.ok(AuthResponse(token, request.username))
    }
}
