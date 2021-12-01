import * as React from "react";
import styles from "../../styles/Header.module.scss";

import { useState } from "react";


import CaldrIcom from "../../styles/icons/calendarwhite.png";

interface HeaderProps {
  options: string[];
  HeaderStatus: string;
  onChangeName: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onMonthClick: (y: number, m:any) => void;
}


const Header: React.FC<HeaderProps> = ({ options, onChangeName, onMonthClick, HeaderStatus }) => {




const rightB = styles.arrow + ' ' + styles.circle + " " + styles.right +" "+ styles.rightcorner;
const leftB  =  styles.arrow +" " +styles.circle +" " +styles.left +" " + styles.leftcorner;


  const yearMonths = [
    ["01", "Jan", "January"],
    ["02", "Feb", "February"],
    ["03", "Mar", "March"],
    ["04", "Apr", "April"],
    ["05", "May", "May"],
    ["06", "Jun", "June"],
    ["07", "Jul", "July"],
    ["08", "Aug", "August"],
    ["09", "Sep", "September"],
    ["10", "Oct", "October"],
    ["11", "Nov", "November"],
    ["12", "Dec", "December"],
  ];

  const [height, setheight] = useState('0px');
  const [display, setDisplay] =useState("none");
  const [expended, setExpended] = useState(false);
  const [year, setYear] = useState(new Date().getFullYear());


  const  expendH =() =>{

    expended ? setheight("0px") : setheight("150px");
    expended ? setDisplay("none"): setTimeout(() => setDisplay("block"), 200);
    expended ? setExpended(false) : setExpended(true);
    
  };


 
  return (
    <div>
      <div className={styles.HeaderRow}>

        <div className={styles.HeaderColumn + " " + styles.colName}>
          {HeaderStatus}
        </div>

        <div className={styles.HeaderColumn + " " + styles.colMonth}>
          <img onClick={expendH} src={CaldrIcom} className={styles.iconCal} />
        </div>

        <div className={styles.HeaderColumn + " " + styles.colInfo}>
          <label htmlFor="AName">Name : </label>

          <select onChange={(e) => onChangeName(e)} name="AName">
            {options.map((option) => (
              <option>{option}</option>
            ))}
          </select>
        </div>

      </div>
      {/* /////calendar // */}

      <div className={styles.HeaderExpender} style={{ height: height }}>

        <div className={styles.boxCalendar} style={{ display: display }}>

          <div className={leftB} onClick={() => setYear(year - 1)}></div>
          <div className={styles.yearCell}>{year}</div>
          <div className={rightB} onClick={() => setYear(year + 1)}></div>

          <div className={styles.calendarContainer}>
            {yearMonths.map((month) => (
              <button
                onClick={() => {
                  onMonthClick(year, month[0]);
                  expendH();
                }}
                className={styles.cell}
              >
                {month[1]}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};




export default Header;
