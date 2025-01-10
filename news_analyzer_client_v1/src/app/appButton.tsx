import React from "react";
import {Loader2} from "lucide-react";
import {appStyle} from "./appStyle.tsx";

export interface AppButtonData {
    id: string;
    name: string;
    disabled?: boolean;
    isLoading?: boolean;
    style: string
}

const ButtonLoader = () => {
    return (
        <div className={appStyle.loaderDiv}>
            <Loader2 className={appStyle.loader}/>
            <div>Loading</div>
        </div>
    )
}

export const AppButton: React.FC<AppButtonData> = (
    {id, name, disabled, isLoading = false}
) => {
    return (
        <button id={id}
                type="submit"
                disabled={disabled || isLoading}
                className={`${isLoading ? "bg-slate-400" : "bg-indigo-700"} 
                ${appStyle.button}`}
        >
            {isLoading ? (<ButtonLoader/>) : (name)}
        </button>
    );
}
