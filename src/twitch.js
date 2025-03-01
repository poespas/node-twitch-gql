const GraphQL = require("./graphql");

const Twitch = {
    SetClientID(ClientID) {
        GraphQL.ClientID = ClientID;
    },
    GetUser(login, variables = {}) {
        variables = {...variables, login};
        return GraphQL.SendQuery("GET_USER", variables);
    },
    GetTopStreams(amount = 25, variables = {}) {
        variables = {
            limit: amount,
            platformType: "all",
            sortTypeIsRecency: false,
            ...variables
        };
        return GraphQL.SendQuery("AllChannels_InternationalSection", variables, true);
    },
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
    GetVideoMoments(vodID, variables = {}) {
        let opts = {
            videoId: vodID,
            ...variables
        };
        return GraphQL.SendQuery("VideoPreviewCard__VideoMoments", opts, true);
    },
    GetVideoMetadata(channelLogin, vodID, variables = {}) {
        let opts = {
            channelLogin,
            videoID: vodID,
            ...variables
        };
        return GraphQL.SendQuery("VideoMetadata", opts, true);
    },
    GetGameCategoryTags(gameName, variables = {}) {
        let opts = {
            gameName,
            tagType: "CONTENT",
            ...variables
        };
        return GraphQL.SendQuery("CategoryTags", opts, true);
    },
    GetChatClip(clipSlug, variables = {}) {
        let opts = {
            clipSlug,
            ...variables
        };
        return GraphQL.SendQuery("ChatClip", opts, true);
    },
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
    GetClipMetadata(clipSlug) {
        const variables = {
            clipSlug
        };
        return GraphQL.SendQuery("ClipMetadata", variables, true);
    },
    GetShareClipRenderStatus(slug) {
        const variables = {
            slug
        };
        return GraphQL.SendQuery("ShareClipRenderStatus", variables, true);
    },
    _SendQuery(QueryName, variables = null, preset = false) {
        return GraphQL.SendQuery(QueryName, variables, preset);
    }
};

module.exports = Twitch;
