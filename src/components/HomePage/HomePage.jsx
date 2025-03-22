import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Home, SideBar, HomeContent, Invertorys, Get, Image, AdminInfo, PAdminInfo, Dashboard, DashboardP, Application, DateDisplay, Invertory, Configuration, LanguageWithDate, Input, Fotter, InputDiv, IconWrapper, Header, Notification, P, P2, P3, P4, P5, P6,P7, InvertoryC } from '../styles/styleHome.jsx';
import EllipsisMenu from './EllipsisMenu.jsx';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
import StorageIcon from '@mui/icons-material/Storage'; 
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HelpIcon from '@mui/icons-material/Help'; 
import TuneIcon from '@mui/icons-material/Tune';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import SearchIcon from '@mui/icons-material/Search';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { FaLanguage } from 'react-icons/fa';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { toggleClicked } from '../../Reducer/dashboardSlice.js';
import HomeDashboard from './ChildComponent/HomeDashboard.jsx';
import Inventory from './ChildComponent/Inventory.jsx';
import ListMedicine from './ChildComponent/ListMedicine.jsx';
import MedicineGroup from './ChildComponent/MedicineGroup.jsx';
import SalesReport from './ChildComponent/SalesReport.jsx';
import SalesReportOne from './ChildComponent/SalesReportOne.jsx';
import PaymentReport from './ChildComponent/PaymentReport.jsx';
import Configurations from './ChildComponent/Configuration.jsx';
import ContactManagement from './ContactManagement.jsx';
import ContactListPage from './ChildComponent/ContactListPage.jsx';
import ContactReport from './ChildComponent/ContactReport.jsx';
import Notifications from './ChildComponent/Notification.jsx';
import Settings from './ChildComponent/Settings.jsx';
import GetTechHelp from './ChildComponent/GetTechHelp.jsx';
import UserSupplierPage from './ChildComponent/UserSupplierPage.jsx';
import CustomerPage from './ChildComponent/CustomerPage.jsx';
import MedicineForm from './ChildComponent/MedicineForm.jsx';
import MedicineFormShortage from './ChildComponent/MedicineFormShortage.jsx';
import MedicineDashboard from './ChildComponent/MedicineDashboard.jsx';
import UserDashboard from './ChildComponent/UserDashboard.jsx';
import UserProfile from './ChildComponent/UserProfile.jsx';
import MedicineInventory from './ChildComponent/MedicineInventory.jsx';
import MedicineItem from './ChildComponent/MedicineItem.jsx';
import MedicineDetails from './ChildComponent/MedicineDetails.jsx';
import SalesChart from './ChildComponent/SalesChart.jsx';
import { Navigate } from 'react-router-dom';
import Cosmo from './ChildComponent/Cosmo.jsx';
import { useMediaQuery } from 'react-responsive';
//for humbergur
import { FaBars , FaTimes} from 'react-icons/fa';
const HomePage = () => {
    const [show, setShow] = useState(false);
    const [showR, setShowR] = useState(false);
    const [showiconR, setIconsR] = useState(true);
    const [icons, setIcons] = useState(true);
    const [showC, setShowC] = useState(false);
    const [iconC, setIconsC] = useState(true);
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    //for humbergur
    const [showhumberger , setHum] = useState(false);
    const [showhumbergerR , setHumR] = useState(false);
    const hums = ()  =>{
        setHum(!showhumberger);
        setHumR(!showhumbergerR)
    }
if(user.role=== ''){
    return <Navigate to="/" />
}
    const expandsMedicine = () => {
        setShow(!show);
        setIcons(!icons);
    }

    const expandReport = () => {
        setShowR(!showR);
        setIconsR(!showiconR);
    }

    const expandContact = () => {
        setShowC(!showC);
        setIconsC(!iconC);
    }

    const getGreeting = () => {
        const hours = new Date().getHours();
        if (hours < 12) return 'Good Morning';
        if (hours < 18) return 'Good Afternoon';
        return 'Good Night';
    };

    const getGreetingIcon = () => {
        const hours = new Date().getHours();
        return hours < 12 ? <NightsStayIcon color='yellow' /> : <WbSunnyIcon style={{color:"yellow"}} />;
    };
    const handleItemClick = (id, event) => {
      event.stopPropagation(); // Prevent click event from propagating to parent
      handleClickd(id); // Pass ID to the handleClickd function
    };
    const formatDate = () => {
        const now = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        return now.toLocaleDateString('en-US', options);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const open = Boolean(anchorEl);
    const id = open ? 'simple-menu' : undefined;

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (language) => {
        if (language) {
            setSelectedLanguage(language);
        }
        setAnchorEl(null);
    };

    const clicked = useSelector((state) => state.dashboard.clicked);
    let content;

    switch (clicked) {
        case 1:
           content = user.role === 'mainAdmin' ? <HomeDashboard /> : <Inventory />;
            break;
        case 13:
            content = <Inventory />;
            break;
        case 6:
            content = <MedicineForm />;
            break;
        case 23:
            content = <MedicineFormShortage />;
            break;
        case 100:
            content = <SalesChart></SalesChart>
            break;
        case 20:
            content = <CustomerPage />;
            break;
        case 3:
            content = <Notifications />;
            break;
        case 7:
            content = <ListMedicine />;
            break;
        case 8:
            content = <MedicineGroup />;
            break;
        case 15:
            content = <SalesReport />;
            break;
        case 65:
            content = <MedicineDetails></MedicineDetails>
            break;
        case 9:
            content = <SalesReportOne />;
            break;
        case 10:
            content = <PaymentReport />;
            break;
        case 22:
            content = <UserSupplierPage />;
            break;
        case 2:
            content = <Configurations />;
            break;
        case 11:
            content = <ContactManagement />;
            break;
        case 17:
            content = <ContactListPage />;
            break;
        case 26:
            content = <UserDashboard />;
            break;
        case 18:
            content = <ContactReport />;
            break;
        case 4:
            content = <Settings />;
            break;
        case 5:
            content = <GetTechHelp />;
            break;
        case 24:
            content = <MedicineDashboard />;
            break;
        case 27:
            content = <UserProfile />;
            break;
        case 28:
            content = <MedicineInventory />;
            break;
        case 29:
            content = <MedicineItem />;
            break;
        case 101:
            content = <Cosmo></Cosmo>;
            break;
        default:
            content = null;
    }

    const handleClickd = (value) => {
        dispatch(toggleClicked(value));
    };
    const isMediumOrLarger = useMediaQuery({ query: '(min-width: 500px)' });
    return (
        <Home>
            <SideBar>
                <Image src='./Logo.png' alt='Logo' />
                <div style={{display:"flex", justifyContent:"space-between" , alignItems:"center" , width:"100vw"}} className="profile-contaner">
                <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      borderRadius: "20px",
      width:"19%",
      marginLeft:"24px",
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)", // Fix for Safari
      boxSizing: "border-box",
     alignItems:'center',
      boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    }}
  >
                    <AdminInfo>
                        <div style={{position:"relative" , display:"flex" , alignItems:"center"}} onClick={ ()=>handleClickd(26)}>
                        <div style={{
  width: "50px",  // Set a specific width
  height: "50px", // Set a specific height
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
  borderRadius: "25px" // Optional for rounded corners
}}> 
  <PAdminInfo src={user.image || '/default-image.avif'} alt='User Profile' />
