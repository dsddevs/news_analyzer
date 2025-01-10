package dsd.server.verification.controller;

import dsd.server.common.exception.conflict.InvalidVerificationCodeException;
import dsd.server.common.exception.conflict.VerificationCodeExpirationException;
import dsd.server.common.response.ApiResponseData;
import dsd.server.user.response.AuthenticationResponse;
import dsd.server.verification.request.OtpRequest;
import dsd.server.verification.service.OtpSenderService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "http://locahost:3000/")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/home")
public class OtpController {

    private final OtpSenderService otpSender;

    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponseData<AuthenticationResponse>> postSendOtp(
            @RequestBody OtpRequest request) {
        ApiResponseData<AuthenticationResponse> sendResponse = new ApiResponseData<>();
        try {
            AuthenticationResponse data = otpSender.sendVerificationCode(request.getEmail());
            sendResponse.setSuccess(Boolean.TRUE);
            sendResponse.setData(data);
            return ResponseEntity.ok(sendResponse);
        } catch (MessagingException e) {
            sendResponse.setSuccess(Boolean.FALSE);
            sendResponse.setErrorMessage("Send verification code failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(sendResponse);
        } catch (Exception e) {
            sendResponse.setSuccess(Boolean.FALSE);
            sendResponse.setErrorMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(sendResponse);
        }
    }

    @PostMapping("/resend-otp")
    public ResponseEntity<ApiResponseData<Void>> postResendOtp(
            @RequestBody OtpRequest request) {
        ApiResponseData<Void> resendResponse = new ApiResponseData<>();
        try {
            otpSender.resendVerificationCode(request.getEmail());
            resendResponse.setSuccess(true);
            return ResponseEntity.ok(resendResponse);
        } catch (MessagingException e) {
            resendResponse.setSuccess(false);
            resendResponse.setErrorMessage("Resend verification code failed");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resendResponse);
        } catch (Exception e) {
            resendResponse.setSuccess(false);
            resendResponse.setErrorMessage(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(resendResponse);
        }
    }

    @PostMapping("/confirm-otp")
    public ResponseEntity<ApiResponseData<AuthenticationResponse>> postConfirmOtp(
            @RequestBody OtpRequest request) {
        final String email = request.getEmail();
        final String otp = request.getVerificationCode();
        try {
            AuthenticationResponse otpWithJwt = otpSender.confirmVerificationCode(email, otp);
            return ResponseEntity.ok(successResponse(otpWithJwt));
        } catch (VerificationCodeExpirationException | InvalidVerificationCodeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(errorResponse("Confirm OTP failed"));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(errorResponse(e.getMessage()));
        }
    }

    private ApiResponseData<AuthenticationResponse> successResponse(AuthenticationResponse response) {
        ApiResponseData<AuthenticationResponse> confirmOtpResponse = new ApiResponseData<>();
        confirmOtpResponse.setSuccess(true);
        confirmOtpResponse.setData(response);
        return confirmOtpResponse;
    }

    private ApiResponseData<AuthenticationResponse> errorResponse(String errorMessage) {
        ApiResponseData<AuthenticationResponse> confirmOtpResponse = new ApiResponseData<>();
        confirmOtpResponse.setSuccess(false);
        confirmOtpResponse.setErrorMessage(errorMessage);
        return confirmOtpResponse;
    }
}

