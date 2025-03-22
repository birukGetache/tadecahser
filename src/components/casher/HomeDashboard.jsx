import React, { useEffect, useState } from 'react';
import SearchAndFilter from './SearchAndFilter';
import MedicineTable from './Medicinetable';
import { useDispatch } from 'react-redux';
import { toggleClicked } from '../../Reducer/dashboardSlice';
import axios from 'axios';
import  { useMemo } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateQuantity } from '../../Reducer/MedicineSlice';
import Barcode from 'react-barcode';
import { Tabs, Layout, Button, Card, Form, Select, Alert ,  Col, Row , Button as Buttom } from 'antd';
import { InfoCircleOutlined, HistoryOutlined, DollarOutlined  } from '@ant-design/icons';
import { FaCartArrowDown, FaRegBell } from 'react-icons/fa';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const { TabPane } = Tabs;
import { FaBars  } from 'react-icons/fa';
const { Content } = Layout;
const { Option } = Select;
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import StorageIcon from '@mui/icons-material/Storage'; 
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MedicineInventory from './MedicineInvetry';
import HelpIcon from '@mui/icons-material/Help'; 
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Home, SideBar, HomeContent, Invertorys, Get, Image, AdminInfo, PAdminInfo, Dashboard, DashboardP, Application, DateDisplay, Invertory, Configuration, LanguageWithDate, Input, Fotter, InputDiv, IconWrapper, Header, Notification, P, P2, P3, P4, P5, P6,P7, InvertoryC } from '../styles/styleHome';
const HomeDashboard = () => {
  const clicked = useSelector((state) => state.dashboard.clicked);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOption, setFilterOption] = useState('');
  const [filterOptions, setFilterOptions] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showhumberger , setHum] = useState(false);
  const [showhumbergerR , setHumR] = useState(false);
  const [iconC, setIconsC] = useState(true);
  const [icons, setIcons] = useState(true);
  const [showC, setShowC] = useState(false);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const [cart , setCart] = useState(false);
  const hums = ()  =>{
    setHum(!showhumberger);
    setHumR(!showhumbergerR)
}

