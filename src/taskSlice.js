import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: { items: [], filter: 'ALL' },
  reducers: {
    addTask: (state, action) => {
      state.items.push(action.payload);
    }
  }
});

export const { addTask } = taskSlice.actions;
export const selectAllTasks = (state) => state.tasks.items;
export const selectTaskCount = (state) => state.tasks.items.length;

export default taskSlice.reducer;