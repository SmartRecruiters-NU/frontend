import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MyVacancy {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  applicants: string[];
  createdBy: string; // Добавляем createdBy
}

interface MyVacancyState {
  myVacancies: MyVacancy[];
}

const initialState: MyVacancyState = {
  myVacancies: [],
};

const myVacancySlice = createSlice({
  name: "myVacancy",
  initialState,
  reducers: {
    setMyVacancies(state, action: PayloadAction<MyVacancy[]>) {
      state.myVacancies = action.payload;
    },
    addMyVacancy(state, action: PayloadAction<MyVacancy>) {
      state.myVacancies.push(action.payload);
    },
    deleteMyVacancy(state, action: PayloadAction<string>) {
      state.myVacancies = state.myVacancies.filter(
        (vac) => vac.id !== action.payload
      );
    },
  },
});

export const { setMyVacancies, addMyVacancy, deleteMyVacancy } =
  myVacancySlice.actions;
export default myVacancySlice.reducer;
