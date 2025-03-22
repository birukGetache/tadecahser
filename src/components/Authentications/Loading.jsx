import { useEffect } from "react";
import { gsap } from "gsap/gsap-core";
const Loading =() =>{
    useEffect(()=>{
        
gsap.fromTo(
    ".logo-name",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 2,
      delay: 0.5,
    }
  );
    },[])
    return(
        <div>
             <svg className="svg">
        <symbol id="text">
            <text text-anchor="middle" x="50%" y="50%">T</text>
        </symbol>
        <use xlinkHref="#text"></use>
    </svg>
    <div className="name-container">
        <div className="logo-name">
            Tade Pharamacy
        </div>

    </div>
        </div>
       
    )
}
export default Loading;