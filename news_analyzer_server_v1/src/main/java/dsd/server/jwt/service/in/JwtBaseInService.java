package dsd.server.jwt.service.in;

import dsd.server.jwt.entity.JwtEntity;
import dsd.server.jwt.service.JwtBaseService;
import dsd.server.user.entity.UserEntity;
import dsd.server.jwt.repository.JwtRepository;
import dsd.server.jwt.type.JwtType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class JwtBaseInService implements JwtBaseService {

    private final JwtRepository jwtRepository;

    @Override
    public void saveJwtToDb(UserEntity user, String jwt) {
        JwtEntity newJwt = buildJwtToDb(user, jwt);
        jwtRepository.save(newJwt);
    }

    @Override
    public void saveAllRevokedJwtToDb(UserEntity user) {
        List<JwtEntity> revokedJwts = revokeJwts(user.getId());
        jwtRepository.saveAll(revokedJwts);
    }

    private List<JwtEntity> revokeJwts(long userId) {
        List<JwtEntity> updatedJwts = updateJwtsForRevoking(userId);
        return updatedJwts.isEmpty() ? Collections.emptyList() : updatedJwts;
    }

    private List<JwtEntity> getJwtsFromDb(long userId) {
        List<JwtEntity> jwts = jwtRepository.findAllByUserId(userId);
        return jwts.isEmpty() ? Collections.emptyList() : jwts;
    }

    private List<JwtEntity> updateJwtsForRevoking(long userId) {
        return getJwtsFromDb(userId)
                .stream()
                .filter(jwt -> !jwt.isExpired() && jwt.isRevoked())
                .peek(jwt -> {
                    jwt.setExpired(true);
                    jwt.setRevoked(true);
                })
                .collect(Collectors.toList());
    }

    private JwtEntity buildJwtToDb(UserEntity user, String jwt) {
        return JwtEntity
                .builder()
                .jwt(jwt)
                .jwtType(JwtType.BEARER)
                .expired(false)
                .revoked(false)
                .user(user)
                .build();
    }

}
