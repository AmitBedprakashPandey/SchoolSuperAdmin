import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Config/Http";

const url = process.env.REACT_APP_API + "/template";

// get all template
export const AllTemplate = createAsyncThunk(
  "Template/all",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// create for template
export const CreateTemplate = createAsyncThunk(
  "Template/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${url}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// update for template
export const UpdateTemplate = createAsyncThunk(
  "Template/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${url}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const TemplateSlice = createSlice({
  name: "Template",
  initialState: {
    Templates: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AllTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllTemplate.fulfilled, (state, action) => {
        state.Templates = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(AllTemplate.rejected, (state, action) => {
        state.loading = false;
        state.Templates = [];
        state.error = action.payload;
      })

      .addCase(CreateTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateTemplate.fulfilled, (state, action) => {
        state.Templates.push(action.payload.data);
        state.error = null;
        state.loading = false;
      })
      .addCase(UpdateTemplate.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateTemplate.fulfilled, (state, action) => {
        const index = state.Templates.findIndex(
          (icard) => icard._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Templates[index] = action.payload.data;
        }
        state.error = null;
        state.loading = false;
      })
      .addCase(UpdateTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default TemplateSlice.reducer;
