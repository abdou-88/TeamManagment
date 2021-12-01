import * as React from "react";
import { useState, useEffect } from "react";
import styles from "../../styles/ScoreCard.module.scss";


import {ChartComp} from "./ChartComp";
import HexMenu from "./HexMenu";
import {MultiLineCmntField} from "./MultiLineCmntField";
import  SLAArea from "./SLAArea";

export interface IMainProps {
  ProjectName: string;
  currentAnalyst: any;
  chartsData:any;
}

const AnalystsName = [
  "Rejit, Adam",
  "Youssfi, Abi",
  "Lewinska, Ewa",
  "Rejit, Adam",
  "Youssfi, Abdellah",
  "Lewinska, Ewa",
  "Rejit, Adam",
  "Youssfi, Abdellah",
  "Lewinska, Ewa",
  "Youssfi, Abdellah",
  "Lewinska, Ewa",
  "Rejit, Adam",
  "Youssfi, Abdellah",
  "Lewinska, Ewa",
  "Rejit, Adam",
];

export const MainContener: React.FC<{ ProjectName: string;  currentAnalyst: any;  chartsData:any;}> = (props) => {


  /// chart data manipulation
  let prodData = [];
  let prodCategories = [];
  let avData = [];
  let avCategories = [];
  
  
  props.chartsData.ProdOptions.sort( (a, b) => {
    return a[1] - b[1];
  }).forEach((element:any) => {
    prodData.push(element[1]);
    prodCategories.push(element[0]);
  });

  props.chartsData.AvOptions.sort( (a, b) => {
    return a[1] - b[1];
  }).forEach((element: any) => {
    avData.push(element[1]);
    avCategories.push(element[0]);
  });

 
 

  const [prodCat, setprodCat] = useState([]);
  const [prodDa, setprodDa] = useState([]);

  const [avCat, setAvCat] = useState([]);
  const [avDa, setAvDa] = useState([]);

  


  useEffect(() => {
    setprodDa(prodData);
    setprodCat(prodCategories);
    setAvCat(avCategories);
    setAvDa(avData);
  }, [props.chartsData]);
  
  ///////////////////////////////////
  

    return (
      <div className={styles.TeamScoreCard}>
        <span className={styles.title}>
          {props.currentAnalyst.AnalystName} ScoreCard
        </span>

        <div className={styles.parent}>
          <div className={styles.div1}>
            <HexMenu currentAnalyst={props.currentAnalyst}></HexMenu>
          </div>

          <div className={styles.div2}>
            <span className={styles.subTitle}>Team Productivity</span>
            <ChartComp
              data={prodDa}
              categories={prodCat}
              annotation={"95"}
              title={"Productivity"}
            ></ChartComp>
            <span className={styles.subTitle}>Team Availablity</span>
            <ChartComp
              data={avDa}
              categories={avCat}
              annotation={"80"}
              title={"Availablity"}
            ></ChartComp>
          </div>
          <div className={styles.div3}>
            <MultiLineCmntField
              comment={props.currentAnalyst.Scorecard.Comment}
              visibility={true}
              edit={false}
            ></MultiLineCmntField>
            <br></br>
            <span className={styles.subTitle}>Current Month SLA(s):</span>
          </div>
        </div>

        <SLAArea></SLAArea>
      </div>
    );
  
};
