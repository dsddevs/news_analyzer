package dsd.server.common.exception.conflict;

public class UserNotEnabledException extends RuntimeException {
    public UserNotEnabledException(String message){
        super(message);
    }
}
