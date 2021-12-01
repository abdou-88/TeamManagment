import * as React from "react";
import styles from "../styles/ScoreCard.module.scss";
import { IAppProps } from "../modules/IAppProps";
import { IAppState } from "../modules/IAppState";
import { escape } from "@microsoft/sp-lodash-subset";

import * as $ from "jquery";

import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

// import components
import { IListItem } from "../modules/IListItem";
import { NavBtns } from "./HeaderArea/NavBtns";
import Header from "./HeaderArea/Header";
import Grades from "./FooterArea/Grades";
import Footer from "./FooterArea/Footer";
import { MainContener } from "./MainArea/MainContener";

export default class ScoreCard extends React.Component<
  IAppProps,
  IAppState,
  {}
> {
  constructor(props: IAppProps) {
    super(props);

    this.state = {
      status: "Ready status",
      items: [],
      fullMonthData: null,
      currentY: "",
      currentM: "",
      currentAnalyst: {
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
      },
      chartsData: {
        ProdOptions: [],
        AvOptions: [],
      },
      newMonthData: this.props.excelFileData,
    };
  }
  /// functions helpers i have to move them to util folder afetr finishing the project!!!!!!!!!!!!!!!
  //get analysts list name for the drop down.
  private getAnalystsName() {
    let AnalystsListN = [];
    this.state.chartsData.ProdOptions.sort((a, b) => {
      return a[1] - b[1];
    }).forEach((element: any) => {
      AnalystsListN.push(element[0]);
    });

    return AnalystsListN;
  }

  // component life cycle

  public componentWillMount() {
    this.readItem("", true);
  }

  public componentDidMount() {
    //console.log(this.props.datetime.value);
  }
  //Handlers
  // function to hanble the change of analysts from the drop down

  private handleAnalystChange(e) {
    const selecIndx = e.target.selectedIndex;
    const selectedOption = e.target.options[selecIndx];

    this.state.fullMonthData.forEach((analyst) => {
      if (analyst.AnalystName === selectedOption.value) {
        this.setState({
          ...this.state,
          currentAnalyst: analyst,
        });
      }
    });
  }
  ////////
  private handleNavBtnclick(month: string) {
    this.setState({
      ...this.state,
      currentY: month.substring(0, 4),
      currentM: month.substring(5, 7),
    });
    this.readItem(month, false);
  }
  /////
  private handleMonthClick(y: string, m: string) {
    this.setState({
      ...this.state,
      currentY: y,
      currentM: m,
    });
    this.readItem(y + "-" + m, false);
  }

  /// render function
  public render(): React.ReactElement<IAppProps> {
    return (
      <div className={styles.TeamScoreCard}>
        <NavBtns
          onNavClick={this.handleNavBtnclick.bind(this)}
          Y={this.state.currentY}
          M={this.state.currentM}
        ></NavBtns>

        <Header
          onChangeName={this.handleAnalystChange.bind(this)}
          onMonthClick={this.handleMonthClick.bind(this)}
          options={this.getAnalystsName()}
          HeaderStatus={this.state.status}
        ></Header>

        <div className={styles.container}>
          <div className={styles.row}>
            <div>
              <a
                style={{ display: "none" }}
                href="#"
                className={`${styles.button}`}
                onClick={() => this.createItem()}
              >
                <span className={styles.label}>Create item</span>
              </a>

              <a
                style={{ display: "none" }}
                href="#"
                className={`${styles.button}`}
                onClick={() => this.updateItem()}
              >
                <span className={styles.label}>Update item</span>
              </a>
              <a
                style={{ display: "none" }}
                href="#"
                className={`${styles.button}`}
                onClick={() => this.deleteItem()}
              >
                <span className={styles.label}>Delete item</span>
              </a>

              <MainContener
                ProjectName={escape(this.props.projectName)}
                currentAnalyst={this.state.currentAnalyst}
                chartsData={this.state.chartsData}
              ></MainContener>
            </div>
          </div>
        </div>

        {/* <Grades></Grades> */}
        {/* <Footer></Footer> */}
      </div>
    );
  }

  // function kanreturny Id d akhir item
  private getLatestItemId(): Promise<number> {
    return new Promise<number>(
      (
        resolve: (itemId: number) => void,
        reject: (error: any) => void
      ): void => {
        this.props.spHttpClient
          .get(
            `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items?$select=id`,
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

  private getMonthtItemId(month: string, last?: boolean): Promise<number> {
    const query = last
      ? `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items?$select=id`
      : `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items?$filter=Month eq '${month}'&$top=1&$select=id`;
    return new Promise<number>(
      (
        resolve: (itemId: number) => void,
        reject: (error: any) => void
      ): void => {
        this.props.spHttpClient
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
  public createItem(): void {
    this.setState({
      status: "Creating item...",
      items: [],
    });

    const body: string = JSON.stringify({
      Month: ` ${new Date()}`,
      ScoreCardData: `Wariii kanjarbo`,
    });

    this.props.spHttpClient
      .post(
        `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items`,
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
          this.setState({
            status: `Item '${item.Month}' (ID: ${item.Id}) with the data '${item.ScoreCardData}' successfully created`,
            items: [],
          });
        },
        (error: any): void => {
          this.setState({
            status: "Error while creating the item: " + error,
            items: [],
          });
        }
      );
  }

  private readItem(m?: string, last?: boolean): void {
    this.setState({
      status: "Loading items...",
      items: [],
    });
    //last ? console.log("frst render") : console.log("not last ");
    this.getMonthtItemId(m, last)
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          this.setState({
            ...this.state,
            fullMonthData: null,
            currentAnalyst: {
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
            },
            chartsData: {
              ProdOptions: [],
              AvOptions: [],
            },
          });
          throw new Error("No scoreCard for this month");
        }

        this.setState({
          status: `Loading ScoreCard data...`,
          items: [],
        });
        return this.props.spHttpClient.get(
          `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items(${itemId})?$select=Month,ScoreCardData,Id`,
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
          this.setState({
            status: `Ready`,
            items: [],
            fullMonthData: JSON.parse(item.ScoreCardData),
            currentAnalyst: JSON.parse(item.ScoreCardData)[0],
            chartsData: this.extractChartsData(JSON.parse(item.ScoreCardData)),
            currentY: item.Month.substring(0, 4),
            currentM: item.Month.substring(5, 7),
          });
        },
        (error: any): void => {
          this.setState({
            status: "" + error,
            items: [],
          });
          console.log(error);
        }
      );
  }

  private updateItem(): void {
    this.setState({
      status: "Loading latest items...",
      items: [],
    });

    let latestItemId: number = undefined;

    this.getLatestItemId()
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          throw new Error("No items found in the list");
        }

        latestItemId = itemId;
        this.setState({
          status: `Loading information about item ID: ${latestItemId}...`,
          items: [],
        });

        return this.props.spHttpClient.get(
          `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items(${latestItemId})?$select=Month,ScoreCardData,Id`,
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
        this.setState({
          status: "Loading latest items...",
          items: [],
        });

        const body: string = JSON.stringify({
          Month: `Updated Item ${new Date()}`,
          ScoreCardData: `data ${"updated test"}`,
        });

        this.props.spHttpClient
          .post(
            `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items(${item.Id})`,
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
              this.setState({
                status: `Item with ID: ${latestItemId} successfully updated`,
                items: [],
              });
            },
            (error: any): void => {
              this.setState({
                status: `Error updating item: ${error}`,
                items: [],
              });
            }
          );
      });
  }

  private deleteItem(): void {
    if (
      !window.confirm("Are you sure you want to delete this Month ScoreCard?")
    ) {
      return;
    }

    this.setState({
      status: "Loading latest items...",
      items: [],
    });

    let latestItemId: number = undefined;
    let etag: string = undefined;
    this.getLatestItemId()
      .then((itemId: number): Promise<SPHttpClientResponse> => {
        if (itemId === -1) {
          throw new Error("No items found in the list");
        }

        latestItemId = itemId;
        this.setState({
          status: `Loading information about item ID: ${latestItemId}...`,
          items: [],
        });

        return this.props.spHttpClient.get(
          `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items(${latestItemId})?$select=Id`,
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
        this.setState({
          status: `Deleting item with ID: ${latestItemId}...`,
          items: [],
        });

        return this.props.spHttpClient.post(
          `${this.props.siteUrl}/_api/web/lists/getById('${this.props.listName}')/items(${item.Id})`,
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
          this.setState({
            status: `Item with ID: ${latestItemId} successfully deleted`,
            items: [],
          });
        },
        (error: any): void => {
          this.setState({
            status: `Error deleting item: ${error}`,
            items: [],
          });
        }
      );
  }

  /// chart data helper function
  private extractChartsData(fullMonthData) {
    var ProdOptions = [];
    var AvOptions = [];
    fullMonthData.forEach((Scard) => {
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
}
