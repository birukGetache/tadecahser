import React, { useState, useEffect , useMemo } from 'react';
import { Button, Modal, Form, Input, DatePicker, Select, Table, InputNumber, Tabs , Button as Buttom  , Row , Col , Card}  from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { FaCartArrowDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import { Fotter } from '../styles/styleHome';
import { overflowX } from 'styled-system';
const { Option } = Select;
const { TabPane } = Tabs;


const Cosmo = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
      const [userCash, setUserCash] = useState("");
  const [searchText, setSearchText] = useState('');
  const [reciept,setReciept] = useState(false)
  const user = useSelector((state) => state.user);
  const [saleVisible, setSaleVisible] = useState(false);
  const [soldQuantity, setSoldQuantity] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [countCart , setCountCart] = useState(0);
  const [cartsItem , setCartItem] = useState([]);
  const [dataTransaction, setDataTransaction] = useState([]);
  const [transactionSearchText, setTransactionSearchText] = useState('');
  const [filteredTransactionData, setFilteredTransactionData] = useState(dataTransaction);
  const [analysisData, setAnalysisData] = useState([]);
  const [error , setError] = useState('')
   const [width, setWidth] = useState(600);
   const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
   
  const handleCashInputChange = (e) => {
    const value = e.target.value;
    // Validate input is numeric and non-negative
    if (!/^\d*\.?\d*$/.test(value)) {
      setError("Please enter a valid amount.");
      return;
    }

    setError(""); // Clear any error message
    setUserCash(value);
  };

    const total = useMemo(() => {
      return cartsItem.reduce((acc, item) => acc + item.totalPrice, 0);
    }, [cartsItem]);
  
    // Calculate balance
    const balance = parseFloat(userCash || 0) - total;
  

  useEffect(() => {
    fetchItems();
    fetchTransaction();
    call();
  
  }, []);
  const call = ()=>{
    if(isMobile){
      setWidth(300)
    }
  }
  const fetchTransaction = async () => {
    try {
      const response = await axios.get('https://backtade-2.onrender.com/salesTransaction');
      setDataTransaction(response.data);
      setFilteredTransactionData(response.data);
      calculateAnalysisData(response.data);
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  const handleSale = async () => {
    if (soldQuantity > selectedItem.quantity) {
      Modal.error({
        title: 'Error',
        content: 'Sold quantity exceeds available quantity!',
      });
      return;
    }

    const updatedItem = { ...selectedItem, quantity: selectedItem.quantity - soldQuantity };

    try {
      await axios.put(`https://backtade-2.onrender.com/Cosmo/${selectedItem._id}`, updatedItem);
      console.log("I finished");
      
      await axios.post('https://backtade-2.onrender.com/salesTransaction', {
        name: selectedItem.name,
        price: selectedItem.price,
        quantity: soldQuantity,
        pharamacist: user.username,
      });
      console.log("Post request successful:");
      
    
      fetchItems();
      fetchTransaction();
      setSaleVisible(false);
      setSoldQuantity(0);
      setCountCart(prev => prev + 1 );
      const tax = selectedItem.price * 0.15;
      setCartItem(prev => [
        ...prev, // Spread the existing items
        { name:selectedItem.name, price: selectedItem.price , quantity:soldQuantity , tax: tax, itemTax: '15%', totalPrice: selectedItem.price * tax  } // Append the new medicine
      ]);
      Modal.success({ content: 'Item sold successfully!' });
    
    } catch (error) {
      console.error('Error processing sale:', error);
    }
    
  };

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://backtade-2.onrender.com/Cosmo');
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleOpen = () => {
    setVisible(true);
    setEditMode(false);
    setCurrentItem(null);
  };

  const handleEdit = (item) => {
    setVisible(true);
    setEditMode(true);
    setCurrentItem(item);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const handleSubmit = async (values) => {
    const { name, type, expireDate, price, quantity } = values;
    const tax = price * 0.15;
    const totalPrice = price + tax;

    const newItem = {
      name,
      type,
      expireDate: expireDate.toISOString().split('T')[0], // Format the date
      price,
      tax,
      totalPrice,
      quantity,
    };

    try {
      if (editMode && currentItem) {
        await axios.put(`https://backtade-2.onrender.com/Cosmo/${currentItem._id}`, newItem);
      } else {
        await axios.post('https://backtade-2.onrender.com/Cosmo', newItem);
      }
      fetchItems();
      handleClose();
     
    } catch (error) {
      console.error(editMode ? 'Error updating item:' : 'Error adding item:', error);
    }
  };

  const handleDelete = (key) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`https://backtade-2.onrender.com/Cosmo/${key}`);
          fetchItems();
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    const filtered = data.filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.type.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredData(filtered);
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Expire Date', dataIndex: 'expireDate', key: 'expireDate' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Tax (15%)', dataIndex: 'tax', key: 'tax' },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="primary" style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button type="danger" onClick={() => handleDelete(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  const columnSale = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Expire Date', dataIndex: 'expireDate', key: 'expireDate' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Tax (15%)', dataIndex: 'tax', key: 'tax' },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <>
          <Button type="primary" style={{ marginRight: 8 }} onClick={() => { setSaleVisible(true); setSelectedItem(record); }}>
            Sale
          </Button>
        </>
      ),
    },
  ];

  const ColumnsTransaction = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Price', dataIndex: 'price', key: 'price' },
    { title: 'Pharmacist', dataIndex: 'pharamacist', key: 'pharamacist' },
    { title: 'Sold Time', dataIndex: 'createdAt', key: 'createdAt' },
  ];

  const handleTransactionSearch = (e) => {
    const value = e.target.value;
    setTransactionSearchText(value);

    if (!value) {
      setFilteredTransactionData(dataTransaction);
      return;
    }

    const filtered = dataTransaction.filter(transaction =>
      transaction.name.toLowerCase().includes(value.toLowerCase()) ||
      transaction.pharamacist.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredTransactionData(filtered);
  };

  const handleReset = async () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: async () => {
        try {
          await axios.delete(`https://backtade-2.onrender.com/CosmoTransactionDelte`);
          fetchItems();
        } catch (error) {
          console.error('Error deleting item:', error);
        }
      },
    });
  };
  const downloadReceipt = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(20);
    doc.text('Receipt For Taddesse pharamacy', 14, 16);
    doc.setFontSize(12);
    doc.setLineHeightFactor(1.5); // Set line height for better spacing
    
    // Set starting position for the content
    let startY = 30;
  
    cartsItem.forEach(item => {
      // Add item details
  
      doc.text(`Name:`, 14, startY);
      doc.text(item.name, 80, startY);
      startY += 10;
  
      doc.text(`Price:`, 14, startY);
      doc.text(`$${item.price.toFixed(2)}`, 80, startY);
      startY += 10;
  
      doc.text(`Quantity:`, 14, startY);
      doc.text(item.quantity.toString(), 80, startY);
      startY += 10;
  
   
  
      doc.text(`Tax:`, 14, startY);
      doc.text(`${(item.tax * 100).toFixed(2)}%`, 80, startY);
      startY += 10;
  
      doc.text(`Total Price:`, 14, startY);
      doc.text(`$${item.totalPrice.toFixed(2)}`, 80, startY);
      startY += 15; // Extra space between items
  
      // Draw line separator
      doc.line(14, startY, 196, startY); // Adjust the end point for the line
      startY += 5; // Extra space after line
    });
  
    // Save the PDF
    doc.save('receipt.pdf');
  };

  const calculateAnalysisData = (transactions) => {
    const analysisMap = {};

    transactions.forEach(transaction => {
      const { pharamacist, quantity, price } = transaction;
      if (!analysisMap[pharamacist]) {
        analysisMap[pharamacist] = { totalQuantity: 0, totalPrice: 0 };
      }
      analysisMap[pharamacist].totalQuantity += quantity;
      analysisMap[pharamacist].totalPrice += price * quantity;
    });

    const analysisArray = Object.entries(analysisMap).map(([pharamacist, data]) => ({
      pharamacist,
      totalQuantity: data.totalQuantity,
      totalPrice: data.totalPrice,
    }));

    setAnalysisData(analysisArray);
  };

  const analysisColumns = [
    { title: 'Pharmacist', dataIndex: 'pharamacist', key: 'pharamacist' },
    { title: 'Total Sold Quantity', dataIndex: 'totalQuantity', key: 'totalQuantity' },
    { title: 'Total Sold Price', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

  return (
    <div style={{ padding: "20px" , height:"89vh" , boxSizing:"border-box"}} className='cosmo' >
      <Tabs defaultActiveKey="1">
      
        <TabPane tab="Sales" key="2">
          <h3>Sales Data</h3>
          Filter the Cosmo
          <input type='text' style={{margin:"10px" ,marginLeft:"5px", display:"block"}} onChange={handleSearch}></input>
          <Table dataSource={filteredData} columns={columnSale} pagination={false} className='cosmo'/>
          <Fotter style={{marginLeft:"-100%"}}>Powered by Bernos © 2024 v 1.1.2</Fotter>
          <Modal
            title={`Sell ${selectedItem?.name}`}
            visible={saleVisible}
            onCancel={() => setSaleVisible(false)}
            footer={null}
          >
            <Form onFinish={handleSale}>
              <Form.Item label="Quantity Sold" required>
                <InputNumber
                  min={1}
                  max={selectedItem?.quantity}
                  value={soldQuantity}
                  onChange={setSoldQuantity}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Confirm Sale
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </TabPane>

     
   
    
      </Tabs>
      <div>
        <div style={{position:"absolute" , top:"10px" , right:"70px" ,display:"flex",justifyContent:"center", alignItems:"end" , cursor:"pointer" }} onClick={()=>setReciept(!reciept)}><FaCartArrowDown size={25} stlye={{padding:"0" , marginBottom:"-5px"}}></FaCartArrowDown> <div className='cartNumber' stlye={{padding:"0" , margin:"0", width:"40px" , height:"40px"}}>{countCart}</div></div>
          <div className={reciept==true ? "come": "go"} stlye={{position:"absolute" , backgroundColor:"#ccc" , overflowX:"hidden" }}>
            <span style={{position:"absolute" , top:"10px" , right:"10px" , color:"white" , fontSize:"25px" , cursor:"pointer"
            }} onClick={()=>setReciept(!reciept)}>&times;</span>
      <Buttom type="primary" onClick={downloadReceipt} style={{  padding: "10px",
  width: "fit-content",
  backgroundColor: "rgba(255, 255, 255, 0.1)", 
  backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.3), rgba(0,0,0,0.2))",
  backgroundSize: "cover",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",  // Safari support
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginTop: "10px",
  marginBottom:"20px",
  marginLeft:"10px" }}>
        Download Receipt
      </Buttom>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
        {cartsItem.map(item => (
       
            <div
                                style={{
                                  backgroundColor: "white",
                                  margin: "auto",
                                  padding: "10px",
                                  borderRadius: "10px",
                                  width: "90%",
                                  maxWidth: "400px",
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{item.name}</h3>
                                {[
                                  { label: "ID", value: item.id },
                                  { label: "Name", value: item.name },
                                  { label: "Price", value: `$${item.price.toFixed(2)}` },
                                  { label: "Quantity", value: item.quantity },
                                  { label: "Item Tax", value: item.itemTax },
                                  { label: "Tax", value: `${(item.tax * 100).toFixed(2)}%` },
                                  { label: "Total Price", value: `$${item.totalPrice.toFixed(2)}` },
                                ].map(({ label, value }) => (
                                  <p
                                    key={label}
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      flexWrap: "wrap",
                                      fontSize: "14px",
                                      margin: "6px 0",
                                      paddingBottom: "5px",
                                      borderBottom: "1px dashed #ddd",
                                    }}
                                  >
                                    <strong>{label}:</strong> <span>{value}</span>
                                  </p>
                                ))}
                              </div>
        ))}
      </div>
      <div style={{ 
      padding: "10px",
      width: "fit-content",
      backgroundColor: "rgba(255, 255, 255, 0.1)", 
      backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.3), rgba(0,0,0,0.2))",
      backgroundSize: "cover",
      backdropFilter: "blur(15px)",
      WebkitBackdropFilter: "blur(15px)",  // Safari support
      borderRadius: "10px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      marginTop:"10px",
      marginLeft:"10px"
    }}>
    
                           <p style={{color:"white"}}>Total: ${total.toFixed(2)}</p>
                           <div style={{ marginTop: "20px" ,color:"white"}}>
                               Balance:{" "}
                               <input
                                   type="text"
                                   value={userCash}
                                   onChange={handleCashInputChange}
                                   placeholder="Enter cash amount"
                                   style={{ width: "300px", marginBottom: "10px" }}
                               />
                           </div>
                           <p style={{color:"white"}}>Change: ${balance.toFixed(2)}</p>
               </div>

    </div>
             
          </div>
    </div>
  );
};

export default Cosmo;
