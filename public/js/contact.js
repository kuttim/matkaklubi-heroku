const form = document.getElementById('contact-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  logValues(event);
});

function clearInputs() {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  name.value = '';
  email.value = '';
  message.value = '';
}

function logValues() {
  const alertMessage = document.getElementById('contact-alert');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  console.log(
    'nimi',
    name.value,
    '\nemail',
    email.value,
    '\nkiri',
    message.value
  );
  alertMessage.style.display = 'block';
  clearInputs();
}
