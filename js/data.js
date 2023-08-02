/* exported data */

// Step 1: We create a new empty object called 'data' to store some information.
let data = {
  view: 'entry-form', // This part is a property called 'view', and it has the value 'entry-form'.
  entries: [], // This part is a property called 'entries', and it has an empty list as its value.
  editing: null, // This part is a property called 'editing', and it currently has no value (null).
  nextEntryId: 1, // This part is a property called 'nextEntryId', and it has the value 1.
};

// Step 2: We check if there is any previously saved information in the browser's memory.
const localStorageData = localStorage.getItem('data');

// Step 3: We set up an action that will happen before you leave the website.
window.addEventListener('beforeunload', function () {
  // Step 4: We convert the 'data' object into a special text format called JSON (JavaScript Object Notation).
  const jsonData = JSON.stringify(data);
  // Step 5: We save the JSON-formatted 'data' into the browser's memory, so we can use it later.
  localStorage.setItem('data', jsonData);
});

// Step 6: We check if there was any saved data from before.
if (localStorageData) {
  // Step 7: If we found saved data, we convert it from JSON format back to a normal JavaScript object.
  data = JSON.parse(localStorageData);
}
