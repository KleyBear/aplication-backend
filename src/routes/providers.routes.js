import {Router} from 'express'
import { createprovider, deleteprovider, getprovider, getproviders, updateprovider } from '../controllers/providers.controllers.js';

const router = Router();

router.get('/provider', getproviders)

router.get('/provider/:id', getprovider)

router.post('/provider', createprovider)

router.delete('/provider/:id', deleteprovider)

router.put('/provider/:id', updateprovider)

export default router;