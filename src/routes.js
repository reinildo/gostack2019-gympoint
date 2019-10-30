import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import AuthMiddleware from './app/midllewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.post('/students/:id/checkins', CheckinController.store);

routes.use(AuthMiddleware);

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.put('/students/:id', StudentController.update);

routes.post('/registrations', RegistrationController.store);
routes.get('/registrations', RegistrationController.index);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);

export default routes;
