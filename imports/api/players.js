import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
// import SimpleSchema from "simpl-schema";

export const Players = new Mongo.Collection("players");

// Players.schema = new SimpleSchema({
//   _id: String,
//   name: String,
//   color: String,
//   playerId: String,
//   x: Number,
//   y: Number,
//   frozen: Boolean,
//   lives: Number
// });

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
Meteor.methods({
  "add.player"(name, color, playerId, x, y, maxX) {
    const newPlayer = {
      name,
      color,
      playerId,
      x,
      y,
      frozen: false,
      lives: 3,
      maxX
    };
    // Players.schema.validate(newPlayer);
    Players.insert(newPlayer);
  },
  "init.Player"({ playerId, x, y, maxX }) {
    Players.update({ _id: playerId }, { $set: { x, y } });
    Players.update({ _id: playerId }, { $set: { frozen: false } });
    Players.update({ _id: playerId }, { $set: { lives: 3 } });
    Players.update({ _id: playerId }, { $set: { maxX } });
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
    const p = getPlayer(playerId);
    Players.update({ _id: playerId }, { $set: { frozen: true } });
  },
  "unFreeze.player"(playerId) {
    const p = getPlayer(playerId);
    Players.update({ _id: playerId }, { $set: { frozen: false } });
  },
  "loseLife.player"(playerId) {
    const p = getPlayer(playerId);
    if (p.lives > 0) {
      Players.update({ _id: playerId }, { $set: { lives: p.lives - 1 } });
    }
  }
});
