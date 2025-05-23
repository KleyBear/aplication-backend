import express from 'express'
import { PORT } from './config.js'
import usersRoutes from './routes/users.routes.js'
import providersRoutes from './routes/providers.routes.js'
import investmentsRoutes from './routes/investment.routes.js'
import investmentDetailsRoutes from './routes/investment_details.routes.js'
import morgan from 'morgan'
import 'dotenv/config.js'

const app = express()

app.use(morgan('dev'))
app.use(express.json());
app.use(usersRoutes);
app.use(providersRoutes);
app.use(investmentsRoutes);
app.use(investmentDetailsRoutes);

app.listen(PORT);
console.log('hola')


