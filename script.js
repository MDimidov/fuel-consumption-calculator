function getNumber(id) {
  return parseFloat(document.getElementById(id).value);
}

function showResult(elementId, message, isError = false) {
  const element = document.getElementById(elementId);
  element.innerHTML = message;
  element.classList.toggle("error", isError);
}

function isInvalid(...values) {
  return values.some(value => isNaN(value) || value <= 0);
}

function formatNumber(number) {
  return number.toFixed(2);
}

function calculateConsumption() {
  const distance = getNumber("distance");
  const liters = getNumber("liters");

  if (isInvalid(distance, liters)) {
    showResult(
      "consumptionResult",
      "Моля, въведи валидни стойности за километри и литри.",
      true
    );
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

  if (isInvalid(distance, consumption, price)) {
    showResult(
      "tripResult",
      "Моля, въведи валидни стойности за разстояние, разход и цена.",
      true
    );
    return;
  }

  const neededLiters = (distance * consumption) / 100;
  const totalCost = neededLiters * price;
  const costPerKm = totalCost / distance;

  showResult(
    "tripResult",
    `
      Нужни литри: <strong>${formatNumber(neededLiters)} л</strong><br>
      Обща цена: <strong>${formatNumber(totalCost)} лв.</strong><br>
      Цена на км: <strong>${formatNumber(costPerKm)} лв./км</strong>
    `
  );
}

function calculateNeededFuel() {
  const distance = getNumber("neededDistance");
  const consumption = getNumber("neededConsumption");

  if (isInvalid(distance, consumption)) {
    showResult(
      "neededResult",
      "Моля, въведи валидни стойности за разстояние и разход.",
      true
    );
    return;
  }

  const neededLiters = (distance * consumption) / 100;

  showResult(
    "neededResult",
    `За този маршрут ще ти трябват около <strong>${formatNumber(neededLiters)} литра</strong>.`
  );
}