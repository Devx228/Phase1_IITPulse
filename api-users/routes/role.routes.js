import express from "express";
import {
  removeMember,
  addNewMember,
  createRole,
  updateRole,
  getAllRoles,
  getPermissions,
  hasPermission,
  removeRole,
} from "../controllers/role.js";
const router = express.Router();

router.get("/getrole");
router.get("/all", getAllRoles);
router.post("/create", createRole);
router.post("/update", updateRole);
router.post("/permissions", getPermissions);
router.get("/has-permission", hasPermission);
router.post("/addMember", addNewMember);
router.post("/removeMember", removeMember);
router.delete("/deleteRole", removeRole);

export default router;
