const getRecentMessageFromChannel = require( "./common-utils" );
const { WebClient } = require('@slack/web-api');
const dotenv = require('dotenv')

describe('General invalid/exception tests - ', () => {
    
    beforeAll(() => {
        console.log("Start tests....");
        dotenv.config();
    });
  
    afterAll(() => {
      console.log("End tests....")
    })

    /**
     * Client authentication error test.
     */
    it('Send a text message with an invalid api key', async () => {
        expect.assertions(1);
        try {
            const client = new WebClient('some-random-api-key');
            await client.chat.postMessage({
                channel: process.env.VALID_CHANNEL_NAME,
                text: "Some text message...",
            });
        } catch (e) {
            expect(e).toMatchSnapshot();
        }
    });

    /**
     * Post message to an invalid channel.
     */
    it('Send message to an invalid channel', async () => {
        expect.assertions(1);
        try {
            const client = new WebClient(process.env.USER_API_KEY);
            await client.chat.postMessage({
                channel: "#SOME-UNKNOWN-CHANNEL",
                text: "Some text message...",
            });
        } catch (e) {
            expect(e).toMatchSnapshot();
        }
    });

    /**
     * Edit message posted by another user
     */
    it('Update message posted by another user', async () => {
        expect.assertions(1);
        try {
            const userClient = new WebClient(process.env.USER_API_KEY);
            const channelId = process.env.CHANNEL_ID;

            //Retrieve the recent message from the channel
            const message = await getRecentMessageFromChannel(userClient, channelId);

            const messageId = message.ts;
            console.log("Retrieved messageId: " + messageId);
            
            //Try editing a message post by an user using a bot client api token
            await new WebClient(process.env.BOT_API_KEY).chat.update({
                channel: channelId,
                ts: messageId,
                text: "Trying to update some other user message!"
            });
        } catch (e) {
            expect(e).toMatchSnapshot();
        }
    });

    /**
     * Delete message posted by another user
     */
    it('Delete message posted by another user', async () => {
        expect.assertions(1);
        try {
            const userClient = new WebClient(process.env.USER_API_KEY);
            const channelId = process.env.CHANNEL_ID;

            //Retrieve the recent message from the channel
            const message = await getRecentMessageFromChannel(userClient, channelId);

            const messageId = message.ts;
            console.log("Retrieved messageId: " + messageId);
            
            //Try deleting a message post by an user using a bot client api token
            await new WebClient(process.env.BOT_API_KEY).chat.Delete({
                channel: channelId,
                ts: messageId
            });
        } catch (e) {
            expect(e).toMatchSnapshot();
        }
    });

    /**
     * Validate access restriction of an user who's not in the channel
     */
    it('Unauthorized access to chat history', async () => {
        expect.assertions(1);
        try {

            const channelId = process.env.CHANNEL_ID;

            //Try fetching the conversation history of a channel using a client (api token) which does not have the scope/permission to perform such operation.
            await new WebClient(process.env.BOT_API_KEY).conversations.history({
                channel: channelId,
                // Limit results
                inclusive: true,
                limit: 10
            });

        } catch (e) {
            expect(e).toMatchSnapshot();
        }
    });

});
