import { Meteor } from 'meteor/meteor';
import { Players } from '../../api/players';
// import { Gameboard } from '../../api/gameboard';

Meteor.startup(() => {
    if (Players.find().count() === 0) {
        Players.insert({
            name: "Bob",
            color: "yellow",
            x: 10,
            y: 10
        })
    }
});