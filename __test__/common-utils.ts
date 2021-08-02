/**
 * Utility function to fetch the recent message from a channel
 * @param channelId channelId
 * @returns Message
 */
 module.exports = async function getRecentMessageFromChannel(client, channelId) {

    const result = await client.conversations.history({
        channel: channelId,
        // Limit results
        inclusive: true,
        limit: 1
    });
    
    if (!result.messages.length) {
        //if there are no messages in the channel, throw an exception
        throw new Error('No messages were found in the channel: ' + channelId);
    }
    return result.messages[0];

}
