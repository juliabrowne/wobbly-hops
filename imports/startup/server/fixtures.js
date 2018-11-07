import { Meteor } from "meteor/meteor";
import { Players } from "../../api/players";

Meteor.startup(() => {
  if (Players.find().count() === 0) {
    Players.insert({
      id: 10,
      name: "Jumper",
      color: "blue",
      x: 100,
      y: 0
    });
  }
});
