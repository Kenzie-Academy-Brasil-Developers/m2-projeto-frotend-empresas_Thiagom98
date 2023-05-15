import { loginEmployees } from "./requests.js"
const red = '#df1545'
const green = '#168821'
async function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastParagraph = document.querySelector('.toast__container > p')
    toastParagraph.innerText = text
  
    toastContainer.style = `background-color: ${color}; border-color: ${color}`
  
    toastContainer.classList.remove('hidden')
  }


async function handleLogin() {
    const createButton = document.querySelector('.form__button-login')
    const inputs = document.querySelectorAll('.form__input')
    let createBody = {}
    let count = 0
    createButton.addEventListener('click',async (event) => {
        event.preventDefault()
        inputs.forEach(input =>{
            if(input.value.trim() === ''){
                count++
            }
                
            createBody[input.name] = input.value

        })
        if(count != 0) {
            count = 0
            alert('preencha todos os campos')

        }else{
            
            const login = await loginEmployees(createBody)
            return login
        }
        
        
    })


}
function goToHomePage () {
    const buttonLogin = document.querySelector('#header__home')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/index.html')
    })

}
function goToRegisterPage() {
    const buttonLogin = document.querySelector('#header__register')
    const buttonRegister = document.querySelector('.form__button-register')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/src/pages/register.html')
    })
    buttonRegister.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/src/pages/register.html')
    })
    
}

goToHomePage()
goToRegisterPage()


handleLogin()