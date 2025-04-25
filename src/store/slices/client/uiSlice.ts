import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabType = "vacancies" | "applied" | "saved";

interface UIState {
  [x: string]: any;
  selectedTab: TabType;
}

const initialState: UIState = {
  selectedTab: "vacancies",
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedTab(state, action: PayloadAction<TabType>) {
      state.selectedTab = action.payload;
    },
  },
});

export const { setSelectedTab } = uiSlice.actions;
export default uiSlice.reducer;
