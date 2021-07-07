/* global Parse */
// each function accept req and res as param
const resetPlayerNotes = async () => {
  let counter = 0;
  const query = new Parse.Query('Player');
  query
    .each((player) => {
      player.set('notes', '');
      counter += 1;
      return player.save();
    })
    .then(() => {
      console.log(`${counter} number of records reset !`);
      return 'players reset job successful !';
    })
    .catch((err) => {
      throw new Error(err);
    });
};
Parse.Cloud.job('resetPlayerNotes', resetPlayerNotes);
