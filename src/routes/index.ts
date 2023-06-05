import { Router } from 'express';
import { reportController } from '../controller';

const routes = Router();

routes.get('/createExcel', reportController.createExcel);
routes.get('/createGoogleSheets', reportController.createGoogleSheets);

export { routes };
