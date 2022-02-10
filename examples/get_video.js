const TwitchGQL = require("..").Init();

(async () => {
    let Channel = await TwitchGQL._SendQuery("GET_VIDEO", {videoId: "1293128540"});
    console.log(Channel.data.video);
})();