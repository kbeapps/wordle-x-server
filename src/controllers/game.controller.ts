import Game from '../models/game.model';

const create = async (name: string, ownerId: string, players: string[], wordHistory: string[], type: string, winCondition: string, wordSize: string, theme?: string) => {
    const game = new Game({
        name: name,
        ownerId: ownerId,
        players: players,
        wordHistory: wordHistory,
        boards: [],
        type: type,
        winCondition: winCondition,
        wordSize: wordSize,
        theme: ''
    });

    if (theme) {
        game.theme = theme;
    };

    try {
        return await game.save();
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const get = async (query: object) => {
    try {
        return await Game.findOne(query);
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const getAll = async (ownerId: string) => {
    try {
        return await Game.find({ ownerId: ownerId });
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const update = async (_id: string, query: object) => {
    try {
        return await Game.findByIdAndUpdate(
            _id, query, { new: true }
        );
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

const remove = async (_id: string) => {
    try {
        return await Game.findByIdAndRemove(_id);
    } catch (err) {
        console.log(err);
        throw new Error();
    };
};

export default {
    create, get, getAll, update, remove
};