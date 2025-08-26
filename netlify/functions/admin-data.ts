import { type Handler, type HandlerEvent, type HandlerContext } from "@netlify/functions";
import { storage } from "../../../src/server/storage";

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const waitlistSignups = await storage.getAllWaitlistSignups();
    const betaApplications = await storage.getAllBetaApplications();

    return {
      statusCode: 200,
      body: JSON.stringify({
        waitlistSignups: {
          count: waitlistSignups.length,
          data: waitlistSignups,
        },
        betaApplications: {
          count: betaApplications.length,
          data: betaApplications,
        },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error retrieving data" }),
    };
  }
};