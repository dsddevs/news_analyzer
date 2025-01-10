import {api} from "../routers/routeServer.tsx";

export const setAccessJwt = (accessJwt: string) => {
    if (accessJwt) {
        api.defaults.headers.common['Authorization'] = `Bearer ${accessJwt}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};