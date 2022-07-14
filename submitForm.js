let submit = document.getElementById('submit')
console.log(submit)
const formName = 'paymentAgreement'
console.log('form: ' + formName)
let newForm = {}

let caregiverName = document.querySelector('input#caregiverName')
caregiverName.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverName = e.target.value;
  console.log(newForm.caregiverName);
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

let caregiverSignature = document.querySelector('input#caregiverSignature')
caregiverSignature.addEventListener('change', (e) => {
	console.log('changed')
	newForm.caregiverSignature = e.target.value;
  console.log(newForm.caregiverSignature);
})
  
document.getElementById('submit').addEventListener("click", async (event) => {
    newForm.paymentChoice = document.getElementById('paymentOption1').checked ? '$50/hr' : '$300/mo'
    submitForm(newForm, formName)
})

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
    .then((response) => {
      if (response.status == 200) {
      showSuccess()
      } else {
        showError(response.body)
      }
    })
    .catch((err) => showError(err))
}


function showSuccess() {
    document.getElementById('returnMessage').innerHTML = 'Form has been successfully submitted'
}

function showError(err) {
    console.error
    document.getElementById('returnMessage').innerHTML = `An error occurred when submitting this form, which was ${err}. Please contact the administrator for help.`
}