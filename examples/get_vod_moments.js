const TwitchGQL = require("..").Init();

(async () => {
    let VodMoments = await TwitchGQL.GetVideoMoments("1293128540");
    console.log({VodMoments: VodMoments[0].data.video.moments.edges.map(i => i.node)});
})();