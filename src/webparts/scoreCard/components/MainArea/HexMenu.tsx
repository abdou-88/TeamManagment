import * as React from "react";

import styles from "../../styles/ScoreCard.module.scss";

/////icons import

import prodIcon from "../../styles/icons/prod.png";
import availIcon from "../../styles/icons/avail.png";
import CsatIcon from "../../styles/icons/Csat.png";
import QualIcon from "../../styles/icons/Quality.png";
import MonthIcon from "../../styles/icons/MonthG.png";


interface IHexMenuProps {
  currentAnalyst: any;
}

 const HexMenu: React.FC<IHexMenuProps> = ({ currentAnalyst }) => { 
  const SC = currentAnalyst.Scorecard; 
  return (
   <div className={styles.hexContent} >
     <div className={styles.Mbutton}>
       <div className={styles.Mhex}>
         <div></div>
         <div></div>
         <div></div>
       </div>
       <div className={styles.Mhex}>
         <div></div>
         <div></div>
         <div></div>
       </div>
     </div>
     <div className={styles.hex + " " + styles.hexrow}>
       <img src={prodIcon} style={{ width: "40px", height: "40px" }} />
       <br></br>
       Productivity
       <div className={styles.subhex + " " + styles.hex}>
         <h1>
           {(parseInt(SC.productivity.Calls.percentage) +
             parseInt(SC.productivity.Emails.percentage)) /
             2}
           %
         </h1>
         <div className={styles.subhex + " " + styles.hex}>
           <h1>Calls</h1>
           <div className={styles.subhex + " " + styles.hex}>
             <br></br>
             Count
             <br></br>
             {SC.productivity.Calls.Count}
           </div>
           <div
             className={styles.subhex + " " + styles.hex + " " + styles.bottom}
           >
             <br></br>Percentage<br></br>
             {SC.productivity.Calls.percentage}%
           </div>
         </div>
         <div
           className={styles.subhex + " " + styles.hex + " " + styles.bottom}
         >
           <h1>Email</h1>
           <div className={styles.subhex + " " + styles.hex}>
             <br></br>Count<br></br>
             {SC.productivity.Emails.Count}
           </div>
           <div
             className={styles.subhex + " " + styles.hex + " " + styles.bottom}
           >
             <br></br>Percentage<br></br>
             {SC.productivity.Emails.percentage}%
           </div>
         </div>
       </div>
     </div>
     <div className={styles.hex + " " + styles.hexrow + " " + styles.even}>
       <img src={availIcon} style={{ width: "40px", height: "40px" }} />
       <br></br>
       Availability
       <div className={styles.subhex + " " + styles.hex}>
         <h1>{SC.Availability.percentage}%</h1>
         <div
           className={styles.subhex + " " + styles.hex + " " + styles.bottom}
         >
           <br></br>Rona<br></br>
           {SC.Availability.Rona}
         </div>
         <div className={styles.subhex + " " + styles.hex + " " + styles.top}>
           <br></br>Break average<br></br>
           soon!!
         </div>
       </div>
     </div>
     <div className={styles.hex + " " + styles.hexrow}>
       <img src={QualIcon} style={{ width: "40px", height: "40px" }} />
       <br></br>
       Quality
       <div className={styles.subhex + " " + styles.hex}>
         <h1>
           {(parseInt(SC.Quality.Calls) + parseInt(SC.Quality.Tickets)) / 2}%
         </h1>
         <div
           className={styles.subhex + " " + styles.hex + " " + styles.bottom}
         >
           <br></br>Tickets<br></br>
           {SC.Quality.Tickets}%
         </div>
         <div className={styles.subhex + " " + styles.hex + " " + styles.top}>
           <br></br>Calls<br></br>
           {SC.Quality.Calls}%
         </div>
       </div>
     </div>
     <div className={styles.hex + " " + styles.hexrow + " " + styles.even}>
       <img src={MonthIcon} style={{ width: "40px", height: "40px" }} />
       <br></br>
       Month Goal
       <div className={styles.subhex + " " + styles.hex}>
         <h1>{SC.MonthGoal}</h1>
       </div>
     </div>
     <div className={styles.hex + " " + styles.hexrow}>
       <img src={CsatIcon} style={{ width: "40px", height: "40px" }} />
       <br></br>
       Csat
       <div className={styles.subhex + " " + styles.hex}>
         <h1>{currentAnalyst.Scorecard.Csat}</h1>
       </div>
     </div>
     {/* separator */}
     <div
       className={
         styles.hex +
         " " +
         styles.hexrow +
         " " +
         styles.evenfar +
         " " +
         styles.subhexHalfVisible
       }
     >
       <div
         className={
           styles.subhex +
           " " +
           styles.hex +
           " " +
           styles.top +
           " " +
           styles.subhexHalfVisible
         }
       >
         <div
           className={
             styles.subhex +
             " " +
             styles.hex +
             " " +
             styles.top +
             " " +
             styles.subhexHalfVisible
           }
         >
           <div
             className={
               styles.subhex +
               " " +
               styles.hex +
               " " +
               styles.top +
               " " +
               styles.subhexHalfVisible
             }
           >
             <div
               className={
                 styles.subhex +
                 " " +
                 styles.hex +
                 " " +
                 styles.top +
                 " " +
                 styles.subhexHalfVisible
               }
             ></div>
           </div>
         </div>
       </div>
     </div>

     {/* Cooment hex area */}

     <div className={styles.hex + " " + styles.hexrow + " " + styles.Commnet}>
       Submit Comment
       {/* <div className={styles.cmntDiv}>
              You did a great job this month keep it up bro :D !! but may be try
              harder bla bla bla bla bla bla bla bla 11bla bla bla bla bla bla
            </div> */}
     </div>
   </div>
 );};

    //

   
 
  export default HexMenu;