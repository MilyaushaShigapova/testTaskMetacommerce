import { app } from './app';
import { PORT } from './config/config';

(async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server has been started in http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log('Server start error: ', e);
  }
})();
