import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/ScoreCard.module.scss";


import {ChartComp} from "./ChartComp";
import HexMenu from "./HexArea/HexMenu";
import {MultiLineCmntField} from "./MultiLineCmntField";
import  {SLAArea} from "./SLAArea";

export interface IMainProps {
  ProjectName: string;
  currentAnalyst: any;
  chartsData:any;
  slaData: string[];
}


export const MainContener: React.FC<{
  ProjectName: string;
  currentAnalyst: any;
  chartsData: any;
  slaData : string[];
}> = (props) => {

  /// chart data manipulation
  let prodData = [];
  let prodCategories = [];
  let avData = [];
  let avCategories = [];
  let qualData = [];
  let qualCategories = [];

  props.chartsData.ProdOptions.sort((a, b) => {
    return a[1] - b[1];
  }).forEach((element: any) => {
    prodData.push(element[1]);
    prodCategories.push(element[0]);
  });

  props.chartsData.AvOptions.sort((a, b) => {
    return a[1] - b[1];
  }).forEach((element: any) => {
    avData.push(element[1]);
    avCategories.push(element[0]);
  });

  props.chartsData.AvOptions.sort((a, b) => {
    return a[1] - b[1];
  }).forEach((element: any) => {
    qualData.push(element[1]);
    qualCategories.push(element[0]);
  });


  const [prodCat, setprodCat] = useState([]);
  const [prodDa, setprodDa] = useState([]);

  const [avCat, setAvCat] = useState([]);
  const [avDa, setAvDa] = useState([]);

  const [qualCat, setQualCat] = useState([]);
  const [qualDa, setQualDa] = useState([]);

  const [cmntTxt,setCmntTxt] = React.useState<string>("");
  const [cmntdisabled, setCmntDisabled] = React.useState<boolean>(false);
  

  useEffect(() => {
    setprodDa(prodData);
    setprodCat(prodCategories);
    setAvCat(avCategories);
    setAvDa(avData);
    setQualCat(qualCategories);
    setQualDa(qualData);
  }, [props.chartsData]);

  useEffect(() => {
    setCmntTxt(props.currentAnalyst.Scorecard.Comment);
  }, [props.currentAnalyst.Scorecard.Comment]);




  function handleCmntClick(){
    setCmntTxt("");
    setCmntDisabled(true);
    
  }
  function handleCancelClick(){
    
    setCmntTxt(props.currentAnalyst.Scorecard.Comment);
    setCmntDisabled(false);
    
  }
  ///////////////////////////////////

  return (
    <div className={styles.TeamScoreCard}>
      <span className={styles.title}>
        {props.currentAnalyst.AnalystName} ScoreCard
      </span>

      <div className={styles.parent}>
        <div className={styles.div1}>
          <HexMenu
            currentAnalyst={props.currentAnalyst}
            handleCmntClick={handleCmntClick}
          ></HexMenu>
        </div>

        <div className={styles.div2}>
          <span className={styles.subTitle}>Team Productivity</span>
          <ChartComp
            data={prodDa}
            categories={prodCat}
            annotation={"95"}
            title={"Productivity"}
            color={({ value, seriesIndex, w }) => {
              if (value < 95) {
                return "rgb(255, 0, 0)";
              } else {
                return "rgb(12, 158, 217)";
              }
            }}
          ></ChartComp>
          <span className={styles.subTitle}>Team Availability</span>
          <ChartComp
            data={avDa}
            categories={avCat}
            annotation={"80"}
            title={"Availability"}
            color={({ value, seriesIndex, w }) => {
              if (value < 80) {
                return "rgb(255, 0, 0)";
              } else {
                return "rgb(12, 158, 217)";
              }
            }}
          ></ChartComp>
          <span className={styles.subTitle}>Team Quality</span>
          <ChartComp
            data={qualDa}
            categories={qualCat}
            annotation={"85"}
            title={"Quality"}
            color={({ value, seriesIndex, w }) => {
              if (value < 85) {
                return "rgb(255, 0, 0)";
              } else {
                return "rgb(12, 158, 217)";
              }
            }}
          ></ChartComp>
        </div>
        <div className={styles.div3}>
          <MultiLineCmntField
            comment={cmntTxt}
            edit={cmntdisabled}
            
            onCancelClicked={handleCancelClick}
          ></MultiLineCmntField>
          <br></br>
          <span className={styles.subTitle}>Current Month SLA(s):</span>
        </div>
      </div>

      <SLAArea data={props.slaData}></SLAArea>
    </div>
  );
};
