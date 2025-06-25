package com.landingpage

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class LandingpageBackendApplication

fun main(args: Array<String>) {
	runApplication<LandingpageBackendApplication>(*args)
}
