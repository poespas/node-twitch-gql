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
        variables = {after: "", ...variables, amount};
        return GraphQL.SendQuery("GET_TOP_STREAMS", variables);
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
    _SendQuery(QueryName, variables = null, preset = false) {
        return GraphQL.SendQuery(QueryName, variables, preset);
    }
};

module.exports = Twitch;
