import {Header , Body , TextWithDownload , P, S , Card , Short , Content , Logo , Span , Card2 ,Short2 , Card3 , Short3 , Short4 , Card4 , Body1 ,  HeaderBody , ContentBody , Pmain , Psmall} from './HomeDashboard';
import styled from 'styled-components';
import RevenueCalendar from './RevenueCalendar';
import EllipsisMenu from './EllipsisMenu';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toggleClicked } from '../../../Reducer/dashboardSlice.js';
import { Button } from 'antd';
const SvgWrapper = styled.svg`
  height: 40px;
  width: 40px;
  fill: #fed812;
`;
const HomeDashboard = () =>{
  
  const user = useSelector((state) => state.user);
  const num = useSelector((state) => state.medstype.madicine); // Correctly using 'medstype'
  const group = useSelector((state) => state.medstype.group);
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  console.log(group , num)
  const short = useSelector((state) => state.medstype.shortage);
  const dispatch = useDispatch();
  const handleClickd = (value) => {
     dispatch(toggleClicked(value));
     console.log(clicked);
   };
 return(
    <div style={{backgroundColor  , height:'89vh', display:"grid" , boxSizing:"border-box"}} className='overflow'>
    <Header>
  <TextWithDownload>
        <div>
        <P style={{color:textColor}}>Inventory</P>
        <S style={{color:textColor}}>List of medicines available for sales.</S>
        </div>
      
     {user.role === 'mainAdmin' && (<Button  onClick={()=>handleClickd(6)} style={{width:"200px" , height:"50px" ,color:"white", fontSize:"20px",borderRadius:"5px",marginTop:"auto" , marginBottom:"30px" , border:"none" , backgroundColor:"#1d242e"}}>+ Add</Button>)} 
        </TextWithDownload>
        <div style={{display:"flex" , justifyContent:"center" , gap:"28px"  ,height:"60%"}} className='wrap'>
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
            <Content> {num.toFixed(2)}</Content>
            <Span>Medicine available</Span>
            </div>
            <Short3 onClick={()=>handleClickd(7)}>View Full List<span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span></Short3>
           </Card3>
           <Card >
            <Logo>
            <svg
    width="37px"
    height="37px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="#40b67e"
    stroke="#40b67e"
  >
    <g data-name="25. First Aid Kit">
      <path
        d="M30,4H22V3a3,3,0,0,0-3-3H13a3,3,0,0,0-3,3V4H2A2,2,0,0,0,0,6v6a2,2,0,0,0,1,1.72V29a3,3,0,0,0,3,3H28a3,3,0,0,0,3-3V13.72A2,2,0,0,0,32,12V6A2,2,0,0,0,30,4ZM12,3a1,1,0,0,1,1-1h6a1,1,0,0,1,1,1V4H12ZM2,6H30v6H2ZM29,29a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V14H29Z"
      />
      <path
        d="M18,28H14a1,1,0,0,1-1-1V25H11a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h2V17a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v2h2a1,1,0,0,1,1,1v4a1,1,0,0,1-1,1H19v2A1,1,0,0,1,18,28Zm-3-2h2V24a1,1,0,0,1,1-1h2V21H18a1,1,0,0,1-1-1V18H15v2a1,1,0,0,1-1,1H12v2h2a1,1,0,0,1,1,1Z"
      />
      <path
        d="M7,16a1,1,0,0,1-1-1V11a1,1,0,0,1,2,0v4A1,1,0,0,1,7,16Z"
      />
      <path
        d="M25,16a1,1,0,0,1-1-1V11a1,1,0,0,1,2,0v4A1,1,0,0,1,25,16Z"
      />
    </g>
  </svg>
            </Logo>
            <div>
            <Content> {group}</Content>
            <Span>Medicine Groups</Span>
            </div>
           

            <Short onClick={()=>handleClickd(8)}>View Groups <span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span> </Short>
           </Card>
         
           <Card4>
           <Logo>
           <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#f47c71"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0618 4.4295C12.6211 3.54786 11.3635 3.54786 10.9228 4.4295L3.88996 18.5006C3.49244 19.2959 4.07057 20.2317 4.95945 20.2317H19.0252C19.914 20.2317 20.4922 19.2959 20.0947 18.5006L13.0618 4.4295ZM9.34184 3.6387C10.4339 1.45376 13.5507 1.45377 14.6428 3.63871L21.6756 17.7098C22.6608 19.6809 21.228 22 19.0252 22H4.95945C2.75657 22 1.32382 19.6809 2.30898 17.7098L9.34184 3.6387Z" fill=" #f47c71"></path> <path d="M12 8V13" stroke=" #f47c71" stroke-width="1.7" stroke-linecap="round"></path> <path d="M12 16L12 16.5" stroke=" #f47c71" stroke-width="1.7" stroke-linecap="round"></path> </g></svg>
           </Logo>
           <div>
            <Content> {short}</Content>
            <Span>Medicine Shortage</Span>
            </div>
            <Short4 onClick={()=>handleClickd(24)}>
                           Resolve Now<span style={{ paddingLeft:"5px"}}><svg fill="#000000" height="10px" width="10px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg><svg fill="#000000"  height="10px" width="10px"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M393.625,251.424L270.215,5.623C268.484,2.177,264.957,0,261.1,0H127.49c-3.538,0-6.823,1.834-8.681,4.845 s-2.021,6.768-0.435,9.931L239.488,256L118.375,497.224c-1.587,3.162-1.424,6.92,0.435,9.931S123.952,512,127.49,512H261.1 c3.857,0,7.384-2.177,9.115-5.622l123.41-245.801C395.07,257.697,395.07,254.303,393.625,251.424z M254.808,491.602H144.023 l115.992-231.024c1.445-2.88,1.445-6.275,0-9.154L144.023,20.398h110.785L373.097,256L254.808,491.602z"></path> </g> </g> <g> <g> <path d="M274.476,93.334l-3.241-6.456c-2.527-5.033-8.658-7.063-13.691-4.538c-5.034,2.527-7.066,8.657-4.539,13.691l3.241,6.456 c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.101-0.35,4.568-1.087C274.972,104.498,277.003,98.368,274.476,93.334z"></path> </g> </g> <g> <g> <path d="M353.848,251.423l-62.985-125.45c-2.527-5.034-8.658-7.064-13.691-4.538c-5.034,2.527-7.066,8.656-4.539,13.691 l62.985,125.45c1.791,3.566,5.388,5.625,9.123,5.625c1.538,0,3.1-0.35,4.568-1.087 C354.344,262.587,356.376,256.458,353.848,251.423z"></path> </g> </g> </g></svg></span>
            </Short4>
           </Card4>
           <Card4 style={{display:"hidden", background:"transparent" , border:"none"}}></Card4>
        </div>
    </Header>
    </div>
 )
}
export default HomeDashboard;