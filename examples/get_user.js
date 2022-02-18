const TwitchGQL = require("..").Init();

(async () => {
    let data = await TwitchGQL.GetUser(
        "sr_kaif"
    );

    console.log(data.data.user);
})();