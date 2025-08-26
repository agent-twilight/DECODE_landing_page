import { type Handler, type HandlerEvent, type HandlerContext } from "@netlify/functions";
import { storage } from "../../src/server/storage";
import { insertBetaApplicationSchema } from "../../src/shared/schema";
import { z } from "zod";

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const applicationData = insertBetaApplicationSchema.parse(JSON.parse(event.body || "{}"));

    const existingApplication = await storage.getBetaApplicationByEmail(applicationData.email);
    if (existingApplication) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Email already submitted for beta testing" }),
      };
    }

    const application = await storage.createBetaApplication(applicationData);
    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Beta application submitted successfully",
        id: application.id,
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