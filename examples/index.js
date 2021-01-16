const ClientID = "kimne78kx3ncx6brgo4mv6wki5h1ko";

const TwitchGQL = require("..").Init(ClientID);

(async () => {
    let CurrentTopStreams = await TwitchGQL.GetTopStreams();
    CurrentTopStreams = CurrentTopStreams.data.streams.edges;

    for (let i = 0; i < CurrentTopStreams.length; i++) {
        const stream = CurrentTopStreams[i].node;
        
        console.log(`"${stream.title}" by "${stream.broadcaster.displayName}"`)
    }
})();