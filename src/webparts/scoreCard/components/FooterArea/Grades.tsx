import * as React from "react";
import styles from "../../styles/ScoreCard.module.scss";

interface GradesProps {
  
}

const Grades: React.FC<GradesProps> = ({ }) => (
  <div>
    <table className="Grades">
      <tbody>
        <tr>
          <td className={styles.leftAlign}>Quality :</td>
          <td className={styles.GreenBG}>5 - Exceeds Expectations</td>
          <td className={styles.GreenYellowBG}>4 - Meets Expectations</td>
          <td className={styles.YellowBG}>3 - Somewhat Meets Expectations</td>
          <td className={styles.OrangeBG}>2 - Needs Improvement</td>
          <td className={styles.RedBG}>1 - Performance Improvement Plan</td>
        </tr>

        <tr>
          <td className={styles.leftAlign}>Prod & Avail :</td>
          <td className={styles.GreenBG}>3 - Exceeds Expectations</td>
          <td className={styles.GreenYellowBG}>2 - Meets Expectations</td>
          <td className={styles.RedBG}>1 - Needs Improvement</td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Grades;
