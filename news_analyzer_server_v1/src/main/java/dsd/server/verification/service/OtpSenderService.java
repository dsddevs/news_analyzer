package dsd.server.verification.service;

import dsd.server.user.response.AuthenticationResponse;
import jakarta.mail.MessagingException;

public interface OtpSenderService {
    AuthenticationResponse sendVerificationCode(String email) throws Exception;

    void resendVerificationCode(String email) throws Exception;

    AuthenticationResponse confirmVerificationCode(String email, String verificationCode) throws Exception;
}
