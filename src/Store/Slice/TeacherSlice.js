import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../Config/Http";


const url = process.env.REACT_APP_API + "/teacher";

// get all teacher by schoolid
export const getAllTeacherBySchool = createAsyncThunk(
  "Teacher/BySchoolall",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/byschool/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// get teacher by id
export const getByIdTeacher = createAsyncThunk(
  "Teacher/BySchoolall",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${url}/${id}`);
      localStorage.setItem("schoolid", res.data.school);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// create teacher
export const createTeacher = createAsyncThunk(
  "Teacher/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(url, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// update teacher
export const updateTeacher = createAsyncThunk(
  "Teacher/update",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${url}/${data._id}/${data.schoolid}`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Teacher = createSlice({
  name: "Teacher",
  initialState: {
    Teacher: [],
    error: null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTeacherBySchool.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllTeacherBySchool.fulfilled, (state, action) => {
        state.Teacher = action.payload;
        state.error = null;
        state.loading = false;
      })
      .addCase(getAllTeacherBySchool.rejected, (state, action) => {
        state.loading = false;
        state.Teacher = [];
        state.error = action.payload;
      })
      .addCase(createTeacher.pending, (state) => {
        state.loading = false;
      })
      .addCase(createTeacher.fulfilled, (state, action) => {
        state.error = null;
        state.Teacher.push(action.payload?.data);
        state.loading = false;
      })
      .addCase(createTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTeacher.pending, (state) => {
        state.loading = false;
      })
      .addCase(updateTeacher.fulfilled, (state, action) => {
        const index = state.Teacher.findIndex(
          (Teacher) => Teacher._id === action.payload.data._id
        );
        if (index !== -1) {
          state.Teacher[index] = action.payload.data;
        }
        state.error = null;
        state.loading = false;
      })
      .addCase(updateTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default Teacher.reducer;
