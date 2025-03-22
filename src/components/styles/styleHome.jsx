import styled from 'styled-components';
import { space, layout, color, typography, border, position } from 'styled-system';
import { useSelector } from 'react-redux';

export const Home = styled.div`
width:100vw;
display:grid;
grid-template-columns:2fr 8fr;
background-color:#edf1f5;
@media screen and (max-width: 1500px) {
  background-color:white;
grid-template-columns:1fr;
}
`
export const HomeContent = styled.div`

width:100%;
`
export const SideBar = styled.div`
  width: 100%;
  background-color: #1d242e;
  height: 100vh;
  overflow-y: scroll; /* Allows scrolling */
  overflow-x: hidden; /* Hides horizontal scroll if not needed */
  /* Remove the scrollbar appearance */
  position:relative;
  /* Custom scrollbar styles */
  &::-webkit-scrollbar {
    display: none; /* Hides the scrollbar */
  }

  /* For Firefox */
  scrollbar-width: none; /* Hides scrollbar */
  @media screen and (max-width: 1500px) {
 display: flex;  
   justify-content:center;
   align-items:center;
     flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: fit-content; 
    gap: 10px;
}
`;

export const Image = styled.img`
width:100%;
height:auto;
@media screen and (max-width: 1500px) {
  width:auto;
  height:80px;
  display:flex;
  align-items:center;
  justify-content:center;
}`
export const AdminInfo = styled.div`
height:15vh;
width:auto;
display:flex;
@media screen and (max-width: 1500px) {
 margin:0;
 padding:0;
 height:10vh;
}

`
export const PAdminInfo = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover; 
  border-radius: 15px;
`;

export const Dashboard = styled.div`
  padding-left: 30px;
  display: flex;
  align-items: center;
  border-top: 1px solid black;
  background-color: ${(props) => (props.clicked === 1 ? '#009099' : 'transparent')};
  height: 8vh;
  cursor: pointer;
  @media screen and (max-width: 1500px) {
 display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: 70px;
  border: none; padding-left:5px; 
  width:100%;
  padding: 3px;
  border-radius: 6px;
   margin:4px auto;
       backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}
`;
export const InputDiv = styled.div`
margin:auto;
padding:0;
display:flex;
align-items:center;
justify-content:center;
width:32vw;
height:9vh;
`
export const Input = styled.input`
width:100%;
padding-left:20px;
height:2vh;
margin:auto;
border:none;
border-radius:7px;
background-color:#e3ebf3;
&::placeholder {
    color: a0a0a0; 
    font-family: "DM Sans", sans-serif;
    font-size: 17px; 
  }`
export const DashboardP = styled.p`
color:white;
text-align:center;
margin:0;
 white-space: nowrap;
padding:0;
font-size:15px;
@media screen and (max-width: 1500px) {
 font-size:26px;
}

`
export const Invertory = styled.div`

  box-sizing:border-box;
display: grid;
width:100%;
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: auto;
cursor:pointer;  
 background-color: ${(props) => (props.clicked === 13 ? '#009099' : 'transparent')};
 @media screen and (max-width: 1500px) {
  position:relative;
  min-height: 70px;
  display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: fit-content;
      width:100%;
  border: none; padding-left:5px; 
    box-sizing:unset;
  padding: 3px;
  border-radius: 6px;
  margin:4px auto;
 backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}
`
export const InvertoryC = styled.div`

display:grid;
grid-template-columns:1fr 1fr;
align-items:center;
height:fit-content;
cursor:pointer;  
 background-color: ${(props) => (props.clicked === 11 ? '#009099' : 'transparent')};
  @media screen and (max-width: 1500px) {
 position:relative;
  display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
      width:100%;
  border: none; padding-left:5px; 
  height:fit-contnent;
  min-height: 70px;

padding:3px;
  border-radius: 6px;
  margin:4px auto;
 backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}
