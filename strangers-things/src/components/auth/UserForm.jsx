import { useState, useEffect } from "react";
import { fetchMe, deletePost, updatePost } from "../../api/users";

export default function UserForm() {
  const [token] = useState(localStorage.getItem("token"));
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    async function getPosts() {
      const dataList = await fetchMe(token);
      setPosts(dataList.data.posts);
    }
    getPosts();
  }, [token]);
  return (
    <div>
      <h1>My Posts</h1>
      {posts.map((post) => {
        const POST_ID = post._id;
        return (
          <div key={post._id} className="cardcontents">
            {/* <div>insert image here</div> */}
            <h3>{post.title}</h3>
            <p>Description: {post.description}</p>
            <p>Price: {post.price}</p>
            <p>Messages: {post.messages}</p>
            <p>Created at: {post.createdAt}</p>
            <p>Updated at: {post.updatedAt}</p>
            <p>Location: {post.location}</p>
            <button
              onClick={async () => {
                await deletePost(token, POST_ID);
                const response = await fetchMe(token);
                if (response.success) {
                  setPosts(response.data.posts);
                } else {
                  setError(response.error);
                }
              }}
            >
              Delete Post
            </button>
          </div>
        );
      })}
    </div>
  );
}
