import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
  }).index("by_email", ["email"]),

  teams: defineTable({
    teamName: v.string(),
    createdBy: v.string(), // email or user context
  }),

  files: defineTable({
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  }).index("by_team", ["teamId"]),
});