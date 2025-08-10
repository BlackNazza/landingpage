package com.landingpage.login.entity

import jakarta.persistence.*
import org.hibernate.annotations.NaturalId

@Entity
@Table(name = "users")
class User(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    @NaturalId
    @Column(nullable = false, unique = true)
    val username: String,

    @Column(nullable = false, unique = true)
    val email: String,

    @Column(nullable = false)
    var password: String,

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "user_roles", joinColumns = [JoinColumn(name = "user_id")])
    @Column(name = "role")
    val roles: Set<String> = setOf("ROLE_USER"),

    @Column(name = "profile_image_url", length = 500, nullable = true)
    var profileImageUrl: String? = null

    //TODO: Extend to all values in home.html
)

