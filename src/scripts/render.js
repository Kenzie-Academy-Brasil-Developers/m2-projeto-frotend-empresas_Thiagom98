export function rendereUserHeader (array) {
    const div = document.querySelector('.user__container')

    const userName =document.createElement('h1')
    const email = document.createElement('p')

    userName.innerText = array.name
    email.innerText = array.email

    div.appendChildu(userName)
    div.appendChild(email)



}