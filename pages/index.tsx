import type { NextPage } from "next";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { addPosts, selectPosts } from "../redux/slices/postSlice";
import { RootState } from "../redux/store";

const Home: NextPage = () => {
    const posts = useSelector(selectPosts);
    const dispatch = useDispatch();

    return (
        <div>
            <Head>
                <title>Test Project</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1>Hello World</h1>

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
