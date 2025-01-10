package dsd.server.common.response;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(as = ErrorResponseData.class)
public interface ErrorResponse {
}
