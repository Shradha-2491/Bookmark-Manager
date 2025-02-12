import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

const headers = {
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
};

export const getBookmarks = async (userId:string) => {
  try {
    const res = await axios.get(`${API_URL}/bookmarks?filters[user][$eq]=${userId}&populate=tags&populate=bookmark_folder`, { headers });
    console.log(res.data)
    return res.data;
  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    throw new Error("Failed to fetch bookmarks");
  }
};

export const createBookmark = async (data: any) => {
  try {
    const res = await axios.post(`${API_URL}/bookmarks`, { data }, { headers });
    return res.data;
  } catch (error) {
    console.error("Error creating bookmark:", error);
    throw new Error("Failed to create bookmark");
  }
};

export const deleteBookmark = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/bookmarks/${id}`, { headers });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw new Error("Failed to delete bookmark");
  }
};

export const updateBookmark = async (id: number, data:any ) => {
  try {
    await axios.put(`${API_URL}/bookmarks/${id}`, { data }, { headers });
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw new Error("Failed to delete bookmark");
  }
};


export const getFolders = async () => {
  try {
    const res = await axios.get(`${API_URL}/bookmark-folders`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error fetching folders:", error);
    return null;
  }
};

export const createFolder = async (name: string, userId: any) => {
  try {
    const res = await axios.post(
      `${API_URL}/bookmark-folders`,
      { data: { name, user: userId } },
      { headers }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating folder:", error);
    return null;
  }
};

/** Fetch all tags */
export const getTags = async () => {
  try {
    const res = await axios.get(`${API_URL}/tags`, { headers });
    return res.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return null;
  }
};

export const createTag = async (name: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/tags`,
      { data: { name } },
      { headers }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating tag:", error);
    return null;
  }
};
