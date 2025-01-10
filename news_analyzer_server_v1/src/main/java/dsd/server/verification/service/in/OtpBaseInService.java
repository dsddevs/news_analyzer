package dsd.server.verification.service.in;

import dsd.server.common.exception.not_found.EmailNotFoundException;
import dsd.server.user.entity.UserEntity;
import dsd.server.verification.entity.OtpEntity;
import dsd.server.verification.repository.OtpRepository;
import dsd.server.verification.service.OtpBaseService;
import dsd.server.verification.service.OtpGeneratorService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OtpBaseInService implements OtpBaseService {

    private final OtpRepository otpRepository;
    private final OtpGeneratorService otpGenerator;

    @Transactional
    @Override
    public void createAndSaveOtp(String email, UserEntity user) {
        OtpEntity otp = new OtpEntity();
        otp.setEmail(email);
        otp.setUser(user);
        otp.setVerificationCode(otpGenerator.generateVerificationCode());
        otp.setVerificationCodeExpiredAt(LocalDateTime.now().plusHours(24));
        otpRepository.save(otp);
    }

    @Transactional
    @Override
    public void updateAndSaveOtp(OtpEntity otp) {
        otp.setVerificationCode(otpGenerator.generateVerificationCode());
        otp.setVerificationCodeExpiredAt(LocalDateTime.now().plusHours(24));
        otpRepository.save(otp);
    }

    @Override
    public OtpEntity getOtpByEmail(String email) {
        return otpRepository
                .findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException("Email not found"));
    }

}
