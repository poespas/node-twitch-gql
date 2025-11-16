const GraphQL = require("./graphql");

const Twitch = {
    /**
     * Set the Twitch Client ID for API requests
     * @param {string} ClientID - The Twitch Client ID
     */
    SetClientID(ClientID) {
        GraphQL.ClientID = ClientID;
    },
    /**
     * Get user information by login name
     * @param {string} login - The Twitch username
     * @param {Object} [variables={}] - Additional query variables
     * @returns {Promise<Object>} User data
     */
    GetUser(login, variables = {}) {
        variables = {...variables, login};
        return GraphQL.SendQuery("GET_USER", variables);
    },
    /**
     * Get top streams on Twitch
     * @deprecated Currently unavailable - Twitch has changed their operation hashes
     * @param {number} [amount=25] - Number of streams to fetch
     * @param {Object} [variables={}] - Additional query variables
     * @returns {Promise<Object>} Top streams data
     */
    GetTopStreams(amount = 25, variables = {}) {
        console.warn("DEPRECATED: GetTopStreams is currently unavailable. Twitch has changed their operation hashes and this function needs to be updated.");
        variables = {
            limit: amount,
            platformType: "all",
            sortTypeIsRecency: false,
            ...variables
        };
        return GraphQL.SendQuery("AllChannels_InternationalSection", variables, true);
    },
    /**
     * Get videos/VODs from a channel
     * @param {string} login - The channel login name
     * @param {Object} [variables={}] - Additional query variables (broadcastType, limit, videoSort, etc.)
     * @returns {Promise<Object>} Videos data
     */
    GetVideos(login, variables = {}) {
        let opts = {
            broadcastType: "ARCHIVE",
            channelOwnerLogin: login,
            limit: 30,
            videoSort: "TIME",
            ...variables
        }
        return GraphQL.SendQuery("FilterableVideoTower_Videos", opts, true);
    },
    /**
     * Get playback access token for a VOD
     * @param {string} vodID - The VOD ID
     * @param {Object} [variables={}] - Additional query variables
     * @returns {Promise<Object>} Playback access token data
     */
    GetPlaybackAccessToken(vodID, variables = {}) {
        let opts = {
            isLive: false,
            isVod: true,
            login: "",
            playerType: "channel_home_carousel",
            vodID: vodID,
            ...variables
        };
        return GraphQL.SendQuery("PlaybackAccessToken", opts, true);
    },
    /**
     * Get video moments/highlights for a VOD
     * @param {string} vodID - The VOD ID
     * @param {Object} [variables={}] - Additional query variables
     * @returns {Promise<Object>} Video moments data
     */
    GetVideoMoments(vodID, variables = {}) {
        let opts = {
            videoId: vodID,
            ...variables
        };
        return GraphQL.SendQuery("VideoPreviewCard__VideoMoments", opts, true);
    },
    /**
     * Get metadata for a specific video
     * @param {string} channelLogin - The channel login name
     * @param {string} vodID - The VOD ID
     * @param {Object} [variables={}] - Additional query variables
     * @returns {Promise<Object>} Video metadata
     */
    GetVideoMetadata(channelLogin, vodID, variables = {}) {
        let opts = {
            channelLogin,
            videoID: vodID,
            ...variables
        };
        return GraphQL.SendQuery("VideoMetadata", opts, true);
    },
    /**
     * Get category tags for a game
     * @deprecated Currently unavailable - Twitch has changed their operation hashes
     * @param {string} gameName - The name of the game
     * @param {Object} [variables={}] - Additional query variables
     * @returns {Promise<Object>} Category tags data
     */
    GetGameCategoryTags(gameName, variables = {}) {
        console.warn("DEPRECATED: GetGameCategoryTags is currently unavailable. Twitch has changed their operation hashes and this function needs to be updated.");
        let opts = {
            gameName,
            tagType: "CONTENT",
            ...variables
        };
        return GraphQL.SendQuery("CategoryTags", opts, true);
    },
    /**
     * Get chat messages for a clip
     * @param {string} clipSlug - The clip slug/ID
     * @param {Object} [variables={}] - Additional query variables
     * @returns {Promise<Object>} Chat clip data
     */
    GetChatClip(clipSlug, variables = {}) {
        let opts = {
            clipSlug,
            ...variables
        };
        return GraphQL.SendQuery("ChatClip", opts, true);
    },
    /**
     * Get clips for a user
     * @param {string} login - The user login name
     * @param {string} [filter="ALL_TIME"] - Time filter (ALL_TIME, LAST_DAY, LAST_WEEK, LAST_MONTH)
     * @param {number} [limit=20] - Number of clips to fetch
     * @returns {Promise<Object>} User clips data
     */
    GetClipsCardsUser(login, filter = "ALL_TIME", limit = 20) {
        const variables = {
            login: login,
            limit: limit,
            criteria: {
                filter: filter,
                shouldFilterByDiscoverySetting: true
            },
            cursor: null
        };
        return GraphQL.SendQuery("ClipsCards__User", variables, true);
    },
    /**
     * Get metadata for a specific clip
     * @param {string} clipSlug - The clip slug/ID
     * @returns {Promise<Object>} Clip metadata
     */
    GetClipMetadata(clipSlug) {
        const variables = {
            clipSlug
        };
        return GraphQL.SendQuery("ClipMetadata", variables, true);
    },
    /**
     * Get the render status of a shared clip
     * @param {string} slug - The clip slug/ID
     * @returns {Promise<Object>} Clip render status data
     */
    GetShareClipRenderStatus(slug) {
        const variables = {
            slug
        };
        return GraphQL.SendQuery("ShareClipRenderStatus", variables, true);
    },
    /**
     * Internal method to send a custom GraphQL query
     * @private
     * @param {string} QueryName - The name of the query
     * @param {Object|null} [variables=null] - Query variables
     * @param {boolean} [preset=false] - Whether to use a preset query
     * @returns {Promise<Object>} Query result
     */
    _SendQuery(QueryName, variables = null, preset = false) {
        return GraphQL.SendQuery(QueryName, variables, preset);
    }
};

module.exports = Twitch;
