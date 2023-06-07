import express from 'express';
import { adminLogin } from '../controller/adminController';
const router:express.Router=express.Router();


router.post('/login',adminLogin)

export default router;