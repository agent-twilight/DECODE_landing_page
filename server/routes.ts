import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSignupSchema, insertBetaApplicationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Waitlist signup endpoint
  app.post("/api/waitlist", async (req, res) => {
    try {
      const signupData = insertWaitlistSignupSchema.parse(req.body);
      
      // Check if email already exists
      const existingSignup = await storage.getWaitlistSignupByEmail(signupData.email);
      if (existingSignup) {
        return res.status(400).json({ 
          message: "Email already registered for waitlist" 
        });
      }

      const signup = await storage.createWaitlistSignup(signupData);
      res.status(201).json({ 
        message: "Successfully joined waitlist",
        id: signup.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Beta application endpoint
  app.post("/api/beta", async (req, res) => {
    try {
      const applicationData = insertBetaApplicationSchema.parse(req.body);
      
      // Check if email already exists
      const existingApplication = await storage.getBetaApplicationByEmail(applicationData.email);
      if (existingApplication) {
        return res.status(400).json({ 
          message: "Email already submitted for beta testing" 
        });
      }

      const application = await storage.createBetaApplication(applicationData);
      res.status(201).json({ 
        message: "Beta application submitted successfully",
        id: application.id 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Invalid data provided",
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
