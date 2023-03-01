import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API_LIMIT } from "../../constants/api";
import { RootState } from "../store";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// Type for our state
export interface PostState {
    posts: Post[];
    start: number;
}

// Initial state
const initialState: PostState = {
    posts: [],
    start: 0,
};

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
        },

        incrementStart: (state) => {
            state.start += API_LIMIT;
        },
        decrementStart: (state) => {
            state.start = state.start - API_LIMIT <= 0 ? 0 : state.start - API_LIMIT;
        },
    },
});

export const { addPosts, incrementStart, decrementStart } = postSlice.actions;

// selectors
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStart = (state: RootState) => state.posts.start;

export default postSlice.reducer;
