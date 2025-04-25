import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  status: string;
  createdBy?: string | undefined;
  savedBy?: string[] | undefined;
  appliedBy?: string[] | undefined;
}
export interface MyVacancies extends Job {
  applicants: string[];
}

interface JobState {
  items: any;
  jobs: Job[];
  selectedJob: Job | null;
}

const initialState: JobState = {
  jobs: [],
  selectedJob: null,
  items: undefined,
};

export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
    selectJob: (state, action: PayloadAction<string>) => {
      state.selectedJob =
        state.jobs.find((j) => j.id === action.payload) || null;
    },
  },
});

export const { setJobs, selectJob } = jobSlice.actions;
export default jobSlice.reducer;
