import * as React from "react";

import styles from "../../styles/MultiLine.module.scss";



export const MultiLineCmntField: React.FC<{
  placeholderCmnt:string; 
  comment: string;
  
  edit: boolean;
}> = (props) => {


  const [cmnt, setCmnt] = React.useState<string>(props.comment);
  

  React.useEffect(() => {
    setCmnt(props.comment);
  }, [props.comment]);

  return (
    <div>
      <textarea
        value={cmnt}
        disabled={!props.edit}
        placeholder={props.placeholderCmnt}
      ></textarea>
      <span></span>
      <span className={styles.bar}></span>
      <div className={styles.buttonsDown}>
        {/* style={{ display: "none" }} */}
        Cancel
      </div>
      <div className={styles.buttonsDown} >
        Submit
      </div>
    </div>
  );
};
