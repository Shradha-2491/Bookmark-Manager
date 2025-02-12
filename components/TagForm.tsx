import { useState } from "react";
import { createTag } from "@/lib/api";

export default function TagForm({ onTagCreated }) {
    const [tagName, setTagName] = useState("");

    const handleCreateTag = async () => {
        if (!tagName.trim()) return;
        const newTag = await createTag(tagName);
        onTagCreated(newTag.data);
        setTagName("");
    };

    return (
        <div className="p-4 border rounded shadow-md">
            <input
                className="w-full border p-2 my-2"
                placeholder="Tag Name"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreateTag}>
                Add Tag
            </button>
        </div>
    );
}
