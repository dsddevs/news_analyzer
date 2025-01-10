package dsd.server.jwt.service;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Date;

public interface JwtExtractorService {
    String extractEmailByJwt(String jwt);
    Date extractExpirationByJwt(String jwt);
    String extractJwtByRequest(HttpServletRequest request);
}
