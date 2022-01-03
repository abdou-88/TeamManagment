import * as React from "react";

import styles from "../../../styles/ScoreCard.module.scss";

/////icons import


import { Hexinfo } from "./Hexinfo";
import HexSeparator from "./HexSeparator";
import HexDataShow from "./HexDataShow";



interface IHexMenuProps {
  currentAnalyst: any;
  handleCmntClick: () => void;
}

 const HexMenu: React.FC<IHexMenuProps> = ({ currentAnalyst, handleCmntClick }) => { 
  
  const [g, setG] = React.useState("");

  function handleGradeChange(e) {
    setG(e);
    setTimeout(() => {
      setG("");
    }, 5000);
  }


  return (
    <div className={styles.hexContent}>
      <Hexinfo onchangeGrad={handleGradeChange} onCmntClicked={()=> handleCmntClick()}></Hexinfo>
      <HexDataShow currentAnalyst={currentAnalyst}></HexDataShow>
      <HexSeparator GradType={g}></HexSeparator>
    </div>
  );};

 

   
 
  export default HexMenu;