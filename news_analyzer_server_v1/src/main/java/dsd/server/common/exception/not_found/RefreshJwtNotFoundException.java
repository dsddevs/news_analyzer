package dsd.server.common.exception.not_found;


public class RefreshJwtNotFoundException extends RuntimeException {
    public RefreshJwtNotFoundException(String message) {
        super(message);
    }
}
