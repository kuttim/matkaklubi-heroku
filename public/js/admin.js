const trekTitle = document.getElementById('treks-title');
const trekDescription = document.getElementById('treks-description');

const newsTitle = document.getElementById('news-title');
const newsDescription = document.getElementById('news-description');

const newTrekModal = document.getElementById('newTrekModal');
const newsModal = document.getElementById('newsModal');

async function createTrek() {
  const trekTitle = document.getElementById('trek-title');
  const trekDescription = document.getElementById('trek-description');

  await fetch('/trek/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title: trekTitle.value,
      description: trekDescription.value,
    }),
  });

  const toastLiveExample = document.getElementById(
    'trek-created-toast'
  );
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();

  $('#newTrekModal').modal('hide');

  document.location.reload();
}

async function editTrek(_id) {
  const trekTitle = document.getElementById('treks-title-' + _id);
  const trekDescription = document.getElementById(
    'treks-description-' + _id
  );

  console.log({
    title: trekTitle.value,
    description: trekDescription.value,
  });

  await fetch('/trek/update/' + _id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title: trekTitle.value,
      description: trekDescription.value,
    }),
  });
  const newsEdited = document.getElementById('trek-edited-toast');
  const toast = new bootstrap.Toast(newsEdited);
  toast.show();

  $('#trekModal-' + _id).modal('hide');

  const trekTitleElement = document.getElementById(
    'trek-title-' + _id
  );

  const trekDescriptionElement = document.getElementById(
    'trek-description-' + _id
  );

  trekTitleElement.innerText = trekTitle.value;
  trekDescriptionElement.innerText = trekDescription.value;

  const newsTitleElement = document.getElementById(
    'news-title-' + _id
  );
  const newsDescriptionElement = document.getElementById(
    'news-description-' + _id
  );

  newsTitleElement.innerText = newsTitle.value;
  newsDescriptionElement.innerText = newsDescription.value;
}

async function deleteTrek(_id) {
  await fetch('/trek/delete/' + _id, {
    method: 'DELETE',
  });
  const trekDeleted = document.getElementById('trek-deleted-toast');
  const toast = new bootstrap.Toast(trekDeleted);
  toast.show();

  $('#trekModal-' + _id).modal('hide');
  $('#treks-card-' + _id)
    .parent()
    .remove();
}

async function createNews() {
  await fetch('/news/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title: newsTitle.value,
      description: newsDescription.value,
    }),
  });

  $('#newsModal').modal('hide');

  const newsCreated = document.getElementById('news-created-toast');
  const toast = new bootstrap.Toast(newsCreated);
  toast.show();
}

async function deleteNews(id) {
  await fetch('/news/delete/' + id, {
    method: 'DELETE',
  });
  const newsDeleted = document.getElementById('news-deleted-toast');
  const toast = new bootstrap.Toast(newsDeleted);
  toast.show();

  $('#newsModal-' + id).modal('hide');
  $('#news-card-' + id).remove();
}

async function editNews(id) {
  const response = await fetch('/news/update/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      title: newsTitle.value,
      description: newsDescription.value,
    }),
  });
  console.log(response);

  const newsEdited = document.getElementById('news-edited-toast');
  const toast = new bootstrap.Toast(newsEdited);
  toast.show();

  $('#newsModal-' + id).modal('hide');
}
