import React, {useMemo} from "react";
import {AppButton} from "../app/appButton.tsx";
import {verificationStyle} from "../app/appStyle.tsx";
import {AppField} from "../app/appField.tsx";
import emailImg from "../assets/auth/email.svg";
import {AppDispatch, RootState} from "../store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {OtpService} from "../otp/otpServiceModel.ts";
import {setError} from "../otp/otpSlice.tsx";
import {RouteClient} from "../routers/routeClient.tsx";
import {useForm} from "react-hook-form";
import {OtpData} from "../otp/otpData.tsx";
import {EmailMode} from "../storage/emailMode.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {RegisterError} from "../error/errorResponse.tsx";

export const VerificationPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate<NavigateFunction>();
    const {isLoading, error} = useSelector((state: RootState) => state.verification);
    const {register, handleSubmit, formState: {errors}} =
        useForm<OtpData>({mode: "onBlur", reValidateMode: "onChange"});

    const otpService: OtpService = useMemo(() => new OtpService(dispatch), [dispatch]);

    const getVerificationSuccess = (email: string) => {
        localStorage.setItem(EmailMode.RECOVERY, email);
        navigate(RouteClient.CONFIRM_OTP);
    }

    const getVerificationError = (email: string) => {
        dispatch(setError(ErrorMode.SEND_OTP));
        if (!email) dispatch(setError(ErrorMode.EMAIL_NOT_FOUNT));
    }

    const pushSendOtp = async (data: OtpData): Promise<void> => {
        const email: string = data.email;
        const isSend: boolean = await otpService.sendOtp(email);
        isSend ? getVerificationSuccess(email) : getVerificationError(email);
    };

    return (
        <section className="bg-gray-50">
            <div className={verificationStyle.div}>
                <div className={verificationStyle.labelDiv}>
                    <h1 className={verificationStyle.passwordLabel}>
                        Forgot your password?
                    </h1>
                    <p className="font-light text-gray-500">
                        Don't fret! Just type in your email and
                        we will send you a code to reset your password!
                    </p>
                    <form onSubmit={handleSubmit(pushSendOtp)}
                          className={verificationStyle.form} action="#">
                        <AppField label={`Email`}
                                  inputName={`send-otp-email`}
                                  inputType={`email`}
                                  iconPath={emailImg}
                                  {...register("email", {
                                      required: "Email is required",
                                      pattern: {
                                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                          message: "Invalid email address",
                                      },
                                  })}
                                  error={errors.email}
                        />
                        <AppButton
                            id={`send-otp-button`}
                            name="Verify email"
                            isLoading={isLoading}
                            disabled={isLoading}
                        />
                        {error && (<RegisterError> {error} </RegisterError>)}
                    </form>
                </div>
            </div>
        </section>
    )
}
