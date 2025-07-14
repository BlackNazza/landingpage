package com.landingpage.login.service

import com.landingpage.login.dto.UserRequest
import com.landingpage.login.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserService(private val userRepository: UserRepository){

    fun getPublicUserData(username: String): UserRequest {
        val user = userRepository.findByUsername(username)
            .orElseThrow { RuntimeException("User not found") }
        return UserRequest(
            username = user.username,
            email = user.email,
            profileImageUrl = user.profileImageUrl
        )
    }
}