`
export const Invertorys = styled.div`
display:grid;
grid-template-columns:1fr 1fr;
align-items:center;
height:fit-content;
cursor:pointer;  
 background-color: ${(props) => (props.clicked === 15 ? '#009099' : 'transparent')};
   @media screen and (max-width: 1500px) {
 position:relative;
  display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: fit-content;
      min-height: 70px;
      width:100%;
  border: none; padding-left:5px; 
  padding: 3px;
  border-radius: 6px;
  margin:4px auto;
 backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}
`
export const Configuration = styled.div`
padding-left:30px;
display:flex;
align-items:center;
border-bottom:1px solid white;
height:8vh;
cursor:pointer;
padding-left:30px;
display:flex;
align-items:center;
border-top:1px solid black;
 background-color: ${(props) => (props.clicked === 2 ? '#009099' : 'transparent')};
height:8vh;
cursor:pointer;
 @media screen and (max-width: 1500px) {
 position:relative;
  display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: 70px;
      width:100%;
  border: none; padding-left:5px; 
  padding: 3px;
  border-radius: 6px;
  margin:4px auto;
 backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}
`
export const Notification = styled.div`
padding-left:30px;
display:flex;
align-items:center;
border-bottom:1px solid white;
height:8vh;
cursor:pointer;
padding-left:30px;
display:flex;
align-items:center;
border-top:1px solid black;
 background-color: ${(props) => (props.clicked === 3 ? '#009099' : 'transparent')};
height:8vh;
cursor:pointer;
 @media screen and (max-width: 1500px) {
 
  display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: 70px;
      width:100%;
  border: none; padding-left:5px; 
  padding: 3px;
  border-radius: 6px;
  margin:4px auto;
   backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}

`
export const Application = styled.div`
padding-left:30px;
align-items:center;
border-bottom:1px solid white;
height:8vh;
cursor:pointer;
padding-left:30px;
display:flex;
align-items:center;
border-top:1px solid black;
 background-color: ${(props) => (props.clicked === 4 ? '#009099' : 'transparent')};
height:8vh;
cursor:pointer;
 @media screen and (max-width: 1500px) {
 
  display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: 70px;
      width:100%;
  border: none; padding-left:5px; 
  padding: 3px;
  border-radius: 6px;
    margin:4px auto;
   backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}
`
export const Get = styled.div`
padding-left:30px;
display:flex;
align-items:center;
border-bottom:1px solid white;
height:8vh;
cursor:pointer;
  background-color: ${(props) => (props.clicked === 5 ? '#009099' : 'transparent')};
