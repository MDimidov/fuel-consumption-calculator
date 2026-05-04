const tabButtons = document.querySelectorAll(".tab-btn");
const calculatorSections = document.querySelectorAll(".calculator-section");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedSectionId = button.dataset.section;

    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    calculatorSections.forEach((section) => {
      section.classList.remove("active-section");
    });

    document.getElementById(selectedSectionId).classList.add("active-section");
  });
});

function getNumber(id) {
  return parseFloat(document.getElementById(id).value);
}

function showResult(elementId, message, isError = false) {
  const element = document.getElementById(elementId);
  element.innerHTML = message;
  element.classList.toggle("error", isError);
}

function isPositiveNumber(value) {
  return Number.isFinite(value) && value > 0;
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function formatNumber(number) {
  return number.toFixed(2);
}

function validatePositiveFields(fields) {
  for (const field of fields) {
    if (!isPositiveNumber(field.value)) {
      return `Моля, въведи валидна стойност за "${field.name}". Стойността трябва да е по-голяма от 0.`;
    }
  }

  return "";
}

function calculateConsumption() {
  const distance = getNumber("distance");
  const liters = getNumber("liters");

  const error = validatePositiveFields([
    { name: "Изминати км", value: distance },
    { name: "Заредени литри", value: liters },
  ]);

  if (error) {
    showResult("consumptionResult", error, true);
    return;
  }

  const consumption = (liters / distance) * 100;

  showResult(
    "consumptionResult",
    `Средният разход е <strong>${formatNumber(consumption)} л/100 км</strong>.`
  );
}

function calculateTripCost() {
  const distance = getNumber("tripDistance");
  const consumption = getNumber("avgConsumption");
  const price = getNumber("fuelPrice");
  const passengers = getNumber("passengers");

  const error = validatePositiveFields([
    { name: "Разстояние км", value: distance },
    { name: "Разход л/100 км", value: consumption },
    { name: "Цена на гориво за литър", value: price },
  ]);

  if (error) {
    showResult("tripResult", error, true);
    return;
  }

  if (!isPositiveInteger(passengers)) {
    showResult(
      "tripResult",
      'Моля, въведи валиден "Брой пътници". Стойността трябва да е цяло число, по-голямо от 0.',
      true
    );
    return;
  }

  const neededLiters = (distance * consumption) / 100;
  const totalCost = neededLiters * price;
  const costPerKm = totalCost / distance;
  const costPerPerson = totalCost / passengers;

  showResult(
    "tripResult",
    `
      Нужни литри: <strong>${formatNumber(neededLiters)} л</strong><br>
      Обща цена: <strong>${formatNumber(totalCost)} лв.</strong><br>
      Цена на км: <strong>${formatNumber(costPerKm)} лв./км</strong><br>
      Цена на човек: <strong>${formatNumber(costPerPerson)} лв.</strong>
    `
  );
}

function calculateNeededFuel() {
  const distance = getNumber("neededDistance");
  const consumption = getNumber("neededConsumption");

  const error = validatePositiveFields([
    { name: "Разстояние км", value: distance },
    { name: "Разход л/100 км", value: consumption },
  ]);

  if (error) {
    showResult("neededResult", error, true);
    return;
  }

  const neededLiters = (distance * consumption) / 100;

  showResult(
    "neededResult",
    `За този маршрут ще ти трябват около <strong>${formatNumber(neededLiters)} литра</strong>.`
  );
}