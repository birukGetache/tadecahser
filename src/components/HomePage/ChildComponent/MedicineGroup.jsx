import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import MadicineGroupName from './MadicineGroupName';
import { Header, TextWithDownload, P, S } from './HomeDashboard';

const MedicineGroup = () => {
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  return (
    <div style={{ backgroundColor, height:"89vh" , boxSizing:"border-box", display: "grid" }} className='height'>
      <Header>
        <TextWithDownload>
          <div>
            <P style={{color:textColor}}>Inventory List of Medicines (298)</P>
            <S style={{color:textColor}}>List of medicines available for sales.</S>
          </div>
        </TextWithDownload>
        <MadicineGroupName />
      </Header>
    </div>
  );
};

export default MedicineGroup;
