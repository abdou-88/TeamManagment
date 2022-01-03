import * as React from "react";

import styles from "../../styles/MultiLine.module.scss";



export const MultiLineCmntField: React.FC<{
  
  comment: string;
  edit: boolean;
  onCancelClicked: () => void;
}> = (props) => {
  const [cmnt, setCmnt] = React.useState<string>(props.comment);
  const [analCmnt, setanalCmnt] = React.useState<string>("");
  const Txtstyle = props.edit ? { display: "none" } : { display: "block" };
  const Analstyle = props.edit ? { display: "block" } : { display: "none" };

  React.useEffect(() => {
    document.getElementById("analystcmnt").focus();
  }, [props.edit]);

  React.useEffect(() => {
    setCmnt(props.comment);
  }, [props.comment]);

  return (
    <div>
      <textarea
        id="TxtArea"
        value={cmnt}
        disabled={true}
        placeholder={"There is no comment for you this month..."}
        style={Txtstyle}
      ></textarea>
      <textarea
        id="analystcmnt"
        disabled={!props.edit}
        placeholder={"Add your comment here..."}
        onChange={(event) => setanalCmnt(event.target.value)}
        style={Analstyle}
      ></textarea>
      <span></span>
      <span className={styles.bar}></span>
      <div
        onClick={() => props.onCancelClicked()}
        className={styles.buttonsDown}
        style={Analstyle }
      >
        {/* style={{ display: "none" }} */}
        Cancel
      </div>
      <div style={Analstyle} className={styles.buttonsDown}>Submit</div>
    </div>
  );
};
