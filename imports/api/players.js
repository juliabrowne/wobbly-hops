import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

// import SimpleSchema from 'simpl-schema';
// import { Gameboard } from './gameboard';

export const Players = new Mongo.Collection('player');


Meteor.methods({
	'add.player'(name, color) {
		if (checkPlayers() > 4) return Meteor.Error({ message: 'You\'ve hit the max number of players!' })
		const newPlayer = {
			name,
			color,
			x: 100,
			y: 100
		}
		Players.insert(newPlayer)
	},
	'move.right'(player) {
		Players.update(
			{ player },
			{ $set: { x: Players.findOne({ player }).x + 10}}
		)
	},
	'move.left'(player) {
		Players.update(
			{ player },
			{ $set: {  x: Players.findOne({ player }).x - 10}} 
		)
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

// 	Meteor.publish('players', () => {
// 		return Players.find({})
// 	})
// 	Meteor.publish('player', () => {
// 		return Players.find({ player: Meteor.userId() })
// 	})

}

// Accounts.removeOldGuests();