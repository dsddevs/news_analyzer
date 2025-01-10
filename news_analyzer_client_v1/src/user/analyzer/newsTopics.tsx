import React from "react";

export const NewsTopics: React.FC = ({name, children}) => {
    return (
        <div className={`flex flex-col justify-center items-center w-full text-xl space-y-3`}>
            <h2 className={`font-display`}>{name}</h2>
            <p className={`font-extralight`}>{children}</p>
        </div>
    )
}