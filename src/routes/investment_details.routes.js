import {Router} from 'express'
import { createinvestment_detail, deleteinvestment_detail, getinvestment_detail, getinvestment_detail2, getinvestment_details, updateinvestment_detail } from '../controllers/investment_detail.controllers.js';

const router = Router();

router.get('/investment_details', getinvestment_details)

router.get('/investment_detail/:id', getinvestment_detail)

router.get('/investment/:id/investment_detail', getinvestment_detail2)

router.post('/investment_detail', createinvestment_detail)

router.delete('/investment_detail/:id', deleteinvestment_detail)

router.put('/investment_detail/:id', updateinvestment_detail)

export default router;