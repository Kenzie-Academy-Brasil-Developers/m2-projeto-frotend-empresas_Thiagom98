const baseUrl = 'http://localhost:3333'
const token = JSON.parse(localStorage.getItem('@kenzieEmpresas: token')) || ""

const requestHeaders = {
    'Content-type' : 'application/json',
    'Authorization' : `Bearer ${token}`
}
 
export const red = '#df1545'
export const green = '#168821'

export async function toast(color, text) {
    const toastContainer = document.querySelector('.toast__container')
    const toastParagraph = document.querySelector('.toast__container > p')
    toastParagraph.innerText = text
  
    toastContainer.style = `background-color: ${color}; border-color: ${color}`
  
    toastContainer.classList.remove('hidden')
  }

export async function getAllCategories (){
    const cate = []
    const categories = await fetch(`${baseUrl}/categories/readAll` , {
        method: 'GET'
    })
    
    .then(async (res) => {
        const categoriesJson = await res.json()
        categoriesJson.forEach(element =>{
            cate.unshift(element.name)
        })
    
       
    })
    return cate
}
export async function getCompaniesByCategorie (setor) {
    const companie = await fetch(`${baseUrl}/companies/readByCategory/${setor}` , {
        method: 'GET'
    })
    
    .then((res) => {
       
        return res.json()
    })
    return companie
}

