import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

// import SimpleSchema from 'simpl-schema';
// import { Gameboard } from './gameboard';
export const Players = new Mongo.Collection("players");

Meteor.methods({
  "add.player"(name, color, userId, x, y) {
    const newPlayer = {
      name,
      color,
      userId,
      x,
      y
    };
    Players.insert(newPlayer);
  },
  "init.Player"({ userId, x, y }) {
    Players.update({ userId }, { $set: { x, y } });
  },
  "move.right"(userId) {
    Players.update(
      {
        userId
      },
      {
        $set: {
          x:
            Players.findOne({
              userId
            }).x + 10
        }
      }
    );
  },
  "move.left"(userId) {
    Players.update(
      {
        userId
      },
      {
        $set: {
          x:
            Players.findOne({
              userId
            }).x - 10
        }
      }
    );
  }
});

// Players.schema = new SimpleSchema ({
// 	_id: {
// 		type: String,
// 		optional: true
// 	},
// 	name: String,
// 	color: String,
// 	score: Number,
// 	size: Number,
// 	speed: Number,
// 	y: Number,
// 	x: Number,
// 	winner: Boolean
// })

if (Meteor.isServer) {
  AccountsGuest.enabled = true;
  AccountsGuest.anonymous = true;
  Meteor.publish("players", function playersPublication() {
    return Players.find();
  });
}

// Accounts.removeOldGuests();
