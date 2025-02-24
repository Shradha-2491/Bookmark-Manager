"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface BookmarkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (bookmark: { title: string; url: string; description: string; folder: string; tags: string }) => void;
    initialData?: { folder: string; title: string; url: string; description: string; tags: string } | null;
    folders: [];
    tags: [];
}

export default function BookmarkModal({ isOpen, onClose, onSave, initialData, folders, tags }: BookmarkModalProps) {
    const [bookmark, setBookmark] = useState({
        title: "",
        url: "",
        description: "",
        folder: "",
        tags: [] as string[], // Store selected tags as an array
    });

    useEffect(() => {
        if (initialData) {
            setBookmark({
                title: initialData.title || "",
                url: initialData.url || "",
                description: initialData.description || "",
                folder: initialData.folder || "",
                tags: initialData.tags ? initialData.tags.split(",") : [], // Convert string to array
            });
        } else {
            setBookmark({ title: "", url: "", description: "", folder: "", tags: [] });
        }
    }, [initialData]);

    // Handle tag selection
    const handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
        setBookmark({ ...bookmark, tags: selectedTags });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 transition-all transform scale-100">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{initialData ? "Edit Bookmark" : "Add Bookmark"}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition">
                        <X size={20} />
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Title"
                    value={bookmark.title}
                    onChange={(e) => setBookmark({ ...bookmark, title: e.target.value })}
                    className="w-full p-2 mb-3 border rounded focus:ring focus:ring-blue-300"
                />
                <input
                    type="text"
                    placeholder="URL"
                    value={bookmark.url}
                    onChange={(e) => setBookmark({ ...bookmark, url: e.target.value })}
                    className="w-full p-2 mb-3 border rounded focus:ring focus:ring-blue-300"
                />
                <textarea
                    placeholder="Description"
                    value={bookmark.description}
                    onChange={(e) => setBookmark({ ...bookmark, description: e.target.value })}
                    className="w-full p-2 mb-3 border rounded focus:ring focus:ring-blue-300"
                ></textarea>

                {/* Folder Selection */}
                <select
                    value={bookmark.folder}
                    onChange={(e) => setBookmark({ ...bookmark, folder: e.target.value })}
                    className="w-full p-2 mb-3 border rounded focus:ring focus:ring-blue-300"
                >
                    <option value="">Select Folder</option>
                    {folders.map((folder) => (
                        <option key={`${folder.id}`} value={folder.name}>
                            {folder.name}
                        </option>
                    ))}
                </select>

                {/* Multi-Select Tag Input */}
                <select
                    multiple
                    value={bookmark.tags}
                    onChange={handleTagChange}
                    className="w-full p-2 mb-3 border rounded focus:ring focus:ring-blue-300"
                >
                    {tags.map((tag, index) => (
                        <option key={`${tag.id}`} value={tag.name}>
                            {tag.name}
                        </option>
                    ))}
                </select>

                {/* Display selected tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {bookmark.tags.length > 0 ? (
                        bookmark.tags.map((tag) => (
                            <span key={tag} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                                #{tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400">No Tags Selected</span>
                    )}
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() =>
                            onSave({
                                ...bookmark,
                                tags: bookmark.tags.join(","), // Convert array to comma-separated string
                            })
                        }
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        {initialData ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
