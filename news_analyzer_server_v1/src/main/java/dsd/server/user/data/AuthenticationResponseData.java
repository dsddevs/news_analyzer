package dsd.server.user.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import dsd.server.user.response.AuthenticationResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AuthenticationResponseData implements AuthenticationResponse {
    @JsonProperty
    private String accessJwt;
    @JsonProperty
    private String refreshJwt;
    @JsonProperty
    private String fullName;
    private String errorMessage;
}
