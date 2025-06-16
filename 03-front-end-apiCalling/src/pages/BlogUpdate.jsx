import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchBlogByIdQuery, useUpdateBlogMutation } from "../redux/apiSlice";

function BlogUpdate() {
    const { id } = useParams();
    const { data: blog, error: fetchError, isLoading } = useFetchBlogByIdQuery(id);
    console.log(blog);
    const [updateBlog, { isLoading: isUpdating }] = useUpdateBlogMutation();
    const [form, setForm] = useState({ title: "", description: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (blog) {
            setForm({
                title: blog.blog.title, 
                description: blog.blog.description,
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await updateBlog({ id, ...form }).unwrap();
            navigate("/blogs");
        } catch (err) {
            setError(err?.data?.message || "Failed to update blog");
        }
    };

    if (isLoading) return <p>Loading blog...</p>;
    if (fetchError) return <p className="text-red-600">Failed to load blog</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
                Update Blog
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 h-40 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition duration-300 disabled:opacity-50"
                >
                    {isUpdating ? "Updating..." : "Update"}
                </button>
            </form>
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
        </div>
    );
}

export default BlogUpdate;
