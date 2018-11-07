<<<<<<< HEAD
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
=======
import { Meteor } from "meteor/meteor";
import { Players } from "../../api/players";

Meteor.startup(() => {
  if (Players.find().count() === 0) {
    Players.insert({
      name: "Jumper",
      color: "blue",
      x: 100,
      y: 0
    });
  }
});
>>>>>>> be2af2a03e74e67fc077913189dbd704d6c90052
