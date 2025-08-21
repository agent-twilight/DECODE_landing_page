import { google } from 'googleapis';
import type { WaitlistSignup, BetaApplication } from '@shared/schema';

export class GoogleSheetsStorage {
  private sheets: any;
  private spreadsheetId: string;

  constructor() {
    // Initialize Google Sheets API
    let auth;
    
    // Check if we have a service account key (JSON format)
    if (process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      try {
        const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
        auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
      } catch (error) {
        console.error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY format. Expected JSON format.');
        // Fallback to API key if JSON parsing fails
        auth = new google.auth.GoogleAuth({
          apiKey: process.env.GOOGLE_SERVICE_ACCOUNT_KEY,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
      }
    } else {
      console.error('GOOGLE_SERVICE_ACCOUNT_KEY not found in environment variables');
      // Create a basic auth object to prevent crashes
      auth = new google.auth.GoogleAuth({
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
    }

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || '';
  }

  async addWaitlistSignup(signup: WaitlistSignup): Promise<void> {
    // Skip Google Sheets integration if not properly configured
    if (!this.spreadsheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.log('Google Sheets not configured, skipping...');
      return;
    }

    try {
      const values = [
        [
          signup.id,
          signup.email,
          signup.concerns || '',
          signup.createdAt.toISOString(),
          new Date().toLocaleString('en-US', { timeZone: 'UTC' })
        ]
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Waitlist!A:E', // Sheet name: Waitlist, columns A to E
        valueInputOption: 'RAW',
        resource: {
          values: values,
        },
      });
      console.log('Successfully added waitlist signup to Google Sheets');
    } catch (error) {
      console.error('Error adding waitlist signup to Google Sheets:', error);
      // Don't throw error - continue with in-memory storage
    }
  }

  async addBetaApplication(application: BetaApplication): Promise<void> {
    // Skip Google Sheets integration if not properly configured
    if (!this.spreadsheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      console.log('Google Sheets not configured, skipping...');
      return;
    }

    try {
      const values = [
        [
          application.id,
          application.email,
          application.background || '',
          application.experience,
          application.createdAt.toISOString(),
          new Date().toLocaleString('en-US', { timeZone: 'UTC' })
        ]
      ];

      await this.sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: 'Beta Applications!A:F', // Sheet name: Beta Applications, columns A to F
        valueInputOption: 'RAW',
        resource: {
          values: values,
        },
      });
      console.log('Successfully added beta application to Google Sheets');
    } catch (error) {
      console.error('Error adding beta application to Google Sheets:', error);
      // Don't throw error - continue with in-memory storage
    }
  }

  async initializeSheets(): Promise<void> {
    try {
      // Create headers for Waitlist sheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Waitlist!A1:E1',
        valueInputOption: 'RAW',
        resource: {
          values: [['ID', 'Email', 'Skincare Concerns', 'Created At (ISO)', 'Created At (Readable)']],
        },
      });

      // Create headers for Beta Applications sheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Beta Applications!A1:F1',
        valueInputOption: 'RAW',
        resource: {
          values: [['ID', 'Email', 'Background', 'Experience/Interest', 'Created At (ISO)', 'Created At (Readable)']],
        },
      });
    } catch (error) {
      console.error('Error initializing Google Sheets headers:', error);
      // Don't throw here - headers might already exist
    }
  }

  async checkEmailExists(email: string, sheetName: string): Promise<boolean> {
    // Skip Google Sheets check if not properly configured
    if (!this.spreadsheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      return false;
    }

    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetName}!B:B`, // Column B contains emails
      });

      const rows = response.data.values || [];
      // Skip header row and check if email exists
      return rows.slice(1).some((row: any[]) => row[0] === email);
    } catch (error) {
      console.error(`Error checking email existence in ${sheetName}:`, error);
      return false; // Assume email doesn't exist if we can't check
    }
  }
}

export const googleSheetsStorage = new GoogleSheetsStorage();