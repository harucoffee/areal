import React from 'react';

interface CardProps {
    name: string;
    text: string;
}

function  Card({name, text}: CardProps) { 
    return (
        <div className="flex flex-col items-left m-2">
            <h1 className="text-black text-2xl font-bold">{name}</h1>
            <p className="text-black">{text}</p>
        </div>
    )
}

export default Card;