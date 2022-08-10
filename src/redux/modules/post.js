import { createSlice, createAsyncThunk, isRejected } from "@reduxjs/toolkit";
import axios from "axios";

const url_params = process.env.REACT_APP_url;
const initialState = {
  loading: false,
  posts: [],
  error: "",
};

export const fetchPosts = createAsyncThunk(
  "post/fetchPost",
  async (thunkApi) => {
    try {
      const res = await axios.get(`${url_params}/gaebalog`);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addPost = createAsyncThunk("post/addPost", async (logData) => {
  try {
    const response = await axios.post(`${url_params}/gaebalog`, logData);
    return response.data;
  } catch (error) {
    return error.message;
  }
});

export const deletePost = createAsyncThunk(
  "delete/deletePost",
  async (postId) => {
    try {
      const response = await axios.delete(`${url_params}/gaebalog/${postId}`);
      return postId;
    } catch (error) {
      return error.message;
    }
  }
);

export const updatePost = createAsyncThunk(
  "put/updatePost",
  async ({ logData, postId }) => {
    try {
      const response = await axios.put(
        `${url_params}/gaebalog/${postId}`,
        logData
      );
      return { postId, logData };
    } catch (error) {
      return error.message;
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //!보여주기
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
      state.error = "";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
    //!가져오기
    builder.addCase(addPost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addPost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = [...state.posts, action.payload];
      state.error = "";
    });
    builder.addCase(addPost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
    //!삭제하기
    builder.addCase(deletePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter((post) => post.id != action.payload);
      state.error = "";
    });
    builder.addCase(deletePost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
    //!수정하기
    builder.addCase(updatePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postId) {
          return action.payload.logData;
        } else {
          return post;
        }
      });
      state.error = "";
    });
    builder.addCase(updatePost.rejected, (state, action) => {
      state.loading = false;
      state.posts = [];
      state.error = action.error.message;
    });
  },
});

export { postSlice };
export const postReducer = postSlice.reducer;
