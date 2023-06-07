import express from 'express';
const router:express.Router=express.Router();
import { userRegister,emailVerify,userOtpverify,userLogin,userData } from '../controller/userController';
import { imageMiddleware } from '../middleware/multer';
import { userAuthentication } from '../middleware/auth';


router.post('/register',imageMiddleware.single('selectImg'),userRegister);
router.post('/otp',userOtpverify);
router.get('/profile',userAuthentication,userData);
router.post('/login',userLogin)
router.get('/:id/verify/:token',emailVerify)


export default router;