</div>
                            <div style={{width:"14px" , height:"14px",marginLeft:"-14px" ,marginTop:"25px", borderRadius:"50%" , background:"green"}}></div>
                        </div>
                        <div style={{display:"flex" , height:"fit-content" , marginTop:"auto" ,marginBottom:"auto",marginLeft:"20px", flexDirection:"column"}}>
                            <p style={{color:"white" , fontSize:"20px", fontFamily:' "DM Sans", sans-serif' , margin:"0" , fontWeight:"bold"}}>{user.username}</p>
                            <p style={{color:"white" , fontSize:"14px", fontFamily:' "DM Sans", sans-serif' ,margin:"0" , color:"yellow"}}>{user.role}</p>
                        </div>
                    </AdminInfo>
                    <EllipsisMenu />
                    </div>
                    {!isMediumOrLarger && (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: "2px",
    marginLeft: "10px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)", // Fix for Safari
    boxSizing: "border-box",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
    marginRight:"10px",
    padding:"10px",
  }}>
    {!isMediumOrLarger ? (
      showhumberger ? (
       
        <FaTimes 
        style={{ color: "white", fontSize: "20px",  }} 
        onClick={hums} 
      />
      ) : (
        <FaBars 
          style={{ color: "white", fontSize: "20px",  }} 
          onClick={hums} 
        />
      )
    ) : null}
  </div>
)}
                </div>
                <div style={{width:"100%"}} className='homebar'>
      


             {( (isMediumOrLarger && user.role === 'mainAdmin') || (showhumbergerR && user.role === 'mainAdmin') )&& (
                    <>
                        <Dashboard clicked={clicked} onClick={ ()=>handleClickd(1)}>
                            <DashboardIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                            <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Dashboard</DashboardP>
                        </Dashboard> </>  )}
                        {( (isMediumOrLarger) || (showhumbergerR ) ) &&   <Invertory clicked={clicked} onClick={ ()=>handleClickd(13)}>
                            <div style={{display:"flex" , alignItems:"center" , height:"9vh" , paddingLeft:"30px"}}  className = "add">
                                <StorageIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                                <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Inventory</DashboardP>
                            </div>
                            <div style={{display:"flex" , justifyContent:"flex-end", alignItems:"center", height:"9vh" , paddingRight:"10px" , paddingLeft:"120px" , boxSizing:"border-box"}} className='pad'>
                                {icons ? (
                                    <ExpandMoreIcon
                                        style={{ color: 'white', fontSize: '25px' }}
                                        onClick={expandsMedicine}
                                    />
                                ) : (
                                    <ExpandLessIcon
                                        style={{ color: 'white', fontSize: '25px' }}
                                        onClick={expandsMedicine}
                                    />
                                )}
                            </div>
                            {show && 
                                <div className='sublist'>
                                    <P clicked={clicked} onClick={(event) => handleItemClick(7, event)} style={{fontFamily:' "DM Sans", sans-serif' }}>List of Medicines</P>
                                    <P2 clicked={clicked} onClick={(event) => handleItemClick(8, event)} style={{fontFamily:' "DM Sans", sans-serif' }}>Medicine Groups</P2>
                                    <P7 clicked={clicked} onClick={(event) => handleItemClick(101, event)} style={{fontFamily:' "DM Sans", sans-serif' }}>Cosmotics</P7>
                                </div>
                            }
                        </Invertory>}
                        {( (isMediumOrLarger && user.role === 'mainAdmin') || (showhumbergerR && user.role === 'mainAdmin') ) && (   <>  <Invertorys clicked={clicked} onClick={ ()=>handleClickd(15)}>
                            <div style={{display:"flex" , alignItems:"center" , height:"9vh" , paddingLeft:"30px"}} className = "add" >
                                <AssessmentIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                                <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Report</DashboardP>
                            </div>
                            <div style={{display:"flex" , justifyContent:"flex-end", alignItems:"center", height:"9vh" , paddingRight:"10px" ,  paddingLeft:"120px" , boxSizing:"border-box"}} className='pad'>
                                {showiconR ? (
                                    <ExpandMoreIcon
                                        style={{ color: 'white', fontSize: '25px' }}
                                        onClick={expandReport}
                                    />
                                ) : (
                                    <ExpandLessIcon
                                        style={{ color: 'white', fontSize: '25px' }}
                                        onClick={expandReport}
                                    />
                                )}
                            </div>
                            {showR && 
                                <div className='sublist'>
                                    <P3 clicked={clicked} onClick={(event) => handleItemClick(9, event)} style={{fontFamily:' "DM Sans", sans-serif' }}>Sales Report</P3>
                                    <P4 clicked={clicked} onClick={(event) => handleItemClick(10, event)} style={{fontFamily:' "DM Sans", sans-serif' }}>Payment Report</P4>
                                </div>
                            }
                        </Invertorys>
                    </>
                )}
                      {( (isMediumOrLarger && user.role === 'mainAdmin') || (showhumbergerR && user.role === 'mainAdmin') ) && (  <Configuration clicked={clicked} onClick={ ()=>handleClickd(2)}>
                    <TuneIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                    <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Configuration</DashboardP>
                </Configuration>)}
                {( (isMediumOrLarger ) || (showhumbergerR) ) &&(
                    <>
                    <InvertoryC clicked={clicked} onClick={ ()=>handleClickd(11)}>
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
                <Notification clicked={clicked} onClick={ ()=>handleClickd(3)}>
                    <NotificationsIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                    <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Notifications</DashboardP>
                </Notification>
                <Application clicked={clicked} onClick={ ()=>handleClickd(4)}>
                    <SettingsIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                    <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Application Setting</DashboardP>
                </Application>
                <Get clicked={clicked} onClick={ ()=>handleClickd(5)}>
                    <HelpIcon style={{color:"white" , display:"inline" , marginRight:"20px"}} />
                    <DashboardP style={{display:"inline", fontFamily:' "DM Sans", sans-serif'}}>Get tech Help</DashboardP>
                </Get>
                </>)}
                <Fotter>Powered by Safeware © 2024 v 1.1.2</Fotter>
                </div>
            </SideBar>
            <HomeContent>
                <Header>
                    <InputDiv>
                        <Input type='text' placeholder='search anything here' />
                        <SearchIcon style={{color:"#2c3440" , marginLeft:"-50px"}} />
                    </InputDiv>
                    <LanguageWithDate>
                       
                    <p style={{
  whiteSpace: "nowrap",
  fontSize: "24px",
  fontWeight: "bold",
  color: "#4aa",
  textAlign: "center",
  padding: "4px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  fontFamily:' "DM Sans", sans-serif' ,
}}>
  Welcome {user.username}
</p>

                        <DateDisplay>
                            <p style={{textAlign:"right" , paddingTop:"-8px" , display:"flex" , alignItems:"center"}}>
                                <IconWrapper>{getGreetingIcon()}</IconWrapper> {getGreeting()}
                            </p>
                            <p style={{ paddingTop:"-8px"}}>{formatDate()}</p>
                        </DateDisplay>
                    </LanguageWithDate>
                </Header>
                {content}
            </HomeContent>
        </Home>
    );
}

export default HomePage;
