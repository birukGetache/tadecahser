import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toggleClicked } from '../../../Reducer/dashboardSlice';
import { setSelectedGroupId } from '../../../Reducer/slice';
import { Input, Table, Button } from 'antd';

const { Search } = Input;

const MedicineGroupName = () => {
  const [medicineGroups, setMedicineGroups] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMedicineData = async () => {
      try {
        const response = await axios.get('https://backtade-2.onrender.com/medicines');
        const medicines = response.data;
        const groups = medicines.reduce((acc, medicine) => {
          if (!acc.includes(medicine.medicineGroup)) {
            acc.push(medicine.medicineGroup);
          }
          return acc;
        }, []);
        setMedicineGroups(groups);
      } catch (error) {
        console.error('Error fetching medicine data:', error);
      }
    };

    fetchMedicineData();
  }, []);

  // Filtered medicine groups based on search term
  const filteredGroups = medicineGroups.filter(group =>
    group.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Define columns for Ant Design Table
  const columns = [
    {
      title: 'Medicine Groups',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => {
            const groupId = record.group;
            dispatch(setSelectedGroupId(groupId));
            dispatch(toggleClicked(65));
          }}
        >
          View Details
        </Button>
      ),
    },
  ];

  // Prepare data for the table
  const data = filteredGroups.map(group => ({ key: group, group }));

  return (
    <div style={{ padding: '20px', height: "65vh", overflowY: "auto" }}>
      <Search
        placeholder="Search Medicine Groups"
        onSearch={value => setSearchTerm(value)} // Set search term on search
        onChange={e => setSearchTerm(e.target.value)} // Update search term on every keystroke
        style={{ marginBottom: '20px' }}
      />
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowClassName={(record, index) => index % 2 === 0 ? 'even-row' : 'odd-row'}
        onRow={(record) => ({
          onMouseEnter: e => e.currentTarget.style.transform = 'scale(1.02)',
          onMouseLeave: e => e.currentTarget.style.transform = 'scale(1)',
        })}
      />
    </div>
  );
};

export default MedicineGroupName;
