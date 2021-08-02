const getRecentMessageFromChannel = require( "./common-utils" );
const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv')

describe('Delete messages tests - ', () => {

    beforeAll(() => {
        console.log("Start tests....");
        dotenv.config();
    });
  
    afterAll(() => {
      console.log("End tests....")
    });

    /**
     * Delete a posted message from a channel.
     * https://api.slack.com/methods/chat.delete
     */
    test('Delete a text message using a valid messageId', async() => {
        //Post a message before trying to delete to keep this test independent of other tests
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
        
        //Edit the message
        const deleteResponse = await client.chat.delete({
            channel: channelId,
            ts: messageId
        });

        //Check whether the operation was successful.
        expect(deleteResponse.ok).toBe(true);

        //Verify whether the correct ts/messageId is deleted
        expect(deleteResponse.ts).toEqual(messageId);

        //Validate the response snap shot
        expect(deleteResponse).toMatchSnapshot({
            ts: expect.any(String)
        });

    });

});
