import { getAllEmployes, getCompanyByUserId, getAllCompanies, getDepartmentByCompany, updateEmployee, getCompanyById, deleteEmployee, createDepartment, updateDepartment, deleteDepartment, getAllDepartments, getDepartmentById, getEmployesOut , hireEmploye, fireEmploye} from './requests.js'

const token = JSON.parse(localStorage.getItem('@kenzieEmpresas: token')) || ""

const allEmployes = await getAllEmployes()

const allCompanies = await getAllCompanies()

const allOutEmployees = await getEmployesOut()

const allDepartments = await getAllDepartments()

let buttonIdUpdate = ''

const red = '#df1545'
const green = '#168821'
async function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastParagraph = document.querySelector('.toast__container > p')
    toastParagraph.innerText = text
  
    toastContainer.style = `background-color: ${color}; border-color: ${color}`
  
    toastContainer.classList.remove('hidden')
  }



function goToHomePage() {
    const buttonLogin = document.querySelector('#header__logout')
    buttonLogin.addEventListener('click', (event) => {
        event.preventDefault()
        localStorage.clear()
        location.replace('/index.html')
    })

}
function renderSelectOptions(companies) {
    const select = document.querySelector('.select')
    const selectModal = document.querySelector('.modal__input-select-create')
    companies.forEach(companie => {


        const option = document.createElement('option')

        option.classList.add(`${companie.id}`)

        option.value = companie.id

        option.innerText = companie.name

        select.appendChild(option)
        



    })
    companies.forEach(companie => {


        const option = document.createElement('option')

        option.classList.add(`${companie.id}`)

        option.value = companie.id

        option.innerText = companie.name

       
        selectModal.appendChild(option)



    })


}
function renderSelectOptionsModal(userOuts) {
    const select = document.querySelector('.select__modal-outofwork')
    
    userOuts.forEach(userOut => {


        const option = document.createElement('option')


        option.value = userOut.id

        option.innerText = userOut.name

        select.appendChild(option)
        



    })


}

async function renderAllEmployes(employes) {
    const modalController = document.querySelector('.modal__controller')
    const modalDeleteUser = document.querySelector('.modal__controller-delete-user')
    const modalText = document.querySelector('.modal__delete-user-text')
    const ul = document.querySelector('.users__container')
    ul.innerHTML = ''
    employes.forEach(async employe => {

        const li = document.createElement('li')
        const name = document.createElement('h3')
        const button1 = document.createElement('img')
        const button2 = document.createElement('img')
        const companie = document.createElement('p')


        button1.src = "../assets/lixeira.svg"
        button2.src = "../assets/Lapis.svg"

        button1.setAttribute('id', `${employe.id}`)
        button2.setAttribute('id', `${employe.id}`)

        name.innerText = employe.name

        li.classList.add('list__item')
        name.classList.add('list__name')
        button1.classList.add('list__button1')
        button2.classList.add('list__button2')
        companie.classList.add('list__companie')

        if (employe.company_id != null) {
            const companieName = await getCompanyByUserId(employe)
            companie.innerText = companieName.name

        }
        li.appendChild(name)
        li.appendChild(button1)
        li.appendChild(button2)
        li.appendChild(companie)

        ul.appendChild(li)

        button2.addEventListener('click', () => {
            buttonIdUpdate = button2.id
            modalController.showModal()

        })
        button1.addEventListener('click', () => {
            buttonIdUpdate = button1.id
            modalText.innerText =`Realmente deseja remover o usuário ${employe.name} `
            modalDeleteUser.showModal()
        })

    });

}

function closeModals() {
    const buttons = document.querySelectorAll('.close__modal')
    const modalController = document.querySelectorAll('.modal__controller-geral')



    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault()
            modalController.forEach(modal =>{
                modal.close()
            })

        })
    })
}


