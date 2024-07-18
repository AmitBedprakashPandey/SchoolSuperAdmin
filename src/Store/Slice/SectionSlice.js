import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Config/Http";

const url = process.env.REACT_APP_API + "/section";

export const AllSectionBySchoolStatus = createAsyncThunk(
  "Section/allBySchoolStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/${id}/${true}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const SectionSlice = createSlice({
  name: "Section",
  initialState: {
    Sections: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(AllSectionBySchoolStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllSectionBySchoolStatus.fulfilled, (state, action) => {
        state.Sections = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(AllSectionBySchoolStatus.rejected, (state, action) => {
        state.loading = false;
        state.Sections = [];
        state.error = action.payload;
      });
  },
});

export default SectionSlice.reducer;
