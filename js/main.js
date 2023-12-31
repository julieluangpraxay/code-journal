const $photoUrl = document.querySelector('#photo-url');
const $image = document.querySelector('img');

$photoUrl.addEventListener('input', function (event) {
  $image.src = event.target.value;
});

const $submitForm = document.querySelector('form');

$submitForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const $titleValue = $submitForm.elements['title-text'].value;
  const $photoUrlValue = $submitForm.elements['photo-url'].value;
  const $notesValue = $submitForm.elements.notes.value;

  const formData = {
    title: $titleValue,
    photoURL: $photoUrlValue,
    notes: $notesValue,
    entryId: data.nextEntryId,
  };

  if (data.editing === null) {
    data.nextEntryId++;
    data.entries.unshift(formData);
    $ul.prepend(renderEntry(formData));
    $image.src = './images/placeholder-image-square.jpg';
  } else {
    formData.entryId = data.editing.entryId;
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === formData.entryId) {
        data.entries[i] = formData;
      }
    }
    const $liElements = document.querySelectorAll('li');
    // Render a new DOM tree for the new object with the updated data, and replace the original li with the matching data - entry - id value with the new generated DOM tree.
    for (let i = 0; i < $liElements.length; i++) {
      if (
        formData.entryId ===
        Number($liElements[i].getAttribute('data-entry-id'))
      ) {
        $image.src = './images/placeholder-image-square.jpg';
        $liElements[i].replaceWith(renderEntry(formData));
      }
    }
    $entryTitle.textContent = 'New Entry';
    data.editing = null;
  }

  viewSwap('entries');
  toggleNoEntries();
  $submitForm.reset();
});

function renderEntry(entry) {
  // generate and return a DOM tree for a single entry that matches the entries created in the unordered list

  const $entryList = document.createElement('li');
  $entryList.className = 'row';
  $entryList.setAttribute('data-entry-id', entry.entryId);

  const $entryDiv = document.createElement('div');
  $entryDiv.className = 'column-half';

  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoURL);
  $entryImg.setAttribute('alt', entry.title);

  const $imgDiv = document.createElement('div');
  $imgDiv.className = 'column-half';

  const $h1Entry = document.createElement('h1');
  $h1Entry.textContent = entry.title;

  const $pElement = document.createElement('p');
  $pElement.textContent = entry.notes;

  // wrapper div for pencil and title
  const $titleWrapper = document.createElement('div');
  $titleWrapper.setAttribute('class', 'title-wrapper');

  // pencil icon
  const $pencilIcon = document.createElement('i');
  $pencilIcon.className = 'fa fa-pencil';

  $entryList.appendChild($entryDiv);
  $entryDiv.appendChild($entryImg);
  $entryList.appendChild($imgDiv);
  $imgDiv.appendChild($titleWrapper);
  $titleWrapper.appendChild($h1Entry);
  $titleWrapper.appendChild($pencilIcon);
  $imgDiv.appendChild($pElement);

  return $entryList;
}

const $ul = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $data = renderEntry(data.entries[i]);
    $ul.appendChild($data);
  }
  toggleNoEntries();
  viewSwap(data.view);
});

//  Create a function named toggleNoEntries which toggles the no entries text to show or hide when the function is called.
const $noEntries = document.querySelector('.no-entries');
function toggleNoEntries() {
  if (data.entries.length > 0) {
    $noEntries.classList.add('hidden');
  } else {
    $noEntries.classList.remove('hidden');
  }
}

const entriesView = document.querySelector('.entries');
const entryFormView = document.querySelector('.entry-form');

function viewSwap(viewName) {
  if (viewName === 'entries') {
    entriesView.classList.remove('hidden');
    entryFormView.classList.add('hidden');
  } else if (viewName === 'entry-form') {
    entriesView.classList.add('hidden');
    entryFormView.classList.remove('hidden');
  }
  data.view = viewName;
}
// when you click entries on the top it will show all the entries
document.querySelector('a').addEventListener('click', function () {
  viewSwap('entries');
});
// when you click new, it goes to new entry
document.querySelector('.new').addEventListener('click', function () {
  document.querySelector('.delete-button').classList.add('hidden');
  viewSwap('entry-form');
  $image.src = './images/placeholder-image-square.jpg';
  $entryTitle.textContent = 'New Entry';
  $submitForm.reset();
});

// Add an event listener to the ul in the entries view which does the following when an entry's pencil icon is clicked:
$ul.addEventListener('click', pencilClick);

const $title = document.querySelector('#title-text');
const $notes = document.querySelector('#notes');
const $entryTitle = document.querySelector('.entry-title');
let deleteEntryId = 0;

function pencilClick(event) {
  // if pencil is clicked and it is the I element
  if (event.target.tagName === 'I') {
    const dataEntryId = event.target
      .closest('li')
      .getAttribute('data-entry-id');
    // loop through all the array indexes to match the entry id
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(dataEntryId)) {
        data.editing = data.entries[i];
        $title.value = data.editing.title;
        $notes.value = data.editing.notes;
        $image.setAttribute('src', data.editing.photoURL);
        $photoUrl.value = data.editing.photoURL;
        $entryTitle.textContent = 'Edit Entry';
      }
      if (data.editing) {
        document.querySelector('.delete-button').classList.remove('hidden');
        deleteEntryId = dataEntryId;
      }
      // Use the viewSwap function to show the form if its true
    }
    viewSwap('entry-form');
  }
}
// modal for delete popup
const $delete = document.querySelector('.delete-button');
const $popup = document.querySelector('.popup');

// when delete button is clicked, show the pop up modal by removing hidden from its class
$delete.addEventListener('click', function (e) {
  e.preventDefault();
  $popup.classList.remove('hidden');
});

const $cancelButton = document.querySelector('.cancel-button');
// hide the popup when "cancel" is clicked by removing the hidden class from popup
$cancelButton.addEventListener('click', function () {
  deleteEntryId = 0;
  $popup.classList.add('hidden');
});
// end of popup

const $confirmDelete = document.querySelector('.confirm-button');
$confirmDelete.addEventListener('click', function () {
  const tempDeleteId = Number(deleteEntryId);
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === tempDeleteId) {
      data.entries.splice(i, 1);
      $ul.children[i].remove();
    }
  }

  viewSwap('entries');
  $popup.classList.add('hidden');
});
