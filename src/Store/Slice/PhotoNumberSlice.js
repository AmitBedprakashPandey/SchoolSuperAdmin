import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Config/Http";

const url = process.env.REACT_APP_API + "/photonumber";

// get all Photo Number
export const getPhotoNumberBySchoolId = createAsyncThunk(
  "PhotoNumber/all",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// create for Photo Number
export const createPhotoNumber = createAsyncThunk(
  "PhotoNumber/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// update for Photo Number
export const updatePhotoNumber = createAsyncThunk(
  "PhotoNumber/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${url}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const PhotoNumberSlice = createSlice({
  name: "PhotoNumber",
  initialState: {
    PhotoNumber: null,
    error: null,
    loading: false,
    message:false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotoNumberBySchoolId.pending, (state) => {
        state.loading = true;
        state.message = false;
        state.error = null;
      })
      .addCase(getPhotoNumberBySchoolId.fulfilled, (state, action) => {
        state.PhotoNumber = action.payload;
        state.error = null;
        state.loading = false;
        state.message = null
      })
      .addCase(getPhotoNumberBySchoolId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.message = false
      })
      .addCase(createPhotoNumber.pending, (state) => {
        state.loading = true;
        state.message = false;
        state.error = false;
      })
      .addCase(createPhotoNumber.fulfilled, (state, action) => {
        state.PhotoNumber = action.payload
        state.error = null;
        state.loading = false;
        state.message = "Create Successfull";
      })
      .addCase(updatePhotoNumber.pending, (state, action) => {
        state.loading = false;
        state.error = null;
        state.message = null
      })
      .addCase(updatePhotoNumber.fulfilled, (state, action) => {
        state.PhotoNumber = action.payload
        state.error = null;
        state.loading = false;
        state.message = "Update Successfull"
      })
      .addCase(updatePhotoNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default PhotoNumberSlice.reducer;
