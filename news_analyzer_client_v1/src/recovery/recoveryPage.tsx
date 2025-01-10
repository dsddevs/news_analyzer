import React, {Dispatch} from "react";
import {verificationStyle} from "../app/appStyle.tsx";
import {AppButton} from "../app/appButton.tsx";
import {AppField} from "../app/appField.tsx";
import passwordImg from "../assets/auth/password.svg";
import {useForm} from "react-hook-form";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {recoveryController} from "./recoveryController.tsx";
import {RouteClient} from "../routers/routeClient.tsx";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store.tsx";
import {setError} from "./recoverySlice.tsx";
import {EmailMode} from "../storage/emailMode.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {RecoveryData} from "./recoveryData.tsx";
import {RecoveryError} from "../error/errorResponse.tsx";

export const RecoveryPage: React.FC = () => {

    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const {isLoading, error} = useSelector((state: RootState) => state.register);
    const navigate: NavigateFunction = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors}
    } = useForm<RecoveryData>({mode: "onBlur", reValidateMode: "onChange"});

    const passwordValue = watch("password");
    const pushPasswordChanger = async (data: RecoveryData) => {
        try {
            data.email = localStorage.getItem(EmailMode.RECOVERY);
            await dispatch(recoveryController(data) as any);
            navigate(RouteClient.NEWS_ANALYZER, {replace: true});
            localStorage.removeItem(EmailMode.RECOVERY)
        } catch (error) {
            dispatch(setError(ErrorMode.PASSWORD_CHANGER));
        }
    };

    return (
        <section className="bg-gray-50">
            <div className={verificationStyle.div}>
                <div className={verificationStyle.labelDiv}>
                    <h1 className={verificationStyle.passwordLabel}>
                        Recovery password
                    </h1>
                    <h1 className={verificationStyle.text}>
                        {` for the email: ${EmailMode.GET_RECOVERY}`}
                    </h1>
                    <form onSubmit={handleSubmit(pushPasswordChanger)}
                          className={verificationStyle.form} action="#">
                        <AppField label={`New Password`}
                                  inputName={`new-password`}
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

                        <AppField label={`Confirm New Password`}
                                  inputName={`new-confirm-password`}
                                  inputType={`password`}
                                  iconPath={passwordImg}
                                  {...register("confirmNewPassword", {
                                      required: ErrorMode.REQUIRED_CONFIRM_PASSWORD,
                                      validate: (value) =>
                                          value === passwordValue || ErrorMode.PASSWORD_NOT_MATCH
                                  })}
                                  error={errors.confirmPassword}
                        />
                        <div className="mt-4 ">
                            <AppButton
                                id={`recovery-button`}
                                name="Change password"
                                isLoading={isLoading}
                                disabled={isLoading}
                            />
                        </div>
                        {error && (<RecoveryError> {error} </RecoveryError>)}
                    </form>
                </div>
            </div>
        </section>
    )
}
