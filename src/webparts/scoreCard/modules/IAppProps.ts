import { SPHttpClient } from "@microsoft/sp-http";
import { IFilePickerResult} from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { IDateTimeFieldValue } from "@pnp/spfx-property-controls/lib/PropertyFieldDateTimePicker";



export interface IAppProps {
  listName: string;
  projectName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  excelFileData: any[];
  monthToAdd: string;
  addM:boolean;
  collectionData: any[];
}
