"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface BookmarkModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (bookmark: { title: string; url: string; description: string }) => void;
    initialData?: {
        bookmark_folder: number | null; title: string; url: string; description: string; tags: number[]
    } | null;
}

export default function BookmarkModal({ isOpen, onClose, onSave, initialData }: BookmarkModalProps) {
    const [bookmark, setBookmark] = useState({ title: "", url: "", description: "" });

    useEffect(() => {
        if (initialData) {
            setBookmark({
                title: initialData.title || "",
                url: initialData.url || "",
                description: initialData.description || ""
            });
        } else {
            setBookmark({ title: "", url: "", description: "" });
        }
    }, [initialData]);



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
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(bookmark)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        {initialData ? "Update" : "Add"}
                    </button>
                </div>
            </div>
        </div>
    );
}
