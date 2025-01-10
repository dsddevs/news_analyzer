package dsd.server.common.exception.conflict;

public class VerificationCodeExpirationException extends RuntimeException {
    public VerificationCodeExpirationException(String message) {
        super(message);
    }
}
