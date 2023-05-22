const { test, expect, describe } = require("@jest/globals");

const TwitchGQL = require("..").Init();
const TestMisc = require("../.tests/misc");

const USERS = ["Asmongold", "XQCOW", "Mizkif"];
const VIDEOS = ["132195945", "1121890940"];
const GAMES = ["Fallguys", "Destiny 2"];
const CLIPS = ["OutstandingUninterestedNewtCeilingCat-hY-I9SEIwIbTitYJ"];

// START OPERATIONS
describe("Operations", () => {
    test("GetUser", (done) => {
        const UserModel = {
            id: String,
            login: String,
            displayName: String,
            description: String,
            createdAt: String,
            roles: {
                isPartner: Boolean,
            },
        };

        (async () => {
            let data = await TwitchGQL.GetUser(
                USERS[Math.round(Math.random() * (USERS.length - 1))]
            );

            TestMisc.CheckModel(data.data.user, UserModel);

            done();
        })();
    });

    test("GetTopStreams", (done) => {
        const TopStreamModel = {
            id: String,
            title: String,
            viewersCount: Number,
            language: String,
            broadcaster: {
                displayName: String,
            },
            tags: Array,
            game: {
                name: String,
            },
        };

        (async () => {
            let data = await TwitchGQL.GetTopStreams(10);
            let streams = data.data.streams.edges.map((i) => i.node);

            expect(streams.length).toBe(10);

            for (let i = 0; i < streams.length; i++) {
                const stream = streams[i];

                TestMisc.CheckModel(stream, TopStreamModel);
            }

            done();
        })();
    });

    test("GetVideos", (done) => {
        const TopStreamModel = {
            animatedPreviewURL: String,
            game: {
                boxArtURL: String,
                id: String,
                displayName: String,
                name: String,
            },
            id: String,
            lengthSeconds: Number,
            owner: {
                displayName: String,
                id: String,
                login: String,
                profileImageURL: String,
            },
            previewThumbnailURL: String,
            publishedAt: String,
            self: {
                isRestricted: Boolean,
            },
            title: String,
            viewCount: Number,
            contentTags: Array,
        };

        (async () => {
            let data = await TwitchGQL.GetVideos(
                USERS[Math.round(Math.random() * (USERS.length - 1))]
            );
            let videos = data[0].data.user.videos.edges.map((i) => i.node);

            expect(videos.length).toBeGreaterThan(2);

            for (let i = 0; i < videos.length; i++) {
                const video = videos[i];

                TestMisc.CheckModel(video, TopStreamModel);
            }

            done();
        })();
    });

    test("GetPlaybackAccessToken", (done) => {
        const PlaybackAccessTokenModel = {
            value: String,
            signature: String,
        };

        (async () => {
            let data = await TwitchGQL.GetPlaybackAccessToken(VIDEOS[0]);
            let playback_access_token = data[0].data.videoPlaybackAccessToken;

            TestMisc.CheckModel(
                playback_access_token,
                PlaybackAccessTokenModel
            );

            done();
        })();
    });

    test("GetVideoMoments", (done) => {
        const VideoMomentModel = {
            id: String,
            durationMilliseconds: Number,
            positionMilliseconds: Number,
            type: String,
            description: String,
            thumbnailURL: String,
            video: {
                id: String,
                lengthSeconds: Number,
            },
        };
        const expectedLengths = {
            //  index:moments
            0: 0,
            1: 2,
        };

        (async () => {
            for (let i = 0; i < VIDEOS.length; i++) {
                const video_id = VIDEOS[i];

                let data = await TwitchGQL.GetVideoMoments(video_id);
                let moments = data[0].data.video.moments.edges.map(
                    (i) => i.node
                );

                expect(moments.length).toBe(expectedLengths[i]);

                for (let i = 0; i < moments.length; i++) {
                    const moment = moments[i];

                    TestMisc.CheckModel(moment, VideoMomentModel);
                }
            }

            done();
        })();
    });

    test("GetVideoMetadata", (done) => {
        const VideoMetadataModel = {
            user: {
                id: String,
                isPartner: Boolean,
                profileImageURL: String,
            },
            video: {
                id: String,
                title: String,
                description: String,
                previewThumbnailURL: String,
                createdAt: String,
                viewCount: Number,
                publishedAt: String,
                viewCount: Number,
                publishedAt: String,
                lengthSeconds: Number,
                broadcastType: String,
                owner: {
                    id: String,
                    login: String,
                    displayName: String,
                },
                game: {
                    id: String,
                    boxArtURL: String,
                    name: String,
                    displayName: String,
                },
            },
        };

        (async () => {
            let data = await TwitchGQL.GetVideoMetadata(USERS[0], VIDEOS[0]);
            let video_metadata = data[0].data;

            TestMisc.CheckModel(video_metadata, VideoMetadataModel);

            done();
        })();
    });

    test("GetGameCategoryTags", (done) => {
        const GameCategoryTagsMetadataModel = {
            game: {
                __typename: String,
                id: String,
                tags: {
                    0: {
                        __typename: String,
                        id: String,
                        tagName: String,
                        localizedName: String
                    }
                }
            }
        };

        (async () => {
            let data = await TwitchGQL.GetGameCategoryTags(GAMES[1]);
            let game_category_tags_metadata = data[0].data;

            TestMisc.CheckModel(game_category_tags_metadata, GameCategoryTagsMetadataModel);

            done();
        })();
    });

    test("GetChatClip", (done) => {
        const ChatClipModel = {
            id: String,
            videoOffsetSeconds: Number,
            durationSeconds: Number,
            video: {
                id: String,
            },
        };

        (async () => {
            let data = await TwitchGQL.GetChatClip(CLIPS[0]);
            let clip = data[0].data.clip;

            TestMisc.CheckModel(clip, ChatClipModel);

            done();
        })();
    });
});
// END OPERATIONS

// START QUERIES
describe("Queries", () => {
    test("GET_USER", (done) => {
        const UserModel = {
            id: String,
            login: String,
            displayName: String,
            description: String,
            createdAt: String,
            roles: {
                isPartner: Boolean,
            },
        };

        (async () => {
            let data = await TwitchGQL._SendQuery("GET_USER", {
                login: USERS[Math.round(Math.random() * (USERS.length - 1))],
            });

            const user = data.data.user;

            TestMisc.CheckModel(user, UserModel);

            done();
        })();
    });
});
// END QUERIES
