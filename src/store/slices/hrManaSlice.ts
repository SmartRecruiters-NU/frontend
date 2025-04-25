import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HR {
  id: string;
  name: string;
  email: string;
}

interface HRState {
  hrs: HR[];
}

const initialState: HRState = {
  hrs: [],
};

const hrManaSlice = createSlice({
  name: "hr",
  initialState,
  reducers: {
    addHR(state, action: PayloadAction<HR>) {
      state.hrs.push(action.payload);
    },
    updateHR(state, action: PayloadAction<HR>) {
      const index = state.hrs.findIndex((h) => h.id === action.payload.id);
      if (index !== -1) {
        state.hrs[index] = action.payload;
      }
    },
    deleteHR(state, action: PayloadAction<string>) {
      state.hrs = state.hrs.filter((h) => h.id !== action.payload);
    },
    setHRs(state, action: PayloadAction<HR[]>) {
      state.hrs = action.payload;
    },
  },
});

export const { addHR, updateHR, deleteHR, setHRs } = hrManaSlice.actions;
export default hrManaSlice.reducer;
