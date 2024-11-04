import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Config/Http";

const url = process.env.REACT_APP_API + "/admitcardtemplate";

// get all Admit Card
export const getAdmitCardTemplateBySchoolId = createAsyncThunk(
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

// create for Admit Card
export const CreateAdmitCardTemplate = createAsyncThunk(
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
// update for Admit Card
export const UpdateAdmitCardTemplate = createAsyncThunk(
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

export const AdmitCardTemplateSlice = createSlice({
  name: "Template",
  initialState: {
    Templates: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmitCardTemplateBySchoolId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAdmitCardTemplateBySchoolId.fulfilled, (state, action) => {
        state.Templates = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAdmitCardTemplateBySchoolId.rejected, (state, action) => {
        state.loading = false;
        state.Templates = [];
        state.error = action.payload;
      })

      .addCase(CreateAdmitCardTemplate.pending, (state) => {
        state.loading = true;
      })
      .addCase(CreateAdmitCardTemplate.fulfilled, (state, action) => {
        state.Templates.push(action.payload.data);
        state.error = null;
        state.loading = false;
      })
      .addCase(UpdateAdmitCardTemplate.pending, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(UpdateAdmitCardTemplate.fulfilled, (state, action) => {
        const index = state.Templates.findIndex(
          (icard) => icard._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Templates[index] = action.payload.data;
        }
        state.error = null;
        state.loading = false;
      })
      .addCase(UpdateAdmitCardTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default AdmitCardTemplateSlice.reducer;
