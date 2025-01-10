package dsd.server.jwt.controller;

import dsd.server.common.response.ApiResponseData;
import dsd.server.jwt.service.JwtRefresherService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/home")
public class JwtRefreshController {

    private final JwtRefresherService jwtRefresherService;

    @PostMapping("/refresh-jwt")
    public ResponseEntity<ApiResponseData<String>> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response) {
        try {
            jwtRefresherService.refreshJwt(request, response);
            return sendRefreshSuccess();
        } catch (Exception e) {
            String errorMessage = "Jwt refresh is failed: " + e.getMessage();
            return sendRefreshError(errorMessage);
        }
    }

    private ResponseEntity<ApiResponseData<String>> sendRefreshSuccess(){
        ApiResponseData<String> refreshJwtResponse = new ApiResponseData<>();
        refreshJwtResponse.setSuccess(Boolean.TRUE);
        return ResponseEntity.ok(refreshJwtResponse);
    }

    private ResponseEntity<ApiResponseData<String>> sendRefreshError(String errorMessage){
        ApiResponseData<String> refreshJwtResponse = new ApiResponseData<>();
        refreshJwtResponse.setSuccess(false);
        refreshJwtResponse.setErrorMessage(errorMessage);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(refreshJwtResponse);
    }
}
