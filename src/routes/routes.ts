import { Router } from "express";
import * as auth from "../controllers/auth";
import * as members from "../controllers/members";
import * as users from "../controllers/users";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", (req, res) => {
  res.json({ pong: true, admin: true });
});

router.post("/users", users.createUser);

router.get("/members", members.getAll);
router.get("/members/search", members.search);
router.get("/members/:id", members.getOne);
router.post("/members", members.createMember);
router.put("/members/:id", members.updateMember);
router.delete("/members/:id", members.removeMember);

export default router;
