import {Header , Body , TextWithDownload , P, S , Card , Short , Content , Logo , Span , Card2 ,Short2 , Card3 , Short3 , Short4 , Card4 , Body1 ,  HeaderBody , ContentBody , Pmain , Psmall} from './HomeDashboard';
import styled from 'styled-components';
import RevenueCalendar from './RevenueCalendar';
import EllipsisMenu from './EllipsisMenu';
import { toggleClicked } from '../../../Reducer/dashboardSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { Med } from '../../../Reducer/medicineStatus.js';
import axios from 'axios';
import { useEffect ,useState } from 'react';
import { Meds } from '../../../Reducer/medicine.js';
const SvgWrapper = styled.svg`
  height: 40px;
  width: 40px;
  fill: #fed812;
`;


const HomeDashboard = () =>{
  const settings = useSelector((state) => state.settings);

  // Determine colors based on the selected theme
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  console.log(isDarkTheme)
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
   const dispatch = useDispatch();
   const [date, setDate] = useState(new Date());
   const handleClickd = (value) => {
      dispatch(toggleClicked(value));
      console.log(clicked);
    };
    const [final, setFinal] = useState(0);
    const [imsArray, setImsArray] = useState([]);
    const [short, setShort] = useState(0);
    const [num, setNum] = useState(0);
    const [name , setName] = useState('');
   const [group , setGroup] = useState([]);
   const [c , setC] = useState(0); 
   const [supplier , setCountS] = useState(0); 
   const [count , setCustomerCount] = useState(0);
   const [counts , setUsers] = useState(0);
  const [ce , setCe] = useState(0)
  const [good  , setGood] = useState("");
   
useEffect(() => {
  const fetchData = async () => {
     setGroup([]);
    try {
      let localShort = 0;
      let localNum = 0;
      let n = 0;
      const responsed = await axios.get('https://backtade-2.onrender.com/totalsale');
       // Calculate totalSale for the selected date
       console.log(responsed)
       const selectedDateStr = date.toISOString().split('T')[0];
       let totalSale = 0;
   console.log(responsed)
       responsed.data.forEach(item => {
         const itemDateStr = new Date(item.sentDate).toISOString().split('T')[0];
         if (itemDateStr === selectedDateStr) {
           totalSale += item.totleSale;
         }
       });
 
       setFinal(totalSale); // Update total sale if the date matches
       console.log(final+ "these final")
       if(final < 500 || 0){
setGood("Not Good")
       }
       else if(final < 1000){
        setGood("satisfatory")
       }
       else if (final < 1500){
        setGood("Very Good")
       }
       else if (final <2000){
        setGood("Exelent")
       }
       else if (final < 3000){
        setGood("Great")
       }
       else {
        setGood("perfect")
       }
    console.log("responsed")
    console.log(responsed)
    const cou = await axios.get('https://backtade-2.onrender.com/medcount')
    setCe(cou.data)
      const res = await axios.get('https://backtade-2.onrender.com/medicines');
      res.data.forEach(item => {
        if (item.quantity < 8) {
          localShort += 1; // Count items with quantity less than 8
        }
        localNum += item.quantity; // Sum up all quantities
      });
      const newGroups = [];
      console.log(newGroups)
         res.data.forEach(item => {
           if (!newGroups.includes(item.medicineGroup)) {
             newGroups.push(item.medicineGroup); // Add new group
             n += 1; // Increment group counter
           }
         });
         setC(n);
      setNum(localNum);
      const hightsold = await axios.get('https://backtade-2.onrender.com/api/medicine/highest-sold');
      const jsonCount = await axios.get('https://backtade-2.onrender.com/api/json-count');
      const count = await axios.get('https://backtade-2.onrender.com/userss');
      const counts = await axios.get('https://backtade-2.onrender.com/usersss');
setUsers(counts.data.supplierCount);
      console.log("count")
setCountS(count.data.supplierCount);
      setCustomerCount(jsonCount.data.count);
      setName(hightsold.data.medicineName);
     

      setGroup(newGroups); // Update the group state with the new array
   // Set the count of unique groups

      
      setShort(localShort);

     

      // Calculate max quantity
      const quantities = response.data.map((item) => item.quantity);
      const maxQuantity = Math.min(...quantities);

      setImsArray((prevArray) => [...prevArray, ...quantities]);

      if (maxQuantity < 10) {
        dispatch(Med('Good Sale'));
      } else if (maxQuantity < 20) {
        dispatch(Med('Exellent'));
      } else if (maxQuantity >= 30) {
        dispatch(Med('Smash'));
      }
      else if(maxQuantity < 5 ){
        dispatch(Med("Low Sale"))
      }
      else if (maxQuantity === 0){
        dispatch(Med("no sale"))
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(); // Call the async function
}, [date, dispatch , final]); // Ensure date and dispatch are in the dependency array

useEffect(() => {
  dispatch(Meds({ num, group: c, short }));
}, [num, c, short, dispatch]);
 return(
    <div style={{backgroundColor  , display:"grid" , height:"89vh" ,overflow:"hidden", boxSizing:"border-box"}} className='homepage'>
    <Header>
      <TextWithDownload>
        <div>
        <P style={{fontFamily:' "DM Sans", sans-serif' , color:textColor}}>Dashboard</P>
        <S style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Quick data over view of Invertory</S>
        </div>
      
     <EllipsisMenu></EllipsisMenu>
        </TextWithDownload>
        <div style={{display:"flex" , justifyContent:"center" , gap:"28px"  ,height:"60%" , }} className='wrap' >
           <Card >
            <Logo>
                <svg width="50px" height="50px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#1cad70" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M5 6.27273L12.3636 3L19.7273 6.27273V11.1818C19.7273 15.7227 16.5855 19.9691 12.3636 21C8.14182 19.9691 5 15.7227 5 11.1818V6.27273ZM12.3636 19.3064C15.6527 18.2918 18.0909 14.88 18.0909 11.1818V7.33637L12.3636 4.79182L6.63636 7.33637V11.1818C6.63636 14.88 9.07455 18.2918 12.3636 19.3064Z" fill="#1cad70"></path> <path d="M11 16H13V13H16V11H13V8H11V11H8V13H11V16Z" fill="#1cad70"></path> </g></svg>
            </Logo>
            <div>
            <Content style={{fontFamily:' "DM Sans", sans-serif' }}> {good}</Content>
            <Span style={{fontFamily:' "DM Sans", sans-serif' }}>Invetory status</Span>
            </div>
           

            <Short onClick={()=>handleClickd(100)} style={{fontFamily:' "DM Sans", sans-serif' }}> View Detailed Report <span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span> </Short>
           </Card>
           <Card2>
           <Logo>
           <SvgWrapper
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 512 512"
    xmlSpace="preserve"
  >
    <circle style={{ fill: '#E46A53' }} cx="117.333" cy="348.8" r="24" />
    <circle style={{ fill: '#F4A026' }} cx="208" cy="227.915" r="24" />
    <circle style={{ fill: '#30A987' }} cx="298.667" cy="308.981" r="24" />
    <circle style={{ fill: '#61ACD2' }} cx="389.333" cy="124.448" r="24" />

    <g>
      <path style={{ fill: '#fed812' }} d="M104.533,237.867c5.891,0,10.667-4.775,10.667-10.667s-4.775-10.667-10.667-10.667h-12.8c-5.891,0-10.667,4.775-10.667,10.667s4.775,10.667,10.667,10.667H104.533z"/>
      <path style={{ fill: '#fed812' }} d="M508.32,434.606l-40-34.667c-4.452-3.857-11.187-3.378-15.046,1.075c-3.858,4.451-3.377,11.188,1.074,15.046L472.738,432H400v-2.133c0-5.891-4.777-10.667-10.667-10.667s-10.667,4.775-10.667,10.667V432h-69.333v-5.689c0-5.891-4.777-10.667-10.667-10.667S288,420.42,288,426.311V432h-69.333v-2.133c0-5.891-4.775-10.667-10.667-10.667c-5.891,0-10.667,4.775-10.667,10.667V432H128v-11.378c0-5.891-4.775-10.667-10.667-10.667c-5.891,0-10.667,4.775-10.667,10.667V432H61.333V61.127l15.939,18.391c2.11,2.434,5.079,3.681,8.065,3.681c2.476,0,4.963-0.858,6.981-2.606c4.451-3.858,4.933-10.595,1.074-15.046l-34.667-40c-0.043-0.049-0.08-0.083-0.121-0.127c-1.127-1.26-2.557-2.263-4.211-2.881c-4.172-1.555-8.87-0.357-11.789,3.008l-34.667,40c-3.858,4.451-3.377,11.188,1.075,15.046s11.188,3.377,15.046-1.075L40,61.127V432H10.667C4.775,432,0,436.775,0,442.667s4.775,10.667,10.667,10.667H40v26.133c0,5.891,4.775,10.667,10.667,10.667s10.667-4.775,10.667-10.667v-26.133h411.406l-18.391,15.939c-4.452,3.858-4.933,10.595-1.075,15.046c2.11,2.434,5.078,3.681,8.065,3.681c2.476,0,4.963-0.858,6.981-2.606l40-34.667c0.06-0.052,0.107-0.099,0.161-0.149c1.244-1.123,2.236-2.542,2.847-4.182C512.883,442.222,511.684,437.522,508.32,434.606z"/>
      <path style={{ fill: '#fed812' }} d="M82.667,348.8c0,19.115,15.552,34.667,34.667,34.667S152,367.915,152,348.8c0-7.433-2.358-14.32-6.356-19.97l51.103-68.138c3.531,1.216,7.314,1.885,11.253,1.885c6.367,0,12.334-1.733,17.467-4.74l41.509,37.114c-1.907,4.292-2.976,9.036-2.976,14.027c0,19.115,15.551,34.667,34.667,34.667s34.667-15.552,34.667-34.667c0-9.753-4.054-18.572-10.559-24.877l61.588-125.351c1.625,0.235,3.282,0.362,4.971,0.362c19.116,0,34.667-15.552,34.667-34.667c0-5.644-1.364-10.971-3.766-15.685l40.622-40.396c4.177-4.155,4.196-10.908,0.042-15.085c-4.155-4.178-10.909-4.196-15.086-0.043l-40.622,40.397c-4.755-2.458-10.144-3.855-15.856-3.855c-19.116,0-34.667,15.552-34.667,34.667c0,9.753,4.054,18.572,10.559,24.877l-61.588,125.353c-1.625-0.235-3.282-0.362-4.971-0.362c-6.367,0-12.334,1.733-17.467,4.74l-41.508-37.114c1.907-4.292,2.976-9.036,2.976-14.027c0-19.115-15.552-34.667-34.667-34.667s-34.667,15.552-34.667,34.667c0,7.433,2.358,14.32,6.356,19.969l-51.103,68.138c-3.532-1.216-7.314-1.885-11.253-1.885C98.219,314.133,82.667,329.685,82.667,348.8z"/>
      <path style={{ fill: '#fed812' }} d="M389.333,111.11c7.353,0,13.333,5.981,13.333,13.333c0,7.353-5.981,13.333-13.333,13.333S376,131.796,376,124.444C376,117.091,381.981,111.11,389.333,111.11z"/>
      <path style={{ fill: '#fed812' }} d="M117.333,362.133c-7.353,0-13.333-5.981-13.333-13.333s5.981-13.333,13.333-13.333s13.333,5.981,13.333,13.333S124.686,362.133,117.333,362.133z"/>
      <path style={{ fill: '#fed812' }} d="M298.667,322.31c-7.353,0-13.333-5.981-13.333-13.333s5.981-13.333,13.333-13.333s13.333,5.981,13.333,13.333S306.02,322.31,298.667,322.31z"/>
    </g>
  </SvgWrapper>
  </Logo>
  <div>
            <Content> {final} Birr</Content>
            <Span>Revenue : <RevenueCalendar setDates={setDate} date={date}></RevenueCalendar></Span>
            </div>
            <Short2 onClick={()=>handleClickd(10)}style={{fontFamily:' "DM Sans", sans-serif' }} >View Detailed Report<span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span></Short2>
           </Card2>
           <Card3>
           <Logo>
           <svg
    width="40px"
    height="40px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    // Remove fill from here
  >
    <defs>
      <style>
        {`
          .cls-1 { fill: #35b4f5; }
          .cls-2 { fill: #35b4f5; }
        `}
      </style>
    </defs>
    <g data-name="25. First Aid Kit" id="_25._First_Aid_Kit">
      <path
        className="cls-1"
        d="M30,4H22V3a3,3,0,0,0-3-3H13a3,3,0,0,0-3,3V4H2A2,2,0,0,0,0,6v6a2,2,0,0,0,1,1.72V29a3,3,0,0,0,3,3H28a3,3,0,0,0,3-3V13.72A2,2,0,0,0,32,12V6A2,2,0,0,0,30,4ZM12,3a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1V4H12ZM2,6H30v6H2ZM29,29a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V14H29Z"
      ></path>
      <path
        className="cls-2"
        d="M18,28H14a1,1,0,0,1-1-1V25H11a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h2V17a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2h2a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H19v2A1,1,0,0,1,18,28Zm-3-2h2V24a1,1,0,0,1,1-1h2V21H18a1,1,0,0,1-1-1V18H15v2a1,1,0,0,1-1,1H12v2h2a1,1,0,0,1,1,1Z"
      ></path>
      <path
        className="cls-2"
        d="M7,16a1,1,0,0,1-1-1V11a1,1,0,0,1,2,0v4A1,1,0,0,1,7,16Z"
      ></path>
      <path
        className="cls-2"
        d="M25,16a1,1,0,0,1-1-1V11a1,1,0,0,1,2,0v4A1,1,0,0,1,25,16Z"
      ></path>
    </g>
  </svg>
           </Logo>
            <div>
            <Content style={{fontFamily:' "DM Sans", sans-serif' }}> {ce.toFixed(2)}</Content>
            <Span style={{fontFamily:' "DM Sans", sans-serif' }}>Medicine available</Span>
            </div>
            <Short3 onClick={()=>handleClickd(7)} style={{fontFamily:' "DM Sans", sans-serif' }}>Visit Inventory<span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span></Short3>
           </Card3>
           <Card4>
           <Logo>
           <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f47c71"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0618 4.4295C12.6211 3.54786 11.3635 3.54786 10.9228 4.4295L3.88996 18.5006C3.49244 19.2959 4.07057 20.2317 4.95945 20.2317H19.0252C19.914 20.2317 20.4922 19.2959 20.0947 18.5006L13.0618 4.4295ZM9.34184 3.6387C10.4339 1.45376 13.5507 1.45377 14.6428 3.63871L21.6756 17.7098C22.6608 19.6809 21.228 22 19.0252 22H4.95945C2.75657 22 1.32382 19.6809 2.30898 17.7098L9.34184 3.6387Z" fill=" #f47c71"></path> <path d="M12 8V13" stroke=" #f47c71" stroke-width="1.7" stroke-linecap="round"></path> <path d="M12 16L12 16.5" stroke=" #f47c71" stroke-width="1.7" stroke-linecap="round"></path> </g></svg>
           </Logo>
           <div>
            <Content style={{fontFamily:' "DM Sans", sans-serif' }}> {short}</Content>
            <Span style={{fontFamily:' "DM Sans", sans-serif' }}>Medicine Shortage</Span>
            </div>
            <Short4 onClick={()=>handleClickd(24)} style={{cursor:"pointer", fontFamily:' "DM Sans", sans-serif' }}>
                           Resolve Now<span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span>
            </Short4>
           </Card4>
        </div>
    </Header>
    <Body style={{color:textColor ,paddingLeft:"30px", paddingRight:"30px", display:"grid",gap:"25px" ,placeContent:"center", gridTemplateColumns:"1fr 1fr"}} className='over'>
      <Body1>
<HeaderBody>
<div style={{fontFamily:' "DM Sans", sans-serif'  , color:textColor}}>Inventory</div>
<div style={{color:"#555" , fontSize:"15px" , cursor:"pointer" }} onClick={()=>handleClickd(13)}>Go to Inventory  <span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span></div>
</HeaderBody>
<ContentBody>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif'   , color:textColor}}>{ce.toFixed(3)}</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif'   , color:textColor}}>Total no of Medicines</Psmall>
  </div>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif'  , color:textColor}}>{c}</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif'   , color:textColor}}>Medicine Groups</Psmall>
  </div>
</ContentBody>
      </Body1>
      <Body1>
<HeaderBody>
<div style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Quick Repor</div>
<div style={{color:"#555" , fontSize:"15px"}}>  <span style={{ paddingLeft:"5px" , display:"flex" , alignItems:"center"}}><RevenueCalendar></RevenueCalendar></span></div>
</HeaderBody>
<ContentBody>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>70,856</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif'  , color:textColor}}>Total no of Medicines</Psmall>
  </div>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>5,288</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Invoices Generated</Psmall>
  </div>
</ContentBody>
      </Body1>
      <Body1>
<HeaderBody>
<div style={{fontFamily:' "DM Sans", sans-serif'  , color:textColor}}>My Pharmacy</div>
<div onClick={()=>handleClickd(22)} style={{color:"#555" , fontSize:"15px"}}>Go to User Management  <span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span></div>
</HeaderBody>
<ContentBody>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif'  , color:textColor}}>{supplier}</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Total no of Suppliers</Psmall>
  </div>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif'  , color:textColor}}>{counts}</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Total no of Users</Psmall>
  </div>
</ContentBody>
      </Body1>
      <Body1>
<HeaderBody>
<div style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Customers</div>
<div style={{color:"#555" , fontSize:"15px"}} onClick={()=>handleClickd(20)}>Go to Customers Page  <span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span></div>
</HeaderBody>
<ContentBody>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>{count}</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Total no of Customers</Psmall>
  </div>
  <div>
   <Pmain style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>{name}</Pmain>
   <Psmall style={{fontFamily:' "DM Sans", sans-serif' , color:textColor }}>Frequently bought Item</Psmall>
  </div>
</ContentBody>
      </Body1>
    </Body>
    </div>
 )
}
export default HomeDashboard;