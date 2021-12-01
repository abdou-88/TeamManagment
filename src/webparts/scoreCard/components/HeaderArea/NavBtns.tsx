import * as React from "react";
import styles from '../../styles/MonthPicker.module.scss';

interface NavBtnsProps {
  
  Y: any;
  M: any;
  onNavClick: (m: string, lastI: boolean) => number;
}

export const NavBtns: React.FC<NavBtnsProps> = ({ Y,M, onNavClick }) => {


  //style var
  
  const rightB = styles.arrow + ' ' + styles.circle + " " + styles.right +" "+ styles.rightcorner;
  const leftB  =  styles.arrow +" " +styles.circle +" " +styles.left +" " + styles.leftcorner;
  //////
  const yearMonths = [
    ["01",  "January"],
    ["02",  "February"],
    ["03",  "March"],
    ["04",  "April"],
    ["05",  "May"],
    ["06",  "June"],
    ["07",  "July"],
    ["08",  "August"],
    ["09",  "September"],
    ["10",  "October"],
    ["11",  "November"],
    ["12",  "December"],
  ];
  let monthName = "";
  yearMonths.forEach((month) =>  {
    if (month[0] == M){
       monthName = month[1];
    } 
  });
  ////
  function increase(){
     M = parseInt(M) + 1;
     if(M <= 10){M="0"+M;}
     console.log(M);
  }
   const decrease = () => {
     M = parseInt(M) - 1;
     if(M <= 10){M="0"+M;}
     console.log(M);
   };

  return (
    <div className={styles.mainMonthPick}>
      <div onClick={() => {increase(); onNavClick(Y + "-" + M, false); }}>
        <div className={rightB}></div>
        <div className={rightB}></div>
      </div>

      <span>{monthName+' '+Y}</span>

      <div onClick={() => {decrease(); onNavClick(Y + "-" + M, false);}}>
        <div className={leftB}></div>
        <div className={leftB}></div>
      </div>
    </div>
  );
};



