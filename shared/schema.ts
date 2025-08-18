import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const waitlistSignups = pgTable("waitlist_signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  concerns: text("concerns"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const betaApplications = pgTable("beta_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  background: text("background"),
  experience: text("experience"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertWaitlistSignupSchema = createInsertSchema(waitlistSignups).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  concerns: z.string().optional(),
});

export const insertBetaApplicationSchema = createInsertSchema(betaApplications).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  background: z.string().optional(),
  experience: z.string().min(10, "Please provide at least 10 characters explaining your interest"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertWaitlistSignup = z.infer<typeof insertWaitlistSignupSchema>;
export type WaitlistSignup = typeof waitlistSignups.$inferSelect;
export type InsertBetaApplication = z.infer<typeof insertBetaApplicationSchema>;
export type BetaApplication = typeof betaApplications.$inferSelect;
