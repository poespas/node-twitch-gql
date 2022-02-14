const TwitchGQL = require("..").Init();

(async () => {
    let VideoMetadata = await TwitchGQL.GetVideoMetadata("admiralbahroo", "1293529119");
    console.log(VideoMetadata[0].data.video);
})();