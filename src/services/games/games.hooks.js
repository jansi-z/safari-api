const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const createGame = require('../../hooks/create-game');
const updateGame = require('../../hooks/update-game');

const playersSchema = {
  include: {
    service: 'users',
    nameAs: 'players',
    parentField: 'playerIds',
    childField: '_id'
  }
};


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [createGame()],
    update: [updateGame()],
    patch: [updateGame()],
    remove: []
  },

  after: {
    all: [
      commonHooks.populate({ schema: playersSchema }),
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('word')
      )
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
