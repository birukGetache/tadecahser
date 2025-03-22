import React, { useEffect, useState , useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { updateQuantity } from '../../Reducer/MedicineSlice';
import Barcode from 'react-barcode';
import { Tabs, Layout, Button, Card, Form, Input, Select, Alert ,  Col, Row , Button as Buttom } from 'antd';
import { InfoCircleOutlined, HistoryOutlined, DollarOutlined  } from '@ant-design/icons';
import { FaCartArrowDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const { TabPane } = Tabs;
const { Content } = Layout;
const { Option } = Select;
const MedicineInventory = () => {
    const [error, setError] = useState("");
    const [userCash, setUserCash] = useState("");
  const dispatch = useDispatch();
  const medicine = useSelector((state) => state.medicine.selectedMedicine);
  const settings = useSelector((state) => state.settings);
  const user = useSelector((state) => state.user);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [countCart , setCountCart] = useState(0);
  const [Method, setMethod] = useState('Cash');
  const [history, setHistory] = useState([]);
  const [soldQuantity, setSoldQuantity] = useState(0);
  const [price, setPrice] = useState(medicine?.price || 0);
  const [soldInOption, setSoldInOption] = useState(medicine?.soldIn || 'pk');
  const [totalSales, setTotalSales] = useState(0);
  const [cartsItem , setCartItem] = useState([]);
  const [pharmacistFilter, setPharmacistFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const TAX_RATE = 0.02; // 2%

  const handleCashInputChange = (e) => {
    const value = e.target.value;
alert(value)
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


  const calculateDisplayedQuantity = () => {
    if (!medicine) return 0;
    if (soldInOption === 'pk' && medicine.soldIn === 'pk') {
      return medicine.quantity;
    } else if (soldInOption === 'strip' && medicine.soldIn === 'strip') {
      return medicine.quantity * medicine.stripPerPk;
    } else if (soldInOption === 'tablet' && medicine.soldIn === 'tablet') {
      return medicine.quantity * (medicine.stripPerPk * medicine.tabletsPerStrip);
    } else if (soldInOption === 'strip' && medicine.soldIn === 'tablet') {
      return medicine.quantity * medicine.stripPerPk;
    }
    return 0;
  };

  const handleMethod = (value) => {
    setMethod(value);
  };

  const handleSoldInChange = (value) => {
    setSoldInOption(value);
    
    // Adjust price based on soldIn option
    if (value === 'pk' && medicine.soldIn === 'strip') {
      const pkPrice = medicine.stripPerPk * medicine.price;
      setPrice(pkPrice * (1 + TAX_RATE)); // Adding tax
    } else if (value === 'strip' && medicine.soldIn === 'strip') {
      setPrice(medicine.price * (1 + TAX_RATE)); // Adding tax
    } else if (value === 'strip' && medicine.soldIn === 'tablet') {
      const stripPrice = medicine.price * medicine.tabletsPerStrip;
      setPrice(stripPrice * (1 + TAX_RATE)); // Adding tax
    } else if (value === 'tablet' && medicine.soldIn === 'tablet') {
      setPrice(medicine.price * (1 + TAX_RATE)); // Adding tax
    } else if (value === 'pk' && medicine.soldIn === 'tablet') {
      const pkPrice = medicine.price * medicine.tabletsPerStrip * medicine.stripPerPk;
      setPrice(pkPrice * (1 + TAX_RATE)); // Adding tax
    }
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
      doc.text(`ID:`, 14, startY);
      doc.text(item.id, 80, startY);
      startY += 10;
  
      doc.text(`Name:`, 14, startY);
      doc.text(item.name, 80, startY);
      startY += 10;
  
      doc.text(`Price:`, 14, startY);
      doc.text(`$${item.price.toFixed(2)}`, 80, startY);
      startY += 10;
  
      doc.text(`Quantity:`, 14, startY);
      doc.text(item.quantity.toString(), 80, startY);
      startY += 10;
  
      doc.text(`Sold In:`, 14, startY);
      doc.text(item.soldIn, 80, startY);
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
  
  

  const renderSoldInSelect = () => {
    return (
      <Select value={soldInOption} onChange={handleSoldInChange} style={{ textAlign: "center" }}>
        <Option value="pk">pk</Option>
        {medicine?.soldIn === 'strip' && <Option value="strip">Strip</Option>}
        {medicine?.soldIn === 'tablet' && (
          <>
            <Option value="strip">Strip</Option>
            <Option value="tablet">Tablet</Option>
          </>
        )}
      </Select>
    );
  };
  

  useEffect(() => {
    if (medicine) {
      const fetchHistory = async () => {
        try {
          const response = await axios.get(`https://backtade-2.onrender.com/transactions?medicineId=${medicine.medicineId}`);
          setHistory(response.data);
          const total = response.data.reduce((acc, item) => acc + item.totalAmount, 0);
          setTotalSales(total);
        } catch (error) {
          console.error('Error fetching transaction history:', error);
          alert('Error fetching transaction history');
        }
      };
      fetchHistory();
    }
  }, [medicine]);

  
  const handleSold = async () => {
    if (soldQuantity > 0) {
      let newQuantity;

      if (soldInOption === 'pk') {
        newQuantity = medicine.quantity - soldQuantity;
      } else if (soldInOption === 'strip') {
        newQuantity = medicine.quantity - soldQuantity / medicine.stripPerPk;
      } else if (soldInOption === 'tablet') {
        newQuantity = medicine.quantity - soldQuantity / (medicine.stripPerPk * medicine.tabletsPerStrip);
      }

      if (newQuantity < 0) {
        alert('Invalid quantity');
        return;
      }

      try {
        await axios.put(`https://backtade-2.onrender.com/medicines/${medicine.medicineId}`, {
          quantity: newQuantity,
        });

        const totalAmount = soldQuantity * price; // Total amount with tax included
        const transaction = {
          ...medicine,
          soldQuantity,
          totalAmount,
          date: new Date().toISOString(),
          Method,
          saler: user.username,
        };
        setCartItem(prev => [
          ...prev, // Spread the existing items
          { id:medicine.medicineId,name:medicine.medicineName, quantity: medicine.quantity , soldIn:medicine.soldIn , price:medicine.price , method:medicine.method , tax:TAX_RATE, totalPrice: price * TAX_RATE + price } // Append the new medicine
        ]);
        
        await axios.post('https://backtade-2.onrender.com/transactions', transaction);

        setHistory((prevHistory) => [transaction, ...prevHistory]);
        dispatch(updateQuantity({ medicineId: medicine.medicineId, newQuantity }));
        setSoldQuantity(0);
          setCountCart(prev => prev+1)
      } catch (error) {
        console.error('Error updating medicine or posting transaction:', error);
        alert('Error processing transaction');
      }
    } else {
      alert('Invalid quantity');
    }
  };
  console.log(cartsItem)
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: 'Name',
      dataIndex: 'medicineName',
    },
    {
      title: 'Quantity Sold',
      dataIndex: 'soldQuantity',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: (amount) => `$${(amount || 0).toFixed(2)}`,
    },
    {
      title: 'Pharmacist',
      dataIndex: 'saler',
    },
  ];

  const filteredHistory = history.filter(item => {
    return (
      (pharmacistFilter ? item.saler.includes(pharmacistFilter) : true) &&
      (nameFilter ? item.medicineName.includes(nameFilter) : true) &&
      (dateFilter ? new Date(item.date).toLocaleDateString() === new Date(dateFilter).toLocaleDateString() : true)
    );
  });

  useEffect(() => {
    if (medicine) {
      setPrice(medicine.price * (1 + TAX_RATE)); // Apply tax on initial load
    }
  }, [medicine]);

  

  if (!medicine) {
    return <p>No medicine selected.</p>;
  }

  return (
    <Layout style={{ padding: '20px', backgroundColor , minHeight:"auto" , boxSizing:"border-box" , overflow:"auto" , height:"auto"}}>
      <Content style={{ fontFamily: '"DM Sans", sans-serif', color: textColor }}>
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span><InfoCircleOutlined /> Medicine Details</span>} key="1">
            <div style={{ padding: '20px', backgroundColor: isDarkTheme ? '#34495e' : 'transparent' }}>
              <h2 style={{ textAlign: "center" }}>Medicine Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                  <Card style={{ backgroundColor: "aliceblue" }}>
                    <p><strong>Medicine ID:</strong> {medicine.medicineId}</p>
                    <p><strong>Name:</strong> {medicine.medicineName}</p>
                    <p><strong>Quantity:</strong> {calculateDisplayedQuantity()}</p>
                    <p><strong>Price:</strong> {price.toFixed(2)}</p>
                  </Card>
                  <Form layout='vertical' style={{ backgroundColor: "aliceblue", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                    <Form.Item label={<strong>Sold In:</strong>} style={{ marginBottom: "16px" }}>
                      {renderSoldInSelect()}
                    </Form.Item>
                    <Form.Item label={<strong>Quantity Sold:</strong>} style={{ marginBottom: "16px" }}>
                      <Input
                        type="number"
                        value={soldQuantity}
                        onChange={(e) => setSoldQuantity(Number(e.target.value))}
                        min="0"
                      />
                    </Form.Item>
                    <Form.Item label={<strong>Method:</strong>} style={{ marginBottom: "16px" }}>
                      <Select value={Method} onChange={handleMethod}>
                        <Option value="Credit Card">Credit Card</Option>
                        <Option value="Cash">Cash</Option>
                        <Option value="Mobile Banking">Mobile Banking</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item style={{ textAlign: "center" }}>
                      <Button type="primary" onClick={handleSold}>Mark as Sold</Button>
                    </Form.Item>
                  </Form>
                </div>
                <div style={{ display: "grid", placeContent: "center", backgroundColor: "aliceblue" }}>
                  <Barcode value={medicine.medicineId} />
                </div>
              </div>
            </div>
          </TabPane>
          <TabPane 
  tab={
    <>
      <FaCartArrowDown size={15} /> <span className='cartNumber'>{countCart}</span>
    </>
  } 
  key="4"
>
  <div style={{ minHeight: "400px", height:"auto" ,overflowY: "auto", padding: "10px" }}>
    <Button type="primary" onClick={downloadReceipt} style={{ marginBottom: '20px' }}>
      Download Receipt
    </Button>
    <Row gutter={16}>
      {cartsItem.map(item => (
        <Col span={8} key={item.id}>
          <Card title={item.name} bordered={true}>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>ID: &nbsp;....................................</strong>{item.id}
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Name: &nbsp;....................................</strong>{item.name}
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Price: &nbsp;....................................</strong> ${item.price.toFixed(2)}
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Quantity: &nbsp;....................................</strong> {item.quantity}
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Sold In: &nbsp;....................................</strong> {item.soldIn}
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Tax: &nbsp;....................................</strong> {(item.tax * 100).toFixed(2)}%
            </p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>Total Price: &nbsp;....................................</strong> ${item.totalPrice.toFixed(2)}
            </p>
          </Card>
        </Col>
      ))}
    </Row>
    <p>Total: ${total.toFixed(2)}</p>
    <div style={{ marginTop: "20px" }}>
     Balance: <input
        type="text"
        value={userCash}
        onChange={handleCashInputChange}
        placeholder="Enter cash amount"
        style={{ width: "300px", marginBottom: "10px" }}
      />
    </div>
    {error && <Alert message={error} type="error" showIcon />}
    <p>Change: ${balance.toFixed(2)}</p>
  </div>
</TabPane>

        </Tabs>
      </Content>
    </Layout>
  );
};

export default MedicineInventory;
