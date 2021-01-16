const TwitchGQL = { 
    client: require("./src/twitch"),
    isInitialized: false,

    Init: (ClientID) => {
        if (TwitchGQL.isInitialized)
            return TwitchGQL.client;

        TwitchGQL.client.SetClientID(ClientID);
        TwitchGQL.isInitialized = true;

        return TwitchGQL.client;
    }
}

module.exports = TwitchGQL;