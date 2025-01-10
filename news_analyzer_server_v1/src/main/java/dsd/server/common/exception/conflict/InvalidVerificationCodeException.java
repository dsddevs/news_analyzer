package dsd.server.common.exception.conflict;

public class InvalidVerificationCodeException extends RuntimeException {
    public InvalidVerificationCodeException(String message){
        super(message);
    }
}
