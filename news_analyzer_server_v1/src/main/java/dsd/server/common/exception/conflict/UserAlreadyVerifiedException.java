package dsd.server.common.exception.conflict;

public class UserAlreadyVerifiedException extends RuntimeException {
    public UserAlreadyVerifiedException(String message){
        super(message);
    }
}
