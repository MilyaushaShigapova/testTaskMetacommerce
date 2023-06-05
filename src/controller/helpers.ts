import axios from 'axios';
import { ResponseI, Entries } from './dto';
import Excel from 'exceljs';
import google from 'googleapis';
import { GoogleSpreadsheet, Color } from 'google-spreadsheet';
import { GOOGLEEMAIL, GOOGLEKEY } from '../config/config';

class Helpers {
  public async getData(url: string): Promise<ResponseI> {
    try {
      const { data } = await axios.get<ResponseI>(url, {
        headers: {
          Accept: 'application/json',
        },
      });
      return data;
    } catch (error: any) {
      console.log('error message: ', error.message);
      throw new Error(error.message);
    }
  }
  public async formatData(arr: Entries[]): Promise<Entries[]> {
    let result: Entries[] = [];
    arr.forEach((el) => {
      if (el.HTTPS != false) result.push(el);
    });
    result.sort((a, b) =>
      a.API.toLowerCase() < b.API.toLowerCase()
        ? -1
        : b.API.toLowerCase() > a.API.toLowerCase()
        ? 1
        : 0
    );

    return result;
  }
  public async createExcel(arr: Entries[]): Promise<Excel.Buffer> {
    try {
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('Result');
      const smallWidth = 20;
      const mediumWidth = 40;
      worksheet.columns = [
        { key: 'API', header: 'API', width: smallWidth },
        {
          key: 'Description',
          header: 'Country Description',
          width: mediumWidth,
        },
        { key: 'Auth', header: 'Auth', width: smallWidth },
        { key: 'HTTPS', header: 'HTTPS', width: smallWidth },
        { key: 'Cors', header: 'Cors', width: smallWidth },
        { key: 'Link', header: 'Link', width: mediumWidth },
        { key: 'Category', header: 'Category', width: smallWidth },
      ];
      for (let i = 1; i < 8; i++) {
        worksheet.getCell(1, i).fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF0000' },
        };
      }

      arr.forEach((item) => {
        worksheet.addRow(item);
      });
      for (let i = 1; i < arr.length; i++) {
        worksheet.getCell(i + 1, 6).value = {
          text: arr[i].Link,
          hyperlink: arr[i].Link,
        };
      }

      const buffer = await workbook.xlsx.writeBuffer();

      return buffer;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  public async createGoogleSheets(arr: Entries[]): Promise<string> {
    const doc = new GoogleSpreadsheet(
      '1SFPx-x-yaBe9s8cTVFwmo_do5qbo1TgoMNwAYfqf24w'
    );
    try {
      await doc.useServiceAccountAuth({
        client_email: GOOGLEEMAIL!,
        private_key: GOOGLEKEY!.replace(/\\n/g, '\n'),
      });
      await doc.loadInfo(); // loads document properties and worksheets
      await doc.updateProperties({ title: 'ReportFile' });
      const sheet = await doc.addSheet({
        headerValues: [
          'API',
          'Description',
          'Auth',
          'HTTPS',
          'Cors',
          'Link',
          'Category',
        ],
      });
      let rows = [];
      for (let i = 0; i < arr.length; i++) {
        rows.push({
          API: arr[i].API,
          Description: arr[i].Description,
          Auth: arr[i].Auth,
          HTTPS: arr[i].HTTPS,
          Cors: arr[i].Cors,
          Link: arr[i].Link,
          Category: arr[i].Category,
        });
      }
      await sheet.addRows(rows);
      const cells = await sheet.loadCells('A1:G1');
      for (let i = 0; i < 7; i++) {
        const cell = sheet.getCell(0, i);
        cell.backgroundColor = { red: 255, green: 1, blue: 1, alpha: 0.5 };
      }
      await sheet.saveUpdatedCells(); // save all updates in one call
      return (
        'https://docs.google.com/spreadsheets/d/1SFPx-x-yaBe9s8cTVFwmo_do5qbo1TgoMNwAYfqf24w/edit#gid=' +
        sheet.sheetId
      );
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
export const helpers = new Helpers();
