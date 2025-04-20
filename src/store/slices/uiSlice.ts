import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedRole: string;
}

const initialState: UIState = {
  selectedRole: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<string>) {
      state.selectedRole = action.payload;
    },
  },
});

export const { setRole } = uiSlice.actions;
export default uiSlice.reducer;
