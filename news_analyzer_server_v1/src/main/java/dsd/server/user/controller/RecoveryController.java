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
@RequestMapping("/api/home")
public class RecoveryController {

    private final AuthenticationService authService;
    private final ResponseSender response;

    @PatchMapping("/password-recovery")
    public ResponseEntity<ApiResponseData<AuthenticationResponse>> patchRecoveryPassword(
            @Valid @RequestBody AuthenticationRequest request) {
        try {
            AuthenticationResponse recoveryData = authService.recoveryPassword(request);
            var successResponse = response.sendSuccess(recoveryData);
            return ResponseEntity.ok(successResponse);
        } catch (Exception e) {
            String errorMessage = "Recovery password failed: " + e.getMessage();
            var errorResponse = response.sendError(errorMessage);
            return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
        }
    }
}
