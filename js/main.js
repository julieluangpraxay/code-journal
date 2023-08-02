// issue 1 code
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
  $image.src = './images/placeholder-image-square.jpg';
  $submitForm.reset();
});

// issue 2 code

function renderEntry(entry) {
  // generate and return a DOM tree for a single entry that matches the entries created in the unordered list
  const $entryList = document.createElement('li');
  $entryList.className = 'row';

  const $entryDiv = document.createElement('div');
  $entryDiv.className = 'column-half';

  const $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.photoURL);

  const $otherDiv = document.createElement('div');
  $otherDiv.className = 'column-half';

  const $h1Entry = document.createElement('h1');
  $h1Entry.className = 'h1Entry';

  const $pEntry = document.createElement('p');
  $pEntry.className = 'pEntry';

  $entryList.appendChild($entryDiv);
  $entryDiv.appendChild($entryImg);
  $otherDiv.appendChild($h1Entry);
  $otherDiv.appendChild($entryList);

  return $entryList;
}

const $ul = document.querySelector('.entry-list');
document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $data = renderEntry(data.entries[i]);
    $ul.appendChild($data);
  }
});
