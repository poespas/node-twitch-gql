const TwitchGQL = require("..").Init();

(async () => {
    let ChatClip = await TwitchGQL.GetChatClip("HappyLovelyDoveDoritosChip-1I0FMnBQn1W-Ho3P");
    console.log(ChatClip[0].data.clip);
})();