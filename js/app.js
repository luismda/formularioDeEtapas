const progressContainer = document.querySelector('#progress-container')
const formContainer = document.querySelector('#form-container')
const nextBtn1 = document.querySelector('#next-btn-1')
const nextBtn2 = document.querySelector('#next-btn-2')
const backBtn1 = document.querySelector('#back-btn-1')
const backBtn2 = document.querySelector('#back-btn-2')
const concludetn = document.querySelector('#conclude-btn')
const slide = document.querySelector('#slide')
const bar = document.querySelector('#bar')
const dataIcon = document.querySelector('.bi-person-fill')
const addressIcon = document.querySelector('.bi-house-fill')
const loginIcon = document.querySelector('.bi-lock-fill')
const alert = document.querySelector('.alert')
const closeAlert = document.querySelector('.bi-x')
const iconMsgAlert = document.querySelector('.icon-msg')
const msgAlert = document.querySelector('.msg')
const spinner = document.querySelector('#spinner')
const nameInput = document.querySelector('input[name="name"]')
const emailInput = document.querySelector('input[name="email"]')
const phoneInput = document.querySelector('input[name="phone"]')
const streetInput = document.querySelector('input[name="street"]')
const numberInput = document.querySelector('input[name="number"]')
const districtInput = document.querySelector('input[name="district"]')
const cityInput = document.querySelector('input[name="city"]')
const cepInput = document.querySelector('input[name="cep"]')
const usernameInput = document.querySelector('input[name="username"]')
const passwordInput = document.querySelector('input[name="password"]')
const confirmpasswordInput = document.querySelector('input[name="confirmpassword"]')

const userData = {}

const validations = (inputValues, checkPassword) => {
    const invalidValues = inputValues.filter(value => !value)

    if (invalidValues.length !== 0) {
        showAlert('Preencha todos os campos dessa etapa para prosseguir', 'error')
        return false
    }

    if (checkPassword) {
        if (inputValues[1] !== inputValues[2]) {
            showAlert('As senhas precisam ser iguais', 'error')
            return false
        }
    }

    return true
}

const nextStep1 = event => {
    event.preventDefault()

    if(!validations([ nameInput.value, emailInput.value, phoneInput.value ])) {
        return
    }

    userData.name = nameInput.value
    userData.email = emailInput.value
    userData.phone = phoneInput.value

    slide.classList.remove('back')
    slide.classList.add('next')
    bar.classList.add('bar-50')
    addressIcon.classList.add('stage-complete')
}

const nextStep2 = event => {
    event.preventDefault()

    if(!validations([ streetInput.value, numberInput.value, districtInput.value, cityInput.value, cepInput.value ])) {
        return
    }

    userData.street = streetInput.value
    userData.number = numberInput.value
    userData.district = districtInput.value
    userData.city = cityInput.value
    userData.cep = cepInput.value

    slide.classList.remove('back-again')
    slide.classList.remove('next')
    slide.classList.add('next-again')
    bar.classList.remove('bar-50')
    bar.classList.add('bar-100')
    loginIcon.classList.add('stage-complete')
}

const backStep1 = event => {
    event.preventDefault()

    slide.classList.remove('next')
    slide.classList.remove('back-again')
    slide.classList.add('back')
    bar.classList.remove('bar-50')
    addressIcon.classList.remove('stage-complete')
}

const backStep2 = event => {
    event.preventDefault()

    slide.classList.remove('next-again')
    slide.classList.add('back-again')
    bar.classList.remove('bar-100')
    bar.classList.add('bar-50')
    loginIcon.classList.remove('stage-complete')
}

const conclude = event => {
    event.preventDefault()

    if(!validations([ usernameInput.value, passwordInput.value, confirmpasswordInput.value ], true)) {
        return
    }

    userData.username = usernameInput.value
    userData.password = passwordInput.value

    clearForm()
    toggleFormVisibility()
    toggleSpinnerVisibility()

    new UserRegistration(userData).save()
}

const showAlert = (message, type) => {
    const msgIconType = type === 'success' ? 'bi-check' : 'bi-exclamation-circle'
    iconMsgAlert.classList.remove('bi-check')
    iconMsgAlert.classList.remove('bi-exclamation-circle')
    iconMsgAlert.classList.add(msgIconType)

    msgAlert.textContent = message

    alert.classList.remove('hide')
    alert.classList.add('show')
    alert.classList.add('showAlert')

    setTimeout(hideAlert, 4000)
}

const hideAlert = () => {
    alert.classList.remove('show')
    alert.classList.add('hide')
}

const clearForm = () => {
    formContainer.reset()
    slide.classList.remove('next-again')
    loginIcon.classList.remove('stage-complete')
    addressIcon.classList.remove('stage-complete')
    bar.classList.remove('bar-100')
}

const toggleFormVisibility = () => {
    progressContainer.classList.toggle('d-none')
    formContainer.classList.toggle('d-none')
}

const toggleSpinnerVisibility = () => {
    spinner.classList.toggle('d-none')
}

class UserRegistration {
    constructor({ name, email, phone, street, number, district, city, cep, username, password }) {
        this.name = name
        this.email = email
        this.phone = phone
        this.street = street
        this.number = number
        this.district = district
        this.city = city
        this.cep = cep
        this.username = username
        this.password = password
    }

    save() {
        setTimeout(() => {
            toggleFormVisibility()
            toggleSpinnerVisibility()

            showAlert('Cadastro realizado com sucesso', 'success')
        }, 1000)
    }
}

nextBtn1.addEventListener('click', nextStep1)
nextBtn2.addEventListener('click', nextStep2)
backBtn1.addEventListener('click', backStep1)
backBtn2.addEventListener('click', backStep2)
concludetn.addEventListener('click', conclude)
closeAlert.addEventListener('click', hideAlert)