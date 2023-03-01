import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../constants/api";

type PostCardProps = {
    id: number;
    title: string;
    body: string;
    onEdit: () => void;
    reload: () => void;
};

function PostCard({ id, title, body, onEdit, reload }: PostCardProps) {
    const [loading, setLoading] = useState(false);

    const deletePost = async () => {
        if (!id) {
            alert("No post id found");
            return;
        }
        setLoading(true);
        try {
            const res = await axios.delete(`${API_URL}/${id}`);
            alert("Post deleted successfully");
            reload();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    return (
        <div key={id} className="bg-white p-4 shadow-md flex flex-col items-start">
            <h2 className="text-lg font-semibold text-[#242424] mb-3">{title}</h2>
            <p className="text-gray-500 font-light flex-grow">{body}</p>
            <div className="flex items-center justify-end gap-4 mt-4 w-full">
                <button onClick={onEdit} className="bg-indigo-200 hover:bg-indigo-300 transition-all duration-200 text-black px-3 py-2 rounded-sm text-sm">
                    Update
                </button>
                <button
                    onClick={() => deletePost()}
                    disabled={loading}
                    className="bg-red-200 hover:bg-red-300 transition-all duration-200 text-dark px-3 py-2 rounded-sm text-sm disabled:bg-gray-300"
                >
                    {loading ? "Deleting..." : "Delete"}
                </button>
            </div>
        </div>
    );
}

export default PostCard;
