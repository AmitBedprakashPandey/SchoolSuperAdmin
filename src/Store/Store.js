import { configureStore } from "@reduxjs/toolkit";
import SchoolSlice from "./Slice/SchoolSlice";
import TeacherSlice from "./Slice/TeacherSlice";
import ClassSlice from "./Slice/ClassSlice";
import SectionSlice from "./Slice/SectionSlice";
import TemplateSlice from "./Slice/TemplateSlice";
import loginSlice from "./Slice/LoginSlice";
import AdminLoginSlice from "./Slice/AdminLoginSlice";

export const Store = configureStore({
  reducer: {
    School: SchoolSlice,
    Teacher: TeacherSlice,
    Class: ClassSlice,
    Section: SectionSlice,
    Templete: TemplateSlice,
    SchoolAuth: AdminLoginSlice,
  },
});
