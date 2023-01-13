// Your application goes here
// Fetching form information to build visual form using async function
async function fetchFormAPI() {
  try {
    const response = await fetch(
      "https://mocki.io/v1/84954ef5-462f-462a-b692-6531e75c220d",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    buildForm(data);
  } catch (e) {
    alert(e);
  }
}

// Function, which is creating visual form in index.html
function buildForm(data) {
  // Selecting html element in index.html
  let form = document.querySelector("#post");
  // Creating button to submit the form and provided the name and type.
  let button = document.createElement("button");
  button.innerText = "Submit Form";
  button.setAttribute("type", "submit");
  //Iterating throgh all elements provided by API
  for (let element of data) {
    if (element.legend) {
      generateRadioInput(element, form);
    } else {
      generateTextInput(element, form);
    }
  }
  form.append(button);
  submitForm(form);
}

// Function, which create html radio input elements
function generateRadioInput(providedInput, form) {
  // Creating label element for all radio inputs and appened into form
  let labelForContact = document.createElement("label");
  labelForContact.innerText = providedInput.legend;
  let br = document.createElement("br");
  form.append(labelForContact);
  form.append(br);
  //Iterating all options in radio input with creating label and value for each of them.
  //Validation was provided
  //Appended into form
  for (let option of providedInput.options) {
    let labelText = document.createElement("label");
    labelText.innerText = option.label;
    let inputTypeRadio = document.createElement("input");
    inputTypeRadio.setAttribute("type", providedInput.type);
    inputTypeRadio.setAttribute("value", option.value);
    inputTypeRadio.setAttribute("name", "contactPreferred");
    if (providedInput.required === 1) {
      inputTypeRadio.setAttribute("required", "required");
    }
    form.append(labelText);
    form.append(inputTypeRadio);
    form.append(br);
  }
}

//Function, which create html text input element
function generateTextInput(providedInput, form) {
  // Creating labe element
  let labelText = document.createElement("label");
  labelText.innerText = providedInput.label;
  //Creating input text field and set attributes
  // Validation was provided
  // Appended into form
  let inputField = document.createElement("input");
  inputField.setAttribute("type", providedInput.type);
  inputField.setAttribute("name", providedInput.name);
  if (providedInput.required === 1) {
    inputField.setAttribute("required", "required");
  }
  if (providedInput.type === "tel") {
    inputField.setAttribute("pattern", providedInput.pattern);
  }
  let br = document.createElement("br");
  form.append(labelText);
  form.append(inputField);
  form.append(br);
}

//Funtion, which is submitting form
function submitForm(form) {
  // Event listener for submitting form
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    //Object which will submit all information which was filled out in the form Result #1
    const formData = {};
    // !!! Array created for another option for submitting Result #2
    const colectedInformation = [];
    // Checked radio input
    let checkedContactType = "";
    //Iterating through the radio inputs with was checked.
    const contactType = document.getElementsByName("contactPreferred");
    for (let i = 0; i < contactType.length; i++) {
      if (contactType[i].checked) {
        checkedContactType = contactType[i].value;
      }
    }
    //Result #1
    //Iterating through all filled out inputs.
    //Create object {nameFirst: 'Andrew', nameLast: 'Ber', contactPhone: '9292231314', contactEmail: 'andrew@test.com', contactPreferred: 'phone'}
    for (let i = 0; i < event.target.length; i++) {
      if (event.target.elements[i].getAttribute("name") !== null) {
        if (
          event.target.elements[i].getAttribute("name") === "contactPreferred"
        ) {
          formData[event.target.elements[i].getAttribute("name")] =
            checkedContactType;
        } else {
          formData[event.target.elements[i].getAttribute("name")] =
            event.target.elements[i].value;
        }
      }
    }
    //Result #2
    //Iterating through all filled out inputs.
    //Create array with objects. Example: [{"name": "nameFirst","value": "Jane"},{"name": "nameLast","value": "Doe"},...]
    // for (let i = 0; i < event.target.length; i++) {
    //   let obj = {};
    //   if (event.target.elements[i].getAttribute("name") !== null) {
    //     if (
    //       event.target.elements[i].getAttribute("name") ===
    //         "contactPreferred" &&
    //       event.target.elements[i].value === checkedContactType
    //     ) {
    //       obj["name"] = event.target.elements[i].getAttribute("name");
    //       obj["value"] = checkedContactType;
    //       colectedInformation.push(obj);
    //     } else if (
    //       event.target.elements[i].getAttribute("name") ===
    //         "contactPreferred" &&
    //       event.target.elements[i].value !== checkedContactType
    //     ) {
    //       continue;
    //     } else {
    //       obj["name"] = event.target.elements[i].getAttribute("name");
    //       obj["value"] = event.target.elements[i].value;
    //       colectedInformation.push(obj);
    //     }
    //   }
    // }

    //Show the results of Result #1 iteration
    console.log(formData);
    //Show the results of Result #2 iteration
    //console.log(colectedInformation)

    // fetchPostRequest(formData);
    form.reset();
  });
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO CHECK RESULTS OF THE PROJECT npm install, npm start. OPEN BROWSER on http://localhost:7000 AND USE ON KEYBOARD "OPTION + COMMAND + I", OPEN "Console" SECTION !!!!!!!!!!!

// POST REQUEST DOESN'T WORK BECAUSE OF NOT PROVIDING PROPER IPA FOR THIS TASK
// async function fetchPostRequest(data) {
//   const api = "https://mocki.io/v1/58f43f58-31a9-42c9-82ca-798b1953d3a2";
//   const response = await fetch(api, {
//     method: "POST",
//     headers: {
//       Accept: "application.json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   console.log(response);
// }

fetchFormAPI();
