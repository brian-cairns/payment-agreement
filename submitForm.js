let submit = document.getElementById('submit')
console.log(submit)
const formName = 'paymentAgreement'
console.log('form: ' + formName)
let newForm = {}
let signer = ''

let caregiverName = document.querySelector('input#caregiverName')
caregiverName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverName = e.target.value;
  console.log(newForm.caregiverName);
  signer = newForm.caregiverName
})

let address = document.querySelector('input#address')
address.addEventListener('change', (e) => {
	console.log('changed')
	newForm.address = e.target.value;
  console.log(newForm.address);
})

let city = document.querySelector('input#city')
city.addEventListener('change', (e) => {
	console.log('changed')
	newForm.city = e.target.value;
  console.log(newForm.city);
})

let state = document.querySelector('input#state')
state.addEventListener('change', (e) => {
	console.log('changed')
	newForm.state = e.target.value;
  console.log(newForm.state);
})

let zip = document.querySelector('input#zip')
zip.addEventListener('change', (e) => {
	console.log('changed')
	newForm.zip = e.target.value;
  console.log(newForm.zip);
})

let date = document.querySelector('input#date')
date.addEventListener('change', (e) => {
	console.log('changed')
	newForm.date = e.target.value;
  console.log(newForm.date);
})


/*
let caregiverSignature = document.querySelector('input#caregiverSignature')
caregiverSignature.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverSignature = e.target.value;
  console.log(newForm.caregiverSignature);
})
*/

document.getElementById('submit').addEventListener("click", async (event) => {
  submitForm(newForm, 'newClientIntake')
  sessionStorage.setItem('userName', newForm.clientName)
  updateClient(newForm)
  const message = '<p>Complete the <a href="/forms/new-client-intake-form">Payment Agreement Form</a></p>'
  removeNotice(newForm.clientName, message)
})

let printForm = document.getElementById('printToPDF')
printForm.style.display = 'none'

async function submitForm(data, form) {
  const document = {
    'form': form,
    'data': data
  }
  console.log(document)
  fetch('https://pffm.azurewebsites.net/form', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin" : "*"
    },
    body: JSON.stringify(document)
  })
    .then(response => response.json())
    .then(data => respond(data)) 
    .catch((err) => showError(err))
}

function respond(data) {
  let formId = data.formId
  if (formId) {
    showSuccess(formId) 
  } else {
    showError(data.error)
  }
}

function showSuccess(formId) {
  document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
  printForm.style.display = 'inline';
  printForm.addEventListener('click', (e) => {
  location.href = `https://phoenix-freedom-foundation-backend.webflow.io/completed-forms/payment-agreement-form?id=${signer}`
  })
}


function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}

async function removeNotice(name, message) {
  const url = 'https://pffm.azurewebsites.net/notices'
  let data = {
    clientName: name,
    notice: message
  }
  fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response != 500 || response != 403) {
        console.log('deleted', sessionStorage.getItem('userName'))
      }
      //location.href = 'https://phoenix-freedom-foundation-backend.webflow.io/client-portal'
    })
    .catch(console.error)
}


