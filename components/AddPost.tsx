import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { API_URL } from "../constants/api";

type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
};

type AddPostProps = {
    show: boolean;
    setShow: (show: boolean) => void;
    reload: () => void;
    prefillData?: Post | null;
    setPrefillData: (prefillData: any) => void;
};

function AddPost({ show, setShow, reload, prefillData, setPrefillData }: AddPostProps) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        setShow(false);
        setTitle("");
        setBody("");
        setPrefillData(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!!prefillData && !prefillData?.id) {
            alert("No post id found");
            return;
        }

        setLoading(true);

        if (!!prefillData) {
            try {
                const res = await axios.put(`${API_URL}/${prefillData.id}`, {
                    title,
                    body,
                });
                closeModal();
                reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const res = await axios.post(API_URL, {
                    title,
                    body,
                });
                closeModal();
                reload();
            } catch (error) {
                console.log(error);
            }
        }

        setLoading(false);
    };

    useEffect(() => {
        if (!!prefillData && show) {
            setTitle(prefillData.title ?? "");
            setBody(prefillData.body ?? "");
        }
    }, [prefillData, show]);

    return (
        <div
            style={{
                transform: `translateY(${show ? "0%" : "-100%"})`,
            }}
            className="h-screen w-full fixed top-0 left-0 flex items-center justify-center bg-white bg-opacity-20 backdrop-blur-sm transition-all duration-300"
        >
            <div className="h-96 w-11/12 max-w-sm bg-white rounded-md">
                <div className="h-1/5 w-full bg-[#242424] rounded-t-md relative">
                    <button onClick={closeModal} className="absolute top-2 right-2 text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="h-4/5 w-full p-4">
                    <h1 className="text-2xl font-bold text-[#242424] mb-3">{!!prefillData ? "Update Post" : "Add Post"}</h1>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Title"
                            className="border border-gray-300 rounded-md p-2"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Body"
                            className="border border-gray-300 rounded-md p-2 resize-none"
                            value={body}
                            rows={4}
                            required
                            onChange={(e) => setBody(e.target.value)}
                        />
                        <button disabled={loading || !title || !body} type="submit" className="bg-[#242424] text-white rounded-md p-2 disabled:bg-opacity-50">
                            {!!prefillData ? (loading ? "Updating..." : "Update Post") : loading ? "Adding..." : "Add Post"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddPost;
