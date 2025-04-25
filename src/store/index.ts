import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/job/jobSlice";
import uiReducer from "./slices/client/uiSlice";
import userReducer from "./slices/allUserSlice";
import myVacancyReducer from "./slices/myVacancySlice";
import organizationReducer from "./slices/organizationSlice";
import hrManaReducer from "./slices/hrManaSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    job: jobReducer,
    ui: uiReducer,
    user: userReducer,
    myVacancy: myVacancyReducer,
    organization: organizationReducer,
    hrManager: hrManaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
