import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import userRouter from '@modules/users/routes/users.routes';
import sessionsRouter from '@modules/users/routes/sessions.routes';
import passwordRouter from '@modules/users/routes/password.routes';
import profileRouter from '@modules/users/routes/profile.routes';
import costumerRouter from '@modules/costumers/routes/customer.routes';

const routes = Router();
routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/auth', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', costumerRouter);

export default routes;
