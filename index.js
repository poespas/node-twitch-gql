const TwitchGQL = { 
    client: require("./src/twitch"),
    isInitialized: false,

    Init: (ClientID = "ue6666qo983tsx6so1t0vnawi233wa") => {
        if (TwitchGQL.isInitialized)
            return TwitchGQL.client;

        TwitchGQL.client.SetClientID(ClientID);
        TwitchGQL.isInitialized = true;

        return TwitchGQL.client;
    }
}

module.exports = TwitchGQL;