interface ErrorModeData {
    CONFIRM_OTP: string,
    SEND_OTP: string,
    RESEND_OTP: string,
    NETWORK_CONNECTION: string,
    USER_REGISTRATION: string,
    PASSWORD_CHANGER: string;
    AUTHENTICATION: string;
    EMAIL_NOT_FOUNT: string;
    OTP_INVALID: string;
    USER_EXISTING: string;
    PASSWORD_FAILED: string;
    UNKNOWN: string;
    GOOGLE_AUTH_FAILED: string;
    NEWS_ERROR: string;
    NEWS_METRICS: string;
    ACCESS_DENIED: string;
    SERVER_ERROR: string;
    ANALYZER_FAILED: string;
    REQUIRED_PASSWORD: string;
    REQUIRED_CONFIRM_PASSWORD: string;
    REQUIRED_VALID_PASSWORD: string;
    PASSWORD_NOT_MATCH: string
}

export const ErrorMode: ErrorModeData = {
    CONFIRM_OTP: "Confirm OTP failed",
    NETWORK_CONNECTION: "Network connection failed",
    SEND_OTP: "OTP sending failed",
    RESEND_OTP: "OTP resending failed",
    USER_REGISTRATION: "User registration failed",
    PASSWORD_CHANGER: "Password not changed",
    AUTHENTICATION: "Authentication failed. Please try again",
    EMAIL_NOT_FOUNT: "Email address not found",
    USER_EXISTING: "User already exists",
    OTP_INVALID: "Please enter a valid 6-character verification code",
    PASSWORD_FAILED: "Password recovery failed",
    UNKNOWN: "Unknown error occurred",
    GOOGLE_AUTH_FAILED: 'Google authentication failed',
    NEWS_ERROR: "News analyzer data failed",
    NEWS_METRICS: "Failed to fetch news metrics",
    ACCESS_DENIED: "Access denied. Please login again",
    SERVER_ERROR: "Server error occurred",
    ANALYZER_FAILED: "Failed to analyze news",
    REQUIRED_PASSWORD: "Password is required",
    REQUIRED_CONFIRM_PASSWORD: "Conform Password is required",
    REQUIRED_VALID_PASSWORD: "Password must be at least 6 characters",
    PASSWORD_NOT_MATCH: "Password not match"
}