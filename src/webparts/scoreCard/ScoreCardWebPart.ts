import * as React from 'react';
import * as ReactDom from 'react-dom';

import readXlsxFile from "read-excel-file";

import {
  IPropertyPaneConfiguration,
  PropertyPaneButton,
  PropertyPaneButtonType,
  PropertyPaneHorizontalRule,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ScoreCardWebPartStrings';
import {ScoreCard} from './components/ScoreCard';

import { IAppProps } from "./modules/IAppProps";

// pnp controls imports
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker";

// pnp file pickrr controls import
import {
  PropertyFieldFilePicker,
  IFilePickerResult,
  
} from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";

// pnp date controls imports
import {
  PropertyFieldDateTimePicker,
  DateConvention,
  
} from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";

import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";


import { IDateTimeFieldValue } from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";


import { PropertyFieldMessage } from "@pnp/spfx-property-controls/lib/PropertyFieldMessage";
import { MessageBarType } from "office-ui-fabric-react";  

export interface IScoreCardWebPartProps {
  listName: string;
  projectName: string;
  filePickerResult: IFilePickerResult;
  datetime: IDateTimeFieldValue;
  collectionData: any[];
  
}


export default class ScoreCardWebPart extends BaseClientSideWebPart<IScoreCardWebPartProps> {
  public excelFileData: any = [];
  public monthToAdd: string = "";
  public addM: boolean = false;
  public addingMessage: string = "";
  public msgVisibility: boolean = false;
  public msgType: MessageBarType = MessageBarType.error;
  

  
  // function to get the file from the control pnp panel file picker
  private _onFilePickerSave = async (filePickerResult: IFilePickerResult) => {
    if (filePickerResult) {
      const fileResultContent = await filePickerResult.downloadFileContent();
      //console.log(fileResultContent);
      const reader = new FileReader();
      reader.readAsDataURL(fileResultContent);

      reader.onload = async () => {
        readXlsxFile(fileResultContent).then((rows) => {
          this.excelFileData = rows;
        });
      };
    }
  }

  public render(): void {
    
    const element: React.ReactElement<IAppProps> = React.createElement(
      ScoreCard,
      {
        listName: this.properties.listName,
        projectName: this.properties.projectName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        excelFileData: this.excelFileData,
        monthToAdd: this.monthToAdd,
        addM: this.addM,
        collectionData: this.properties.collectionData,
        context: this.context,
        
      }
    );

    ReactDom.render(element, this.domElement);
    
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const addBtnClick = () => {
      let m: any;
      let y: any;

      if (this.excelFileData.length <= 0) {
        this.msgVisibility = true;
        this.addingMessage = "Import Excel file to add data for this month!";
        return;
      }

      try {
        m = this.properties.datetime.value.getMonth() + 1;
        y = this.properties.datetime.value.getFullYear();
        if (m <= 9) {
          m = "0" + m;
        }
      } catch (error) {
        this.msgVisibility = true;
        this.addingMessage = "Select the month from the calendar";
        return;
      }
      this.addM = true;
      this.monthToAdd = y + "-" + m;

      this.msgVisibility = true;
      this.msgType = MessageBarType.success;
      this.addingMessage = `${this.monthToAdd} data has been added successfully, Click the Apply button to save it.`;

    };

    return {
      pages: [
        {
          header: {
            description: "Lumen Operation ScoreCard",
          },
          groups: [
            {
              groupName: "Setup :",
              groupFields: [
                PropertyPaneTextField("projectName", {
                  label: "Team Name :",
                }),
                //SClist picker
                PropertyFieldListPicker("listName", {
                  label: "Select the scorecared list",
                  selectedList: this.properties.listName,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: "listPickerFieldId",
                }),
                PropertyPaneHorizontalRule(),
              ],
            },
            {
              groupName: "Add New Scorecard :",
              groupFields: [
                // excel file picket control
                //PropertyPaneHorizontalRule(),
                PropertyFieldMessage("", {
                  key: "MessageKey",
                  text: this.addingMessage,
                  messageType: this.msgType,
                  isVisible: this.msgVisibility,
                }),

                PropertyFieldFilePicker("filePicker", {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    this.properties.filePickerResult = e;
                    this._onFilePickerSave(e);
                  },
                  onChanged: (e: IFilePickerResult) => {
                    this.properties.filePickerResult = e;
                    this._onFilePickerSave(e);
                  },
                  key: "filePickerId",
                  //buttonIcon:"",
                  buttonLabel: "Import xlsx file",
                  //label: "Import ScoreCard Data",
                }),
                PropertyFieldDateTimePicker("datetime", {
                  label: "Select Month",

                  dateConvention: DateConvention.Date,

                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: "dateTimeFieldId",
                  showLabels: false,
                }),
                PropertyPaneButton("btnHero", {
                  text: "Add",
                  buttonType: PropertyPaneButtonType.Primary,
                  onClick: addBtnClick,
                }),
                PropertyPaneHorizontalRule(),
              ],
            },
            {
              groupName: "Edit ScoreCard :",
              groupFields: [
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "",
                  panelHeader: "ScoreCard ",
                  manageBtnLabel: "Modify data",
                  value: this.properties.collectionData,
                  fields: [
                    {
                      id: "Name",
                      title: "Analyst Names",
                      type: CustomCollectionFieldType.dropdown,
                      options: [
                        {
                          key: "1",
                          text: "Youssfi, Abdellah",
                        },
                        {
                          key: "2",
                          text: "Lewinska, Ewa",
                        },
                      ],

                      required: true,
                    },
                    {
                      id: "CQual",
                      title: "Call Quality",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "TQual",
                      title: "Call Quality",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "Avail",
                      title: "Availability",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "Rona",
                      title: "Rona",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "CProd",
                      title: "Call Prod",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "CCount",
                      title: "Call Count",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "MProd",
                      title: "Mail Prod",
                      type: CustomCollectionFieldType.string,
                    },
                    {
                      id: "MCount",
                      title: "Mail Count",
                      type: CustomCollectionFieldType.string,
                    },
                  ],
                  disabled: false,
                }),
                PropertyPaneHorizontalRule(),
              ],
            },
          ],
        },
      ],
    };
  }

 

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onAfterPropertyPaneChangesApplied(): void {
    this.msgVisibility = true;
    this.msgType = MessageBarType.success;
    this.addingMessage = `Month ${this.monthToAdd} has been saved successfully.`;
  }

 
}
