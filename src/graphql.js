const fetch = require("node-fetch");
const fs = require("fs");

const Operation_Hashes = {
    'CollectionSideBar': '016e1e4ccee0eb4698eb3bf1a04dc1c077fb746c78c82bac9a8f0289658fbd1a',
    'FilterableVideoTower_Videos': '67004f7881e65c297936f32c75246470629557a393788fb5a69d6d9a25a8fd5f',
    'ClipsCards__User': '90c33f5e6465122fba8f9371e2a97076f9ed06c6fed3788d002ab9eba8f91d88',
    'ChannelCollectionsContent': '5247910a19b1cd2b760939bf4cba4dcbd3d13bdf8c266decd16956f6ef814077',
    'StreamMetadata': 'b57f9b910f8cd1a4659d894fe7550ccc81ec9052c01e438b290fd66a040b9b93',
    'ComscoreStreamingQuery': '0f77ff1cc14693b042bda24d1f1677ea07c22a322f1343efb95b83f7d7918b4c',
    'VideoPreviewOverlay': '9515480dee68a77e667cb19de634739d33f243572b007e98e67184b1a5d8369f',
    'PlaybackAccessToken': '0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712',
    'VideoPreviewCard__VideoMoments': '7399051b2d46f528d5f0eedf8b0db8d485bb1bb4c0a2c6707be6f1290cdcb31a',
    'VideoMetadata': '45111672eea2e507f8ba44d101a61862f9c56b11dee09a15634cb75cb9b9084d',
    'ChatClip': '9aa558e066a22227c5ef2c0a8fded3aaa57d35181ad15f63df25bff516253a90',
    'CategoryTags': "5e639384467cb410fda19531971c8856cf937eb69209a6859fa17fddfce7ee07",
    'AllChannels_InternationalSection': "b4706651ded417d9a34ae91c049197c016c496bfdfd58aeb4a5d2dfbb0dcc9e1",
    'ClipMetadata': '49817470e0129051cd93c86069aee755795f1a952688f0111bac71a49841ece7',
    'ShareClipRenderStatus': '1844261bb449fa51e6167040311da4a7a5f1c34fe71c71a3e0c4f551bc30c698',
    'VideoPlayer_ChapterSelectButtonVideo': '71835d5ef425e154bf282453a926d99b328cdc5e32f36d3a209d0f4778b41203'
};

const GraphQL = {
    Endpoint: "https://gql.twitch.tv/gql",
    ClientID: null,

    SendQuery: async (QueryName, variables = null, preset = false) => {
        let body = { variables };
    
        if (!GraphQL.ClientID)
            throw "Please make sure to fill in a ClientID";
    
        if (!preset) {
            body.query = fs.readFileSync(`${__dirname}/../queries/${QueryName}.gql`, "UTF-8");
        }
        else {
            body.operationName = QueryName;
            body.extensions = {
                "persistedQuery": {
                    "version":1,
                    "sha256Hash": Operation_Hashes[QueryName]
                }
            };
            body = [body];
        }
        
        return fetch(GraphQL.Endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain;charset=UTF-8",
                "Client-Id": GraphQL.ClientID
            },
            body: JSON.stringify(body),
        })
        .then((r) => r.json())
        .then((data) => {
            if (data.errors || (data[0] && data[0].errors)) {
                let errs = data.length ? data[0].errors : data.errors;
                for (let i = 0; i < errs.length; i++) {
                    const err = errs[i];
                    console.log("ERROR!");
                    console.log({err});

                    throw err;
                }
            }
    
            fs.writeFileSync(`${__dirname}/../outputs/${QueryName}.json`, JSON.stringify(data, null, 4))
    
            return data;
        });
    }
}


module.exports = GraphQL;