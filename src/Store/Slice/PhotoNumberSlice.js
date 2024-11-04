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

export const AdmitCardTemplateSlice = createSlice({
  name: "PhotoNumber",
  initialState: {
    Templates: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPhotoNumberBySchoolId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPhotoNumberBySchoolId.fulfilled, (state, action) => {
        state.Templates = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getPhotoNumberBySchoolId.rejected, (state, action) => {
        state.loading = false;
        state.Templates = [];
        state.error = action.payload;
      })

      .addCase(createPhotoNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPhotoNumber.fulfilled, (state, action) => {
        state.Templates.push(action.payload.data);
        state.error = null;
        state.loading = false;
      })
      .addCase(updatePhotoNumber.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePhotoNumber.fulfilled, (state, action) => {
        const index = state.Templates.findIndex(
          (icard) => icard._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Templates[index] = action.payload.data;
        }
        state.error = null;
        state.loading = false;
      })
      .addCase(updatePhotoNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdmitCardTemplateSlice.reducer;
