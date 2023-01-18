const customRevFormOnSubmit = (
  event,
  token,
  successMessage = "Thanks for signing up."
) => {
  // prevent form submission
  event.preventDefault();

  // get form data from document
  const form = document.getElementById("revinate_contact_api_form");
  let formData = new FormData(form);
  formData = Array.from(formData);

  // normalize data for submission
  const contactArr = [{}];
  const contact = contactArr[0];

  formData.forEach((field) => {
    contact[field[0]] = field[1];
  });

  const formattedData = { tokens: [token], contacts: contactArr };

  const spinner = document.getElementById("spinner");

  fetch("https://contact-api.inguest.com/api/add-contacts-to-lists", {
    method: "POST",
    body: JSON.stringify(formattedData),
  }).then(() => {
    form.classList.add("hidden");
    spinner.classList.remove("hidden");

    setTimeout(() => {
      spinner.innerHTML = successMessage;
    }, 1000);
  });
};
