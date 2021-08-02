const getRecentMessageFromChannel = require( "./common-utils" );
const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv')

describe('Update messages tests - ', () => {

    beforeAll(() => {
        console.log("Start tests....");
        dotenv.config();
    });
  
    afterAll(() => {
      console.log("End tests....")
    });

    /**
     * Edit a posted message from a channel.
     * https://api.slack.com/methods/chat.update
     */
    test('Edit a text message using a valid messageId', async() => {

        //Post a message before trying to edit one, so this test can be executed independently
        const client = new WebClient(process.env.USER_API_KEY);

        const channelId = process.env.CHANNEL_ID;

        const response = await client.chat.postMessage({
            channel: process.env.CHANNEL_NAME,
            text: "This is a text message",
        });

        //Verify whether the message was posted to the channel
        expect(response.ok).toBe(true);

        //Retrieve the recent message from the channel
        const message = await getRecentMessageFromChannel(client, channelId);

        const messageId = message.ts;

        console.log("Retrieved messageId: " + messageId);
        
        //Delete the message using the messageId/ts
        const editResponse = await client.chat.update({
            channel: channelId,
            ts: messageId,
            text: "This is an updated text message",
        });

        //Verify the ts/messageId is not modified with this update
        expect(editResponse.ts).toEqual(messageId);

        //Validate the response snap shot
        expect(editResponse).toMatchSnapshot({
            ts: expect.any(String)
        });

    });

});
