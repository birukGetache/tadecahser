import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, DatePicker, Select, Table, InputNumber, Tabs , Button as Buttom  , Row , Col , Card}  from 'antd';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { maxWidth, width } from 'styled-system';
import { useMediaQuery } from 'react-responsive';
import { FaCartArrowDown } from 'react-icons/fa';
import jsPDF from 'jspdf';
const { Option } = Select;
const { TabPane } = Tabs;

const Cosmo = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchText, setSearchText] = useState('');
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
   const [width, setWidth] = useState(600);
   const isMobile = useMediaQuery({ query: '(max-width: 500px)' });
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
        {user.role === "mainAdmin" && (
          <TabPane tab="Items" key="1">
            <Button type="primary" onClick={handleOpen}>
              Add Item
            </Button>
            <Input
              placeholder="Search by name or type"
              value={searchText}
              onChange={handleSearch}
              style={{ margin: '16px 0' }}
              className='cosmo'
            />
            <Modal
              title={editMode ? "Edit Item" : "Add New Item"}
              visible={visible}
              onCancel={handleClose}
              footer={null}
            >
              <Form
                onFinish={handleSubmit}
                initialValues={editMode ? { ...currentItem, expireDate: new Date(currentItem.expireDate) } : {}}
              >
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="type" label="Type" rules={[{ required: true }]}>
                  <Select placeholder="Select a type">
                    <Option value="loshin">Loshin</Option>
                    <Option value="fgh">FGH</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  rules={[{ required: true, message: 'Please enter a valid quantity!', type: 'number', min: 1 }]}
                >
                  <InputNumber min={1} />
                </Form.Item>
                <Form.Item name="expireDate" label="Expire Date" rules={[{ required: true }]}>
                  <DatePicker onChange={(date) => {}} />
                </Form.Item>
                <Form.Item name="price" label="Price" rules={[{ required: true, type: 'number', min: 0 }]}>
                  <InputNumber min={0} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
            <Table dataSource={filteredData} columns={columns} pagination={false} className='cosmo'/>
          </TabPane>
        )}
        <TabPane tab="Sales" key="2">
          <h3>Sales Data</h3>
          <Table dataSource={data} columns={columnSale} pagination={false} className='cosmo'/>

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

        {user.role === "mainAdmin" && (
          <TabPane tab="Transactions" key="3" style={{height:"70vh" , overflow:"auto"}}>
            <Input
              placeholder="Search by name or pharmacist"
              value={transactionSearchText}
              onChange={handleTransactionSearch}
              style={{ margin: '16px 0' }}
            />
            <Table dataSource={filteredTransactionData} columns={ColumnsTransaction} pagination={false} className='cosmo'/>
            <div style={{ margin: "10px" }}>
              <Button onClick={handleReset}>Reset Transaction</Button>
            </div>
          </TabPane>
        )}
        {user.role === "mainAdmin" && (
          <TabPane tab="Analysis" key="4">
            <h3>Sales Analysis</h3>
            <Table dataSource={analysisData} columns={analysisColumns} pagination={false} className='cosmo' />
            <BarChart width={width} height={300} data={analysisData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="pharamacist" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalQuantity" fill="#82ca9d" />
              <Bar dataKey="totalPrice" fill="#8884d8" />
            </BarChart>
          </TabPane>
        )}
        <TabPane tab={ <div style={{display:"flex"}}><FaCartArrowDown size={20}></FaCartArrowDown> <span className='cartNumber'>{countCart}</span></div>} key="5">
          <div>
      <Buttom type="primary" onClick={downloadReceipt} style={{ marginBottom: '20px' }}>
        Download Receipt
      </Buttom>
      <Row gutter={16}>
        {cartsItem.map(item => (
          <Col span={8} key={item.id}>
            <Card title={item.name} bordered={true}>
              <p style={{display:"flex" , justifyContent:"space-between"}}><strong>ID: &nbsp;....................................</strong>{item.id}</p>
              <p style={{display:"flex" , justifyContent:"space-between"}}><strong>Name: &nbsp;....................................</strong>{item.name}</p>
              <p style={{display:"flex" , justifyContent:"space-between"}}><strong>Price: &nbsp;....................................</strong> ${item.price.toFixed(2)}</p>
              <p style={{display:"flex" , justifyContent:"space-between"}}><strong>Quantity: &nbsp;....................................</strong> {item.quantity}</p>
              <p style={{display:"flex" , justifyContent:"space-between"}}><strong>Item Tax: &nbsp;....................................</strong> {item.itemTax}</p>
              <p style={{display:"flex" , justifyContent:"space-between"}}><strong>Tax: &nbsp;....................................</strong> {(item.tax * 100).toFixed(2)}%</p>
              <p style={{display:"flex" , justifyContent:"space-between"}}><strong>Total Price: &nbsp;....................................</strong> ${item.totalPrice.toFixed(2)}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
          </TabPane>
      </Tabs>
    </div>
  );
};

export default Cosmo;
