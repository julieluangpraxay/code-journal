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
    entryID: data.nextEntryId,
  };

  data.nextEntryId++;
  data.entries.unshift(formData);

  $ul.prepend(renderEntry(formData));
  viewSwap('entries');

  $image.src = './images/placeholder-image-square.jpg';
  $submitForm.reset();
  toggleNoEntries();
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

  const $otherDiv = document.createElement('div');
  $otherDiv.className = 'column-half';

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

  $titleWrapper.appendChild($h1Entry);
  $titleWrapper.appendChild($pencilIcon);
  $otherDiv.appendChild($titleWrapper);
  $entryList.appendChild($entryDiv);
  $entryDiv.appendChild($entryImg);
  $otherDiv.appendChild($pElement);
  $entryList.appendChild($otherDiv);

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

document.querySelector('a').addEventListener('click', function () {
  viewSwap('entries');
});

document.querySelector('.new').addEventListener('click', function () {
  viewSwap('entry-form');
});

// Add an event listener to the ul in the entries view which does the following when an entry's pencil icon is clicked:
$ul.addEventListener('click', function (event) {
  // Check if the clicked element or its parent has the class 'fa-pencil' (Font Awesome pencil icon)
});
