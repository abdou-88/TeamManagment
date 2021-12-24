import * as React from "react";
import styles from "../../styles/HexInfo.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt, faGraduationCap, faInfo, faQuestion } from "@fortawesome/free-solid-svg-icons";

interface SlaAreaProps {

}
export const Hexinfo: React.FC<SlaAreaProps> = (props) => {

  const [expended, setExpended] = React.useState(false);
  const [hoverInfo, setHoverInfo] = React.useState("Information");
 

  let hex1Style = `${styles["hex-1"]} `;
  let hex2 = `${styles["hex-2"]} `;
  let hex2Item = `${styles["hex-2-item"]} `;

  if (expended) {
    hex1Style += `${styles.is_hover} ${styles.is_active}`;
    hex2Item += `${styles.extend}`;
    hex2 += `${styles.is_active}`;
  }



    return (
      <div className={styles.Mbutton}>
        <div id="menu">
          <div className={styles["hex-menu"]}>
            <div
              id="hex-1"
              className={hex1Style}
              onClick={() => {
                expended ? setExpended(false) : setExpended(true);
              }}
            >
              <span
                id="hex-icon"
                className={styles["hex-icon1"] + " " + styles.mainHex}
              ></span>
              <FontAwesomeIcon
                icon={faQuestion}
                size="lg"
                className={styles.FAicons + " " + styles.questionicon}
              />

              <span className={styles.title}>Help</span>
              <div className={styles.fullArrow}>
                <div className={styles.arrow1}></div>
                <div className={styles.arrow2}></div>
              </div>
            </div>

            <div className={hex2}>
              <div className={hex2Item}></div>

              <div className={styles["view-detail"]}>
                <span
                  onMouseEnter={() => setHoverInfo("Information")}
                  className={styles["hex-icon1"] + " " + styles.firstHex}
                ></span>

                <span
                  onMouseEnter={() => setHoverInfo("Productivity Grades")}
                  className={styles["hex-icon1"] + " " + styles.upHex}
                ></span>
                <span
                  onMouseEnter={() => setHoverInfo("Availability Grades")}
                  className={styles["hex-icon1"] + " " + styles.upDown}
                ></span>
                <span
                  onMouseEnter={() => setHoverInfo("Submit Comment")}
                  className={styles["hex-icon1"] + " " + styles.upRight}
                ></span>
                <FontAwesomeIcon
                  icon={faCommentAlt}
                  size="lg"
                  className={styles.FAicons + " " + styles.CmntIcon}
                />
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="lg"
                  className={styles.FAicons + " " + styles.GradesAvIcon}
                />
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  size="lg"
                  className={styles.FAicons + " " + styles.GradesPrIcon}
                />
                <FontAwesomeIcon
                  icon={faInfo}
                  size="lg"
                  className={styles.FAicons}
                />
                <div className={styles.titleicon}>{hoverInfo}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
