import {v} from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUser = query({
    args: {
        email: v.string()
    },

    handler: async (ctx, args) => {
        const result = await ctx.db.query('user')
        .filter((q) => q.eq(q.field('email'), args.email))
        .collect();

        return result;
    },
})

export const createUser = mutation({
    args: {
        fullName: v.string(),
        email: v.string(),
        profileImage: v.string()
    },
    
    handler: async (ctx, args) => {
        // const user = await ctx.db.query('user')
        // .filter((q) => q.eq(q.field('email'), args.email))
        // .first();

        // if(user) {
        //     return;
        // }
        
        // return await ctx.db.insert('user', args)

        return await ctx.db.insert("user", args)
    }
})