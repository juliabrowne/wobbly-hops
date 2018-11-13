import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

export const Players = new Mongo.Collection("players");

Players.schema = new SimpleSchema({
  name: String,
  color: String,
  frozen: Boolean,
  lives: Number,
  _id: {
    type: String,
    optional: true
  },
  playerId: {
    type: String,
    optional: true
  },
  x: {
    type: Number,
    optional: true
  },
  y: {
    type: Number,
    optional: true
  },
  maxX: {
    type: Number,
    optional: true
  },
  alive: {
    type: Boolean,
    optional: true
  },
});

if (Meteor.isServer) {
  AccountsGuest.enabled = true;
  AccountsGuest.anonymous = true;
  Meteor.publish("players", function playersPublication() {
    return Players.find();
  });
  Meteor.publish("player", () => {
    return Players.find({ player: Meteor.userId() });
  });
}
const getPlayer = playerId => {
  return Players.findOne(playerId);
};
const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
Meteor.methods({
  "add.player"(name, color, playerId, x, y, maxX, alive) {
    const newPlayer = {
      name,
      color,
      playerId,
      x,
      y,
      frozen: false,
      lives: 3,
      maxX,
      alive
    };
    Players.schema.validate(newPlayer);
    Players.insert(newPlayer);
  },
  "init.Player"({ playerId, x, y, maxX }) {
    Players.update({ _id: playerId }, { $set: { x, y } });
    Players.update({ _id: playerId }, { $set: { frozen: false } });
    Players.update({ _id: playerId }, { $set: { lives: 3 } });
    Players.update({ _id: playerId }, { $set: { maxX } });
    Players.update({ _id: playerId }, { $set: { alive: true } });
  },
  "move.right"(playerId) {
    const p = getPlayer(playerId);
    if (p.x >= p.maxX - 25) {
      Players.update({ _id: playerId }, { $set: { x: (p.x = p.maxX - 25) } });
    }
    if (!p.frozen) {
      Players.update({ _id: playerId }, { $set: { x: p.x + 3 } });
    }
  },
  "move.left"(playerId) {
    const p = getPlayer(playerId);
    if (p.x <= 0) {
      Players.update({ _id: playerId }, { $set: { x: (p.x = 0) } });
    }
    if (!p.frozen) {
      Players.update({ _id: playerId }, { $set: { x: p.x - 3 } });
    }
  },
  "freeze.player"(playerId) {
    Players.update({ _id: playerId }, { $set: { frozen: true } });
  },
  "unFreeze.player"(playerId) {
    Players.update({ _id: playerId }, { $set: { frozen: false } });
  },
  "randomize.player"(playerId, ww) {
    const p = getPlayer(playerId);
    const randomX = getRandomInt(ww - 200);
    Players.update({ _id: playerId }, { $set: { x: (p.x = randomX) } });
  },
  "loseLife.player"(playerId) {
    const p = getPlayer(playerId);

    if (p.lives > 0) {
      Players.update({ _id: playerId }, { $set: { lives: p.lives - 1 } });
    }
  },
  "kill.player"(playerId) {
    Players.update({ _id: playerId }, { $set: { alive: false } });
  },
  "addLife.player"(playerId) {
    const p = getPlayer(playerId);
    if (p.lives > 0) {
      Players.update({ _id: playerId }, { $set: { lives: p.lives + 1 } });
    }
  }
});
