package dsd.server.user.service;

import dsd.server.user.request.AuthenticationRequest;
import dsd.server.user.request.RegistrationRequest;
import dsd.server.user.response.AuthenticationResponse;

public interface AuthenticationService {
    void registerUser(RegistrationRequest request) throws Exception;

    AuthenticationResponse authenticateUser(AuthenticationRequest request) throws Exception;

    AuthenticationResponse recoveryPassword(AuthenticationRequest request) throws Exception;
}
