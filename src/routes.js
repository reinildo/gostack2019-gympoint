import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import StudentsController from './app/controllers/StudentsController';
import AuthMiddleware from './app/midllewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(AuthMiddleware);

routes.post('/students', StudentsController.store);
routes.get('/students', StudentsController.index);
routes.put('/students/:id', StudentsController.update);

export default routes;
