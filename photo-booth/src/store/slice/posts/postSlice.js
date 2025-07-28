import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    notifications: [],
    caption: "",
    collaborators: [],
    accessibility: {
      altText: "",
      audioDescription: "",
    },
    likeState: {
      isLiked: false,
      likes: [],
    },
  },
  reducers: {
    setCaption: (state, action) => {
      state.caption = action.payload;
    },
    addCollaborator: (state, action) => {
      state.collaborators.push(action.payload);
    },
    removeCollaborator: (state, action) => {
      state.collaborators = state.collaborators.filter(
        (collab) => collab.id !== action.payload.id
      );
    },
    setAccessibility: (state, action) => {
      state.accessibility = { ...state.accessibility, ...action.payload };
    },
    setPosts: (state, action) => {
      state.posts = [...state.posts, ...action.payload];
    },
    appendPosts: (state, action) => {
      const newPost = action.payload;
      const existingIds = new Set(state.posts.map((post) => post._id));
      const filteredNewPosts = newPost.filter(
        (post) => !existingIds.has(post._id)
      );
      state.posts = [...state.posts, ...filteredNewPosts];
    },
    clearPosts: (state) => {
      state.posts = [];
    },
    removePost: (state, action) => {
      const filteredPosts = state.posts.filter(
        (post) => post._id !== action.payload
      );
      state.posts = filteredPosts;
    },
    setNotifications: (state, action) => {
      const myId = action.payload.myId;
      const myNotifications = action.payload.data.filter(
        (notification) => notification.userId === myId
      );

      state.notifications = myNotifications;
    },
  },
});

export const {
  setFile,
  setPosts,
  appendPosts,
  clearPosts,
  removePost,
  setCaption,
  addCollaborator,
  removeCollaborator,
  setAccessibility,
  setNotifications
} = postSlice.actions;

export default postSlice.reducer;
