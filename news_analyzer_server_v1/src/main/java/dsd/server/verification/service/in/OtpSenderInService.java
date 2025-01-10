package dsd.server.verification.service.in;

import dsd.server.common.exception.conflict.InvalidVerificationCodeException;
import dsd.server.common.exception.conflict.UserAlreadyVerifiedException;
import dsd.server.common.exception.conflict.VerificationCodeExpirationException;
import dsd.server.jwt.service.JwtBaseService;
import dsd.server.jwt.service.JwtGeneratorService;
import dsd.server.message.sender.MailMessageSender;
import dsd.server.user.data.AuthenticationResponseData;
import dsd.server.user.entity.UserEntity;
import dsd.server.user.response.AuthenticationResponse;
import dsd.server.user.service.UserBaseService;
import dsd.server.verification.entity.OtpEntity;
import dsd.server.verification.service.OtpBaseService;
import dsd.server.verification.service.OtpSenderService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OtpSenderInService implements OtpSenderService {

    private final UserBaseService userBase;
    private final OtpBaseService otpBase;
    private final MailMessageSender messageSender;
    private final JwtGeneratorService jwtGenerator;
    private final JwtBaseService jwtBase;

    @Transactional
    @Override
    public AuthenticationResponse sendVerificationCode(String email) throws Exception {
        UserEntity thisUser = userBase.getUserByEmail(email);
        userBase.enableUser(thisUser, false);
        OtpEntity thisOtp = otpBase.getOtpByEmail(email);
        otpBase.updateAndSaveOtp(thisOtp);
        messageSender.sendVerificationCodeToEmail(email);
        jwtBase.saveAllRevokedJwtToDb(thisUser);
        return AuthenticationResponseData.builder()
                .fullName(thisUser.getFullName())
                .build();
    }

    @Transactional
    @Override
    public void resendVerificationCode(String email) throws Exception {
        UserEntity thisUser = userBase.getUserByEmail(email);
        checkUserVerificationStatus(thisUser);
        userBase.enableUser(thisUser, false);
        OtpEntity thisOtp = otpBase.getOtpByEmail(email);
        otpBase.updateAndSaveOtp(thisOtp);
        messageSender.sendVerificationCodeToEmail(email);
        jwtBase.saveAllRevokedJwtToDb(thisUser);
    }

    @Transactional
    @Override
    public AuthenticationResponse confirmVerificationCode(String email, String verificationCode) throws Exception {
        OtpEntity otpEntity = otpBase.getOtpByEmail(email);
        checkVerificationCodeExpired(otpEntity);
        checkVerificationCodeValid(otpEntity, verificationCode);
        UserEntity thisUser = otpEntity.getUser();
        userBase.enableUser(thisUser, true);
        return sendJwt(thisUser);
    }

    private AuthenticationResponse sendJwt(UserEntity thisUser) throws Exception {
        String accessJwt = jwtGenerator.generateAccessJwt(thisUser);
        String refreshJwt = jwtGenerator.generateRefreshJwt(thisUser);
        jwtBase.saveJwtToDb(thisUser, accessJwt);
        return AuthenticationResponseData.builder()
                .accessJwt(accessJwt)
                .refreshJwt(refreshJwt)
                .build();
    }

    private void checkVerificationCodeValid(OtpEntity otpEntity, String verificationCode) {
        if (!otpEntity.getVerificationCode().equals(verificationCode)) {
            throw new InvalidVerificationCodeException("Invalid verification code");
        }
    }

    private void checkVerificationCodeExpired(OtpEntity email) throws InvalidVerificationCodeException {
        if (email.getVerificationCodeExpiredAt().isBefore(LocalDateTime.now())) {
            throw new VerificationCodeExpirationException("Verification code has expired");
        }
    }

    private void checkUserVerificationStatus(UserEntity user) throws UserAlreadyVerifiedException {
        if (user.isEnabled()) {
            throw new UserAlreadyVerifiedException("User Account is already verified");
        }
    }

}
