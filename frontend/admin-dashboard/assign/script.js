const projectContainer = document.querySelector('.projectContainer')
const alerts = document.querySelector('.alertContainer')
const queryString = window.location.search;


const urlParams = new URLSearchParams(queryString);

const projectId = urlParams.get('id');

window.onload = async() =>{
    await fetchProjectById()

}


const fetchProjectById = async() => {
    try {
        let html = ``
        const res = await fetch(`http://localhost:5000/api/v1/projects/get/${projectId}`, {

            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        const project = data.project

        html += `
        <div class=${project?.isAssigned?"projectDisabled":"project"}>
        <h5 class="name">${project.project_name}</h5>
        <p class="desc">${project.project_description}</p>
        <p class="deadline"> <span class="date"> Date Added </span> ${new Date(project.created_at).toDateString()}</p>
        <li class="dropdown">
        <button href="#" class="btn-primary">Choose User</button>
        <ul class="dropdown-menu">
           ${await fetchAllUsers()}   
        </ul>
      </li>
    </div>
        
        `
        projectContainer.innerHTML = html
    } catch (error) {
        console.log(error)
        alerts.innerHTML = `
        <div class="alerts">${error.message}</div>
        `
        setTimeout(()=>{
            alerts.innerHTML =''
        },3000)
        
    }


}

const fetchAllUsers = async ()=>{

try {

    let html =``

    const res = await fetch('http://localhost:5000/api/v1/users',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    

    const data = await res.json()
    const users = data.users 
    console.log(users)

    users.map(user => {
        html += `
        <li><a href="#" class=${user?.isAssigned?'asigned':'user'} name=${user.userName} id=${user.id} >${user.userName}</a></li>
        `
    })

    return html
    
} catch (error) {

    console.log(error)
    alerts.innerHTML = `
    <div class="alerts">${error.message}</div>
    `
    setTimeout(()=>{
        alerts.innerHTML =''
    },3000)
    
}
}



projectContainer.addEventListener('click', async(e)=>{

    if(e.target.classList.contains('user')){

        //create an alert that takes in a date 
        const date = prompt('Enter a date for the user to complete the project')

        const assignDetails = {
            user_id: e.target.id,
            deadline:date
        }

    
        try {
            const res = await fetch(`http://localhost:5000/api/v1/projects/assign/${projectId}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
    
    
                },
                body: JSON.stringify(assignDetails)
    
            })
            const data = await res.json()
    
            console.log(data)
    
            alerts.innerHTML = `
            <div class="alerts">${data.msg} . An email has been sent to ${e.target.name} </div>
            `
            setTimeout(()=>{
                alerts.innerHTML =''
                 window.location.href = '../../admin-dashboard/index.html'
            },3000)
            
        } catch (error) {

              
            alerts.innerHTML = `
            <div class="alerts">${error.message}</div>
            `
            setTimeout(()=>{
                alerts.innerHTML =''
            },3000)
            
        }

 
    }

})