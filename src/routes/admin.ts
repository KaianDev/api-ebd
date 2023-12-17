import { Router } from "express";
import * as auth from "../controllers/auth";
import * as members from "../controllers/members";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", auth.validate, (req, res) => {
    res.json({ pong: true, admin: true });
});

router.get("/members", auth.validate, members.getAll);
router.get("/members/search", auth.validate, members.search);
router.get("/members/:id", auth.validate, members.getOne);
router.post("/members", auth.validate, members.createMember);
router.put("/members/:id", auth.validate, members.updateMember);
router.delete("/members/:id", auth.validate, members.removeMember);

export default router;
