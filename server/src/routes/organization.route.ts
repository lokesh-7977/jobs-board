import express from 'express';
import {  createOrganization} from '../controllers/organization.controller';

const router = express.Router();

router.post('/create', createOrganization);


export default router;
