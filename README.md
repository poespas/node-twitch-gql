# TwitchGQL

### Allows interaction with Twitch via the Twitch's inner GraphQL protocol

# Installation

Install it from [npm](https://www.npmjs.com/package/twitch-gql):

    $ npm install twitch-gql

# Contents
- [How to use](#how-to-use)
- [Methods](#methods)
- [About](#about)

# How to use

Head over to the `examples/` directory for examples.

```js
const TwitchGQL = require("twitch-gql").Init();

(async () => {
    let CurrentTopStreams = await TwitchGQL.GetTopStreams();
    CurrentTopStreams = CurrentTopStreams.data.streams.edges;

    console.log(CurrentTopStreams);
})();
```

# Methods

## Init(clientID)

- `clientID` - An optional parameter to set the client ID

Initializes TwitchGQL en returns a client-object

## GetUser(login)

- `login` - Login of the broadcaster

Gets broadcaster information.

## GetTopStreams(amount)

- `amount` - An optional parameter to set the amount of rows you want to get

Get the current top broadcasters currently live

## GetVideos(login)

- `login` - Login of the broadcaster

Get a list of last broadcasts or videos from a broadcaster

## GetPlaybackAccessToken(videoID)

- `videoID` - The video ID you want to request the access token for

Get an access token and signature to use for an m3u8 playlist

## _SendQuery(QueryName, variables, preset)

- `QueryName` - The name of a preset query in the `queries` directory  
  In the case the `preset` parameter is true,
  this is the name of a pre-set queryname from Twitch

- `variables` - An optional object of variables you want to pass onto the query

- `preset` - (default false) if `true` this will use 

Send a raw query through GraphQL

# About

Made by poespas ( me@poespas.me )