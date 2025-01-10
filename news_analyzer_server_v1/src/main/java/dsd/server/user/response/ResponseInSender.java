package dsd.server.user.response;

import dsd.server.common.response.ApiResponseData;
import org.springframework.stereotype.Component;

@Component
public class ResponseInSender implements ResponseSender {

    public ApiResponseData<AuthenticationResponse> sendSuccess(AuthenticationResponse data) {
        ApiResponseData<AuthenticationResponse> oauth2Response = new ApiResponseData<>();
        oauth2Response.setSuccess(Boolean.TRUE);
        oauth2Response.setData(data);
        return oauth2Response;
    }

    public ApiResponseData<AuthenticationResponse> sendError(String errorMessage) {
        ApiResponseData<AuthenticationResponse> oauth2Response = new ApiResponseData<>();
        oauth2Response.setSuccess(Boolean.FALSE);
        oauth2Response.setErrorMessage(errorMessage);
        return oauth2Response;
    }

}
