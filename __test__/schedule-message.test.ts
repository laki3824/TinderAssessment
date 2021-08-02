const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv')

describe('Schedule Message Tests', () => {
    beforeAll(() => {
        console.log("Starting Post Message tests....");
        dotenv.config();
    });
  
    afterAll(() => {
      console.log("End tests....")
    });

    /**
     * Schedule a text message to a channel with a valid API key.
     * https://api.slack.com/methods/chat.scheduleMessage
     */
     test('Schedule a text message after 60 seconds with a valid API key', async() => {
        //Calulate the time 60 seconds from now
        const scheduledTime = new Date();
        scheduledTime.setSeconds(scheduledTime.getSeconds() + 60);

        const client = new WebClient(process.env.USER_API_KEY);
        const response = await client.chat.scheduleMessage({
            channel: process.env.CHANNEL_NAME,
            text: "This is a scheduled message for testing",
            post_at: Math.round(scheduledTime.getTime() / 1000)
        });
        //console.log("Result: ", response);
        expect(response).toMatchSnapshot({
            post_at: expect.any(Number),
            scheduled_message_id: expect.any(String)
        });
    });
});