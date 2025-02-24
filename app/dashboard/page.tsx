"use client";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { getBookmarks, createBookmark, updateBookmark, deleteBookmark, getFolders, getTags } from "@/lib/api";
import BookmarkModal from "@/components/BookmarkModal";
import { Plus, Trash, Edit, Folder, TagIcon } from "lucide-react";
import Spinner from "@/components/Spinner";
import { useAuth } from "@clerk/nextjs";
import FolderForm from "@/components/FolderForm";
import TagForm from "@/components/TagForm";

export default function Dashboard() {
    const { userId } = useAuth();
    const { data: bookmarks, error } = useSWR(userId ? ["bookmarks", userId] : null,
        ([_, userId]) => getBookmarks(userId),
        { revalidateOnFocus: false }
    );
    const [folders, setFolders] = useState([]);
    const [tags, setTags] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingBookmark, setEditingBookmark] = useState(null);
    const [showFolderForm, setShowFolderForm] = useState(false);
    const [showTagForm, setShowTagForm] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const folderData = await getFolders();
            const tagData = await getTags();
            setFolders(folderData?.data || []);
            setTags(tagData?.data || []);
        }
        fetchData();
    }, []);

    const handleAddOrUpdate = async (bookmark: any) => {
        if (editingBookmark) {
            await updateBookmark(editingBookmark.id, {
                ...bookmark, user: userId
            });
        } else {
            await createBookmark({ ...bookmark, user: userId });
        }
        setModalOpen(false);
        setEditingBookmark(null);
    };

    const handleDelete = async (id: number) => {
        await deleteBookmark(id);
        mutate("bookmarks");
    };

    if (error) return <p className="text-red-500 text-center">Error loading bookmarks</p>;
    if (!bookmarks) return <Spinner />;

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">📌 My Bookmarks</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    <Plus size={20} />
                    Add Bookmark
                </button>

                <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => setShowFolderForm(!showFolderForm)}
                >
                    <Folder size={20} />
                    {showFolderForm ? "Cancel" : "Add Folder"}
                </button>

                <button
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => setShowTagForm(!showTagForm)}
                >
                    <TagIcon size={20} />
                    {showTagForm ? "Cancel" : "Add Tag"}
                </button>

            </div>

            {showFolderForm && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                    <h2 className="text-lg font-semibold">Create New Folder</h2>
                    <FolderForm onFolderCreated={() => setShowFolderForm(false)} />
                </div>
            )}

            {showTagForm && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-100">
                    <h2 className="text-lg font-semibold">Create New Tag</h2>
                    <TagForm onTagCreated={() => setShowTagForm(false)} />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {bookmarks?.data?.map((bookmark: any) => (
                    <div key={bookmark.id} className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
                        <p className="text-sm font-medium text-gray-600 bg-gray-200 px-2 py-1 rounded-md inline-block">
                            📂 {bookmark.folder}
                        </p>
                        <h2 className="text-xl font-semibold text-gray-800 truncate">{bookmark.title}</h2>
                        <p className="text-gray-500 text-sm mt-1 truncate">{bookmark.description}</p>
                        <a href={bookmark.url} target="_blank" className="text-blue-500 text-sm mt-2 block truncate">
                            {bookmark.url}
                        </a>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {bookmark.tags?.trim() ? ( // Check if it's not an empty string
                                bookmark.tags.split(",").map((tag: string) => (
                                    <span key={tag.trim()} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-md">
                                        #{tag.trim()}
                                    </span>
                                ))
                            ) : (
                                <span className="text-xs text-gray-400">No Tags</span>
                            )}
                        </div>
                        <div className="flex justify-end gap-3 mt-4">
                            <button
                                onClick={() => { setEditingBookmark(bookmark); setModalOpen(true); }}
                                className="px-3 py-1 text-yellow-600 border border-yellow-400 rounded-md hover:bg-yellow-100 transition"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(bookmark.id)}
                                className="px-3 py-1 text-red-600 border border-red-400 rounded-md hover:bg-red-100 transition"
                            >
                                <Trash size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <BookmarkModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setEditingBookmark(null); }}
                onSave={handleAddOrUpdate}
                initialData={editingBookmark}
                folders={folders}
                tags={tags}
            />
        </div>
    );
}
