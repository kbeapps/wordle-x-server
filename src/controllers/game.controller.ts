import Game, { IGame } from '../models/game.model';

const create = async (
  name: string,
  ownerId: string,
  players: string[],
  wordHistory: string[],
  type: string,
  winCondition: string,
  wordSize: string,
  theme?: string
): Promise<IGame> => {
  const game: IGame = new Game({
    name: name,
    ownerId: ownerId,
    players: players,
    wordHistory: wordHistory,
    boards: [],
    type: type,
    winCondition: winCondition,
    wordSize: wordSize,
    theme: '',
  });

  if (theme) {
    game.theme = theme;
  }

  try {
    return (await game.save()) as IGame;
  } catch (err) {
    throw new Error(String(err));
  }
};

const get = async (query: object): Promise<IGame> => {
  try {
    return (await Game.findOne(query)) as IGame;
  } catch (err) {
    throw new Error(String(err));
  }
};

const getAll = async (query: object): Promise<IGame[]> => {
  try {
    return (await Game.find(query)) as IGame[];
  } catch (err) {
    throw new Error(String(err));
  }
};

const update = async (_id: string, query: object): Promise<IGame> => {
  try {
    return (await Game.findByIdAndUpdate(_id, query, { new: true })) as IGame;
  } catch (err) {
    throw new Error(String(err));
  }
};

const remove = async (_id: string): Promise<IGame> => {
  try {
    return (await Game.findByIdAndRemove(_id)) as IGame;
  } catch (err) {
    throw new Error(String(err));
  }
};

export default {
  create,
  get,
  getAll,
  update,
  remove,
};
