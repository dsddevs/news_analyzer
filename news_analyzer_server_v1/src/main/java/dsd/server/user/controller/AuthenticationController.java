package dsd.server.user.controller;

import dsd.server.common.response.ApiResponseData;
import dsd.server.user.request.AuthenticationRequest;
import dsd.server.user.response.AuthenticationResponse;
import dsd.server.user.response.ResponseSender;
import dsd.server.user.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000/")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/home/login")
public class AuthenticationController {
    private final AuthenticationService authService;
    private final ResponseSender response;

    @PostMapping()
    public ResponseEntity<ApiResponseData<AuthenticationResponse>> loginUser(
            @Valid @RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse loginData = authService.authenticateUser(request);
            var successResponse = response.sendSuccess((loginData));
            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            String errorMessage = "Authentication is failed: " + e.getMessage();
            var errorLoginResponse = response.sendError(errorMessage);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorLoginResponse);
        }
    }
}
