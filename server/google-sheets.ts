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
      const keyValue = process.env.GOOGLE_SERVICE_ACCOUNT_KEY.trim();
      
      // Check if it looks like an API key (starts with "AIza") vs service account JSON
      if (keyValue.startsWith('AIza') || keyValue.startsWith('AIzaS')) {
        console.warn('Detected API key instead of service account JSON. Google Sheets integration will be disabled.');
        console.warn('To enable Google Sheets storage, please provide a service account JSON key file content.');
        this.sheets = null;
        this.spreadsheetId = '';
        return;
      }
      
      try {
        const credentials = JSON.parse(keyValue);
        
        // Validate it's a proper service account key
        if (!credentials.type || credentials.type !== 'service_account') {
          throw new Error('Invalid service account format');
        }
        
        auth = new google.auth.GoogleAuth({
          credentials,
          scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        console.log('Google Sheets authentication configured with service account');
      } catch (error) {
        console.error('Invalid GOOGLE_SERVICE_ACCOUNT_KEY format. Expected JSON format.', error);
        throw new Error('Invalid Google Service Account Key format. Please provide a valid JSON service account key file content.');
      }
    } else {
      console.error('GOOGLE_SERVICE_ACCOUNT_KEY not found in environment variables');
      throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY is required for Google Sheets integration');
    }

    this.sheets = google.sheets({ version: 'v4', auth });
    this.spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID || '';
    
    if (!this.spreadsheetId) {
      throw new Error('GOOGLE_SPREADSHEET_ID is required for Google Sheets integration');
    }
  }

  async addWaitlistSignup(signup: WaitlistSignup): Promise<void> {
    // Check if Google Sheets is properly configured
    if (!this.sheets || !this.spreadsheetId) {
      console.log('Google Sheets not configured, skipping waitlist signup storage');
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
      throw new Error(`Failed to save waitlist signup to Google Sheets: ${(error as Error).message}`);
    }
  }

  async addBetaApplication(application: BetaApplication): Promise<void> {
    // Check if Google Sheets is properly configured
    if (!this.sheets || !this.spreadsheetId) {
      console.log('Google Sheets not configured, skipping beta application storage');
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
      throw new Error(`Failed to save beta application to Google Sheets: ${(error as Error).message}`);
    }
  }

  async initializeSheets(): Promise<void> {
    if (!this.sheets || !this.spreadsheetId) {
      console.log('Google Sheets not configured, skipping initialization');
      return;
    }
    
    try {
      // First, try to create the sheets if they don't exist
      await this.createSheetsIfNeeded();
      
      // Then set up headers for Waitlist sheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Waitlist!A1:E1',
        valueInputOption: 'RAW',
        resource: {
          values: [['ID', 'Email', 'Skincare Concerns', 'Created At (ISO)', 'Created At (Readable)']],
        },
      });

      // Set up headers for Beta Applications sheet
      await this.sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: 'Beta Applications!A1:F1',
        valueInputOption: 'RAW',
        resource: {
          values: [['ID', 'Email', 'Background', 'Experience/Interest', 'Created At (ISO)', 'Created At (Readable)']],
        },
      });
      
      console.log('Google Sheets headers initialized successfully');
    } catch (error) {
      console.error('Error initializing Google Sheets:', error);
      // Don't throw here - continue gracefully
    }
  }

  private async createSheetsIfNeeded(): Promise<void> {
    try {
      // Get current spreadsheet info
      const spreadsheet = await this.sheets.spreadsheets.get({
        spreadsheetId: this.spreadsheetId,
      });

      const existingSheets = spreadsheet.data.sheets?.map((sheet: any) => sheet.properties?.title) || [];
      
      const requests = [];
      
      // Check if Waitlist sheet exists
      if (!existingSheets.includes('Waitlist')) {
        requests.push({
          addSheet: {
            properties: {
              title: 'Waitlist',
            },
          },
        });
      }
      
      // Check if Beta Applications sheet exists
      if (!existingSheets.includes('Beta Applications')) {
        requests.push({
          addSheet: {
            properties: {
              title: 'Beta Applications',
            },
          },
        });
      }
      
      // Create sheets if needed
      if (requests.length > 0) {
        await this.sheets.spreadsheets.batchUpdate({
          spreadsheetId: this.spreadsheetId,
          resource: {
            requests: requests,
          },
        });
        console.log('Created missing sheets:', requests.map(r => r.addSheet.properties.title));
      }
    } catch (error) {
      console.error('Error creating sheets:', error);
      // Continue - sheets might already exist
    }
  }

  async checkEmailExists(email: string, sheetName: string): Promise<boolean> {
    // Check if Google Sheets is properly configured
    if (!this.sheets || !this.spreadsheetId) {
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
      // If we can't check, assume email doesn't exist to allow the operation
      return false;
    }
  }
}

export const googleSheetsStorage = new GoogleSheetsStorage();