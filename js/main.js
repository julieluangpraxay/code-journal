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

// other way to write function code block
// $submit.addEventListener('submit', handleSubmit);
// function handleSubmit(event) {

// }
