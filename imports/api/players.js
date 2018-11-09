import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

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
  "add.player"(name, color, playerId, x, y, frozen) {
    const newPlayer = {
      name,
      color,
      playerId,
      x,
      y,
      frozen: false
    };
    Players.insert(newPlayer);
  },
  "init.Player"({ playerId, x, y }) {
    Players.update({ _id: playerId }, { $set: { x, y } });
  },
  "move.right"(playerId) {
    const p = getPlayer(playerId);
    if (p.x >= 1290) {
      Players.update({ _id: playerId }, { $set: { x: (p.x = 1290) } });
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
  }
});

export const Players = new Mongo.Collection("players");
