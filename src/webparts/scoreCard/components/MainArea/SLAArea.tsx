import * as React from "react";
import styles from "../../styles/SLA.module.scss";

import * as XLSX from "xlsx";
import { data } from "jquery";

interface SlaAreaProps {
  data:string[];
}
interface SlaAreaState {
  Cssclass: boolean[];

}
export const SLAArea: React.FC<SlaAreaProps> = (props) => { 

 
  function convertPercen(s:string){   
    return parseFloat((parseFloat(parseFloat(s).toFixed(4)) * 100).toFixed(4));
  }

    React.useEffect(() => {
      var strip = document.querySelectorAll("[class*=strip]");
      
      
      const HovClassName = strip[0].classList[2];
      strip.forEach((theStrip) => {
        theStrip.addEventListener("mouseenter", () => {
          strip[0].classList.remove(HovClassName);
          theStrip.classList.add(HovClassName);
        });
        theStrip.addEventListener("mouseleave", () => {
          theStrip.classList.remove(HovClassName);
          strip[0].classList.add(HovClassName);
        });
      });
    }, []);


    return (
      <div className={styles.striips}>
        <div className={`${styles.strip} ${convertPercen(props.data[0])>85 ?styles.blue: styles.red} ${styles.hoverin} `}>
          <span>{convertPercen(props.data[0])}%</span>
          <div className={styles.content}>
            <h1>Speed to Answer </h1>
            <p>
              The percentage of calls answered within the specified threshold
              seconds of arriving in the queue. Measurement begins upon
              completion of front end message. This Service Level is measured
              monthly on a 24x7x365 basis.
            </p>
          </div>
        </div>

        <div className={`${styles.strip} ${convertPercen(props.data[1])<5 ?styles.blue: styles.red}  `}>
          <span>{convertPercen(props.data[1])}%</span>
          <div className={styles.content}>
            <h1>Abandonment Rate</h1>
            <p>
              Percentage of calls that hang-up after being in queue for more
              than 45 seconds and are terminated by the User prior to
              establishing contact with a Service Desk Analysts. The result
              expressed as a percentage to two (2) decimal places. This Service
              Level is measured monthly on a 24x7x365 basis.
            </p>
          </div>
        </div>

        <div className={`${styles.strip} ${convertPercen(props.data[2])>80 ?styles.blue: styles.red} `}>
          <span>{convertPercen(props.data[2])}%</span>
          <div className={styles.content}>
            <h1>Email to Ticket Conversion</h1>
            <p>
              All emails that are sent to the Service Desk email address must be
              reviewed by an Analyst and a ticket must be created within the
              first 75 minutes.
            </p>
          </div>
        </div>

        <div className={`${styles.strip} ${convertPercen(props.data[3])>90 ?styles.blue: styles.red} `}>
          <span>{convertPercen(props.data[3])}%</span>
          <div className={styles.content}>
            <h1>First Level Incident Resolution </h1>
            <p>
              The percentage of Incidents categorized as First Contact Level
              that are resolved at the Service Desk.
            </p>
          </div>
        </div>

        <div className={`${styles.strip} ${convertPercen(props.data[4])>80 ?styles.blue: styles.red} `}>
          <span>{convertPercen(props.data[4])}%</span>
          <div className={styles.content}>
            <h1>Self Service Acknowledgement</h1>
            <p>
              Self-Service Acknowledgement Rate shall be calculated as the
              number of self-service tickets received and assigned to a Service
              Desk Analyst or resolver group within the specified threshold of
              minutes of receipt, divided by the number of self-service tickets
              received each month.
            </p>
          </div>
        </div>

        <div className={`${styles.strip} ${convertPercen(props.data[5])>90 ?styles.blue: styles.red} `}>
          <span>{convertPercen(props.data[5])}%</span>
          <div className={styles.content}>
            <h1>Password Reset First Call Resolution</h1>
            <p>
              Password Reset shall be calculated as the total number of Password
              Resets that are requested via phone and resolved by Level 1
              support, divided by the total number of Password Resets submitted
              to the Service Desk via phone during the month, with the result
              expressed as a percentage to two (2) decimal places.
            </p>
          </div>
        </div>
      </div>
    );
  
};


