import { configureStore } from "@reduxjs/toolkit";
import SchoolSlice from "./Slice/SchoolSlice";
import TeacherSlice from "./Slice/TeacherSlice";
import ClassSlice from "./Slice/ClassSlice";
import SectionSlice from "./Slice/SectionSlice";

export const Store = configureStore({
  reducer: {
    School: SchoolSlice,
    Teacher: TeacherSlice,
    Class: ClassSlice,
    Section: SectionSlice,
  },
});
