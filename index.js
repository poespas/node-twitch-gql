const TwitchGQL = { 
    client: require("./src/twitch"),
    isInitialized: false,

    Init: (ClientID = "kimne78kx3ncx6brgo4mv6wki5h1ko") => {
        if (TwitchGQL.isInitialized)
            return TwitchGQL.client;

        TwitchGQL.client.SetClientID(ClientID);
        TwitchGQL.isInitialized = true;

        return TwitchGQL.client;
    }
}

module.exports = TwitchGQL;