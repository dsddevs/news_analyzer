package dsd.server.message.sender.in;

import dsd.server.message.builder.MailMessageBuilder;
import dsd.server.message.sender.MailMessageSender;
import dsd.server.verification.entity.OtpEntity;
import dsd.server.verification.service.in.OtpBaseInService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MailMessageInSender implements MailMessageSender {

    private final JavaMailSender mailSender;
    private final MailMessageBuilder messageBuilder;
    private final OtpBaseInService otpBase;

    @Override
    public void sendVerificationCodeToEmail(String email) throws MessagingException {
        OtpEntity otp = otpBase.getOtpByEmail(email);
        MimeMessage message = initMimeMessage(otp.getEmail(), otp.getVerificationCode());
        mailSender.send(message);
    }

    private MimeMessage initMimeMessage(String email, String verificationCode) throws MessagingException {
        return messageBuilder.buildMimeMessage(
                email,
                "User Account Verification",
                "Your verification code is: " + verificationCode
        );
    }

}
