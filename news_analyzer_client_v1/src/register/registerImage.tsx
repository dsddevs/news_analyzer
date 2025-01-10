import React from "react";
import registerImg from "../assets/register.png"
import okImg from "../assets/ok.png"

export const RegisterImage: React.FC = () => {
    return (
        <div className={`bg-indigo-700 rounded-xl`}>
            <img src={registerImg} alt="register-image" className={`mt-[20%]`} width={350} height={10}/>
            <img src={okImg} alt="ok-image" className={`mt-[10%] ml-[17%]`} width={170} height={10}/>
        </div>
    )
}
