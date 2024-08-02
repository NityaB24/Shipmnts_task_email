Test the API Endpoints:
1. POST /schedule-email:
Method: POST
URL: http://localhost:5000/api/emails/schedule-email
Headers:
Key: Content-Type
Value: application/json
Body: Select "JSON" and use the following payload example:
json
Copy code
{
  "recipient": "recipient@example.com",
  "subject": "Test Email",
  "body": "This is a test email.",
  "scheduleTime": "2024-08-03T14:00:00.000Z",
  "recurrence": "none",
  "recurrenceDetails": {},
  "attachments": []
}
Send Request: Click the "Send" button.
Check Response: Ensure you receive a response with the scheduled email details.
2. GET /scheduled-emails:
Method: GET
URL: http://localhost:5000/api/emails/scheduled-emails
Send Request: Click the "Send" button.
Check Response: Ensure you receive a list of all scheduled emails.
3. GET /scheduled-emails/{id}:
Method: GET
URL: http://localhost:5000/api/emails/scheduled-emails/{id} (replace {id} with an actual email ID from your database)
Send Request: Click the "Send" button.
Check Response: Ensure you receive the details of the specific scheduled email.
4. DELETE /scheduled-emails/{id}:
Method: DELETE
URL: http://localhost:5000/api/emails/scheduled-emails/{id} (replace {id} with an actual email ID from your database)
Send Request: Click the "Send" button.
Check Response: Ensure the email is canceled and you receive a confirmation message.
Example Request and Response Screenshots
Here are example screenshots to guide you through the process in Thunder Client:

POST /schedule-email Request:

Request:
GET /scheduled-emails Request:

Request:
GET /scheduled-emails/{id} Request:

Request:
DELETE /scheduled-emails/{id} Request:

Request:
5. Verify Server Logs:
Check the server logs to see if the emails are being scheduled and sent correctly. Your console should display messages like "Email sent to recipient@example.com" when an email is successfully sent.

Summary
By following these steps, you can effectively test your Automated Email Scheduling API using Thunder Client in Visual Studio Code. Ensure your server is running and your MongoDB is connected properly to avoid any connection issues.

meaning of this

2024-08-03T14:00:00.000Z

The string 2024-08-03T14:00:00.000Z is an example of a date and time in ISO 8601 format. Here's a breakdown of what each part means:

2024: The year.
08: The month (August).
03: The day of the month.
T: A separator indicating the beginning of the time component.
14: The hour (14th hour of the day, which is 2 PM in 24-hour format).
00: The minutes.
00: The seconds.
000: The milliseconds.
Z: The time zone designator for UTC (Coordinated Universal Time). "Z" stands for "Zulu time," which is another term for UTC.
In summary, 2024-08-03T14:00:00.000Z represents August 3rd, 2024 at 14:00:00 (2:00 PM) in UTC time. This format is commonly used in APIs and programming languages to ensure that date and time values are communicated consistently and unambiguously across different systems and time zones.