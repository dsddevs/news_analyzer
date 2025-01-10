package dsd.server.user.response;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import dsd.server.user.data.AuthenticationResponseData;

@JsonDeserialize(as = AuthenticationResponseData.class)
public interface AuthenticationResponse {
}
