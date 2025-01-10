package dsd.server.user.data;

import dsd.server.user.request.RegistrationRequest;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@Data
public class RegistrationRequestData extends AuthenticationRequestData implements RegistrationRequest {
    @NotBlank(message = "Full name is required")
    @Size(min = 3, max = 20)
    private String fullName;
    @NotNull(message = "Consent must be given")
    private Boolean consentGiven;

}
