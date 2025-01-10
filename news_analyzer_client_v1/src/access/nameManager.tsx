import {useSelector} from "react-redux";
import {RootState} from "../store.tsx";
import {NameMode} from "../storage/nameMode.tsx";

export const nameManager = (): string => {
    const registerName:string = localStorage.getItem(NameMode.REGISTER);
    const verificationName: string = useSelector((state: RootState) => state.verification.fullName);
    const loginName: string = useSelector((state: RootState) => state.login.fullName);
    return registerName || verificationName || loginName;
}