function handleUpdateEmploye() {
    const modalController = document.querySelector('#modal__controlle-edit-user')
    const updateButton = document.querySelector("#modal__button-edit-user")
    const inputs = document.querySelectorAll('#modal__input-edit-user')
    let createBody = {}
    let count = 0
    updateButton.addEventListener('click', async (event) => {
        event.preventDefault()
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++
            }

            createBody[input.name] = input.value

        })
        if (count != 0) {
            count = 0
            alert('preencha todos os campos')


        } else {
            const update = await updateEmployee(buttonIdUpdate, createBody)
            const updateEmployes = await getAllEmployes()
            modalController.close()
            renderAllEmployes(updateEmployes)

            return update
        }


    })

}

function handleDeleteEmploye() {
    const modalController = document.querySelector('.modal__controller-delete-user')
    const deleteButton = document.querySelector('.modal__delete-user-buton')
    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault()




        const deleteEmploye = await deleteEmployee(buttonIdUpdate)
        const updateEmployes = await getAllEmployes()
        modalController.close()
        renderAllEmployes(updateEmployes)

        return deleteEmploye
    }
    )



}

function handleCreateDepartment() {
    const modalController = document.querySelector('#modal__controller-create')
    const createButton = document.querySelector('#modal__create-button')
    const inputs = document.querySelectorAll('.modal__input-create')
    const selectInput = document.querySelector('.modal__input-select-create')
    let createBody = {}
    let count = 0
    createButton.addEventListener('click', async (event) => {
        event.preventDefault()
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++
            }
        
            createBody[input.name] = input.value

        })
        if(selectInput.value == ''){
            count++
        }


        
        createBody['company_id'] = selectInput.value

        

        
        if (count != 0) {
            count = 0
            alert('preencha todos os campos')

        }else {

            const create = await createDepartment(createBody)
            


            modalController.close()
            
            return create
            
        }


    })

}



function filterBySector() {
    const select = document.querySelector('.select')
    const departments = document.querySelector('.department__container')


    select.addEventListener('change', async (event) => {
        const companyId = select.value
        departments.innerHTML = ''
        const company = select.options[select.selectedIndex].innerText



        const listDepartmentByCompanie = await getDepartmentByCompany(companyId)


        if (listDepartmentByCompanie.length) {

            createDepartmentCard(listDepartmentByCompanie, departments)


        } else {
            departments.innerText = `empresa ${company} não possui departamentos`
        }




    }
    )

}