const expandContact = () => {
  setShowC(!showC);
  setIconsC(!iconC);
}
const expandsMedicine = () => {
  setShow(!show);
  setIcons(!icons);
}
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




  //return 


  const [error, setError] = useState("");
    const [userCash, setUserCash] = useState("");
  const medicine = useSelector((state) => state.medicine.selectedMedicine);

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
  
  const [animate, setAnimate] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(cart);

  useEffect(() => {
      if (cart) {
          setIsVisible(true);
          setIsAnimating(true); // Start slide-in animation
      } else {
          setIsAnimating(false); // Start slide-out animation
          const timer = setTimeout(() => setIsVisible(false), 500); // Wait for animation to finish
          return () => clearTimeout(timer); // Cleanup on unmount
      }
  }, [cart]); 

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
      toast.success("Medicine added to cart!", {
        onClose: () => dispatch(toggleClicked(1)), // Dispatch after toast closes
      });
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

  
  return (
    <>
      {isMediumOrLarger ? (
        <div style={{ backgroundColor, height:"100vh" , boxSizing:"border-box" , display: "grid", gridTemplateRows: "1fr 1fr 9fr", overflowY: "auto", overflowX: "hidden" }}>
          <header style={{ display: "flex", justifyContent: "space-between", padding: "20p", height: "fit-content" }}>
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
          <div style={{position:"absolute" , top:"10px" , right:"70px" , display:"flex" , alignItems:"end" , cursor:"pointer" }} onClick={()=>{setCart(true)}} ><FaCartArrowDown size={25} /> <span className='cartNumber' stlye={{padding:"0" , margin:"0", width:"40px" , height:"40px"}}>{countCart}</span></div> 
          <MedicineTable searchTerm={searchTerm} filterOption={filterOption} />
           { isVisible && (
            <div
                style={{
                    minHeight: "400px",
                    height: "100vh",
                    overflowY: "auto",
                    padding: "10px",
                    backgroundColor: "#1d242e",
                    width: "100%",
                    position: "absolute",
                    right: "0",
                    top: "0",
                    overflow:"auto",
                    overflowX:"hidden",
                    padding:"50px",
                    boxSizing:"border-box",
                     boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)"
                }}
                className={isAnimating ? 'slide-in' : 'slide-out'} // Apply the appropriate class based on animation state
            >
                <p onClick={() => setCart(false)} style={{ cursor: "pointer" , fontSize:"30px" , color:"white" ,paddingTop:"0" , marginTop:"0" , textAlign:"end"  }}>&times;</p>
                <Button type="primary" onClick={downloadReceipt} style={{  padding: "10px",
  width: "fit-content",
  backgroundColor: "rgba(255, 255, 255, 0.1)", 
  backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.3), rgba(0,0,0,0.2))",
  backgroundSize: "cover",
  backdropFilter: "blur(15px)",
  WebkitBackdropFilter: "blur(15px)",  // Safari support
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  marginTop: "10px"  }}>
                    Download Receipt
                </Button>
              
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
                    {cartsItem.map((item) => (
                       <div
                       style={{
                           minHeight: "100vh",
                           height: "70vh",
                           overflowY: "auto",
                           padding: "10px",
                           backgroundColor: "#1d242e",
                           width: "100%",
                           position: "absolute",
                           right: "0",
                           top: "0",
                           borderRadius:"10px",
                           padding:"20px",
                           overflow:"auto",
                           boxSizing:"border-box",
                            boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)"
                       }}
                       className={isAnimating ? 'slide-in' : 'slide-out'} // Apply the appropriate class based on animation state
                   >
                       <p onClick={() => setCart(false)} style={{ cursor: "pointer" , fontSize:"30px" , color:"white" ,paddingTop:"0" , marginTop:"0" , textAlign:"end"  }}>&times;</p>
                       <Button type="primary" onClick={downloadReceipt} style={{ marginBottom: "20px" }}>
                           Download Receipt
                       </Button>
                     
                       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
                           {cartsItem.map((item) => (
                                <div
                                style={{
                                  backgroundColor: "white",
                                  margin: "auto",
                                  padding: "10px",
                                  borderRadius: "10px",
                                  width: "90%",
                                  maxWidth: "400px",
                                  marginBottom:"10px",
                                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                                }}
                              >
                                <h3 style={{ textAlign: "center", marginBottom: "10px" }}>{item.name}</h3>
                                {[
                                  { label: "ID", value: item.id },
                                  { label: "Name", value: item.name },
                                  { label: "Price", value: `$${item.price.toFixed(2)}` },
                                  { label: "Quantity", value: item.quantity },
                                  { label: "Sold In", value: item.soldIn },
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
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"
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
                       {error && <Alert message={error} type="error" showIcon />}
                       <p style={{color:"white"}}>Change: ${balance.toFixed(2)}</p>
           </div>
                   </div>
                    ))}
                </div>
  <div style={{backgroundColor:"white"
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
                {error && <Alert message={error} type="error" showIcon />}
                <p style={{color:"white"}}>Change: ${balance.toFixed(2)}</p>

  </div>
            </div>
        )}
        </div>
      ) : (
        <div style={{ backgroundColor, height:"100vh" , boxSizing:"border-box" , display: "grid", gridTemplateRows: "1fr 1fr 9fr", overflowY: "auto", overflowX: "hidden" }}>
        <header style={{ display: "flex", justifyContent: "space-between", padding: "20p", height: "fit-content" }}>
          <h1 style={{ paddingLeft: "20px", marginTop: "0", fontFamily: "cursive", color: textColor }} className='inventorylistofmedicine'>
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
        <div style={{position:"absolute" , top:"10px" , right:"40px" , display:"flex" , alignItems:"end" , cursor:"pointer" }} onClick={()=>{setCart(true)}} ><FaCartArrowDown size={25} /> <span className='cartNumber' style={{height:"14px" , color:"lightblue",width:"14px" , display:"flex"}}>{countCart}</span></div> 
        <MedicineTable searchTerm={searchTerm} filterOption={filterOption} />
         { isVisible && (
          <div
              style={{
                  minHeight: "100vh",
                  height: "70vh",
                  overflowY: "auto",
                  padding: "10px",
                  backgroundColor: "#1d242e",
                  width: "100%",
                  position: "absolute",
                  right: "0",
                  top: "0",
                  borderRadius:"10px",
                  padding:"20px",
                  overflow:"auto",
                  boxSizing:"border-box",
                   boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.7)"
              }}
              className={isAnimating ? 'slide-in' : 'slide-out'} // Apply the appropriate class based on animation state
          >
              <p onClick={() => setCart(false)} style={{ cursor: "pointer" , fontSize:"30px" , color:"white" ,paddingTop:"0" , marginTop:"0" , textAlign:"end"  }}>&times;</p>
              <Button type="primary" onClick={downloadReceipt} style={{ marginBottom: "20px" }}>
                  Download Receipt
              </Button>
            
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
                  {cartsItem.map((item) => (
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
                         { label: "Sold In", value: item.soldIn },
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
  marginTop: "10px" 
}}>
              <p style={{color:"white"}}>Total: ${total.toFixed(2)}</p>
              <div style={{ marginTop: "20px" ,color:"white"}}>
                  Balance:{" "}
                  <input
                      type="text"
                      value={userCash}
                      onChange={handleCashInputChange}
                      placeholder="Enter cash amount"
                      style={{ width: "250px", marginBottom: "10px" }}
                  />
              </div>
              {error && <Alert message={error} type="error" showIcon />}
              <p style={{color:"white"}}>Change: ${balance.toFixed(2)}</p>

  </div>
          </div>
      )}
      </div>
      )}
       <div style={{ backgroundColor:"#1d242e" , display:"grid" , gridTemplateColumns:"1fr 1fr 1fr 1fr" , position:"fixed" , bottom:"0" , gap:"5px"  , width:"100vw"}}>
                {!isMediumOrLarger && (
  <div>
    {!isMediumOrLarger ? (
      showhumberger ? (
       
        <FaTimes 
        style={{ color: "white", fontSize: "20px", position: "absolute", top: "130px", right: "10px" }} 
        onClick={hums} 
      />
      ) : (
        <FaBars 
          style={{ color: "white", fontSize: "20px", position: "absolute", top: "130px", right: "10px" }} 
          onClick={hums} 
        />
      )
    ) : null}
  </div>
)}

                    
                {/* {( (isMediumOrLarger ) || (showhumbergerR) ) &&(
                    <>
                    <InvertoryC clicked={clicked} onClick={ ()=>handleClickd(11)} style={{border:"2px solid #ccc" , margin:"5px" , borderRadius:"5px" , }} >
                    <div style={{display:"flex" , alignItems:"center" , height:"9vh" , paddingLeft:"30px"}} className = "add">
                        <PeopleIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                        <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Customer</DashboardP>
                    </div>
                    <div style={{display:"flex" , justifyContent:"flex-end", alignItems:"center", height:"9vh" ,paddingRight:"10px",   paddingLeft:"120px" , boxSizing:"border-box"}} className='pad'>
                        {iconC ? (
                            <ExpandMoreIcon
                                style={{ color: 'white', fontSize: '25px' }}
                                onClick={expandContact}
                            />
                        ) : (
                            <ExpandLessIcon
                                style={{ color: 'white', fontSize: '25px' }}
                                onClick={expandContact}
                            />
                        )}
                    </div>
                    {showC && 
                        <div style={{width:"100%" }} className='sublist'>
                            <P5 clicked={clicked} onClick={(event) => handleItemClick(17, event)} style={{fontFamily:' "DM Sans", sans-serif' }}>contacts</P5>
                            <P6 clicked={clicked} onClick={(event) => handleItemClick(18, event)} style={{fontFamily:' "DM Sans", sans-serif' }}>contact Report</P6>
                        </div>
                    }
                </InvertoryC>
                <Notification style={{border:"2px solid #ccc" , margin:"5px" , borderRadius:"5px", height:"64px"}} clicked={clicked} onClick={ ()=>handleClickd(3)}>
                    <NotificationsIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                    <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Notifications</DashboardP>
                </Notification>
                <Application style={{border:"2px solid #ccc" , margin:"5px" , borderRadius:"5px", height:"64px"}}  clicked={clicked} onClick={ ()=>handleClickd(4)}>
                    <SettingsIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                    <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Application Setting</DashboardP>
                </Application>
                <Get clicked={clicked} onClick={ ()=>handleClickd(5)} style={{border:"2px solid #ccc" , margin:"5px" , borderRadius:"5px", height:"64px"}} >
                    <HelpIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                    <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Get tech Help</DashboardP>
                </Get>
                </>)} */}
                <div></div>
                <div></div>
                <Fotter style={{marginLeft:"-100%"}}>Powered by Bernos © 2024 v 1.1.2</Fotter>
            
            </div>
            {clicked == 28 &&<div>
              <div style={{ padding: '20px'  , position:"absolute", top:"0%" , right:"0%",left:"0%",bottom:"0%", background:"black", boxSizing:"border-box" , zIndex:"1222", overflow:"auto",  backgroundColor: "rgba(0, 0, 0, 0.7)" , display:"flex" , justifyContent:"center" , alignItems:"center" }} className='fullheight'>
                
      <div style={{ fontFamily: '"DM Sans", sans-serif', color: textColor  ,borderRadius:"50px" , display:"flex" , alignItems:"center" , justifyContent:"center" , borderRadius:"50px" , padding:'10px' }}>
      
            <div style={{ padding: '15px',backgroundColor:"white" , borderRadius:"10px" , width:"80vw"  }}>

     <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center" , width:"100%"}}>
              <h2>Medicine Details</h2>
              <p style={{color:"red" , fontSize:"30px" , float:"right" , cursor:"pointer" }} onClick={()=>dispatch(toggleClicked(2))}>&times;</p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }} className='casherlist'>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }} className='casherlist'>
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
                    <Form.Item label={<strong>Quantity Sold:</strong>} style={{ marginBottom: "12px" ,  }}>
                      <input
                        type="number"
                        value={soldQuantity}
                        onChange={(e) => setSoldQuantity(Number(e.target.value))}
                        min="0"
                         style={{height:"10px"}}
  
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
                  <ToastContainer></ToastContainer>
                </div>
              </div>
            </div>
      </div>
    </div>
            </div>}
    </>
  );
};

export default HomeDashboard;
