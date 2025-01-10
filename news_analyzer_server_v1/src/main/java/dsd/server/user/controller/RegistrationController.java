package dsd.server.user.controller;

import dsd.server.common.response.ApiResponseData;
import dsd.server.user.request.RegistrationRequest;
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
public class RegistrationController {

    private final AuthenticationService authService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponseData<Void>> postRegisterUser(
            @Valid @RequestBody RegistrationRequest request) {
        try {
            String errorMessage = "User registration failed";
            return request.getConsentGiven() ? sendRegisterSuccess(request) : sendRegisterError(errorMessage);
        } catch (Exception ex) {
            return sendRegisterError(ex.getMessage());
        }
    }

    private ResponseEntity<ApiResponseData<Void>> sendRegisterSuccess(RegistrationRequest request) throws Exception {
        authService.registerUser(request);
        ApiResponseData<Void> registerResponse = new ApiResponseData<>();
        registerResponse.setSuccess(true);
        return ResponseEntity.status(HttpStatus.CREATED).body(registerResponse);
    }

    private ResponseEntity<ApiResponseData<Void>> sendRegisterError(String errorMessage) {
        ApiResponseData<Void> registerResponse = new ApiResponseData<>();
        registerResponse.setSuccess(Boolean.FALSE);
        registerResponse.setErrorMessage(errorMessage);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(registerResponse);
    }
}
