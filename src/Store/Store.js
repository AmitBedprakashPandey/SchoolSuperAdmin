import { configureStore } from "@reduxjs/toolkit";
import SchoolSlice from "./Slice/SchoolSlice";
import TeacherSlice from "./Slice/TeacherSlice";
import ClassSlice from "./Slice/ClassSlice";
import SectionSlice from "./Slice/SectionSlice";
import TemplateSlice from "./Slice/TemplateSlice";
import AdminLoginSlice from "./Slice/AdminLoginSlice";
import LoginSlice from "./Slice/LoginSlice";
import PhotoNumber from "./Slice/PhotoNumberSlice";
export const Store = configureStore({
  reducer: {
    School: SchoolSlice,
    Teacher: TeacherSlice,
    Class: ClassSlice,
    Section: SectionSlice,
    Templete: TemplateSlice,
    SchoolAuth: AdminLoginSlice,
    Login:LoginSlice,
    PhotoNumber : PhotoNumber
  },
});
