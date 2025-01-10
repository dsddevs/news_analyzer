import React, {ChangeEvent} from "react";
import {otpStyle} from "../otpStyle.tsx";

interface OtpInputData {
    index: number;
    char: string;
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    changeInputValue: (index: number, value: string) => void;
    doKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
}

export const OtpInput: React.FC<OtpInputData> = ({
                                                     index,
                                                     char,
                                                     inputRefs,
                                                     changeInputValue,
                                                     doKeyDown,
                                                 }) => (
    <div className="w-16 h-16">
        <input
            ref={(element: HTMLInputElement | null) =>
                (inputRefs.current[index] = element)
            }
            id={`square-${index + 1}`}
            className={otpStyle.square}
            type="text"
            maxLength={1}
            value={char}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                changeInputValue(index, e.target.value)
            }
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
                doKeyDown(index, e)
            }
            pattern="[a-zA-Z0-9]"
            aria-label={`OTP digit ${index + 1}`}
        />
    </div>
);