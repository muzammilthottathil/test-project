import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { API_LIMIT, API_URL } from "../constants/api";
import { addPosts, decrementStart, incrementStart, selectPosts, selectStart } from "../redux/slices/postSlice";

const Home: NextPage = () => {
    const posts = useSelector(selectPosts);
    const start = useSelector(selectStart);
    const dispatch = useDispatch();

    const fetchPosts = async () => {
        try {
            const res = await axios.get(API_URL, {
                params: {
                    _start: start,
                    _limit: API_LIMIT,
                },
            });
            dispatch(addPosts(res.data));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [start]);

    console.log(posts);

    return (
        <div className="bg-[#EAE6E5] min-h-screen w-full font-serif p-4">
            <Head>
                <title>Test Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1 className="text-2xl font-bold text-center">Posts</h1>

                <hr className="border-t border-t-gray-300 mt-3 mb-4" />

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-4">
                    {posts?.map((post) => (
                        <div key={post.id} className="bg-white p-4 shadow-md">
                            <h2 className="text-lg font-semibold text-[#242424] mb-3">{post.title}</h2>
                            <p className="text-gray-500 font-light">{post.body}</p>
                        </div>
                    ))}
                </div>

                {/* pagination */}
                <div className="flex items-center justify-center gap-8 mt-8 mb-4">
                    <button
                        onClick={() => dispatch(decrementStart())}
                        disabled={start === 0}
                        className="hover:bg-gray-300 px-2 py-1 rounded-sm cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200"
                    >
                        {"<< Prev"}
                    </button>
                    <button
                        onClick={() => dispatch(incrementStart())}
                        disabled={posts.length < API_LIMIT}
                        className="hover:bg-gray-300 px-2 py-1 rounded-sm cursor-pointer disabled:opacity-30 disabled:hover:bg-transparent transition-all duration-200"
                    >
                        {"Next >>"}
                    </button>
                </div>
            </main>

            {/* REQUIREMENTS */}
            {/* 

                Listing all resources ( 'https://jsonplaceholder.typicode.com/posts?_start=0&_limit=5' )  with pagination.

                Creating a resource ( 'https://jsonplaceholder.typicode.com/posts' ) ( 'POST' )

                Updating a resource ( 'https://jsonplaceholder.typicode.com/posts/{postId}' )

                Deleting a resource ( 'https://jsonplaceholder.typicode.com/posts/1' ))
         */}
        </div>
    );
};

export default Home;
