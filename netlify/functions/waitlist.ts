import { type Handler, type HandlerEvent, type HandlerContext } from "@netlify/functions";
import { storage } from "../../server/storage";
import { insertWaitlistSignupSchema } from "../../shared/schema";
import { z } from "zod";

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const signupData = insertWaitlistSignupSchema.parse(JSON.parse(event.body || "{}"));

    const existingSignup = await storage.getWaitlistSignupByEmail(signupData.email);
    if (existingSignup) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email already registered for waitlist" }),
      };
    }

    const signup = await storage.createWaitlistSignup(signupData);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Successfully joined waitlist",
        id: signup.id,
      }),
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid data provided",
          errors: error.errors,
        }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};