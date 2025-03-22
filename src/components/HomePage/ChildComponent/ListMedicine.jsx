import React, { useEffect, useState } from 'react';
import SearchAndFilter from './SearchAndFilter';
import MedicineTable from './MedicineTable';
import { useDispatch } from 'react-redux';
import { toggleClicked } from '../../../Reducer/dashboardSlice';
import axios from 'axios';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

const HomeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/medicines');
        const fetchedData = response.data;
        const options = [...new Set(fetchedData.map(item => item.medicineGroup))];
        setFilterOptions(options);
      } catch (error) {
        console.error('Error fetching filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (value) => {
    setFilterOption(value);
  };

  const handleClickd = (value) => {
    dispatch(toggleClicked(value));
  };

  const isMediumOrLarger = useMediaQuery({ query: '(min-width: 500px)' });

  return (
    <>
      {isMediumOrLarger ? (
        <div style={{ backgroundColor, height:"89vh" , boxSizing:"border-box" , display: "grid", gridTemplateRows: "1fr 1fr 11fr", overflowY: "auto", overflowX: "hidden" }}>
          <header style={{ display: "flex", justifyContent: "space-between", padding: "20px", height: "fit-content" }}>
            <h1 style={{ paddingLeft: "20px", marginTop: "0", fontFamily: "cursive", color: textColor }}>
              Inventory List of Medicines (298)
            </h1>
            {user.role === 'mainAdmin' && (
              <Button
                style={{ width: "200px", height: "50px", color: "white", fontSize: "20px", borderRadius: "5px", marginBottom: "30px", border: "none", backgroundColor: "#1d242e" }}
                onClick={() => handleClickd(6)}
              >
                + Add new Items
              </Button>
            )}
          </header>
          <SearchAndFilter
            onSearchChange={handleSearchChange}
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
          />
          <MedicineTable searchTerm={searchTerm} filterOption={filterOption} />
        </div>
      ) : (
        <div style={{ backgroundColor, height:"89vh" , boxSizing:"border-box" , display: "grid", gridTemplateRows: "1fr 1fr 11fr", overflowY: "auto", overflowX: "hidden" }}>
        <header style={{ display: "flex", justifyContent: "space-between", padding: "20px", height: "fit-content" }} className='header'>
          <h1 style={{ paddingLeft: "20px", marginTop: "0", fontFamily: "cursive", color: textColor }}>
            Inventory List of Medicines (298)
          </h1>
          {user.role === 'mainAdmin' && (
            <Button
              style={{ width: "200px", height: "50px", color: "white", fontSize: "20px", borderRadius: "5px", marginBottom: "30px", border: "none", backgroundColor: "#1d242e" }}
              onClick={() => handleClickd(6)}
            >
              + <span className='addnewItems' >Add new Items </span>
            </Button>
          )}
        </header>
        <SearchAndFilter
          onSearchChange={handleSearchChange}
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
        />
        <MedicineTable searchTerm={searchTerm} filterOption={filterOption} />
      </div>
      )}
    </>
  );
};

export default HomeDashboard;
