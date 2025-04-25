import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Organization {
  id: string;
  name: string;
  city: string;
  email: string;
}

interface OrgState {
  organizations: Organization[];
}

const initialState: OrgState = {
  organizations: [],
};

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {
    addOrganization(state, action: PayloadAction<Organization>) {
      state.organizations.push(action.payload);
    },
    updateOrganization(state, action: PayloadAction<Organization>) {
      const index = state.organizations.findIndex(
        (o) => o.id === action.payload.id
      );
      if (index !== -1) {
        state.organizations[index] = action.payload;
      }
    },
    deleteOrganization(state, action: PayloadAction<string>) {
      state.organizations = state.organizations.filter(
        (o) => o.id !== action.payload
      );
    },
    setOrganizations(state, action: PayloadAction<Organization[]>) {
      state.organizations = action.payload;
    },
  },
});

export const {
  addOrganization,
  updateOrganization,
  deleteOrganization,
  setOrganizations,
} = organizationSlice.actions;

export default organizationSlice.reducer;
