package dsd.server.user.service;

import dsd.server.user.entity.UserEntity;
import dsd.server.user.request.AuthenticationRequest;
import dsd.server.user.request.RegistrationRequest;

public interface UserBaseService {
    boolean isUserExisted(String email);

    UserEntity getUserByEmail(String email);

    UserEntity createUser(RegistrationRequest request);

    void enableUser(UserEntity user, Boolean enable);

    UserEntity updateUserPassword(AuthenticationRequest request);
}
