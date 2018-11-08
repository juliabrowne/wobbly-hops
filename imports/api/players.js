import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
// import SimpleSchema from 'simpl-schema';

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
  "add.player"(name, color, playerId, x, y) {
    const newPlayer = {
      name,
      color,
      playerId,
      x: 100,
      y: 0
    };
    console.log(newPlayer)
    Players.insert(newPlayer);
  },
  "init.Player"({ playerId, x, y }) {
    Players.update({ _id: playerId }, { $set: { x, y } });
  },
  "move.right"(playerId) {
    const p = getPlayer(playerId);
    Players.update({ _id: playerId }, { $set: { x: p.x + 100 } });
  },
  "move.left"(playerId) {
    const p = getPlayer(playerId);
    Players.update({ _id: playerId }, { $set: { x: p.x - 100 } });
  }
});

export const Players = new Mongo.Collection("players");