function createDepartmentCard(listDepartmentByCompanie, departments) {
    const modalView = document.querySelector('.modal__view-department')
    const modalViewName = document.querySelector('.modal__view-department-name')
    const modalViewDescription = document.querySelector('.modal__view-description')
    const modalViewCompany = document.querySelector('.modal__view-company')
    const modalEditDepartment = document.querySelector('#modal__controller-edit-department')
    const modalDeleteDepartment = document.querySelector('.modal__controller-delete-department')
    const modalDeleteDepartmentText = document.querySelector('.modal__delete-department-text')
    const modalViewList = document.querySelector('.modal__viwe-list-container')

    

    listDepartmentByCompanie.forEach(async (department) => {

        const li = document.createElement('li')
        const name = document.createElement('h3')
        const button1 = document.createElement('img')
        const button2 = document.createElement('img')
        const button3 = document.createElement('img')
        const companie = document.createElement('p')
        const description = document.createElement('p')
        const div = document.createElement('div')
        
        button1.src = "../assets/lixeira.svg"
        button2.src = "../assets/Lapis.svg"
        button3.src = '../assets/Olho.svg'

        const getDepartment = await getDepartmentById(department.id)
        
        const companieName = await getCompanyById(department.company_id)
        
        

        name.innerText = department.name
        companie.innerText = companieName.name
        description.innerText = department.description


        button1.setAttribute('id', `${department.id}`)
        button2.setAttribute('id', `${department.id}`)
        button3.setAttribute('id', `${department.id}`)


        li.classList.add('list__item-department')
        name.classList.add('list__name-department')
        button1.classList.add('list__button1-department')
        button2.classList.add('list__button2-department')
        companie.classList.add('list__companie-department')
        button3.classList.add('list__button3-department')
        description.classList.add('list__description-department')
        div.classList.add('list__div-department')

        div.appendChild(name)
        div.appendChild(companie)
        div.appendChild(description)
        li.appendChild(div)
        li.appendChild(button3)
        li.appendChild(button1)
        li.appendChild(button2)
        

        departments.appendChild(li)
        
        button2.addEventListener('click', () =>{
            modalEditDepartment.showModal()
            buttonIdUpdate = button2.id
        })
        
        
        button3.addEventListener('click', () =>{
            modalViewName.innerText = department.name
            modalViewDescription.innerText = department.description
            modalViewCompany.innerText = companieName.name
            
            getDepartment.employees.forEach(employe =>{
                const liUserView = document.createElement('li')
                const userNameList = document.createElement('h2')
                const companieNameList = document.createElement('p')
                const buttonList = document.createElement('button')
                
                
                userNameList.innerText = employe.name
                companieNameList.innerText = companieName.name
                buttonList.innerText = 'Delisgar'
                
                liUserView.classList.add('modal__list-view')
                userNameList.classList.add('modal__list-username')
                companieNameList.classList.add('modal__list-companyname')
                buttonList.classList.add('modal__list-buttonview')


                liUserView.appendChild(userNameList)
                liUserView.appendChild(companieNameList)
                liUserView.appendChild(buttonList)

                modalViewList.appendChild(liUserView)
                buttonList.addEventListener('click', async () =>{
                    const fireEmployeDoned = await fireEmploye(employe.id)
                
                })

                
            })
            
    
            buttonIdUpdate = button3.id

            
            modalView.showModal()
        })
        button1.addEventListener('click', () => {
            modalDeleteDepartment.showModal()
            modalDeleteDepartmentText.innerText = `Realmente deseja remover o departamente ${department.name}`
    
            buttonIdUpdate = button1.id
        })
    })
}

function createCardInitial (alldepartments){
    const modalView = document.querySelector('.modal__view-department')
    const modalViewName = document.querySelector('.modal__view-department-name')
    const modalViewDescription = document.querySelector('.modal__view-description')
    const modalViewCompany = document.querySelector('.modal__view-company')
    const modalEditDepartment = document.querySelector('#modal__controller-edit-department')
    const modalDeleteDepartment = document.querySelector('.modal__controller-delete-department')
    const modalDeleteDepartmentText = document.querySelector('.modal__delete-department-text')
    const modalViewList = document.querySelector('.modal__viwe-list-container')
    const departments = document.querySelector('.department__container')

    

    alldepartments.forEach(async (department) => {

        const li = document.createElement('li')
        const name = document.createElement('h3')
        const button1 = document.createElement('img')
        const button2 = document.createElement('img')
        const button3 = document.createElement('img')
        const companie = document.createElement('p')
        const description = document.createElement('p')
        const div = document.createElement('div')
        
        button1.src = "../assets/lixeira.svg"
        button2.src = "../assets/Lapis.svg"
        button3.src = '../assets/Olho.svg'

        const getDepartment = await getDepartmentById(department.id)
        
        const companieName = await getCompanyById(department.company_id)
        
        

        name.innerText = department.name
        companie.innerText = companieName.name
        description.innerText = department.description


        button1.setAttribute('id', `${department.id}`)
        button2.setAttribute('id', `${department.id}`)
        button3.setAttribute('id', `${department.id}`)


        li.classList.add('list__item-department')
        name.classList.add('list__name-department')
        button1.classList.add('list__button1-department')
        button2.classList.add('list__button2-department')
        companie.classList.add('list__companie-department')
        button3.classList.add('list__button3-department')
        description.classList.add('list__description-department')
        div.classList.add('list__div-department')

        div.appendChild(name)
        div.appendChild(companie)
        div.appendChild(description)
        li.appendChild(div)
        li.appendChild(button3)
        li.appendChild(button1)
        li.appendChild(button2)
        

        departments.appendChild(li)
        
        button2.addEventListener('click', () =>{
            modalEditDepartment.showModal()
            buttonIdUpdate = button2.id
        })
        
        
        button3.addEventListener('click', () =>{
            modalViewName.innerText = department.name
            modalViewDescription.innerText = department.description
            modalViewCompany.innerText = companieName.name
            
            getDepartment.employees.forEach(employe =>{
                const liUserView = document.createElement('li')
                const userNameList = document.createElement('h2')
                const companieNameList = document.createElement('p')
                const buttonList = document.createElement('button')
                
                
                userNameList.innerText = employe.name
                companieNameList.innerText = companieName.name
                buttonList.innerText = 'Delisgar'
                
                liUserView.classList.add('modal__list-view')
                userNameList.classList.add('modal__list-username')
                companieNameList.classList.add('modal__list-companyname')
                buttonList.classList.add('modal__list-buttonview')


                liUserView.appendChild(userNameList)
                liUserView.appendChild(companieNameList)
                liUserView.appendChild(buttonList)

                modalViewList.appendChild(liUserView)
                buttonList.addEventListener('click', async () =>{
                    const fireEmployeDoned = await fireEmploye(employe.id)
                    
                })

                
            })
            
    
            buttonIdUpdate = button3.id

            
            modalView.showModal()
        })
        button1.addEventListener('click', () => {
            modalDeleteDepartment.showModal()
            modalDeleteDepartmentText.innerText = `Realmente deseja remover o departamente ${department.name}`
            buttonIdUpdate = button1.id
        })
    })

}


