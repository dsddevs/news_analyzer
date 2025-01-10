package dsd.server.user.service.in;

import dsd.server.audit.annotation.Auditable;
import dsd.server.common.exception.conflict.UserAlreadyExistsException;
import dsd.server.common.type.ActionType;
import dsd.server.common.type.EntityType;
import dsd.server.jwt.service.JwtBaseService;
import dsd.server.jwt.service.JwtGeneratorService;
import dsd.server.message.sender.MailMessageSender;
import dsd.server.user.data.AuthenticationResponseData;
import dsd.server.user.entity.UserEntity;
import dsd.server.user.repository.UserRepository;
import dsd.server.user.request.AuthenticationRequest;
import dsd.server.user.request.RegistrationRequest;
import dsd.server.user.response.AuthenticationResponse;
import dsd.server.user.service.AuthenticationService;
import dsd.server.user.service.UserBaseService;
import dsd.server.verification.service.OtpBaseService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthenticationInService implements AuthenticationService {

    private final UserRepository userRepository;
    private final UserBaseService userBase;
    private final JwtGeneratorService jwtGenerator;
    private final JwtBaseService jwtBase;
    private final AuthenticationManager authenticationManager;
    private final OtpBaseService otpBase;
    private final MailMessageSender messageSender;

    @Transactional
    @Auditable(entity = EntityType.USERS, action = ActionType.CREATE)
    @Override
    public void registerUser(RegistrationRequest request) throws Exception {
        String email = request.getEmail();
        checkUserExists(email);
        UserEntity newUser = userBase.createUser(request);
        userRepository.save(newUser);
        otpBase.createAndSaveOtp(email, newUser);
        messageSender.sendVerificationCodeToEmail(email);
    }

    @Transactional
    @Override
    public AuthenticationResponse authenticateUser(AuthenticationRequest request) throws Exception {
        String email = request.getEmail();
        String password = request.getPassword();
        Authentication authentication = new UsernamePasswordAuthenticationToken(email, password);
        authenticationManager.authenticate(authentication);
        UserEntity user = userBase.getUserByEmail(email);
        String accessJwt = jwtGenerator.generateAccessJwt(user);
        String refreshJwt = jwtGenerator.generateRefreshJwt(user);
        jwtBase.saveAllRevokedJwtToDb(user);
        jwtBase.saveJwtToDb(user, accessJwt);
        return AuthenticationResponseData.builder()
                .accessJwt(accessJwt)
                .refreshJwt(refreshJwt)
                .fullName(user.getFullName())
                .build();
    }

    @Transactional
    @Override
    public AuthenticationResponse recoveryPassword(AuthenticationRequest request) throws Exception {
        UserEntity updatedUser = userBase.updateUserPassword(request);
        userRepository.save(updatedUser);
        String accessJwt = jwtGenerator.generateAccessJwt(updatedUser);
        String refreshJwt = jwtGenerator.generateRefreshJwt(updatedUser);
        jwtBase.saveAllRevokedJwtToDb(updatedUser);
        jwtBase.saveJwtToDb(updatedUser, accessJwt);
        return AuthenticationResponseData.builder()
                .accessJwt(accessJwt)
                .refreshJwt(refreshJwt)
                .build();
    }

    private void checkUserExists(String email) {
        if (userBase.isUserExisted(email)) {
            throw new UserAlreadyExistsException("User with email " + email + " already exists");
        }
    }

}
