import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "../config/index";

const secretKey = config.jwt;

if (!secretKey) {
    throw new Error("JWT secret key is not defined in the config.");
}

interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export const authMiddleware = (
    req: CustomRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;  
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token." });
        return;  
    }
};
