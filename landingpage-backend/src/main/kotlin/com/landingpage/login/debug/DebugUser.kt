package com.landingpage.login.debug

import com.landingpage.login.entity.User
import com.landingpage.login.repository.UserRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.crypto.password.PasswordEncoder

@Configuration
class DataInitializer(
    private val userRepository: UserRepository,
    private val passwordEncoder: PasswordEncoder
) {

    @Bean
    fun initializeData() = CommandLineRunner {
        if (userRepository.findByUsername("admin").isEmpty) {
            val user = User(
                username = "admin",
                email = "admin@admin.com",
                password = passwordEncoder.encode("admin")
            )
            userRepository.save(user)
            println("Testuser angelegt")
        } else {
            println("Testuser existiert bereits")
        }
    }
}
