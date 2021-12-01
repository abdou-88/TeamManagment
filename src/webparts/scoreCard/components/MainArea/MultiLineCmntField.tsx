import * as React from "react";

import styles from "../../styles/MultiLine.module.scss";



export const MultiLineCmntField: React.FC<{comment: string; visibility: boolean; edit: boolean;}> = (props) => {
  
  const [cmnt, setCmnt] = React.useState<string>(props.comment);

  React.useEffect(() => {
    setCmnt(props.comment);
  }, [props.comment]);
  
  return (
    <div className={props.visibility ? styles.show : styles.hide}>
      <textarea
        value={cmnt}
        disabled={!props.edit}
        placeholder="There is no comment for you this month..."
      >
      </textarea>
      <span></span>
      <span className={styles.bar}></span>
    </div>
  );

};
