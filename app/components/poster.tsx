import Card from "./card";
import Tag from "./tag";
import Image from "next/image";

interface PosterProps {
    tag: string;
    name: string;
    text: string;
}

export default function Poster({tag, name, text}: PosterProps) {
    
    
    return (
    <div className="m-2 p-2 bg-white">
        <Tag tag={tag} />
        <div className="flex p-2 ">
            <Image className="bg-gray-200 m-1 p-1 w-10 h-10 rounded-full" src="/icon.svg" alt="icon" width={50} height={50} />
            <Card name={name} text={text}/>
        </div>
    </div>

    )
}