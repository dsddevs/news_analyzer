export interface AuthResponse {
    accessJwt: string;
    refreshJwt: string;
    fullName?: string;
}

export interface AppServerData {
    success: boolean;
    errorMessage?: string;
    data: AuthResponse;
}

