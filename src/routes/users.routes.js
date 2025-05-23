import {Router} from 'express'
import { createusers, deleteusers, getuser, updateusers, getusers } from '../controllers/users.controllers.js';

const router = Router();

router.get('/providers', getusers)

router.get('/providers/:id', getuser)

router.post('/providers', createusers)

router.delete('/providers/:id', deleteusers)

router.put('/providers/:id', updateusers)

export default router;