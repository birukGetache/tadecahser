// src/slices/settingsSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displaySettings: {
    theme: 'light',
    fontSize: 'medium',
  },
  notificationSettings: {
    email: true,
    sms: false,
  },
  privacySettings: {
    profileVisibility: 'public',
  },
  accountSettings: {
    email: '',
    password: '',
  },
  generalPreferences: {
    language: 'English',
    timeZone: 'GMT',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateDisplaySettings: (state, action) => {
      state.displaySettings = { ...state.displaySettings, ...action.payload };
    },
    updateNotificationSettings: (state, action) => {
      state.notificationSettings = { ...state.notificationSettings, ...action.payload };
    },
    updatePrivacySettings: (state, action) => {
      state.privacySettings = { ...state.privacySettings, ...action.payload };
    },
    updateAccountSettings: (state, action) => {
      state.accountSettings = { ...state.accountSettings, ...action.payload };
    },
    updateGeneralPreferences: (state, action) => {
      state.generalPreferences = { ...state.generalPreferences, ...action.payload };
    },
  },
});

export const {
  updateDisplaySettings,
  updateNotificationSettings,
  updatePrivacySettings,
  updateAccountSettings,
  updateGeneralPreferences,
} = settingsSlice.actions;

export default settingsSlice.reducer;
