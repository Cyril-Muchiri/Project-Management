const logForm = document.querySelector("#loginForm");
console.log(logForm)

const alerts = document.querySelector(".alertsContainer");

const email = document.querySelector('.email')
const password = document.querySelector('.password')





let user = {

};



const checkLoginInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
        if(emailValue.length == 0 || passwordValue.length ==0) {
            alerts.innerHTML = ` <div class="alerts">Please fill in all fields</div>`
            setTimeout(() => {
                alerts.innerHTML = ''
            }, 3000);
        }else{
            user = {
                email: email.value,
                password: password.value,
    
            }
    }
}



logForm.addEventListener('submit', async(e) => {
    e.preventDefault(e)
    try {
        
        checkLoginInputs()
        
        const res = await fetch('http://localhost:5000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()
        const token = data?.token
        alerts.innerHTML =`
        <div class="alerts"> ${data?.message}</div>
        `
        //store the token in local storage 
        localStorage.setItem('token', token)
        if(localStorage.getItem('token')){

            const res = await fetch('http://localhost:5000/api/v1/users/loggedInUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'token': localStorage.getItem('token')
                }
            })

            const data = await res.json()
            console.log(data)

            const userId = data?.loggedInUser?.id

            setTimeout(async()=>{

                
                            alerts.innerHTML =``
                
                            if(data?.loggedInUser.role == 'admin'){
                                window.location.href = `../../admin-dashboard/index.html?id=${userId}`
                            }
                
                            if(data?.loggedInUser.role == 'user'){
                                window.location.href = `../../user-dashboard/index.html?id=${userId}`
                            }

            },2000)

        }
    
    } catch (error) {

        console.log(error)
        
    }
})