export async function loginEmployees (loginbody){
    const loginEmployees = await fetch (`${baseUrl}/auth/login` , {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginbody)
    })
    .then(async (res) => {
        if(res.ok) {
            const loginEmployeesJson = await res.json()
            if(loginEmployeesJson.isAdm){
                localStorage.clear()
                localStorage.setItem('@kenzieEmpresas: token', JSON.stringify(loginEmployeesJson.authToken))
                localStorage.setItem('@kenzieEmpresas: admin', JSON.stringify(loginEmployeesJson.isAdm))
                location.replace('/src/pages/admin.html')
            }
            else{
                localStorage.clear()
                toast(green,'login efetuado com sucesso')
                localStorage.setItem('@kenzieEmpresas: token', JSON.stringify(loginEmployeesJson.authToken))
                localStorage.setItem('@kenzieEmpresas: admin', JSON.stringify(loginEmployeesJson.isAdm))
                location.replace('/src/pages/user.html')
                
            }
            
        }
        else{
            const loginEmployeesJson = await res.json()
            
            toast(red,loginEmployeesJson.message)

            
        }
    })
   
    return loginEmployees
}
export async function createEmployees (loginbody){
    const employees = await fetch (`${baseUrl}/employees/create` , {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(loginbody)
    })
    .then(async (res) => {
        if(res.ok) {
            const employeesJson = await res.json()
            location.replace('/src/pages/login.html')
        }
        else{
            const employeesJson = await res.json()
            toast(red,employeesJson.message)
        }
    })  
    return employees
}
export async function getUserByToken () {
    const userLogged = await fetch(`${baseUrl}/employees/profile` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return userLogged
}
export async function getCompanyByUser (user) {
    const getCompanie = await fetch(`${baseUrl}/companies/readById/${user.company_id}` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getCompanie
}
export async function getCompanyById (id) {
    const getCompanie = await fetch(`${baseUrl}/companies/readById/${id}` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getCompanie
}

export async function getDepartmentByUser (user) {
    const getDepartment = await fetch(`${baseUrl}/departments/readById/${user.department_id}` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getDepartment
}
export async function getDepartmentById (id) {
    const getDepartment = await fetch(`${baseUrl}/departments/readById/${id}` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getDepartment
}

export async function getAllEmployes () {
    const getAll = await fetch(`${baseUrl}/employees/readAll` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getAll
}
export async function getCompanyByUserId (user) {
    const getCompanie = await fetch(`${baseUrl}/companies/readById/${user.company_id}` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getCompanie
}
export async function getEmployesOut () {
    const getOut = await fetch(`${baseUrl}/employees/outOfWork` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getOut
}
export async function getAllDepartments () {
    const getDepartments = await fetch(`${baseUrl}/departments/readAll` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getDepartments
}
export async function getDepartmentByCompany (companyId) {
    const getDepartment = await fetch(`${baseUrl}/departments/readByCompany/${companyId}` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return getDepartment
}
export async function getAllCompanies(companyId) {
    const companies = await fetch(`${baseUrl}/companies/readAll` , {
        method: 'GET',
        headers: requestHeaders

    })
    
    .then( async (res) => {
        const response = await res.json()
        return response
        
    })
    
    return companies
}
export async function updateEmployee(employeId, bodyUpdate){
    const employeesUpdate = await fetch (`${baseUrl}/employees/updateEmployee/${employeId}` , {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(bodyUpdate)
    })
    .then(async (res) => {
        if(res.ok) {
            const employeesJsonUpdate = await res.json()
            return employeesJsonUpdate
        }
        else{
            const employeesJsonUpdate = await res.json()
            toast(red,employeesJsonUpdate.message)

            
        }
    })  
    return employeesUpdate
}
export async function deleteEmployee(employeId){
    const deleteUpdate = await fetch (`${baseUrl}/employees/deleteEmployee/${employeId}` , {
        method: 'DELETE',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok) {
            const employeesJsonUpdate = await res.json()
            return employeesJsonUpdate
        }
        else{
            const employeesJsonUpdate = await res.json()
            toast(red,employeesJsonUpdate.message)
        }
    })  
    return deleteUpdate
}
export async function createDepartment(createBody){
    const createDepartment = await fetch (`${baseUrl}/departments/create` , {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(createBody)
    })
    .then(async (res) => {
        if(res.ok) {
            const departmentCreated = await res.json()
            location.reload()
            return departmentCreated
            
        }
        else{
            const employeesJson = await res.json()
            toast(red,employeesJson.message)
        }
    })  
    return createDepartment
}
export async function updateDepartment(departmentId, bodyUpdate){
    const departmentUpdate = await fetch (`${baseUrl}/departments/update/${departmentId}` , {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(bodyUpdate)
    })
    .then(async (res) => {
        if(res.ok) {
            const departmentUpdated = await res.json()
            return departmentUpdated
        }
        else{
            const employeesJsonUpdate = await res.json()
            toast(red,employeesJsonUpdate.message)
           
        }
    })  
    return departmentUpdate


}
export async function deleteDepartment(departmentId){
    const deleteUpdate = await fetch (`${baseUrl}/departments/delete/${departmentId}` , {
        method: 'DELETE',
        headers: requestHeaders
    })
    .then(async (res) => {
        if(res.ok) {
            const departmentDeleted = await res.json()
            location.reload()
            return departmentDeleted
        }
        else{
            const employeesJsonUpdate = await res.json()
            toast(red,employeesJsonUpdate.message)
            
        }
    })  
    return deleteUpdate
}
export async function hireEmploye(employeId, bodyDepartment){
    const departmentHire = await fetch (`${baseUrl}/employees/hireEmployee/${employeId}` , {
        method: 'PATCH',
        headers: requestHeaders,
        body: JSON.stringify(bodyDepartment)
    })
    .then(async (res) => {
        if(res.ok) {
            const employedHire = await res.json()
            return employedHire
        }
        else{
            const employeesJsonUpdate = await res.json()
            toast(red,employeesJsonUpdate.message)
        }
    })  
    return departmentHire
}
export async function fireEmploye(employeId){
    const fireEmploye = await fetch (`${baseUrl}/employees/dismissEmployee/${employeId}` , {
        method: 'PATCH',
        headers: requestHeaders,
    })
    .then(async (res) => {
        if(res.ok) {
            const employeesFire = await res.json()
            location.reload()
            return employeesFire
        }
        else{
            const employeesFire = await res.json()
            toast(red,employeesFire.message)
        }
    })  
    return fireEmploye
}