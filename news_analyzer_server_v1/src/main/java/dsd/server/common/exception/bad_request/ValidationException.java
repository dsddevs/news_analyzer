package dsd.server.common.exception.bad_request;

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
