import { NextResponse } from "next/server";
import { google } from 'googleapis';

export const GET = async (request: Request): Promise<NextResponse> => {
    try {
        // Set up the OAuth2 client with your credentials
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_OAUTH_CLIENTID,
            process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            process.env.GOOGLE_OAUTH_REDIRECT_URL,
        );
        // const { tokens } = await oauth2Client.getToken(request.query.code);
        // const accessToken = tokens.access_token;
        // const refreshToken = tokens.refresh_token;

        // Now, you can use accessToken and refreshToken in your API requests
        oauth2Client.setCredentials({
            access_token:  process.env.GOOGKE_ACCESS_TOKEN,
            refresh_token:  process.env.GOOGLE_REFRESH_TOKEN,
        });


        // // Generate an authentication URL
        // const authUrl = oauth2Client.generateAuthUrl({
        //     access_type: 'offline',
        //     scope: ['https://www.googleapis.com/auth/calendar.events'],
        // });

        // Use the Calendar API to create a new event (Google Meet)
        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
        const event = {
            summary: 'Instant Google Meet',
            description: 'Created via Next.js API',
            start: {
                dateTime: (new Date()).toISOString(),
                timeZone: 'Asia/Kolkata',
            },
            end: {
                dateTime: (new Date((new Date()).getTime() + 60 * 60 * 1000)).toISOString(), // 1 hour later
                timeZone: 'Asia/Kolkata',
            },
            attendees: [
                {email: '007bishalkarmakar@gmail.com'}, // Replace with the email of the Google account
            ],
            conferenceData: {
                createRequest: {
                    requestId: 'sample123', // Unique ID to make sure the request is idempotent
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    },
                },
            },
        };
        

        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event, // use 'requestBody' instead of 'resource'
            conferenceDataVersion: 1,
        });


        // Send the Google Meet link in the response
        return new NextResponse(response.data.hangoutLink);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Caught an Error:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
        return new NextResponse("Error");
    }

}
