import * as React from "react";

import styles from "../../../styles/ScoreCard.module.scss";

/////icons import

import prodIcon from "../../../styles/icons/prod.png";
import availIcon from "../../../styles/icons/avail.png";
import CsatIcon from "../../../styles/icons/Csat.png";
import QualIcon from "../../../styles/icons/Quality.png";
import MonthIcon from "../../../styles/icons/MonthG.png";


interface IHexDataShowProps {
  currentAnalyst: any;
}

const HexDataShow: React.FC<IHexDataShowProps> = ({ currentAnalyst }) => {
  const SC = currentAnalyst.Scorecard;
  return (
    <div>
      <div className={styles.hex + " " + styles.hexrow}>
        <img src={prodIcon} style={{ width: "40px", height: "40px" }} />
        <br></br>
        Productivity
        <div className={styles.subhex + " " + styles.hex}>
          <h1 style={{ color: "GreenYellow" }}>
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
          <h1 style={{ color: "Green" }}>
            {SC.Availability.percentage}%
          </h1>
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
          <h1 style={{ color: "Yellow" }}>
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
          <h1 style={{ color: "Orange" }}>{SC.MonthGoal}112</h1>
        </div>
      </div>

      <div className={styles.hex + " " + styles.hexrow}>
        <img src={CsatIcon} style={{ width: "40px", height: "40px" }} />
        <br></br>
        Csat
        <div
          
          className={styles.subhex + " " + styles.hex}
        >
          <h1 style={{ color: "red" }}>
            {currentAnalyst.Scorecard.Csat}
          </h1>
        </div>
      </div>
    </div>
  );
};

//

export default HexDataShow;
