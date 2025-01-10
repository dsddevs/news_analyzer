package dsd.server.user.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import dsd.server.user.data.AuthenticationRequestData;

@JsonDeserialize(as = AuthenticationRequestData.class)
public interface AuthenticationRequest {
    String getEmail();

    void setEmail(String email);

    String getPassword();

}
