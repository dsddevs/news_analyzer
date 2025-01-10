package dsd.server.jwt.service;

import dsd.server.user.entity.UserEntity;

public interface JwtBaseService {
    void saveJwtToDb(UserEntity user, String jwt) throws Exception;

    void saveAllRevokedJwtToDb(UserEntity user) throws Exception;
}
