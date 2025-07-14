package com.landingpage.login.controller

import com.landingpage.login.dto.RegisterRequest
import com.landingpage.login.dto.UserRequest
import com.landingpage.login.repository.UserRepository
import jakarta.validation.Valid
import org.springframework.security.core.Authentication
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.security.Principal

@RestController
@RequestMapping("/api/users")
class UserController(
    private val userRepository: UserRepository
) {

    @GetMapping("/me")
    fun getCurrentUser(principal: Principal): ResponseEntity<Any> {
        val username = principal.name
        val user = userRepository.findByUsername(username)
            .orElseThrow { RuntimeException("User not found") }

        val publicUserData = mapOf(
            "username" to user.username,
            "email" to user.email,
            "profileImageUrl" to user.profileImageUrl,
        )

        return ResponseEntity.ok(publicUserData)
    }

}
