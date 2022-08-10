import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url_params = process.env.REACT_APP_url;
const initialState = {
  loading: false,
  comments: [],
  error: "",
};

const fetchComments = createAsyncThunk(
  "post/fetchComments",
  async (thunkApi) => {
    try {
      const res = await axios.get(`${url_params}/comments`);
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const addComment = createAsyncThunk(
  "post/addComment",
  async (logData) => {
    try {
      const response = await axios.post(`${url_params}/comments`, logData);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const deleteComment = createAsyncThunk(
  "delete/deleteComment",
  async (commentId) => {
    try {
      const response = await axios.delete(
        `${url_params}/comments/${commentId}`
      );
      return commentId;
    } catch (error) {
      return error.message;
    }
  }
);

export const updateComment = createAsyncThunk(
  "put/updateComment",

  async ({ commentData, commentId }) => {
    try {
      const response = await axios.put(
        `${url_params}/comments/${commentId}`,
        commentData
      );
      return { commentId, commentData };
    } catch (error) {
      return error.message;
    }
  }
);

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //!보여주기
    builder.addCase(fetchComments.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
      state.error = "";
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.loading = false;
      state.comments = [];
      state.error = action.error.message;
    });
    //!가져오기
    builder.addCase(addComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = [...state.comments, action.payload];
      state.error = "";
    });
    builder.addCase(addComment.rejected, (state, action) => {
      state.loading = false;
      state.comments = [];
      state.error = action.error.message;
    });
    //!삭제하기
    builder.addCase(deleteComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = state.comments.filter(
        (comment) => comment.id != action.payload
      );
      state.error = "";
    });
    builder.addCase(deleteComment.rejected, (state, action) => {
      state.loading = false;
      state.comments = [];
      state.error = action.error.message;
    });
    //!수정하기
    builder.addCase(updateComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return action.payload.commentData;
        } else {
          return comment;
        }
      });
      state.error = "";
    });
    builder.addCase(updateComment.rejected, (state, action) => {
      state.loading = false;
      state.comments = [];
      state.error = action.error.message;
    });
  },
});

export { fetchComments };
