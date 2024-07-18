import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Config/Http";

const url = process.env.REACT_APP_API + "/class";

export const AllClassBySchoolStatus = createAsyncThunk(
  "Class/allSchoolStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/${id}/${true}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ClassSlice = createSlice({
  name: "Class",
  initialState: {
    Classs: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllClassBySchoolStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllClassBySchoolStatus.fulfilled, (state, action) => {
        state.Classs = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(AllClassBySchoolStatus.rejected, (state, action) => {
        state.loading = false;
        state.Classs = [];
        state.error = action.payload;
      });
  },
});

export default ClassSlice.reducer;
