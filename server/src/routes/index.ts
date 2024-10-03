import { Router } from "express"
import Routes from  "./auth.route"
import orgRoutes from "./organization.route"

const router = Router();

router.use("/auth", Routes);
router.use("/org", orgRoutes);


export default router;
