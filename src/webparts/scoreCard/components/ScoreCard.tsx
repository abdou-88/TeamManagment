import * as React from "react";
import styles from "../styles/ScoreCard.module.scss";
import { IAppProps } from "../modules/IAppProps";
import { IAppState } from "../modules/IAppState";
import { escape } from "@microsoft/sp-lodash-subset";

import * as $ from "jquery";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

// import components
import { IListItem } from "../modules/IListItem";
import {NavBtns} from "./HeaderArea/NavBtns";
import Header from "./HeaderArea/Header";
import Grades from "./FooterArea/Grades";
import Footer from "./FooterArea/Footer";
import {MainContener} from "./MainArea/MainContener";



export const ScoreCard: React.FC<IAppProps> = ({
  excelFileData,
  monthToAdd,
  addM,
  projectName,
  siteUrl,
  listName,
  spHttpClient,
}) => {



  const [status, setStatus] = React.useState("Initial");
  const [fullMonthData, setFullMonthData] = React.useState(null);
  const [currentY, setCurrentY] = React.useState("");
  const [currentM, setCurrentM] = React.useState("");
  const [add,setAdd]= React.useState(addM);
  const [currentAnalyst, setCurrentAnalyst] = React.useState({
    AnalystName: " ",
    Scorecard: {
      Csat: "",
      MonthGoal: "",
      Quality: {
        Calls: "",
        Tickets: "",
      },
      Availability: {
        percentage: "",
        Rona: "",
      },
      productivity: {
        Calls: {
          percentage: "",
          Count: "",
        },
        Emails: {
          percentage: "",
          Count: "",
        },
      },
      Comment: "",
    },
  });

  const [chartsData, setChartsData] = React.useState({
    ProdOptions: [],
    AvOptions: [],
  });

  React.useEffect(() => {
     readItem("", true);
     
   }, []);

  React.useEffect(() => {
    if(!addM){
      return;
    }
    console.log(addM);
    
    setAdd(addM);
    
  }, [addM]);

  React.useEffect(() => {
     add? createItem(): console.log("dont run create function" + add);
      
      setAdd(false);
      
  }, [add]);

  /// functions helpers i have to move them to util folder afetr finishing the project!!!!!!!!!!!!!!!
  //get analysts list name for the drop down.

  function getAnalystsName() {
    let AnalystsListN = [];
    chartsData.ProdOptions.sort((a, b) => {
      return a[1] - b[1];
    }).forEach((element: any) => {
      AnalystsListN.push(element[0]);
    });

    return AnalystsListN;
  }

  function handleAnalystChange(e) {
    const selecIndx = e.target.selectedIndex;
    const selectedOption = e.target.options[selecIndx];

    fullMonthData.forEach((analyst) => {
      if (analyst.AnalystName === selectedOption.value) {
        setCurrentAnalyst(analyst);
      }
    });
  }
  ////////
  function handleNavBtnclick(month: string) {
    
      setCurrentY(month.substring(0, 4));
      setCurrentM(month.substring(5, 7)); 

      readItem(month, false);
  }
  
  /////
  function handleMonthClick(y: string, m: string) {
    setCurrentY(y);
    setCurrentM(m); 
    readItem(y + "-" + m, false);
  }

  /// render function

  return (
    <div className={styles.TeamScoreCard}>
      <NavBtns
        onNavClick={handleNavBtnclick.bind(this)}
        Y={currentY}
        M={currentM}
      ></NavBtns>

      <Header
        onChangeName={handleAnalystChange.bind(this)}
        onMonthClick={handleMonthClick.bind(this)}
        options={getAnalystsName()}
        HeaderStatus={status}
      ></Header>

      <div className={styles.container}>
        
        <div className={styles.row}>
          <div>
            <a
              style={{ display: "none" }}
              href="#"
              className={`${styles.button}`}
              onClick={() => createItem()}
            >
              <span className={styles.label}>Create item</span>
            </a>

            <a
              style={{ display: "none" }}
              href="#"
              className={`${styles.button}`}
              onClick={() => updateItem()}
            >
              <span className={styles.label}>Update item</span>
            </a>
            <a
              style={{ display: "none" }}
              href="#"
              className={`${styles.button}`}
              onClick={() => deleteItem()}
            >
              <span className={styles.label}>Delete item</span>
            </a>

            <MainContener
              ProjectName={escape(projectName)}
              currentAnalyst={currentAnalyst}
              chartsData={chartsData}
            ></MainContener>
          </div>
        </div>
      </div>

      {/* <Grades></Grades> */}
      {/* <Footer></Footer> */}
    </div>
  );

  // function kanreturny Id d akhir item
  function getLatestItemId(): Promise<number> {
    return new Promise<number>(
      (
        resolve: (itemId: number) => void,
        reject: (error: any) => void
      ): void => {
        spHttpClient
          .get(
            `${siteUrl}/_api/web/lists/getById('${listName}')/items?$select=id`,
            SPHttpClient.configurations.v1,
            {
              headers: {
                Accept: "application/json;odata=nometadata",
                "odata-version": "",
              },
            }
          )
          .then(
            (
              response: SPHttpClientResponse
            ): Promise<{ value: { Id: number }[] }> => {
              return response.json();
            },
            (error: any): void => {
              reject(error);
            }
          )
          .then((response: { value: { Id: number }[] }): void => {
            if (response.value.length === 0) {
              resolve(-1);
            } else {
              resolve(response.value[0].Id);
            }
          });
      }
    );
  }

  // function to retrive data by month

  function getMonthtItemId(month: string, last?: boolean): Promise<number> {
    const query = last
      ? `${siteUrl}/_api/web/lists/getById('${listName}')/items?$select=id`
      : `${siteUrl}/_api/web/lists/getById('${listName}')/items?$filter=Month eq '${month}'&$top=1&$select=id`;
    return new Promise<number>(
      (
        resolve: (itemId: number) => void,
        reject: (error: any) => void
      ): void => {
        spHttpClient
          .get(query, SPHttpClient.configurations.v1, {
            headers: {
              Accept: "application/json;odata=nometadata",
              "odata-version": "",
            },
          })
          .then(
            (
              response: SPHttpClientResponse
            ): Promise<{ value: { Id: number }[] }> => {
              return response.json();
            },
            (error: any): void => {
              reject(error);
            }
          )
          .then(
            (response: { value: { Id: number; Month: string }[] }): void => {
              if (response.value.length === 0) {
                resolve(-1);
              } else {
                resolve(response.value[0].Id);
              }
            }
          );
      }
    );
  }

  // CRUD functions area
  function createItem(): void {
    setStatus("Saving month data...");
    

    const body: string = JSON.stringify({
      Month: ` ${monthToAdd}`,
      ScoreCardData: `Wariii kanjarbo`,
    });

    spHttpClient
      .post(
        `${siteUrl}/_api/web/lists/getById('${listName}')/items`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: "application/json;odata=nometadata",
            "Content-type": "application/json;odata=nometadata",
            "odata-version": "",
          },
          body: body,
        }
      )
      .then((response: SPHttpClientResponse): Promise<IListItem> => {
        return response.json();
      })
      .then(
        (item: IListItem): void => {
          setStatus(`Item '${item.Month}' (ID: ${item.Id}) with the data '${item.ScoreCardData}' successfully created`);
          
        },
        (error: any): void => {
          setStatus("Error while creating the item: " + error);
          
          
        }
      );
  }

  function readItem(m?: string, last?: boolean): void {
    setStatus("Loading items...");
    
    
    //last ? console.log("frst render") : console.log("not last ");
    getMonthtItemId(m, last)
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          
          setFullMonthData(null);
          setCurrentAnalyst({
            AnalystName: " ",
            Scorecard: {
              Csat: "",
              MonthGoal: "",
              Quality: {
                Calls: "",
                Tickets: "",
              },
              Availability: {
                percentage: "",
                Rona: "",
              },
              productivity: {
                Calls: {
                  percentage: "",
                  Count: "",
                },
                Emails: {
                  percentage: "",
                  Count: "",
                },
              },
              Comment: "",
            },
          });
          setChartsData({
            ProdOptions: [],
            AvOptions: [],
          });
          
         


          throw new Error("No scoreCard for this month");
        }

        setStatus("Loading ScoreCard data...");
        
        
        return spHttpClient.get(
          `${siteUrl}/_api/web/lists/getById('${listName}')/items(${itemId})?$select=Month,ScoreCardData,Id`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "odata-version": "",
            },
          }
        );
      })
      .then((response: SPHttpClientResponse): Promise<IListItem> => {
        return response.json();
      })
      .then(
        (item: IListItem): void => {
          
          setStatus("Ready");
          
          setFullMonthData(JSON.parse(item.ScoreCardData));
          setCurrentAnalyst(JSON.parse(item.ScoreCardData)[0]);
          setChartsData(extractChartsData(JSON.parse(item.ScoreCardData)));
          setCurrentY(item.Month.substring(0, 4));
          setCurrentM(item.Month.substring(5, 7));

         
        },
        (error: any): void => {
          setStatus("" + error);
          
         
        }
      );
  }

  function updateItem(): void {
    setStatus("Loading latest items...");
    
   

    let latestItemId: number = undefined;

    getLatestItemId()
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          throw new Error("No items found in the list");
        }

        latestItemId = itemId;
        setStatus(`Loading information about item ID: ${latestItemId}...`);
        
        

        return spHttpClient.get(
          `${siteUrl}/_api/web/lists/getById('${listName}')/items(${latestItemId})?$select=Month,ScoreCardData,Id`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "odata-version": "",
            },
          }
        );
      })
      .then((response: SPHttpClientResponse): Promise<IListItem> => {
        return response.json();
      })
      .then((item: IListItem): void => {
        setStatus("Loading latest items...");
        
        

        const body: string = JSON.stringify({
          Month: `Updated Item ${new Date()}`,
          ScoreCardData: `data ${"updated test"}`,
        });

        spHttpClient
          .post(
            `${siteUrl}/_api/web/lists/getById('${listName}')/items(${item.Id})`,
            SPHttpClient.configurations.v1,
            {
              headers: {
                Accept: "application/json;odata=nometadata",
                "Content-type": "application/json;odata=nometadata",
                "odata-version": "",
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE",
              },
              body: body,
            }
          )
          .then(
            (response: SPHttpClientResponse): void => {
              setStatus(`Item with ID: ${latestItemId} successfully updated`);
              
              
            },
            (error: any): void => {
              setStatus(`Error updating item: ${error}`);
              
             
            }
          );
      });
  }

  function deleteItem(): void {
    if (
      !window.confirm("Are you sure you want to delete this Month ScoreCard?")
    ) {
      return;
    }

    setStatus("Loading latest items...");
    


    let latestItemId: number = undefined;
    let etag: string = undefined;
    getLatestItemId()
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          throw new Error("No items found in the list");
        }

        latestItemId = itemId;
        setStatus(`Loading information about item ID: ${latestItemId}...`);
        
        

        return spHttpClient.get(
          `${siteUrl}/_api/web/lists/getById('${listName}')/items(${latestItemId})?$select=Id`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "odata-version": "",
            },
          }
        );
      })
      .then((response: SPHttpClientResponse): Promise<IListItem> => {
        etag = response.headers.get("ETag");
        return response.json();
      })
      .then((item: IListItem): Promise<SPHttpClientResponse> => {
        setStatus(`Deleting item with ID: ${latestItemId}...`);
        
        

        return spHttpClient.post(
          `${siteUrl}/_api/web/lists/getById('${listName}')/items(${item.Id})`,
          SPHttpClient.configurations.v1,
          {
            headers: {
              Accept: "application/json;odata=nometadata",
              "Content-type": "application/json;odata=verbose",
              "odata-version": "",
              "IF-MATCH": etag,
              "X-HTTP-Method": "DELETE",
            },
          }
        );
      })
      .then(
        (response: SPHttpClientResponse): void => {
          setStatus(`Item with ID: ${latestItemId} successfully deleted`);
          
         
        },
        (error: any): void => {
          setStatus(`Error deleting item: ${error}`);
          
          
        }
      );
  }

  /// chart data helper function
  function extractChartsData(fullMonthD) {
    var ProdOptions = [];
    var AvOptions = [];
    fullMonthD.forEach((Scard) => {
      let ProdChart = [
        Scard.AnalystName,
        (parseInt(Scard.Scorecard.productivity.Calls.percentage) +
          parseInt(Scard.Scorecard.productivity.Emails.percentage)) /
          2,
      ];

      let AVChart = [
        Scard.AnalystName,
        Scard.Scorecard.Availability.percentage,
      ];

      ProdOptions.push(ProdChart);
      AvOptions.push(AVChart);
    });

    return { ProdOptions, AvOptions };
  }
};
