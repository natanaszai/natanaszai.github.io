const form = document.getElementById('contact-form');
const resultBox = document.getElementById('form-result');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = {
    vardas: document.getElementById('first-name').value,
    pavarde: document.getElementById('last-name').value,
    elPastas: document.getElementById('email').value,
    telefonas: document.getElementById('phone').value,
    adresas: document.getElementById('address').value,
    rating1: Number(document.getElementById('rating1').value),
    rating2: Number(document.getElementById('rating2').value),
    rating3: Number(document.getElementById('rating3').value),
  };

  const average = (formData.rating1 + formData.rating2 + formData.rating3) / 3;

  console.log(formData);

  resultBox.innerHTML = `
    <p>Vardas: ${formData.vardas}</p>
    <p>Pavardė: ${formData.pavarde}</p>
    <p>El. paštas: ${formData.elPastas}</p>
    <p>Tel. Numeris: ${formData.telefonas}</p>
    <p>Adresas: ${formData.adresas}</p>
    <p>Svetainės dizainas: ${formData.rating1}</p>
    <p>Informacijos aiškumas: ${formData.rating2}</p>
    <p>Bendras įspūdis: ${formData.rating3}</p>
    <p><strong>${formData.vardas} ${formData.pavarde}: ${average.toFixed(1)}</strong></p>
  `;
  resultBox.style.display = 'block';
});

document.getElementById('rating1').addEventListener('input', function () {
  document.getElementById('rating1-value').textContent = this.value;
});
document.getElementById('rating2').addEventListener('input', function () {
  document.getElementById('rating2-value').textContent = this.value;
});
document.getElementById('rating3').addEventListener('input', function () {
  document.getElementById('rating3-value').textContent = this.value;
});

const submitBtn = document.getElementById('submit-btn');
const requiredFields = [
  document.getElementById('first-name'),
  document.getElementById('last-name'),
  document.getElementById('email'),
  document.getElementById('phone'),
  document.getElementById('address'),
];

// =============REAL-TIME VALIDATION==============

const nameRegex = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validators = {
  'first-name': value => {
    if (value.trim() === '') return 'Privaloma užpildyti vardą';
    if (!nameRegex.test(value.trim())) return 'Vardą gali sudaryti tik raidės';
    return '';
  },
  'last-name': value => {
    if (value.trim() === '') return 'Privaloma užpildyti pavardę';
    if (!nameRegex.test(value.trim())) return 'Pavardę gali sudaryti tik raidės';
    return '';
  },
  'email': value => {
    if (value.trim() === '') return 'Privaloma įvesti el. paštą';
    if (!emailRegex.test(value.trim())) return 'Neteisingas el. pašto formatas';
    return '';
  },
  'address': value => {
    if (value.trim() === '') return 'Privaloma užpildyti adresą';
    return '';
  },
};

// true = laukas šiuo metu turi klaidą; visi "tušti" laukai laikomi klaidingais
const fieldErrors = {
  'first-name': true,
  'last-name': true,
  'email': true,
  'address': true,
  'phone': true,
};

function validateField(id) {
  const input = document.getElementById(id);
  const errorBox = document.getElementById(id + '-error');
  const message = validators[id](input.value);

  if (message) {
    input.classList.add('input-error');
    errorBox.textContent = message;
    fieldErrors[id] = true;
  } else {
    input.classList.remove('input-error');
    errorBox.textContent = '';
    fieldErrors[id] = false;
  }

  updateSubmitState();
}

function updateSubmitState() {
  const hasErrors = Object.values(fieldErrors).some(Boolean);
  submitBtn.disabled = hasErrors;
}

Object.keys(validators).forEach(id => {
  document.getElementById(id).addEventListener('input', () => validateField(id));
});

// ==================PHONE AUTO-FORMATTING==================

const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function () {
  let digits = this.value.replace(/\D/g, '');

  if (digits.startsWith('370')) {
    digits = digits.slice(3);
  }

  digits = digits.slice(0, 8);

  let formatted = '';
  if (digits.length > 0) {
    formatted = '+370 ' + digits.slice(0, 3);
    if (digits.length > 3) {
      formatted += ' ' + digits.slice(3, 8);
    }
  }

  this.value = formatted;

  fieldErrors['phone'] = digits.length !== 8;
  updateSubmitState();
});

// ===============CLEAR BUTTON===============

const clearBtn = document.getElementById('clear-btn');

clearBtn.addEventListener('click', function () {
  document.getElementById('first-name').value = '';
  document.getElementById('last-name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
  document.getElementById('address').value = '';

  ['rating1', 'rating2', 'rating3'].forEach(id => {
    document.getElementById(id).value = 5;
    document.getElementById(id + '-value').textContent = 5;
  });

  ['first-name', 'last-name', 'email', 'address', 'phone'].forEach(id => {
    document.getElementById(id).classList.remove('input-error');
    const errorBox = document.getElementById(id + '-error');
    if (errorBox) errorBox.textContent = '';
  });

  fieldErrors['first-name'] = true;
  fieldErrors['last-name'] = true;
  fieldErrors['email'] = true;
  fieldErrors['address'] = true;
  fieldErrors['phone'] = true;
  updateSubmitState();

  resultBox.innerHTML = '';
  resultBox.style.display = 'none';
});