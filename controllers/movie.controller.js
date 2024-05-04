const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'sample_mflix';

// Function to connect to MongoDB
async function connect() {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        throw error;
    }
}

// Get all movies
const getMovies = async (req, res) => {
    try {
        const db = await connect();
        const movies = await db.collection('movies').find({}).toArray();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single movie by id
const getMovie = async (req, res) => {
    try {
        const db = await connect();
        const { id } = req.params;
        const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new movie
const createMovie = async (req, res) => {
    try {
        const db = await connect();
        const movieData = req.body;
        const result = await db.collection('movies').insertOne(movieData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing movie
const updateMovie = async (req, res) => {
    try {
        const db = await connect();
        const { id } = req.params;
        const movieData = req.body;
        const result = await db.collection('movies').updateOne({ _id: new ObjectId(id) }, { $set: movieData });
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        const updatedMovie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a movie by id
const deleteMovie = async (req, res) => {
    try {
        const db = await connect();
        const { id } = req.params;
        const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMovies,
    getMovie,
    createMovie,
    updateMovie,
    deleteMovie,
};
