import { getAllCategories, getCompaniesByCategorie } from "./requests.js"

const token = JSON.parse(localStorage.getItem('@kenzieEmpresas: token'))
const admin = JSON.parse(localStorage.getItem('@kenzieEmpresas: admin'))

const sectors = await getAllCategories()

function renderSelectOptions (setores){
    const select = document.querySelector('.select')
    setores.forEach(setor =>{
        const option = document.createElement('option')

        option.classList.add('select__option')

        option.setAttribute('id', `${setor}`)

        option.innerText = setor

        select.appendChild(option)



    })


}
function filterBySector (setores){
    const select = document.querySelector('.select')
    const list = document.querySelector('.list__container-itens')

    select.addEventListener('change',async  (event) =>{
        list.innerHTML = ''
        const setor = event.target.value
        const filteredSectors = [setor];

        if(setor != ""){
            await renderCreateCards(filteredSectors)
            
        }else{
            await renderCreateCards(setores)
        }

    }
    )

}
async function renderCreateCards (sectors) {
    const listContainer = document.querySelector('.list__container-itens')
    sectors.forEach(async element => {
        const companies = await getCompaniesByCategorie(element)
        companies.forEach(ele => {
            
            const li = document.createElement('li')
            const name = document.createElement('h2')
            const div = document.createElement('div')
            const p = document.createElement('p')
            

            li.classList.add('list__item')
            name.classList.add('list__name')
            div.classList.add('setor__container')
            p.classList.add('setor__name')
            
            name.innerText = ele.name
            p.innerText = element

            div.appendChild(p)

            li.appendChild(name)
            li.appendChild(div)

            listContainer.appendChild(li)

            
        })
    });
}

function goToLoginPage () {
    const buttonLogin = document.querySelector('.header__button-login')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/src/pages/login.html')
    })
}
function goToRegisterPage() {
    const buttonLogin = document.querySelector('.header__button-register')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        location.replace('/src/pages/register.html')
    })
}

function protectRote(token,admin){
    if(token != "" && admin == false){
        location.replace('/src/pages/user.html')
    }else if (token != "" && admin == true){
        location.replace('/src/pages/admin.html')
    }

}



renderSelectOptions(sectors)
filterBySector(sectors)
protectRote(token,admin)
goToRegisterPage()
goToLoginPage()
await renderCreateCards (sectors)