/* global Parse */
// every minute '*/1 * * * *'

const schedule = require('node-schedule');

schedule.scheduleJob('*/1 * * * *', () => {
  Parse.Cloud.httpRequest({
    method: 'POST',
    url: 'http://localhost:1337/parse/jobs/resetPlayerNotes',
    headers: {
      'Content-Type': 'application/json',
      'X-Parse-Application-Id': 'myAppIdSanjeev',
      'X-Parse-Master-Key': 'myMasterKeySanjeev',
    },
  })
    .then((httpResponse) => {
      console.log('job responseeeeee......');
      console.log(httpResponse.text);
      console.log('job response end........');
    })
    .catch((err) => {
      console.log('job errorrrrrrrr......');
      console.log(err);
      console.log('job errorrrrrrrr end........');
    });
});
