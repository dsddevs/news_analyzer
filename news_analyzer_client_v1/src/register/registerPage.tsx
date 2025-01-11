import React from "react";
import {AppField} from "../app/appField.tsx";
import {RegisterRemember} from "./registerRemember.tsx";
import {AppAuthLink} from "../app/appAuthLink.tsx";
import {RouteClient} from "../routers/routeClient.tsx";
import {AppButton} from "../app/appButton.tsx";
import {AppDispatch, RootState} from "../store.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {RegisterImage} from "./registerImage.tsx";
import nameImg from "../assets/auth/name.svg"
import emailImg from "../assets/auth/email.svg"
import passwordImg from "../assets/auth/password.svg"
import {NavigateFunction, useNavigate} from "react-router-dom";
import {linkStyle} from "../app/appStyle.tsx";
import {setError} from "../otp/otpSlice.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {RegisterError} from "../error/errorResponse.tsx";
import {registerController} from "./registerController.tsx";
import {RegisterData} from "./registerData.tsx";
import {registerStyle} from "./registerStyle.tsx";

export const RegisterPage: React.FC = () => {

    const dispatch: AppDispatch = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();
    const {isLoading, error} = useSelector((state: RootState) => state.register);
    const useFormProps: { mode: string, reValidateMode: string } = {mode: "onBlur", reValidateMode: "onChange"}

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<RegisterData>(useFormProps);

    const passwordValue = watch("password");
    const getSuccessRegister = async () => {
        await navigate(RouteClient.CONFIRM_OTP);
    }
    const getErrorRegister = async () => {
        dispatch(setError(ErrorMode.USER_REGISTRATION));
    }
    const pushCreationUser = async (data: RegisterData) => {
        const result = await dispatch(registerController(data) as any).unwrap();
        result.success ? await getSuccessRegister() : await getErrorRegister();
    };

    return (
        <div className={registerStyle.page}>
            <div className={registerStyle.div}>
                <div className={registerStyle.formDiv}>
                    <RegisterImage/>
                    <form onSubmit={handleSubmit(pushCreationUser)}
                          className={registerStyle.form}
                    >

                        <div className="mb-8">
                            <h3 className={registerStyle.label}>Register</h3>
                        </div>

                        <div className="space-y-4">

                            <AppField label={`Full name`}
                                      inputName={`name`}
                                      inputType={`text`}
                                      iconPath={nameImg}
                                      {...register("fullName", {required: "Full name is required"})}
                                      error={errors.fullName}
                            />

                            <AppField label={`Email`}
                                      inputName={`email`}
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

                            <AppField label={`Password`}
                                      inputName={`password`}
                                      inputType={`password`}
                                      iconPath={passwordImg}
                                      {...register("password", {
                                          required: ErrorMode.REQUIRED_PASSWORD,
                                          minLength: {
                                              value: 6,
                                              message: ErrorMode.REQUIRED_VALID_PASSWORD,
                                          },
                                      })}
                                      error={errors.password}
                            />

                            <AppField label={`Confirm Password`}
                                      inputName={`confirm-password`}
                                      inputType={`password`}
                                      iconPath={passwordImg}
                                      {...register("confirmPassword", {
                                          required: ErrorMode.REQUIRED_CONFIRM_PASSWORD,
                                          validate: (value) =>
                                              value === passwordValue || ErrorMode.PASSWORD_NOT_MATCH
                                      })}
                                      error={errors.confirmPassword}
                            />

                            <RegisterRemember inputName={`consentGiven`}
                                              text={`I accept the`}
                                              {...register("consentGiven", {
                                                  required: "Please accept terms and conditions"
                                              })}
                                              error={errors.consentGiven}
                            />
                        </div>

                        <div className="mt-2">
                            <AppButton
                                id={`register-button`}
                                name="Create Account"
                                isLoading={isLoading}
                                disabled={isLoading}
                            />
                        </div>

                        <div className={linkStyle.loginLink}>
                            <div> Already have an account?</div>
                            <AppAuthLink name={`Login here`} path={RouteClient.LOGIN}/>
                        </div>

                        {error && (<RegisterError>{error}</RegisterError>)}

                    </form>

                    <div className={registerStyle.bottom}/>
                </div>
            </div>
        </div>
    )
}
