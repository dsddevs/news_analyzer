import React, {Dispatch, useEffect, useState} from "react";
import {AppAuthLink} from "../app/appAuthLink.tsx";
import {RouteClient} from "../routers/routeClient.tsx";
import {AppField} from "../app/appField.tsx";
import emailImg from "../assets/auth/email.svg";
import passwordImg from "../assets/auth/password.svg";
import {AppButton} from "../app/appButton.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {setError} from "../otp/otpSlice.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {loginController} from "./loginController.tsx";
import {LoginError} from "../error/errorResponse.tsx";
import {loginStyle} from "./loginStyle.tsx";
import {errorStyle} from "../error/errorStyle.tsx";
import {clearData, clearError} from "./loginSlice.tsx";
import {AppServerData} from "../app/appServerData.tsx";

export const LoginPage: React.FC = () => {

    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const {isLoading, error} = useSelector((state: RootState) => state.login);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        dispatch(clearError());
        dispatch(clearData());

        return () => {
            dispatch(clearError());
            dispatch(clearData());
        };
    }, [dispatch]);

    const validateLoginFields = (email: string, password: string): boolean => {
        return Boolean(email && password);
    };

    const getLoginError = (dispatch: Dispatch<any>, errorMessage: string): void => {
        dispatch(setError(errorMessage));
    };

    const getLoginSuccess = (
        result: AppServerData,
        navigate: NavigateFunction,
        dispatch: Dispatch<any>
    ): void => {
        if (result.data.accessJwt) {
            navigate(RouteClient.NEWS_ANALYZER);
        } else {
            getLoginError(dispatch, ErrorMode.AUTHENTICATION);
        }
    };

    const callLoginController = async (
        email: string,
        password: string,
        dispatch: Dispatch<any>
    ): Promise<AppServerData | void> => {
        try {
            return await dispatch(loginController({ email, password })).unwrap();
        } catch (error) {
            getLoginError(dispatch, ErrorMode.AUTHENTICATION);
        }
    };

    const authenticateUser = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();

        if (!validateLoginFields(email, password)) {
            getLoginError(dispatch, 'Please fill in all fields');
            return;
        }
        const result: AppServerData | void = await callLoginController(email, password, dispatch);
        if (result) {
            getLoginSuccess(result, navigate, dispatch);
        }
    };

    return (
        <div id={`login-page`} className={loginStyle.page}>
            <div className={loginStyle.div}>
                <div className={loginStyle.formDiv}>

                    <form onSubmit={authenticateUser} className={loginStyle.form}>

                        <div className="mb-6">
                            <h3 className={loginStyle.label}>Log In</h3>
                            <p className={loginStyle.description}>
                                Welcome back! Please log in to
                                access your account and explore a world of possibilities.
                                Your journey begins here.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <AppField label={`Email`}
                                      inputName={`email`}
                                      inputType={`email`}
                                      iconPath={emailImg}
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                            />
                            <AppField label={`Password`}
                                      inputName={`password`}
                                      inputType={`password`}
                                      iconPath={passwordImg}
                                      value={password}
                                      onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className={loginStyle.linkDiv}>
                            <div className={`${loginStyle.link} items-start`}>
                                <p>Don't have an account</p>
                                <AppAuthLink name={`Registration account`}
                                             path={RouteClient.REGISTER}/>
                            </div>
                            <div className={`${loginStyle.link} items-end`}>
                                <p>If you forgot password</p>
                                <AppAuthLink name={`Recovery Password`}
                                             path={RouteClient.SEND_OTP}/>
                            </div>
                        </div>

                        <div className="mt-4">
                            <AppButton name={"Log in"} disabled={isLoading}/>
                        </div>

                        <div className={errorStyle.loginDiv}>
                            {error && <LoginError> {error} </LoginError>}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}
