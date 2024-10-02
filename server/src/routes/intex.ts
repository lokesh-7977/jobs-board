import { Router } from "express"
import Routes from  "./auth.route"

const router = Router();

router.use("/auth", Routes);

export default router;
