import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateDisplaySettings,
  updateNotificationSettings,
  updatePrivacySettings,
  updateAccountSettings,
  updateGeneralPreferences,
} from '../../../Reducer/settingSlice';

const Settings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  // Determine colors based on the selected theme
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#f9f9f9';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50'; // Label color to match theme

  // Function to generate a lighter or darker shade for the section background
  const adjustColor = (color, amount) => {
    let colorValue = parseInt(color.slice(1), 16); // Convert hex to RGB
    let r = (colorValue >> 16) + amount;
    let g = ((colorValue >> 8) & 0x00FF) + amount;
    let b = (colorValue & 0x0000FF) + amount;
    
    // Ensure values are within 0-255
    r = Math.min(255, Math.max(0, r));
    g = Math.min(255, Math.max(0, g));
    b = Math.min(255, Math.max(0, b));
    
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
  };

  const sectionBackgroundColor = adjustColor(backgroundColor, 20); // Lighten the background color

  // Dynamic styling based on settings
  const containerStyle = {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: backgroundColor,
    color: textColor,
    height: '85vh',
    overflowY: 'auto',
    fontSize: settings.displaySettings.fontSize === 'small' ? '12px' : 
             settings.displaySettings.fontSize === 'medium' ? '16px' : '20px'
  };

  const handleDisplayChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateDisplaySettings({ [name]: value }));
  };

  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    dispatch(updateNotificationSettings({ [name]: checked }));
  };

  const handlePrivacyChange = (e) => {
    dispatch(updatePrivacySettings({ profileVisibility: e.target.value }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateAccountSettings({ [name]: value }));
  };

  const handleGeneralPreferencesChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateGeneralPreferences({ [name]: value }));
  };

  return (
    <div style={{containerStyle  , height:"89vh" , boxSizing:"border-box" , overflowX:"auto"}}>
      <h1 style={{ color: 'inherit' }}>Settings</h1>

      {/* Display Settings Section */}
      <section style={{ marginBottom: '20px', padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', backgroundColor: sectionBackgroundColor }}>
        <h2 style={{ color: '#3498db' }}>Display Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ color: labelColor }}>
            Theme:
            <select name="theme" value={settings.displaySettings.theme} onChange={handleDisplayChange} style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: `1px solid ${selectBorderColor}` }}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <label style={{ color: labelColor }}>
            Font Size:
            <select name="fontSize" value={settings.displaySettings.fontSize} onChange={handleDisplayChange} style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: `1px solid ${selectBorderColor}` }}>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
      </section>

      {/* Notification Settings Section */}
      <section style={{ marginBottom: '20px', padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', backgroundColor: sectionBackgroundColor }}>
        <h2 style={{ color: '#3498db' }}>Notification Settings</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <label style={{ color: labelColor }}>
            Email Notifications:
            <input
              type="checkbox"
              name="email"
              checked={settings.notificationSettings.email}
              onChange={handleNotificationChange}
              style={{ marginLeft: '10px' }}
            />
          </label>
          <label style={{ color: labelColor }}>
            SMS Notifications:
            <input
              type="checkbox"
              name="sms"
              checked={settings.notificationSettings.sms}
              onChange={handleNotificationChange}
              style={{ marginLeft: '10px' }}
            />
          </label>
        </div>
      </section>

      {/* Privacy Settings Section */}
      <section style={{ marginBottom: '20px', padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', backgroundColor: sectionBackgroundColor }}>
        <h2 style={{ color: '#3498db' }}>Privacy Settings</h2>
        <label style={{ color: labelColor }}>
          Profile Visibility:
          <select value={settings.privacySettings.profileVisibility} onChange={handlePrivacyChange} style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: `1px solid ${selectBorderColor}` }}>
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </label>
      </section>

      {/* Account Settings Section */}
      <section style={{ marginBottom: '20px', padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', backgroundColor: sectionBackgroundColor }}>
        <h2 style={{ color: '#3498db' }}>Account Settings</h2>
        <label style={{ color: labelColor }}>
          Email:
          <input
            type="email"
            name="email"
            value={settings.accountSettings.email}
            onChange={handleAccountChange}
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: `1px solid ${selectBorderColor}` }}
          />
        </label>
        <label style={{ color: labelColor }}>
          Password:
          <input
            type="password"
            name="password"
            value={settings.accountSettings.password}
            onChange={handleAccountChange}
            style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: `1px solid ${selectBorderColor}` }}
          />
        </label>
      </section>

      {/* General Preferences Section */}
      <section style={{ marginBottom: '20px', padding: '20px', border: `1px solid ${borderColor}`, borderRadius: '8px', backgroundColor: sectionBackgroundColor }}>
        <h2 style={{ color: '#3498db' }}>General Preferences</h2>
        <label style={{ color: labelColor }}>
          Language:
          <select name="language" value={settings.generalPreferences.language} onChange={handleGeneralPreferencesChange} style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: `1px solid ${selectBorderColor}` }}>
            <option value="English">English</option>
            <option value="Spanish">ahmaric</option>
            <option value="French">French</option>
          </select>
        </label>
        <label style={{ color: labelColor }}>
          Time Zone:
          <select name="timeZone" value={settings.generalPreferences.timeZone} onChange={handleGeneralPreferencesChange} style={{ marginLeft: '10px', padding: '5px', borderRadius: '4px', border: `1px solid ${selectBorderColor}` }}>
            <option value="GMT">GMT</option>
            <option value="PST">PST</option>
            <option value="EST">EST</option>
          </select>
        </label>
      </section>

      <button 
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#3498db', 
          color: '#fff', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '16px'
        }}
        onClick={() => alert('Settings saved!')} // Add functionality as needed
      >
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
