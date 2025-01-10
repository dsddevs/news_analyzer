package dsd.server.message.sender;

import jakarta.mail.MessagingException;

public interface MailMessageSender {
    void sendVerificationCodeToEmail(String email) throws MessagingException;
}
