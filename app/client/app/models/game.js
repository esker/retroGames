import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const gameSchema = new Schema({
    name: String,
    year: Number,
    description: String,
    picture: String,
    postDate: { type: Date, default: Date.now }
});

// Export schema so it may be used everywhere
export default mongoose.model('Game', gameSchema);