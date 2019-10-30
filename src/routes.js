import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpController from './app/controllers/HelpController';
import UnanswerController from './app/controllers/UnanswerController';
import AuthMiddleware from './app/midllewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);
routes.post('/students/:id/help-orders', HelpController.store);
routes.get('/students/:id/help-orders', HelpController.index);

routes.use(AuthMiddleware);

routes.get('/students/help-orders/unanswereds', UnanswerController.index);
routes.put('/help-orders/:id/answer', HelpController.update);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
