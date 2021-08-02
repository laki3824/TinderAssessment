const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv')

describe('Slack Post Message Tests', () => {
    beforeAll(() => {
        console.log("Start tests....");
        dotenv.config();
    });
  
    afterAll(() => {
      console.log("End tests....")
    });
  
    /**
     * Send a text message with valid inputs to a channel with a valid API key.
     * https://api.slack.com/methods/chat.postMessage
     */
    test('Send a text message with a valid API key', async() => {
        const client = new WebClient(process.env.USER_API_KEY);
        const response = await client.chat.postMessage({
            channel: process.env.CHANNEL_NAME,
            text: "This is a text message",
        });
        //console.log("Result: ", response);
        expect(response).toMatchSnapshot({
          ts: expect.any(String),
          message: {
            ts: expect.any(String)
          }
        });
    });

        /**
     * Send a text message with valid inputs to a channel with a valid API key.
     * https://api.slack.com/methods/chat.postMessage
     */
    test('Post message with attachments', async() => {
        const client = new WebClient(process.env.USER_API_KEY);
        const response = await client.chat.postMessage({
            channel: process.env.CHANNEL_NAME,
            text: "This is a text message",
            attachments: [
                {
                    //MARK - Could move some of these resources (like url, images) to a config file, if they are shared between mutiple tests
                    "mrkdwn_in": ["text"],
                    "color": "#36a64f",
                    "author_name": "TinderOABot",
                    "author_link": "https://tinder.com/",
                    "author_icon": "https://tinder.com/static/apple-touch-icon.png",
                    "title": "Ready to Swipe right?",
                    "title_link": "https://tinder.com/",
                    "text": "This is a sample message with attachments for Tinder Online Assessment...",
                    "thumb_url": "https://www.datingsitesreviews.com/images/articles/review-tinder-med-2020-06.jpg",
                }
            ]
        });
        //console.log("Result: ", response);
        expect(response).toMatchSnapshot({
            ts: expect.any(String),
            message: {
            ts: expect.any(String)
            }
        });
    });

});
