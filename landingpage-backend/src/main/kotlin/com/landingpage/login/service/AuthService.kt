package com.landingpage.login.service

import com.landingpage.login.config.JwtService
import com.landingpage.login.dto.AuthResponse
import com.landingpage.login.dto.LoginRequest
import com.landingpage.login.dto.RegisterRequest
import com.landingpage.login.entity.User
import com.landingpage.login.repository.UserRepository
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class AuthService(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder,
    private val authenticationManager: AuthenticationManager,
    private val jwtService: JwtService,
    private val userDetailsService: UserDetailsService
) {

    @Transactional
    fun register(request: RegisterRequest): AuthResponse {
        if (userRepository.findByUsername(request.username).isPresent)
            throw IllegalArgumentException("Username existiert bereits")

        val user = User(
            username = request.username,
            password = passwordEncoder.encode(request.password),
            email = request.email
        )
        userRepository.save(user)
        val token = jwtService.generateToken(user.username)
        return AuthResponse(token, user.username)
    }

    fun login(request: LoginRequest): AuthResponse {
        val authToken = UsernamePasswordAuthenticationToken(request.username, request.password)
        authenticationManager.authenticate(authToken)

        val userDetails: UserDetails = userDetailsService.loadUserByUsername(request.username)
        val token = jwtService.generateToken(userDetails.username)
        return AuthResponse(token, userDetails.username)
    }
}
