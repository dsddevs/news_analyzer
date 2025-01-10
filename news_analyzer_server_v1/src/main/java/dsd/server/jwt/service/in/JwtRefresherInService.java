package dsd.server.jwt.service.in;

import com.fasterxml.jackson.databind.ObjectMapper;
import dsd.server.common.exception.not_found.EmailNotFoundException;
import dsd.server.common.exception.not_found.RefreshJwtNotFoundException;
import dsd.server.jwt.service.*;
import dsd.server.user.data.AuthenticationResponseData;
import dsd.server.user.entity.UserEntity;
import dsd.server.user.response.AuthenticationResponse;
import dsd.server.user.service.in.UserBaseInService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class JwtRefresherInService implements JwtRefresherService {

    private final UserBaseInService userService;
    private final JwtBaseService jwtBase;
    private final JwtValidatorService jwtValidator;
    private final JwtGeneratorService jwtGenerator;
    private final JwtExtractorService jwtExtractor;

    @Override
    public void refreshJwt(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String refreshedJwt = jwtExtractor.extractJwtByRequest(request);
        if (refreshedJwt == null) {
            throw new RefreshJwtNotFoundException("Refresh Jwt is not found");
        }
        String email = jwtExtractor.extractEmailByJwt(refreshedJwt);
        if (email == null) {
            throw new EmailNotFoundException("Email is not found");
        }
        UserEntity user = userService.getUserByEmail(email);
        sendJwtToClient(user, refreshedJwt, response);
    }

    private void sendJwtToClient(UserEntity user, String refreshJwt, HttpServletResponse response) throws Exception {
        if (jwtValidator.isJwtValid(refreshJwt, user)) {
            String accessJwt = jwtGenerator.generateAccessJwt(user);
            jwtBase.saveAllRevokedJwtToDb(user);
            jwtBase.saveJwtToDb(user, accessJwt);
            AuthenticationResponse successResponse = AuthenticationResponseData.builder()
                    .accessJwt(accessJwt)
                    .refreshJwt(refreshJwt)
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), successResponse);
        } else {
            AuthenticationResponse errorResponse = AuthenticationResponseData.builder()
                    .errorMessage("JWT is not valid")
                    .build();
            new ObjectMapper().writeValue(response.getOutputStream(), errorResponse);
        }
    }

}
