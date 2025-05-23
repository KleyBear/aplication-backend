import {Router} from 'express'
import { createinvestment, deleteinvestment, getinvestment, getinvestments, updateinvestment } from '../controllers/investment.controllers.js';

const router = Router();

router.get('/investment', getinvestments)

router.get('/investment/:id', getinvestment)

router.post('/investment', createinvestment)

router.delete('/investment/:id', deleteinvestment)

router.put('/investment/:id', updateinvestment)

export default router;