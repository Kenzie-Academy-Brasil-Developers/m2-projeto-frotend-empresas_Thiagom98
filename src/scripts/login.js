import { loginEmployees } from "./requests.js"


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