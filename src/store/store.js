import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Reducer/userSlices';
import dashboardReducer from '../Reducer/dashboardSlice';
import medicineReducer from '../Reducer/MedicineSlice';
import settingsReducer from '../Reducer/settingSlice';
import Medicine from '../Reducer/medicineStatus'; // Ensure the correct import path
import Medicines from '../Reducer/medicine';
import slice from '../Reducer/slice';
const store = configureStore({
  reducer: {
    stat: Medicine, // 'stat' key must match the one in useSelector
    user: userReducer,
    dashboard: dashboardReducer,
    medicine: medicineReducer,
    settings: settingsReducer,
    medstype:Medicines,
    slice:slice,
  },
});

export default store;
