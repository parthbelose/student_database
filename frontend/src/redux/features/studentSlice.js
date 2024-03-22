import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  students: [],
  // Other student-related state
};

export const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    // Additional reducers
  },
});

// Export actions
export const { addStudent } = studentSlice.actions;

// Export reducer
export default studentSlice.reducer;
