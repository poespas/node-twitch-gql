const fetch = require("node-fetch");
const fs = require("fs");

const Operation_Hashes = {
    'CollectionSideBar': '27111f1b382effad0b6def325caef1909c733fe6a4fbabf54f8d491ef2cf2f14',
    'FilterableVideoTower_Videos': 'a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb',
    'ClipsCards__User': 'b73ad2bfaecfd30a9e6c28fada15bd97032c83ec77a0440766a56fe0bd632777',
    'ChannelCollectionsContent': '07e3691a1bad77a36aba590c351180439a40baefc1c275356f40fc7082419a84',
    'StreamMetadata': '1c719a40e481453e5c48d9bb585d971b8b372f8ebb105b17076722264dfa5b3e',
    'ComscoreStreamingQuery': 'e1edae8122517d013405f237ffcc124515dc6ded82480a88daef69c83b53ac01',
    'VideoPreviewOverlay': '3006e77e51b128d838fa4e835723ca4dc9a05c5efd4466c1085215c6e437e65c',
    'PlaybackAccessToken': '0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712',
    'VideoPreviewCard__VideoMoments': '0094e99aab3438c7a220c0b1897d144be01954f8b4765b884d330d0c0893dbde',
    'VideoMetadata': 'cb3b1eb2f2d2b2f65b8389ba446ec521d76c3aa44f5424a1b1d235fe21eb4806',
    'ChatClip': '9aa558e066a22227c5ef2c0a8fded3aaa57d35181ad15f63df25bff516253a90',
    'CategoryTags': "5e639384467cb410fda19531971c8856cf937eb69209a6859fa17fddfce7ee07",
    'AllChannels_InternationalSection': "b4706651ded417d9a34ae91c049197c016c496bfdfd58aeb4a5d2dfbb0dcc9e1",
    'ClipsCards__User': "4eb8f85fc41a36c481d809e8e99b2a32127fdb7647c336d27743ec4a88c4ea44",
    'ClipMetadata': '49817470e0129051cd93c86069aee755795f1a952688f0111bac71a49841ece7',
    'ShareClipRenderStatus': 'f130048a462a0ac86bb54d653c968c514e9ab9ca94db52368c1179e97b0f16eb'
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
                    console.log(err);
                }
            }
    
            fs.writeFileSync(`${__dirname}/../outputs/${QueryName}.json`, JSON.stringify(data, null, 4))
    
            return data;
        });
    }
}


module.exports = GraphQL;