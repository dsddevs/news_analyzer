import {AppDispatch} from "../store.tsx";
import {setError, setSuccessMessage} from "./otpSlice.tsx";
import {OtpData} from "./otpData.tsx";
import {confirmOtpController, resendOtpController, sendOtpController} from "./otpController.tsx";
import {ErrorMode} from "../error/errorMode.tsx";

export class OtpService {
    constructor(private dispatch: AppDispatch) {
    }

    async confirmOtp(email: string, verificationCode: string): Promise<boolean> {
        try {
            const verificationData: OtpData = {email, verificationCode};
            const result = await this.dispatch(confirmOtpController(verificationData) as any).unwrap();
            return result.success;
        } catch (error: any) {
            this.dispatch(setError(ErrorMode.CONFIRM_OTP));
            return false;
        }
    }

    async sendOtp(email: string): Promise<boolean> {
        try {
            await this.dispatch(sendOtpController({email}) as any).unwrap();
            return true;
        } catch {
            this.dispatch(setError(ErrorMode.SEND_OTP));
            return false;
        }
    }

    async resendOtp(email: string): Promise<boolean> {
        try {
            const result = await this.dispatch(resendOtpController({email}) as any).unwrap();
            if (!result.success) this.dispatch(setError(ErrorMode.RESEND_OTP));
            this.dispatch(setSuccessMessage("OTP resend successfully"));
            return result.success;
        } catch {
            this.dispatch(setError(ErrorMode.RESEND_OTP));
            return false;
        }
    }

    validateOtp(code: string[]): boolean {
        if (!code || code.length !== 6) return false;
        return code.every(digit => /^[a-zA-Z0-9]$/.test(digit));
    }
}
