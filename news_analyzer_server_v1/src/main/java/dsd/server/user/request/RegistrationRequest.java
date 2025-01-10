package dsd.server.user.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import dsd.server.user.data.RegistrationRequestData;

@JsonDeserialize(as = RegistrationRequestData.class)
public interface RegistrationRequest {
    String getFullName();

    String getEmail();

    void setEmail(String email);

    String getPassword();

    Boolean getConsentGiven();

}
