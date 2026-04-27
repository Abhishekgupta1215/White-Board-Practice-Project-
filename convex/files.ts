import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.string(),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("files", args);
  },
});

export const getFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("files")
      .withIndex("by_team", (q) => q.eq("teamId", args.teamId))
      .collect();
    return result;
  },
});
