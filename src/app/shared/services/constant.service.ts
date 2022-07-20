import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {
  homeInitEvent = new EventEmitter<any>();

  defaultPage: number;
  defaultItemPerPage: number;
  public verseTypesData = [
    { "Id": 46, "SettingTypeId": 1, "Name": "Quran", "Description": "Quran", "OrderBy": -1 },
    { "Id": 50, "SettingTypeId": 1, "Name": "Qamoos", "Description": "Qamoos", "OrderBy": -1 },
    { "Id": 51, "SettingTypeId": 1, "Name": "Bayaan", "Description": "Ashara Mubaraka", "OrderBy": -1 },
    { "Id": 57, "SettingTypeId": 1, "Name": "Miqaat Mubarak", "Description": "Miqaat Mubarak", "OrderBy": -1 },
    { "Id": 5, "SettingTypeId": 1, "Name": "Hadeeth", "Description": "Hadeeth", "OrderBy": 0 },
    { "Id": 1, "SettingTypeId": 1, "Name": "Kalaam", "Description": "Kalaam", "OrderBy": 1 },
    { "Id": 2, "SettingTypeId": 1, "Name": "Aqwaal", "Description": "Aqwaal", "OrderBy": 2 },
    { "Id": 6, "SettingTypeId": 1, "Name": "Qasida", "Description": "Qasida", "OrderBy": 3 }
  ];

  constructor() {
    this.defaultPage = 1;
    this.defaultItemPerPage = 12;
  }

  detachObject(model): void {
    return JSON.parse(JSON.stringify(model));
  }

  removeEmptyValues(arr): Array<string> {
    arr = arr.filter(item => item);
    return arr;
  }


  getname(name) {
    let speakerName = '';
    const firstName = name?.split('(')[0] ? name.split('(')[0] : name;
    const secondName = name?.split('(')[1] ? name.split('(')[1] : '';
    const thirddName = name?.split('(')[2] ? name.split('(')[2] : '';
    speakerName = firstName + '<br>  (' + secondName;
    if (thirddName) {
      speakerName = firstName + '<br>  ' + secondName + ' (' + thirddName.slice(0, -1);
    }
    return speakerName
  }

  getFirstName(name) {
    let speakerName = '';
    const firstName = name?.split('(')[0] ? name.split('(')[0] : name;
    speakerName = firstName;
    return speakerName
  }

  getSecondName(name) {
    let speakerName = '';
    const secondName = name?.split('(')[1] ? name.split('(')[1] : '';
    const thirddName = name?.split('(')[2] ? name.split('(')[2] : '';
    if (secondName) {
      speakerName = '(' + secondName;
    }
    if (thirddName) {
      speakerName = secondName + ' (' + thirddName.slice(0, -1);
    }
    return speakerName
  }

  timezone() {
    const date = new Date();
    const timeZone = date.getTimezoneOffset() / 60;
    return -1 * timeZone;
  }

  toArabicNumber(str): String {
    if (str) {
      return str.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
    } else {
      return "";
    }
  }

}

export enum VerserTypeIdEnum {
  kalam = 1,
  aqawal = 2,
  hadeeth = 5,
  qasida = 6,
  bayaan = 7
}

export enum VerserTypeEnum {
  kalam = 'Kalam',
  aqawal = 'Aqawal',
  hadeeth = 'Hadeeth',
  qasida = 'Qasida',
  bayaan = 'Bayaan'
}


