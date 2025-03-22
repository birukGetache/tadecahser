import {Header1 , Body , TextWithDownload1 , P, S , Card , Short , Content , Logo , Span , Card2 ,Short2 , Card3 , Short3 , Short4 , Card4 , Body1 ,  HeaderBody , ContentBody , Pmain , Psmall} from './HomeDashboard';
import styled from 'styled-components';
import RevenueCalendar from './RevenueCalendar';
import EllipsisMenu from './EllipsisMenu';
import FilterControls from './FilterControl'
import GraphWithData from './GraphWithData';
import { useSelector } from 'react-redux'; 
const SvgWrapper = styled.svg`
  height: 40px;
  width: 40px;
  fill: #fed812;
`;
const HomeDashboard = () =>{
  const settings = useSelector((state) => state.settings);
  const isDarkTheme = settings.displaySettings.theme === 'dark';
  const backgroundColor = isDarkTheme ? '#2c3e50' : '#edf1f5';
  const textColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
  const borderColor = isDarkTheme ? '#555' : '#dedede';
  const selectBorderColor = isDarkTheme ? '#555' : '#ccc';
  const labelColor = isDarkTheme ? '#ecf0f1' : '#2c3e50';
 return(
    <div style={{backgroundColor  , display:"grid"  ,gridTemplateRows:"1fr 3fr" , overflowY:"auto" , height:"89vh" , boxSizing:"border-box"}} className='salesReportOne'>
    <Header1>
      <TextWithDownload1>
        <div>
        <P style={{color:textColor}}>Sale Report</P>
        <S style={{color:textColor}}>Quick data over view of Invertory</S>
        </div>
      
     <EllipsisMenu></EllipsisMenu>
        </TextWithDownload1>
        <div style={{display:"flex" , justifyContent:"center" , gap:"28px"  ,height:"60%"}} className='hidden'>
          
        </div>
    </Header1>
    <Body style={{color:"#555" ,paddingLeft:"30px", paddingRight:"30px", display:"grid",gap:"25px" , gridTemplateColumns:"1fr"  , height:"10vh"}}>
    <FilterControls></FilterControls>
    <GraphWithData></GraphWithData>
    </Body>
    </div>
 )
}
export default HomeDashboard;