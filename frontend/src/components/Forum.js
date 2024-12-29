import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API requests
import "../styles/Forum.css"; // Import CSS styles

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch posts when the component is mounted
  useEffect(() => {
    fetchPosts();
  }, []);

  // Function to fetch posts from the backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/posts', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Token for authentication
        }
      });
      setPosts(response.data); // Set the posts from the backend response
      setError(''); // Clear any previous errors
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Failed to fetch posts. Please try again later.");
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    if (!content.trim() || !title.trim()) {
      setError("Title and content cannot be empty.");
      return;
    }

    try {
      const formData = new FormData();

      // Add the post object as a JSON string
      const postObject = { title, content };
      formData.append('post', JSON.stringify(postObject));

      // Attach the media file if present
      if (mediaFile) {
        formData.append('media', mediaFile);
      }

      // Send a POST request to the backend to create a new post
      await axios.post('http://localhost:3000/api/posts', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is set
          'Content-Type': 'multipart/form-data',
        },
      });

      setTitle(''); // Clear the title field
      setContent(''); // Clear the content field
      setMediaFile(null); // Clear the media file
      setSuccessMessage('Post created successfully!'); // Success feedback
      setError(''); // Clear error messages
      fetchPosts(); // Re-fetch posts
    } catch (err) {
      console.error("Error creating post:", err.response?.data || err.message);
      setError("Failed to create the post. Please try again.");
      setSuccessMessage(''); // Clear success message on error
    }
  };

  return (
    <div className="forum-container">
      <h2 className="forum-title">Forum</h2>

      {/* Error and success messages */}
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      {/* Create Post Form */}
      <form onSubmit={handleCreatePost} className="post-form">
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a title"
            required
          />
        </div>
        <div className="form-group">
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share something..."
            required
          />
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file && !file.type.startsWith('image/')) {
                setError('Only image files are allowed.');
                setMediaFile(null);
              } else {
                setError('');
                setMediaFile(file);
              }
            }}
          />
        </div>
        <button type="submit" className="btn btn-post">Post</button>
      </form>

      {/* Post List */}
      <div className="post-list mt-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="post-card mb-3">
              <div className="post-card-body">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                {post.mediaUrl && (
                  <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="post-image"
                  />
                )}
                <small>By: {post.user?.name || 'Anonymous'}</small>
              </div>
            </div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
};

export default Forum;
