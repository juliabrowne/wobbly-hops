import { Meteor } from "meteor/meteor";
import { Players } from "../../api/players";

Meteor.startup(() => {
  if (Players.find().count() === 0) {
    Players.insert({
      name: "Admin",
      color: "blue",
      x: 100,
      y: 0,
      frozen: false
    });
  }
});
