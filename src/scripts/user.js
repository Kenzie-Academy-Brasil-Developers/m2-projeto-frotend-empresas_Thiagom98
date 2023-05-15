import { getUserByToken, getCompanyByUser, getDepartmentByUser } from "./requests.js"

const red = '#df1545'
const green = '#168821'
async function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastParagraph = document.querySelector('.toast__container > p')
    toastParagraph.innerText = text
  
    toastContainer.style = `background-color: ${color}; border-color: ${color}`
  
    toastContainer.classList.remove('hidden')
  }

const token = JSON.parse(localStorage.getItem('@kenzieEmpresas: token')) || ""

const user = await getUserByToken()

const companie = await getCompanyByUser (user)

const department = await getDepartmentByUser(user)

function renderEmployesOfDepartment (){
    const div = document.querySelector('#infos__container')
    
    if (user.department_id != null){
        div.innerText = ''
        const div2 = document.createElement('div')
        const div3 = document.createElement('ul')
        
        department.employees.forEach(employeRender =>{
            const li = document.createElement('li')
            const h2 = document.createElement('h2')

            li.classList.add('list__renderEmployes-item')
            h2.classList.add('list__renderEmployes-name')

            h2.innerText = employeRender.name

            li.appendChild(h2)

            div3.appendChild(li)


        })
        div2.innerText = `${companie.name} - ${department.name}`
        
        div2.classList.add('div__renderEmployes')
        div3.classList.add('div__renderEmployes-container')

        div.appendChild(div2)
        div.appendChild(div3)
    }
}

function renderNameCompanie (companie,department,user){
    const div = document.querySelector('#infos__container')
    const title = document.querySelector('#infos__title')
    const main = document.querySelector('.main__container')
    const employes = department.employees
    if (user.company__id != null ){
        div.classList.add('empty')
        title.classList.add('empty')

        const div2 = document.createElement('div')
        const titles = document.createElement('p')
        const list = document.createElement('ul')

        div2.classList.add('titles__container')
        titles.classList.add('titles__text')

        titles.innerText = `${companie.name} - ${department.name}`

        div2.appendChild(titles)

        main.appendChild(div2)

        employes.forEach(employe => {
            const li = document.createElement('li')
            const employeName = document.createElement('p')

            li.classList.add('list__item')
            employeName.classList.add('list__name')

            employeName.innerText = employe

            li.appendChild(employeName)
            list.appendChild(li)
        });
        

    }

}



function goToHomePage () {
    const buttonLogin = document.querySelector('#header__logout')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        localStorage.clear()
        location.replace('/index.html')
    })
    
}

function protectRoute (token) {
    if(token == ""){
        location.replace('/index.html')
    }
    
}
export function rendereUserHeader (array) {
    const div = document.querySelector('.user__container')

    const userName =document.createElement('h1')
    const email = document.createElement('p')

    userName.classList.add('user__name')
    email.classList.add('user__email')

    userName.innerText = array.name
    email.innerText = array.email

    div.appendChild(userName)
    div.appendChild(email)



}
renderEmployesOfDepartment()
renderNameCompanie(companie, department, user )

rendereUserHeader(user)

protectRoute(token)

goToHomePage()


