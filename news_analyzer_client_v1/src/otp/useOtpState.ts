import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store.tsx";
import {Dispatch, useCallback, useEffect} from "react";
import {clearError, clearSuccessMessage} from "./otpSlice.tsx";

export const useOtpState = () => {
    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const { isLoading, error, successMessage } = useSelector((state: RootState) => state.verification);

    const clearMessages = useCallback(() => {
        dispatch(clearError());
        dispatch(clearSuccessMessage());
    }, [dispatch]);

    useEffect(() => {
        if (successMessage || error) {
            const timer: number = setTimeout(clearMessages, 3000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, error, clearMessages]);

    return { isLoading, error, successMessage };
};