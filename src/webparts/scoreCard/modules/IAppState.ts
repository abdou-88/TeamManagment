import { IListItem } from "./IListItem";

export interface IAppState {
  status: string;
  items: IListItem[];
  fullMonthData: any;
  currentY: string;
  currentM: any;
  currentAnalyst: any;
  chartsData: any;
  newMonthData: any[];
}