height:8vh;
cursor:pointer;
 @media screen and (max-width: 1500px) {
 
  display: flex;         /* Enable flexbox */
    flex-wrap: wrap;      /* Allow items to wrap onto new lines */
    height: 70px;
  border: none; padding-left:5px; 
  padding: 3px;
    width:100%;
  border-radius: 6px;
  margin:4px auto;
   backdrop-filter: blur(100px); 
       background-color: rgba(255, 255, 255, 0.1);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        justify-content:center;
}
`
export const P = styled.p`
text-align:center;
display:block;
 color:white; 
     background-color: ${(props) => (props.clicked === 7 ? '#009099' : '#1a222b')};
     padding-top:25px;
       padding-bottom:20px;
       margin-top:0;
        margin-bottom:0;
         font-family:DM Sans ;
         font-size:14px;
         @media screen and (max-width: 1500px) {
   width:100%;
     padding-left:0px;
     padding-right:0px;
     margin-right:0;
     margin-left:0;
     font-size:25px;
     text-align:center;
   z-index:999;
        border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
         `
export const P2 = styled.p`
text-align:center;
display:block;
 color:white; 
     background-color: ${(props) => (props.clicked === 8 ? '#009099' : '#1a222b')};
     padding-top:25px;
       padding-bottom:20px;
       margin-top:0;
        margin-bottom:0;
         font-family:DM Sans ;
         font-size:14px;
            @media screen and (max-width: 1500px) {
     padding-left:0px;
     padding-right:0px;
     margin-right:0;
     margin-left:0;
     font-size:25px;
     text-align:center;
   z-index:999;
        border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
`
export const P7 = styled.p`
text-align:center;
display:block;
 color:white; 
     background-color: ${(props) => (props.clicked === 101 ? '#009099' : '#1a222b')};
     padding-top:25px;
       padding-bottom:20px;
       margin-top:0;
        margin-bottom:0;
         font-family:DM Sans ;
         font-size:14px;
           @media screen and (max-width: 1500px) {
    width:100%;
     font-size:25px;
     text-align:center;
     z-index:999;
     margin-right:0;
     margin-left:0;
     padding-left:0;
     padding-right:0;
      border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
`
export const P3 = styled.p`
text-align:center;
display:block;
 color:white;  
     background-color: ${(props) => (props.clicked === 9 ? '#009099' : '#1a222b')};
     padding-top:25px;
       padding-bottom:20px;
       margin-top:0;
        margin-bottom:0;
         font-family:DM Sans ;
         font-size:14px;
            @media screen and (max-width: 1500px) {
    width:100%;
     font-size:25px;
     text-align:center;
     z-index:999;
     margin-right:0;
     margin-left:0;
     padding-left:0;
     padding-right:0;
      border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
`
export const P6 = styled.p`
display:block;
text-align:center;
 color:white; 
     background-color: ${(props) => (props.clicked === 18 ? '#009099' : '#1a222b')};
     padding-top:25px;
       padding-bottom:20px;
       margin-top:0;
        margin-bottom:0;
         font-family:DM Sans ;
         font-size:14px;
    @media screen and (max-width: 1500px) {
    width:100%;
     font-size:25px;
     text-align:center;
     z-index:999;
     margin-right:0;
     margin-left:0;
     padding-left:0;
     padding-right:0;
      border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
`
export const P4 = styled.p`
text-align:center;
display:block;
 color:white; 
     background-color: ${(props) => (props.clicked === 10 ? '#009099' : '#1a222b')};
     padding-top:25px;
       padding-bottom:20px;
       margin-top:0;
        margin-bottom:0;
         font-family:DM Sans ;
         font-size:14px;
        @media screen and (max-width: 1500px) {
    width:100%;
     font-size:25px;
     text-align:center;
     z-index:999;
     margin-right:0;
     margin-left:0;
     padding-left:0;
     padding-right:0;
      border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
`
export const P5 = styled.p`
text-align:center;
display:block;
 color:white;  
     background-color: ${(props) => (props.clicked === 17 ? '#009099' : '#1a222b')};
     padding-top:25px;
       padding-bottom:20px;
       margin-top:0;
        margin-bottom:0;
         font-family:DM Sans ;
         font-size:14px;
            @media screen and (max-width: 1500px) {
    width:100%;
     font-size:25px;
     text-align:center;
     z-index:999;
     margin-right:0;
     margin-left:0;
     padding-left:0;
     padding-right:0;
      border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
}
`
export const Fotter  = styled.p`
background:transparent;
font-size:15px;
color:white;
text-align:center;
align-items:center;
padding-top:7%;
margin:0;
font-family: "DM Sans", sans-serif;
@media screen and (max-width: 1500px) {
display:none;
}
`

export const Header = styled.div`
height:11vh;
background-color:white;
display:grid;
width:100%;
grid-template-columns:1fr 1fr;
 @media screen and (max-width: 1500px) {
 display:none;

}
`

export const LanguageWithDate = styled.div`
 height: 
 width:45vw;
 display:flex;
 justify-content:space-between;
 padding-left:20%;
 gap:20px;
 padding-right:5%;
 align-items:center;
`
export const DateDisplay = styled.span`
  padding-left:10px;
  font-size: 16px;
   display:grid;
   height:9vh;
   justify-content: flex-end;
  width:500px;
  color: #555;
  p{
  margin:0;}
`;
export const IconWrapper = styled.span`
  margin-right: 8px;
`;
