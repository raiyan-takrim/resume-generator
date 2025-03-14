import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name"),
    image: text("image"),
    createdAt: timestamp("created_at").default(sql`now()`),
});

export const resumes = pgTable("resumes", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id),
    resumeData: jsonb("resume_data").notNull(),
    createdAt: timestamp("created_at").default(sql`now()`),
});





// import { pgTable, uuid, text, jsonb, timestamp } from "drizzle-orm/pg-core";
// import { sql } from "drizzle-orm";

// export const users = pgTable("users", {
//     id: uuid("id").defaultRandom().primaryKey(),
//     email: text("email").notNull().unique(),
//     createdAt: timestamp("created_at").default(sql`now()`),
// });

// export const resumes = pgTable("resumes", {
//     id: uuid("id").defaultRandom().primaryKey(),
//     userId: uuid("user_id").notNull().references(() => users.id),
//     fullName: text("full_name").notNull(),
//     email: text("email").notNull().unique(),
//     resumeData: jsonb("resume_data").notNull(),
//     createdAt: timestamp("created_at").default(sql`now()`),
// });

// import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core";
// import { sql } from "drizzle-orm";

// export const users = pgTable("users", {
//     id: uuid("id").defaultRandom().primaryKey(),
//     name: text("name"),
//     email: text("email").notNull().unique(),
//     image: text("image"),
//     createdAt: timestamp("created_at").default(sql`now()`),
// });
