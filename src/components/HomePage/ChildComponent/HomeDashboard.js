import styled from 'styled-components';

export const Header = styled.div`
height:44vh;
margin:0;
padding-left:34px;
padding-right:32px;
 @media screen and (max-width: 1500px) {
  height:fit-content;
padding-left:0;
padding-right:0;
}
`
export const Header1 = styled.div`
height:20vh;
margin:0;
padding-left:34px;
padding-right:32px;
 @media screen and (max-width: 1500px) {
padding-left:10px;
padding-right:10px;
width:calc(100vw - 20px);
}
`

export const Body = styled.div`
height:45vh;
margin:0;
background:transparent;
 @media screen and (max-width: 800px) {
 grid-template-columns:1fr !important;
height:fit-content;
margin: 10px 0px;
padding-left:0px !important;
padding-right:0px !important;
box-size:border-box ;
}
`
export const TextWithDownload = styled.div`
display:flex;
justify-content:space-between;
height:35%;
 @media screen and (max-width: 1500px) {
 width:100vw;
   display:grid;
   place-content:center;
   place-items:center;
   gap:3px;}
`
export const TextWithDownload1 = styled.div`
display:flex;
justify-content:space-between;
height:20%;

`
export const P = styled.p`
font-size:30px;
font-weight:bold;
padding-bottom:10px;
margin-bottom:0;
 font-family: "Poppins", sans-serif;
`
export const P1 = styled.p`
font-size:30px;
font-weight:bold;
padding-bottom:10px;
margin-bottom:0;
 font-family: "Poppins", sans-serif;
`
export const Card = styled.div`
width:24%;
height:85%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;
 border:2px solid #55b975;
 @media screen and (max-width: 1500px) {
  width: 230px;
  height:180px;

}
`
export const Card2 = styled.div`
width:24%;
height:85%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;
 border:3px solid #f2eaaa;
  @media screen and (max-width: 1500px) {
  width: 230px;
  height:180px;

}
`
export const Card3 = styled.div`
width:24%;
height:85%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;
 border:3px solid #40c0f7;
  @media screen and (max-width: 1500px) {
  width: 230px;
  height:180px;

}
`
export const Card4 = styled.div`
width:24%;
height:85%;
display:grid;
 grid-template-rows: 3fr 3fr 2fr;
 background-color:white;
 border-radius:9px;
 border:3px solid #eec2c1;
  @media screen and (max-width: 1500px) {
  width: 230px;
  height:180px;

}
`

export const Logo = styled.div`
display:flex;
justify-content:center;
align-items:center;
`
export const Span = styled.p`
display: flex;
  justify-content: center; /* Corrected typo */
  align-items: center; /* Vertically centers content */
  text-align: center;
  font-weight:bold;
  font-size:21px;
  margin:0;
 font-family: "Poppins", sans-serif;`
export const Content = styled.div`
display:flex;
justify-content:center;
font-weight:bold;
font-size:30px;
 font-family: "Poppins", sans-serif;
 margin-top:-10px;`
export const Short = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-top:2px solid #55b975;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;
background-color:#a6daca;`
export const Short2 = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-top:2px solid #fae579;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;
background-color:#f2e8ab;`
export const Short3 = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-top:2px solid #40c0f7;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;
background-color:#a7dbf5;`
export const Short4 = styled.div`
display:flex;
justify-content:center;
align-items:center;
border-top:2px solid #f38584;
font-weight:bold;
 font-family: "Poppins", sans-serif;
 cursor:pointer;
background-color:#edbebe;`
export const S = styled.span`
 font-family: "Poppins", sans-serif;
 font-weight:normal;
 margin

 `
export const S1 = styled.span`
 font-family: "Poppins", sans-serif;
 font-weight:normal;
 `
 export const Body1 = styled.div`
 display:grid;
 grid-template-rows:1fr 2fr;
  border: 2px solid #ccc;
  border-radius:3px;
  height:18vh;
   @media screen and (max-width: 800px) {
 
height:fit-content;
}
 `
 export const HeaderBody = styled.div`
 display:flex;
 justify-content:space-between;
 padding-left:20px;
 padding-right:20px;
 height:6vh;
 align-items:center;
 font-weight:bold;
 font-size:20px;
 color:black;
 font-family: "Poppins", sans-serif;
 border-bottom:2px solid #ccc;
 `
 export const Pmain = styled.p`
 color:black;
 font-size:24px;
font-weight:bold;
 font-family: "Poppins", sans-serif;
  margin:0;
  margin-top:10px;
  margin-left:20px;
 `
 export const Psmall = styled.p`
 margin-left:20px;
 `
 export const ContentBody = styled.div`
 display:grid;
 grid-template-columns:1fr 1fr;
 `
