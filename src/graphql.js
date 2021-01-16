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
    'PlaybackAccessToken': '0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712'
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