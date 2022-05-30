import Game from '../models/game.model';

const get = async (query: object) => {
    try {
        return await Game.findOne(query);
    } catch (error) {
        console.log(error);
    };
};

const getAll = async (ownerId: string) => {
    try {
        return await Game.find({ ownerId: ownerId });
    } catch (error) {
        console.log(error);
    };
};

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
    } catch (error) {
        console.log(error);
        return error;
    };
};

const update = async (_id: string, query: object) => {
    try {
        return await Game.findByIdAndUpdate(
            _id, query, { new: true }
        );
    } catch (error) {
        console.log(error);
    };
};

const remove = async (_id: string) => {
    try {
        return await Game.findByIdAndRemove(_id);
    } catch (error) {
        console.log(error);
    };
};

export default {
    create, get, getAll, update, remove
};