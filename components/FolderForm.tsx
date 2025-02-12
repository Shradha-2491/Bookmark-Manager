import { useState } from "react";
import { createFolder } from "@/lib/api";
import { useAuth } from "@clerk/nextjs";

export default function FolderForm({ onFolderCreated }) {
    const [folderName, setFolderName] = useState("");
    const { userId } = useAuth();

    const handleCreateFolder = async () => {
        if (!folderName.trim()) return;
        const newFolder = await createFolder(folderName, userId);
        onFolderCreated(newFolder.data);
        setFolderName("");
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <input
                className="w-full border p-2 my-2"
                placeholder="Folder Name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreateFolder}>
                Add Folder
            </button>
        </div>
    );
}
