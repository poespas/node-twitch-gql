const TwitchGQL = require("..").Init();

(async () => {
    let VideoMetadata = await TwitchGQL.GetVideoMetadata("burn", "1292463369");
    console.log(VideoMetadata[0].data.video);
})();