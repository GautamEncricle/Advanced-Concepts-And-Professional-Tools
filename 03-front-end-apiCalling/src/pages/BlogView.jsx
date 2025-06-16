import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFetchBlogsQuery, useDeleteBlogMutation } from '../redux/apiSlice';

function BlogView() {
    const { data: blogs, error, isLoading } = useFetchBlogsQuery();
    const user = useSelector((state) => state.auth.user);
    console.log(user.user.username);
    const navigate = useNavigate();
    const [deleteBlog] = useDeleteBlogMutation();

    const handleEdit = (id) => {
        navigate(`/blog/update/${id}`);
    };


    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            try {
                await deleteBlog(id).unwrap();
            } catch (err) {
                alert("Failed to delete blog");
            }
        }
    };

    useEffect(() => {
        // if (blogs) {
        console.log("Fetched blogs:", blogs);
        // }
    }, [blogs]);

    if (isLoading) return <p>Loading blogs...</p>;
    if (error) return <p className="text-red-600">Failed to load blogs</p>;
    if (!Array.isArray(blogs) || blogs.length === 0) return <p>No blogs available.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-4xl font-bold mb-6">Blogs</h1>
            {blogs.map((blog) => (
                <div key={blog._id} className="mb-6 p-4 border rounded shadow">
                    <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-700 mb-2">{blog.description}</p>
                    <p className="text-sm text-gray-500">
                        Author: {blog.author?.username || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-400">
                        Created at: {new Date(blog.createdAt).toLocaleString()}
                    </p>
                    {user.user?.username === blog.author?.username && (
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={() => handleEdit(blog._id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                            >
                                Edit    
                            </button>
                            <button
                                onClick={() => handleDelete(blog._id)}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

export default BlogView;
