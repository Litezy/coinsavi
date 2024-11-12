import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {},
  notifications: [], 
  forms:{}
};

export const globalStates = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    dispatchProfile: (state, action) => {
      state.profile = action.payload;
    },
    dispatchForms: (state, action) => {
      state.forms = action.payload;
    },
    updateForms: (state, action) => {
      const { name, value } = action.payload;
      state.forms[name] = value;
    },
    dispatchNotifications: (state, action) => {
      state.notifications = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { dispatchProfile,dispatchForms, dispatchNotifications,updateForms  } = globalStates.actions;

export default globalStates.reducer;
// addNotification: (state, action) => {
//     state.notifications.push(action.payload);
//   },
//   removeNotification: (state, action) => {
//     state.notifications = state.notifications.filter(notification => notification.id !== action.payload);
//   },
//   markNotificationAsRead: (state, action) => {
//     const notification = state.notifications.find(notification => notification.id === action.payload);
//     if (notification) {
//       notification.status = 'read';
//     }
//   },