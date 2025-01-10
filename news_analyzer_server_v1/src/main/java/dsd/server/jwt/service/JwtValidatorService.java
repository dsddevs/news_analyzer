package dsd.server.jwt.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JwtValidatorService {
    boolean isJwtValid(String jwt, UserDetails userDetails);
}
