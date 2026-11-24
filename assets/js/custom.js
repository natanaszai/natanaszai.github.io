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

function checkFormFilled() {
  const allFilled = requiredFields.every(field => field.value.trim() !== '');
  submitBtn.disabled = !allFilled;
}

requiredFields.forEach(field => {
  field.addEventListener('input', checkFormFilled);
});