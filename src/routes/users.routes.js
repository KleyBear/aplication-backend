import {Router} from 'express'
import { createusers, deleteusers, getuser, updateusers, getusers } from '../controllers/users.controllers.js';
import { getproviders } from '../controllers/providers.controllers.js';

const router = Router();

router.get('/users', getusers)

router.get('/user/:id', getuser)

router.post('/user', createusers)

router.delete('/user/:id', deleteusers)

router.put('/user/:id', updateusers)

export default router;