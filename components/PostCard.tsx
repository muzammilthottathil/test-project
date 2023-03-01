import React from "react";

type PostCardProps = {
    id: number;
    title: string;
    body: string;
};

function PostCard({ id, title, body }: PostCardProps) {
    return (
        <div key={id} className="bg-white p-4 shadow-md">
            <h2 className="text-lg font-semibold text-[#242424] mb-3">{title}</h2>
            <p className="text-gray-500 font-light">{body}</p>
        </div>
    );
}

export default PostCard;
