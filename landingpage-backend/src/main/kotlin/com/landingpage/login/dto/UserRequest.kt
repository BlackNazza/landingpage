package com.landingpage.login.dto

data class UserRequest(
    val username: String,
    val email: String,
    val profileImageUrl: String?
)