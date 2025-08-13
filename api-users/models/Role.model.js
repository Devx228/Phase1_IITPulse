import mongoose from "mongoose";

const roleSchema = mongoose.Schema(
  {
    _id: { type: String, required: true }, // INSTITUTE_ID_AD_ABCDEF123
    name: { type: String, required: true },
    createdAt: { type: String, required: true },
    modifiedAt: { type: String, required: true },
    createdBy: {
      userType: { type: String, required: true },
      id: { type: String, required: true },
    },
    members: [
      {
        name: { type: String, required: true },
        id: { type: String, required: true },
        _id: false,
      },
    ],
    permissions: { type: Array, required: true },
  },
  { collection: "roles" }
);

const Role = mongoose.model("Role", roleSchema);

export default Role;
