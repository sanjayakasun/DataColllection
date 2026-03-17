// AGE AUTO CALCULATION
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

// FORM SUBMIT
document.getElementById("form").addEventListener("submit", function(e){
e.preventDefault();

let nic = document.getElementById("nic").value;
let mobile = document.getElementById("mobile").value;

if(!/^([0-9]{9}[vVxX]|[0-9]{12})$/.test(nic)){
document.getElementById("msg").innerHTML="<p class='error'>Invalid NIC</p>";
return;
}

if(!/^07[0-9]{8}$/.test(mobile)){
document.getElementById("msg").innerHTML="<p class='error'>Invalid Mobile</p>";
return;
}

const data = Object.fromEntries(new FormData(this).entries());

const scriptURL = "https://script.google.com/macros/s/AKfycbzeP8s3LoyA0hDYSxSnGbSjKinr0_GI2k2QF6XblZlZUw9-siC1d5FW7KjLhAjFChqKxg/exec";

document.getElementById("form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = document.getElementById("form");
  const formData = new FormData(form);

  // Handle multiple checkboxes
  let selectedDistricts = [];
  document.querySelectorAll('input[name="SelectedDistricts"]:checked')
    .forEach(el => selectedDistricts.push(el.value));

  const data = Object.fromEntries(formData.entries());
  data.SelectedDistricts = selectedDistricts.join(", ");

  document.getElementById("msg").innerHTML = "Submitting...";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      document.getElementById("msg").innerHTML = "✅ Application submitted successfully!";
      form.reset();
    } else {
      document.getElementById("msg").innerHTML = "❌ Submission failed!";
    }
  } catch (error) {
    document.getElementById("msg").innerHTML = "❌ Error submitting form!";
  }
});});