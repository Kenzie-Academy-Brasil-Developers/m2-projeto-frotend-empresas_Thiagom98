import { createEmployees } from "./requests.js"


async function handleCreateLogin() {
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
            
            const login = await createEmployees(createBody)
            return login
        }
        
        
    })

}

function goToLoginPage () {
    const buttonLogin = document.querySelector('#header__login')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/src/pages/login.html')
    })

}
function goToHomePage () {
    const buttonLogin = document.querySelector('#header__home')
    const buttonHome = document.querySelector('.form__button-register')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/index.html')
    })
    buttonHome.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/index.html')
    })

}
goToHomePage()

goToLoginPage()

handleCreateLogin()
