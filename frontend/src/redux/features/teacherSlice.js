import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  teachers: [],
  // Other teacher-related state
};

export const teacherSlice = createSlice({
  name: 'teacher',
  initialState,
  reducers: {
    addTeacher: (state, action) => {
      state.teachers.push(action.payload);
    },
    // Additional reducers
  },
});

// Export actions
export const { addTeacher } = teacherSlice.actions;

// Export reducer
export default teacherSlice.reducer;
