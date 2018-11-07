import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";

// import SimpleSchema from 'simpl-schema';
// import { Gameboard } from './gameboard';
<<<<<<< HEAD
export const Players = new Mongo.Collection('players');


Meteor.methods({
	'add.player'(name, color, x, y) {
		// if (checkPlayers() > 4) return Meteor.Error({ message: 'You\'ve hit the max number of players!' })
		const newPlayer = {
			name,
			color: "green",
			x: 10,
			y: 10
		}
		Players.insert(newPlayer, (error, data) => {
			console.log(Players.find().fetch())

		})
	},
	'move.right'(user) {
		Players.update({
			user
		}, {
			$set: {
				x: Players.findOne({
					user
				}).x + 10
			}
		})
	},
	'move.left'(user) {
		Players.update({
			user
		}, {
			$set: {
				x: Players.findOne({
					user
				}).x - 10
			}
		})
	}
=======
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
>>>>>>> be2af2a03e74e67fc077913189dbd704d6c90052
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
<<<<<<< HEAD
	AccountsGuest.enabled = true;
	AccountsGuest.anonymous = true;

	Meteor.publish('players', function playersPublication() {
		return Players.find(Meteor.userId);
	})
=======
  AccountsGuest.enabled = true;
  AccountsGuest.anonymous = true;
  Meteor.publish("players", function playersPublication() {
    return Players.find();
  });
>>>>>>> be2af2a03e74e67fc077913189dbd704d6c90052
}

// Accounts.removeOldGuests();
