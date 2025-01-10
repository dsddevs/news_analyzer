package dsd.server.verification.data;

import com.fasterxml.jackson.annotation.JsonInclude;
import dsd.server.verification.request.OtpRequest;
import lombok.Data;

import java.time.LocalDateTime;

@JsonInclude(JsonInclude.Include.NON_NULL)
@Data
public class OtpData implements OtpRequest {
    private String email;
    private String verificationCode;
    private LocalDateTime verificationCodeExpiredAt;
}
