import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";

export const accessManager = (): boolean => {
    const loginAccessJwt: boolean = useSelector((state: RootState) => Boolean(state.login.accessJwt));
    const otpAccessJwt: boolean = useSelector((state: RootState) => Boolean(state.verification.accessJwt));
    const recoveryAccessJwt: boolean = useSelector((state: RootState) => Boolean(state.recovery.accessJwt));
    return otpAccessJwt || loginAccessJwt || recoveryAccessJwt;
}

export const accessJwtString = ():string => {
    const loginAccessJwt: string = useSelector((state: RootState) => state.login.accessJwt);
    const otpAccessJwt: string = useSelector((state: RootState) => state.verification.accessJwt);
    const recoveryAccessJwt: string = useSelector((state: RootState) => state.recovery.accessJwt);
    return otpAccessJwt || loginAccessJwt || recoveryAccessJwt;
}