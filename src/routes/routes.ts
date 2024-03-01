import { Router } from "express";
import * as auth from "../controllers/auth";
import * as members from "../controllers/members";
import * as users from "../controllers/users";
import { authValidation } from "../middlewares/authValidation";

const router = Router();

router.post("/login", auth.login);

router.get("/ping", (req, res) => {
  res.json({ pong: true, admin: true });
});

router.post("/users", authValidation, users.createUser);

router.get("/members", authValidation, members.getAll);
router.get("/members/search", authValidation, members.search);
router.get("/members/:id", authValidation, members.getOne);
router.post("/members", authValidation, members.createMember);
router.put("/members/:id", authValidation, members.updateMember);
router.delete("/members/:id", authValidation, members.removeMember);

export default router;
