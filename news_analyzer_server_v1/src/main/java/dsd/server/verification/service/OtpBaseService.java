package dsd.server.verification.service;

import dsd.server.verification.entity.OtpEntity;
import dsd.server.user.entity.UserEntity;
import jakarta.mail.MessagingException;

public interface OtpBaseService {
    OtpEntity getOtpByEmail(String email);
    void createAndSaveOtp(String email, UserEntity user) throws MessagingException;
    void updateAndSaveOtp(OtpEntity otp);
}
