import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = `${process.env.REACT_APP_API_URL}/posts/`;

function App() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editPostId, setEditPostId] = useState(null);

  useEffect(() => {
    // Fetch all blog posts on load
    axios.get(API_URL).then((response) => {
      setPosts(response.data);
    });
  }, []);

  // Create a new blog post
  const handleCreatePost = async () => {
    const newPost = { title, content, author };
    await axios.post(API_URL, newPost);
    setTitle("");
    setContent("");
    setAuthor("");
    fetchPosts();
  };

  // Fetch all posts again
  const fetchPosts = async () => {
    const response = await axios.get(API_URL);
    setPosts(response.data);
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    await axios.delete(`${API_URL}${postId}`);
    fetchPosts(); // Refresh the posts list
  };

  // Populate the form fields for editing
  const handleEditPost = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setAuthor(post.author);
    setEditPostId(post._id);
    setIsEditing(true);
  };

  // Update a post
  const handleUpdatePost = async () => {
    const updatedPost = { title, content, author };
    await axios.put(`${API_URL}${editPostId}`, updatedPost);
    setTitle("");
    setContent("");
    setAuthor("");
    setIsEditing(false);
    setEditPostId(null);
    fetchPosts(); // Refresh the posts list
  };

  return (
    <div className="app">
      <header className="hero">
        <div className="hero__content">
          <p className="eyebrow">FARM Stack Blog</p>
          <h1>Publish ideas with a clean, focused editor.</h1>
          <p className="subhead">
            Draft, edit, and organize posts in a single workspace. Keep your
            writing fast, elegant, and distraction-free.
          </p>
          <div className="hero__meta">
            <div className="meta-card">
              <span className="meta-card__label">Total posts</span>
              <span className="meta-card__value">{posts.length}</span>
            </div>
            <div className="meta-card">
              <span className="meta-card__label">Editor mode</span>
              <span className="meta-card__value">
                {isEditing ? "Editing" : "Create"}
              </span>
            </div>
          </div>
        </div>
        <div className="hero__panel">
          <h2>{isEditing ? "Update post" : "Create a new post"}</h2>
          <p className="panel__hint">
            Keep titles short, focus on value, and add a clear author credit.
          </p>
          <div className="form-grid">
            <label className="field">
              <span>Title</span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="field">
              <span>Author</span>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </label>
            <label className="field field--full">
              <span>Content</span>
              <textarea
                placeholder="Write your post content here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
          </div>
          <div className="panel__actions">
            {isEditing ? (
              <button className="btn btn--primary" onClick={handleUpdatePost}>
                Update post
              </button>
            ) : (
              <button className="btn btn--primary" onClick={handleCreatePost}>
                Create post
              </button>
            )}
            {isEditing && (
              <button
                className="btn btn--ghost"
                onClick={() => {
                  setTitle("");
                  setContent("");
                  setAuthor("");
                  setIsEditing(false);
                  setEditPostId(null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="posts">
        <div className="posts__header">
          <h2>Recent posts</h2>
          <p>Manage your latest writing and keep the list tidy.</p>
        </div>
        <div className="posts__grid">
          {posts.map((post) => (
            <article key={post._id} className="post-card">
              <div className="post-card__body">
                <h3>{post.title}</h3>
                <p className="post-card__content">{post.content}</p>
              </div>
              <div className="post-card__footer">
                <span className="post-card__author">By {post.author}</span>
                <div className="post-card__actions">
                  <button
                    className="btn btn--small"
                    onClick={() => handleEditPost(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn--small btn--danger"
                    onClick={() => handleDeletePost(post._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;