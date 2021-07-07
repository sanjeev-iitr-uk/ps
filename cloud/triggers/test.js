/* global Parse */

const passesValidation = (object) => {
  const data = object.attributes || {};
  if (!data.name || !data.email || !data.password || !data.username) {
    return false;
  }
  return true;
};
Parse.Cloud.beforeSave('_User', (request) => {
  if (!passesValidation(request.object)) {
    throw new Error('Ooops something went wrong');
  }
});
