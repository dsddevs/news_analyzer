
package dsd.server.common.exception;

import dsd.server.common.exception.bad_request.ValidationException;
import dsd.server.common.exception.conflict.*;
import dsd.server.common.exception.not_found.EmailNotFoundException;
import dsd.server.common.exception.not_found.RefreshJwtNotFoundException;
import dsd.server.common.exception.conflict.UrlConnectionFailedException;
import dsd.server.common.response.ErrorResponse;
import dsd.server.common.response.ErrorResponseData;
import jakarta.mail.MessagingException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalException {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(MethodArgumentNotValidException ex) {
        String errorMessage = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .findFirst()
                .orElse("Validation error");

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponseData("VALIDATION_ERROR", errorMessage));
    }

    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExists(UserAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseData("USER_ALREADY_EXISTS", ex.getMessage()));
    }

    @ExceptionHandler(EmailNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEmailNotFound(EmailNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponseData("EMAIL_NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(RefreshJwtNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleRefreshJwtNotFound(RefreshJwtNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponseData("REFRESH_JWT_NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(ValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(new ErrorResponseData("VALIDATION_ERROR", ex.getMessage()));
    }

    @ExceptionHandler(VerificationCodeExpirationException.class)
    public ResponseEntity<ErrorResponse> handleVerificationCodeExpirationException(VerificationCodeExpirationException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseData("VERIFICATION_CODE_EXPIRED", ex.getMessage()));
    }

    @ExceptionHandler(InvalidVerificationCodeException.class)
    public ResponseEntity<ErrorResponse> handleInvalidVerificationCodeException(InvalidVerificationCodeException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseData("INVALID_VERIFICATION_CODE", ex.getMessage()));
    }

    @ExceptionHandler(UserAlreadyVerifiedException.class)
    public ResponseEntity<ErrorResponse> handleInvalidVerificationCodeException(UserAlreadyVerifiedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseData("USER_ALREADY_VERIFIED", ex.getMessage()));
    }

    @ExceptionHandler(UserNotEnabledException.class)
    public ResponseEntity<ErrorResponse> handleUserNotEnabledException(UserNotEnabledException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseData("USER_NOT_ENABLED", ex.getMessage()));
    }

    @ExceptionHandler(UrlConnectionFailedException.class)
    public ResponseEntity<ErrorResponse> handleUrlConnectionFailedException(UrlConnectionFailedException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new ErrorResponseData("URL_CONNECTION_FAILED", ex.getMessage()));
    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ErrorResponse> handleMessagingException(MessagingException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponseData("EMAIL_SENDING_FAILED", "Failed to send verification email"));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponseData("INTERNAL_SERVER_ERROR", "Error: " + ex.getMessage()));
    }


}
