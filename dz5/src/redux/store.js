import { legacy_createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import axios from "axios";

const initialState = [];

export const store = legacy_createStore(
    postsReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

//////////////////REDUCER

function postsReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_POSTS":
            return action.payload;

        case "SET_COMMENTS":
            return state.map((post) => {
                return post.id === action.payload.id
                    ? { ...post, comments: action.payload.data, showComments: true }
                    : post;
            });

        case "SHOW_COMMENTS":
            return state.map((post) => {
                return post.id === action.payload
                    ? { ...post, showComments: true }
                    : post;
            });

        case "HIDE_COMMENTS":
            return state.map((post) => {
                return post.id === action.payload
                    ? { ...post, showComments: false }
                    : post;
            });

        default:
            return state;
    }
}

export function fetchPosts() {
    return async function (dispatch) {
        const response = await axios.get("https://dummyjson.com/posts?limit=10");
        dispatch({ type: "SET_POSTS", payload: response.data.posts });
    };
}

export function fetchComments(postId) {
    return async function (dispatch) {
        const response = await axios.get(
            `https://dummyjson.com/comments/post/${postId}`
        );
        dispatch({
            type: "SET_COMMENTS",
            payload: { id: postId, data: response.data.comments },
        });
    };
}

export function hideComments(postId) {
    return { type: "HIDE_COMMENTS", payload: postId };
}

export function showComments(postId) {
    return { type: "SHOW_COMMENTS", payload: postId };
}