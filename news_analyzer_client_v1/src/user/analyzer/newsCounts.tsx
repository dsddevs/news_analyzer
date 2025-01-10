import React from "react";

export const NewsCounts: React.FC = ({name, children}) => {
    return (
        <div className={`flex flex-col justify-center items-center w-96 space-y-6 text-white`}>
            <h2 className={`font-display text-xl`}>{name}</h2>
            <p className={`bg-white/10 rounded-xl p-12 text-2xl`}>{children}</p>
        </div>
    )
}