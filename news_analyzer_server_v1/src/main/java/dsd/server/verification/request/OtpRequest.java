package dsd.server.verification.request;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import dsd.server.verification.data.OtpData;

@JsonDeserialize(as = OtpData.class)
public interface OtpRequest {
    String getEmail();

    void setEmail(String email);

    String getVerificationCode();
}

