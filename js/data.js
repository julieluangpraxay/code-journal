/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

const localStorageData = localStorage.getItem('data');
window.addEventListener('beforeunload', function () {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('data', jsonData);
});

if (localStorageData) {
  data = JSON.parse(localStorageData);
}