function handlEditDepartment () {
    const modalController = document.querySelector('#modal__controller-edit-department')
    const updateButton = document.querySelector("#modal__button-update-department")
    const inputs = document.querySelectorAll("#modal__input-department-update")
    let createBody = {}
    let count = 0
    updateButton.addEventListener('click', async (event) => {
        event.preventDefault()
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                count++
            }

            createBody[input.name] = input.value

        })
        if (count != 0) {
            count = 0
            alert('preencha todos os campos')


        } else {
            
            const update = await updateDepartment(buttonIdUpdate, createBody)
            modalController.close()
            location.reload()
           

            return update
        }


    })
}


function handleDeleteDepartment() {
    const modalController = document.querySelector('.modal__controller-delete-department')
    const deleteButton = document.querySelector('#modal__delete-department')
    deleteButton.addEventListener('click', async (event) => {
        event.preventDefault()
        




        const deleteEmploye = await deleteDepartment(buttonIdUpdate)

        modalController.close()

        return deleteEmploye
    }
    )



}



function openCreateDepartmentModal () {
    const createDepartmentButton = document.querySelector('.infos__button')
    const modalCreate = document.querySelector('#modal__controller-create')
    createDepartmentButton.addEventListener('click', () =>{
        modalCreate.showModal()
    })
}

async function handleHireEmployees(){
    const buttonHire = document.querySelector('.buttom__hire')
    const employeeToHire = document.querySelector('.select__modal-outofwork')
    const bodyHire = {}
    
    
    buttonHire.addEventListener('click',async  (event) =>{
        event.preventDefault()
        bodyHire['department_id'] = buttonIdUpdate
        const hireEmployeDoned = await hireEmploye(employeeToHire.value,bodyHire)
        location.reload()
        return hireEmployeDoned
        
    }
    )
}



createCardInitial(allDepartments)
handleHireEmployees()
handleDeleteDepartment()
handlEditDepartment()
handleCreateDepartment()
openCreateDepartmentModal()
closeModals()
handleDeleteEmploye()
handleUpdateEmploye()
filterBySector()
renderSelectOptionsModal(allOutEmployees)
renderSelectOptions(allCompanies)
renderAllEmployes(allEmployes)
goToHomePage()

