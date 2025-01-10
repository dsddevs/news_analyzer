import React, {useRef, useState} from "react";

export const useOtpInput = (length: number = 6) => {
    const [otpCode, setOtpCode] = useState<string[]>(new Array(length).fill(""));
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const changeInputValue = (index: number, value: string): void => {
        if (!/^[a-zA-Z0-9]?$/.test(value)) return;

        const updatedOtpCode: string[] = [...otpCode];
        updatedOtpCode[index] = value;
        setOtpCode(updatedOtpCode);

        if (value && index < length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const doKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Backspace" && index > 0 && !otpCode[index]) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    return {
        otpCode,
        inputRefs,
        changeInputValue,
        doKeyDown
    };
};
