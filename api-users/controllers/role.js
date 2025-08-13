import mongoose from "mongoose";
import Role from "../models/Role.model.js";

// const permissions = [
//   {
//     name: "READ_QUESTION",
//     value: {
//       from: "2021-08-08T00:00:00.000Z",
//       to: "2022-08-08T00:00:00.000Z",
//     },
//   },
//   {
//     name: "CREATE_TEST",
//     value: {
//       from: "2021-08-08T00:00:00.000Z",
//       to: "2022-08-08T00:00:00.000Z",
//     },
//   },
//   {
//     name: "CREATE_QUESTION",
//     value: {
//       from: "2021-08-08T00:00:00.000Z",
//       to: "2022-08-08T00:00:00.000Z",
//     },
//   },
// ];

export const getAllRoles = async function (req, res) {
  try {
    const roles = await Role.find();

    const finalRoles = roles.map((Role) => Role.toObject());

    res.status(200).json(
      finalRoles.map((Role) => ({
        name: Role.name,
        members: Role.members,
        permissions: Role.permissions,
        id: Role._id,
      }))
    );
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPermissions = async function (req, res) {
  try {
    const roles = await Role.findById(req.query.id);

    res.status(200).json(roles.permissions);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const hasPermission = async function (req, res) {
  try {
    const permissions = await Role.find(
      { _id: { $in: req.query.roles } },
      { permissions: 1 }
    );

    // console.log("permi0", permissions);

    let hasPermission = permissions.includes(req.query.permission);

    res.status(200).json({ hasPermission });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createRole = async function (req, res) {
  try {
    const { name, permissions, createdAt, updatedAt, createdBy } = req.body;
    // console.log(req.body, "Ye hai body");

    if (!name || !createdBy) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Data",
      });
    }

    const result = await Role.create({
      _id: `ROLE_${name.toUpperCase()}`,
      name,
      permissions,
      createdAt,
      updatedAt,
      createdBy,
      members: [],
      modifiedAt: new Date().toISOString(),
    });

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export const updateRole = async function (req, res) {
  try {
    const { id, permissions } = req.body;

    if (!id) {
      return res.status(401).json({
        status: "error",
        message: "Please provide email and id",
      });
    }

    try {
      const result = await Role.findByIdAndUpdate(
        id,
        {
          permissions,
        },
        { new: true }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addNewMember = async function (req, res) {
  try {
    const member = req.body;
    console.log(member);
    if (!member.id || !req.query?.roleId) {
      return res.status(401).json({
        status: "error",
        message: "Please provide member details",
      });
    }

    try {
      const result = await Role.findByIdAndUpdate(req.query?.roleId, {
        $push: { members: member },
      });
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const removeMember = async function (req, res) {
  try {
    const { member, Role } = req.body;

    if (!member.id) {
      return res.status(401).json({
        status: "error",
        message: "Please provide member details",
      });
    }

    try {
      const result = await Role.findByIdAndUpdate(
        Role,
        {
          $pull: { members: member },
        },
        { new: true }
      );
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const removeRole = async function (req, res) {
  try {
    const { role } = req.body;

    try {
      const result = await Role.findByIdAndRemove(role);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
