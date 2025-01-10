package dsd.server.user.service.in;

import dsd.server.common.exception.conflict.UserNotEnabledException;
import dsd.server.user.entity.UserEntity;
import dsd.server.user.repository.UserRepository;
import dsd.server.user.request.AuthenticationRequest;
import dsd.server.user.request.RegistrationRequest;
import dsd.server.user.service.UserBaseService;
import dsd.server.user.type.RoleType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserBaseInService implements UserBaseService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public boolean isUserExisted(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public UserEntity getUserByEmail(String email) {
        return userRepository
                .findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public UserEntity createUser(RegistrationRequest request) {
        return UserEntity.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .consentGiven(request.getConsentGiven())
                .enabled(Boolean.FALSE)
                .role(RoleType.USER)
                .build();
    }

    @Override
    public UserEntity updateUserPassword(AuthenticationRequest request) {
        UserEntity currentUser = getUserByEmail(request.getEmail());
        if (!currentUser.isEnabled()) {
            throw new UserNotEnabledException("User not enabled");
        }
        currentUser.setPassword(passwordEncoder.encode(request.getPassword()));
        return currentUser;
    }

    @Override
    @Transactional
    public void enableUser(UserEntity user, Boolean enable) {
        user.setEnabled(enable);
        userRepository.save(user);
    }
}
