const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        plot: {
            type: String,
            required: false
        },
        fullplot: {
            type: String,
            required: false
        },
        poster: {
            type: String,
            required: false
        },
        rated: {
            type: String,
            required: false
        },
        runtime: {
            type: Number,
            required: false
        },
        type: {
            type: String,
            required: true,
            default: "movie"
        },
        year: {
            type: Number,
            required: true
        },
        released: {
            type: Date,
            required: false
        },
        cast: {
            type: [String],
            required: true,
            default: []
        },
        writers: {
            type: [String],
            required: true,
            default: []
        },
        directors: {
            type: [String],
            required: true,
            default: []
        },
        countries: {
            type: [String],
            required: true,
            default: []
        },
        languages: {
            type: [String],
            required: true,
            default: []
        },
        num_mflix_comments: {
            type: Number,
            required: false
        },
        metacritic: {
            type: Number,
            required: false
        },
        awards: {
            type: {
                _id: false,
                nominations: Number,
                wins: Number,
                text: String
            },
            required: true,
            default: {
                nominations: 0,
                wins: 0,
                text: "0 wins."
            }
        },
        imdb: {
            type: {
                _id: false,
                rating: Number,
                votes: Number,
                id: Number
            },
            required: true,
        },
        tomatoes: {
            _id: false,
            boxOffice: String,
            consensus: String,
            critic: {
                meter: Number,
                numReviews: Number,
                rating: Number,
            },
            dvd: Date,
            fresh: Number,
            lastUpdated: Date,
            production: String,
            rotten: Number,
            viewer: {
                meter: Number,
                numReviews: Number,
                rating: Number,
            },
            website: String
        }
    },
    {
        timestamps: true
    }
);

const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;