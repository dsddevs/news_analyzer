package dsd.server.user.response;

import dsd.server.common.response.ApiResponseData;

public interface ResponseSender {
    ApiResponseData<AuthenticationResponse> sendSuccess(AuthenticationResponse data);
    ApiResponseData<AuthenticationResponse> sendError(String errorMessage);
}
