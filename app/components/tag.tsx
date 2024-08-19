import React from "react";

interface TagProps {
    tag: string;
}


export default function Tag({tag}: TagProps) {
    return (
        <div className="bg-blue-500 w-fit p-2 m-2 text-white rounded-full">
            <h1>#{tag}</h1>
        </div>
    )
}