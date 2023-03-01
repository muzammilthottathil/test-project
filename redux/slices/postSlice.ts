import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

        incrementStart: (state, action: PayloadAction<number>) => {
            state.start += action.payload;
        },
        decrementStart: (state, action: PayloadAction<number>) => {
            state.start = state.start - action.payload <= 0 ? 0 : state.start - action.payload;
        },
    },
});

export const { addPosts, incrementStart, decrementStart } = postSlice.actions;

// selectors
export const selectPosts = (state: RootState) => state.posts.posts;
export const selectStart = (state: RootState) => state.posts.start;

export default postSlice.reducer;
