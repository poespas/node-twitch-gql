const GraphQL = require("./graphql");

const Twitch = {
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
    }
};

module.exports = Twitch;
