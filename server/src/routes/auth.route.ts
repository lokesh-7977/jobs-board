import { Router } from "express";
import { register, login , logOut , updateUser , deleteUser , getUser } from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post("/sign-up", register as any);
router.post("/sign-in", login as any);
router.get("/user",authMiddleware, getUser as any);
router.delete("/user",authMiddleware, deleteUser as any);
router.put("/user",authMiddleware, updateUser as any);
router.get("/logout",authMiddleware, logOut as any);

export default router;