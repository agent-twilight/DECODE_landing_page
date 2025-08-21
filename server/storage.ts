import { type User, type InsertUser, type WaitlistSignup, type InsertWaitlistSignup, type BetaApplication, type InsertBetaApplication } from "@shared/schema";
import { randomUUID } from "crypto";
import { googleSheetsStorage } from "./google-sheets";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createWaitlistSignup(signup: InsertWaitlistSignup): Promise<WaitlistSignup>;
  createBetaApplication(application: InsertBetaApplication): Promise<BetaApplication>;
  getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined>;
  getBetaApplicationByEmail(email: string): Promise<BetaApplication | undefined>;
  getAllWaitlistSignups(): Promise<WaitlistSignup[]>;
  getAllBetaApplications(): Promise<BetaApplication[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private waitlistSignups: Map<string, WaitlistSignup>;
  private betaApplications: Map<string, BetaApplication>;

  constructor() {
    this.users = new Map();
    this.waitlistSignups = new Map();
    this.betaApplications = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createWaitlistSignup(insertSignup: InsertWaitlistSignup): Promise<WaitlistSignup> {
    const id = randomUUID();
    const signup: WaitlistSignup = {
      ...insertSignup,
      id,
      createdAt: new Date(),
    };
    
    // Store directly in Google Sheets (primary storage)
    await googleSheetsStorage.addWaitlistSignup(signup);
    
    // Also keep in memory for current session performance
    this.waitlistSignups.set(id, signup);
    
    return signup;
  }

  async createBetaApplication(insertApplication: InsertBetaApplication): Promise<BetaApplication> {
    const id = randomUUID();
    const application: BetaApplication = {
      ...insertApplication,
      id,
      createdAt: new Date(),
    };
    
    // Store directly in Google Sheets (primary storage)
    await googleSheetsStorage.addBetaApplication(application);
    
    // Also keep in memory for current session performance
    this.betaApplications.set(id, application);
    
    return application;
  }

  async getWaitlistSignupByEmail(email: string): Promise<WaitlistSignup | undefined> {
    // Check Google Sheets as primary source
    const existsInSheets = await googleSheetsStorage.checkEmailExists(email, 'Waitlist');
    if (existsInSheets) {
      return { email } as WaitlistSignup;
    }
    
    // Also check memory for current session
    const memoryResult = Array.from(this.waitlistSignups.values()).find(
      (signup) => signup.email === email,
    );
    
    return memoryResult;
  }

  async getBetaApplicationByEmail(email: string): Promise<BetaApplication | undefined> {
    // Check Google Sheets as primary source
    const existsInSheets = await googleSheetsStorage.checkEmailExists(email, 'Beta Applications');
    if (existsInSheets) {
      return { email } as BetaApplication;
    }
    
    // Also check memory for current session
    const memoryResult = Array.from(this.betaApplications.values()).find(
      (application) => application.email === email,
    );
    
    return memoryResult;
  }

  async getAllWaitlistSignups(): Promise<WaitlistSignup[]> {
    return Array.from(this.waitlistSignups.values());
  }

  async getAllBetaApplications(): Promise<BetaApplication[]> {
    return Array.from(this.betaApplications.values());
  }
}

export const storage = new MemStorage();
