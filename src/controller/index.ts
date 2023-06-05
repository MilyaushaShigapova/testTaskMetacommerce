import { NextFunction, Request, Response } from 'express';
import { helpers } from './helpers';
import { ResponseI, Entries } from './dto';
const url: string = 'https://api.publicapis.org/entries';

class ReportController {
  public async createExcel(req: Request, res: Response, next: NextFunction) {
    try {
      //Get Data
      let data: ResponseI = await helpers.getData(url);

      //Get Array data
      let array: Entries[] = data.entries;

      //Exclude objects with HTTPS =false
      array = await helpers.formatData(array);

      //create excelFile
      const excel = await helpers.createExcel(array);

      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader(
        'Content-Disposition',
        'attachment; filename=' + 'Report.xls'
      );
      return res.send(excel);
    } catch (e: any) {
      console.log(e);
      next(e.message);
    }
  }
  public async createGoogleSheets(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      //Get Data
      let data: ResponseI = await helpers.getData(url);

      //Get Array data
      let array: Entries[] = data.entries;

      //Exclude objects with HTTPS =false
      array = await helpers.formatData(array);

      //create write google table
      const excel = await helpers.createGoogleSheets(array);

      return res.status(200).json(excel);

      //ссылка на пример ответа
      // https://docs.google.com/spreadsheets/d/1SFPx-x-yaBe9s8cTVFwmo_do5qbo1TgoMNwAYfqf24w/edit#gid=133961432
    } catch (e: any) {
      console.log(e);
      next(e.message);
    }
  }
}

export const reportController = new ReportController();
