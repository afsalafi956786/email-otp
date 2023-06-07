import multer from 'multer';
import { Request,Response } from 'express';


export const imageMiddleware=multer({dest:'uploads'});


