import * as React from "react";

import styles from "../../../styles/ScoreCard.module.scss";

/////icons import


interface IHexSeparatorProps {
  GradType: string;
}

const HexSeparator: React.FC<IHexSeparatorProps> = ({ GradType }) => {
  const emptyGra = ["", "", "", "", ""];
  const ProdGra = [
    "Performance Improvement Plan",
    "Needs Improvement",
    "Somewhat Meets Expectations",
    "Meets Expectations",
    "Exceeds Expectations",
  ];
  const qualGra = [
    "Needs Improvement",
    "Meets Expectations",
    "Exceeds Expectations",
    "",
    "",
  ];
  ////
  const emptyColor = [
    styles.subhexHalfVisible,
    styles.subhexHalfVisible,
    styles.subhexHalfVisible,
    styles.subhexHalfVisible,
    styles.subhexHalfVisible,
  ];
  const prodColors = [
    styles.Red,
    styles.Orange,
    styles.Yellow,
    styles.GreenYellow,
    styles.Green,
  ];
  const qualColors = [
    styles.Red,
    styles.GreenYellow,
    styles.Green,
    styles.subhexHalfVisible,
    styles.subhexHalfVisible,
  ];

  // state to store the separator 3 different status nutral PRod and Av or qual
  const [gradString, setGradString] = React.useState(emptyGra);

  const [gradColors, setGradColors] = React.useState(emptyColor);

  React.useEffect(() => {
    if(GradType ==="Qu"){
      setGradString(qualGra);
      setGradColors(qualColors);
    }
    if (GradType === "Pr") {
      setGradString(ProdGra);
      setGradColors(prodColors);
    }
    if (GradType === "") {
      setGradString(emptyGra);
      setGradColors(emptyColor);
    }
    
    
  }, [GradType]);

  //styling variables to reduce code
  const hexTopStyle = styles.subhex + " " + styles.hex + " " + styles.top + " ";
  const mainSepDivStyle =
    styles.hex + " " + styles.hexrow + " " + styles.evenfar + " ";

  return (
    <div className={mainSepDivStyle + gradColors[0]}>
      {gradString[0]}
      <div className={hexTopStyle + gradColors[1]}>
        {gradString[1]}
        <div className={hexTopStyle + gradColors[2]}>
          {gradString[2]}
          <div className={hexTopStyle + gradColors[3]}>
            {gradString[3]}
            <div className={hexTopStyle + gradColors[4]}>{gradString[4]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

//

export default HexSeparator;
