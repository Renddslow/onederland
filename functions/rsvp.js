const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const TOKEN = JSON.parse(process.env.TOKEN);

exports.handler = async function(event, context, callback) {
  const { firstName, lastName, email, count, coming } = JSON.parse(event.body);

  const oauthClient = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
  oauthClient.setCredentials(TOKEN);
  const sheets = google.sheets({ version: 'v4', auth: oauthClient });

  sheets.spreadsheets.values.append({
    spreadsheetId: '1r4zOlV2DpFQzZwT0pkH46zE3zARXpE6N8ri9N2zP5ws',
    insertDataOption: 'INSERT_ROWS',
    valueInputOption: 'RAW',
    range: 'A:A',
    resource: {
      values: [[
        firstName,
        lastName,
        email,
        coming,
        count,
      ]],
    },
  });

  return callback(null, {
    body: 'It worked!',
    statusCode: 200,
  });
};
