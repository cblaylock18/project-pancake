import { Router } from "express";
import { logout } from "../controllers/logout.controller";

export const logoutRouter: Router = Router();

logoutRouter.get("/", logout);
