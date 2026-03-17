// AGE CALCULATION
document.getElementById("birthday").addEventListener("change", function () {
  let birth = new Date(this.value);
  let refDate = new Date("2025-06-30");

  let years = refDate.getFullYear() - birth.getFullYear();
  let months = refDate.getMonth() - birth.getMonth();
  let days = refDate.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    days += 30;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById("age").value =
    `${years} years ${months} months ${days} days`;
});


// SUBMIT FORM
document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  let nic = document.getElementById("nic").value;
  let mobile = document.getElementById("mobile").value;

  // VALIDATION
  if (!/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(nic)) {
    document.getElementById("msg").innerHTML = "Invalid NIC";
    return;
  }

  if (!/^07[0-9]{8}$/.test(mobile)) {
    document.getElementById("msg").innerHTML = "Invalid Mobile";
    return;
  }

  const form = document.getElementById("form");
  const formData = new FormData(form);

  // FIX CHECKBOX
  let selectedDistricts = [];
  document.querySelectorAll('input[name="selectedDistricts"]:checked')
    .forEach(el => selectedDistricts.push(el.value));

  const data = Object.fromEntries(formData.entries());

  // IMPORTANT: same name as Apps Script
  data.selectedDistricts = selectedDistricts.join(", ");

  document.getElementById("msg").innerHTML = "Submitting...";

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbzgQY11v5hKBNomfOcpcVcrXAgjtJrbMcPOXUeBzl3c-9rV1SGeg49KDgmgtPexjpZC5g/exec", {
      method: "POST",
      body: JSON.stringify(data)
    });
      console.log(data);
    const result = await response.json();

    if (result.status === "success") {
      document.getElementById("msg").innerHTML = "✅ Submitted successfully";
      form.reset();
    } else {
      document.getElementById("msg").innerHTML = "❌ Failed";
    }

  } catch (error) {
    document.getElementById("msg").innerHTML = "❌ Error";
  }
});