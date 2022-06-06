import mongoose from 'mongoose';
const { Schema } = mongoose;

export interface IGame {
    id: string;
    name: string;
    ownerId: string;
    players: string[];
    wordHistory: string[];
    boards?: object[];
    type: string,
    winCondition: string,
    wordSize: number,
    theme?: string,
};

const GameSchema = new Schema<IGame>({
    name: { type: String, required: true, minLength: 2, maxLength: 16 },
    ownerId: { type: String, required: true },
    players: { type: [String], required: true, min: 1, max: 20 },
    wordHistory: { type: [String], required: true, min: 1, max: 365 },
    boards: { type: [Object] },
    type: { type: String, required: true, min: 1, max: 20 },
    winCondition: { type: String, required: true, min: 1, max: 20 },
    wordSize: { type: Number, required: true, min: 4, max: 10 },
    theme: { type: String, min: 1, max: 20 },
}, { timestamps: true });

const Game = mongoose.model<IGame>('Game', GameSchema);

export default Game;