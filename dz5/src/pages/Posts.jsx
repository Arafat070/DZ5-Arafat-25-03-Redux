import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchPosts,
    fetchComments,
    showComments,
    hideComments,
} from "../redux/store.js";

export default function Posts() {
    const posts = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    function toggleComments(post) {
        if (!post.comments) {
            dispatch(fetchComments(post.id));
            return;
        }
        if (post.showComments) {
            dispatch(hideComments(post.id));
            return;
        }
        dispatch(showComments(post.id));
    }

    return (
        <div >
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    <button onClick={() => toggleComments(post)}>
                        {post.showComments ? "Hide comments" : "Show comments"}
                    </button>
                    {post.showComments && <Comments>{post.comments}</Comments>}
                </div>
            ))}
        </div>
    );
}

////////////////////////////////COMMENTS

function Comments({ children }) {
    return (
        <ul >
            {children.map((comment) => (
                <li key={comment.id}>{comment.body}</li>
            ))}
        </ul>
    );
}