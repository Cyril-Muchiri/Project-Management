
// const checkInputs = () => {
//     const project_NameValue = project_name.value.trim();
//     const project_DescriptionValue = project_description.value.trim();
//         if(project_DescriptionValue.length == 0 || project_NameValue.length ==0) {
//              alerts.innerHTML = "Please fill in all fields"
//         }else{
//             project = {
//                 project_name: project_name.value,
//                 project_description: project_description.value,
    
//             }
//         
//     }
// }

const createProjectForm = document.querySelector('.form')
const alerts = document.querySelector('.alertContainer')
const addProject = document.querySelector('#addProject')
const incomplete = document.querySelector('#incompleted')
const complete = document.querySelector('#completed')
const allUsers = document.querySelector('#allUsers')


const project_name = document.querySelector('#project_name')
const project_description = document.querySelector('#project_description')
const projectList = document.querySelector('.projectList')


window.onload = async() => {
project_name.value = ''
project_description.value = ''
await fetchProjects()
}

//ADD A PROJECT

addProject.addEventListener('click',async(e)=>{
e.preventDefault()


let project = {
    project_name: project_name.value,
    project_description: project_description.value,
}

    if(addProject.textContent =='Add Project'){

        try {
            
                    const res = await fetch('http://localhost:5000/api/v1/projects/create',{
                         method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(project)   
                    
                    })
                    const data = await res.json()
                    alerts.innerHTML = `
                    <div class="alerts">${data?.msg}</div>
                    `
                    setTimeout(()=>{
                        alerts.innerHTML =''
                    },3000)                    // console.log(data)
                
                    project_name.value = ''
                    project_description.value = ''
                    await fetchProjects()
            
        } catch (error) {

            console.log(error)
            alerts.innerHTML = `
            <div class="alerts">${error.message}</div>
            `
            setTimeout(()=>{
                alerts.innerHTML =''
            },3000)}
    }
    if(addProject.textContent == 'Update Project'){
        
     try {

        const id = createProjectForm.id;
        console.log(id)
       const res =  await fetch(`http://localhost:5000/api/v1/projects/update/${id}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })

        const data = await res.json()

        alerts.innerHTML = `
        <div class="alerts">${data?.msg}</div>
        `
        setTimeout(()=>{
            alerts.innerHTML =''
        },3000)
        


        await fetchProjects()
        project_name.value = ''
        project_description.value = ''
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


})



//GET ALL PROJECTS
const fetchProjects = async (state=null) => {

    try {

    const  res = await fetch('http://localhost:5000/api/v1/projects',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    const data = await res.json()

    if (state==null){

    

    const projects = await data.projects
    // filter project



    let html = ``

    projects.map((project)=>{
        html += `
        <div class=${project.isAssigned ? "asigned" : "projectContainer" } id=${project.id}>
        <h3>${project.project_name}</h3>
        <p>${project.project_description}</p>
        <p>${project.created_at}</p>
        <div class="actions">
        <button class="action-btn-update">Update</button>
        <button class="action-btn"  >Assign</button>
        <button class="action-btn-delete">Delete</button>
        </div> 
        </div>
        `
    })
    projectList.innerHTML = html

}
if (state == false){

     

    const projects = await data.projects


    // filter project

    const incompleteProjects = projects.filter((project)=>{
        return project.completed === state
    })

    console.log(incompleteProjects)



    let html = ``

    incompleteProjects.map((project)=>{
        html += `
        <div class=${project.isAssigned ? "asigned" : "projectContainer" } id=${project.id}>
        <h3>${project.project_name}</h3>
        <p>${project.project_description}</p>
        <p>${project.created_at}</p>
        <div class="actions">
        <button class="action-btn-update">Update</button>
        <button class="action-btn"  >Assign</button>
        <button class="action-btn-delete">Delete</button>
        </div> 
        </div>
        `
    })
    projectList.innerHTML = html

}
if(state==true){

        

    const projects = await data.projects


    // filter project

    const completeProjects = projects.filter((project)=>{
        return project.completed === state
    })
    console.log(completeProjects)



    let html = ``

    completeProjects.map((project)=>{
        html += `
        <div class=${project.isAssigned ? "asigned" : "projectContainer" } id=${project.id}>
        <h3>${project.project_name}</h3>
        <p>${project.project_description}</p>
        <p>${project.created_at}</p>
        <div class="actions">
        <button class="action-btn-update">Update</button>
        <button class="action-btn"  >Assign</button>
        <button class="action-btn-delete">Delete</button>
        </div> 
        </div>
        `
    })
    projectList.innerHTML = html

}



    } catch (error) {
        
    }

}

//UPDATE A PROJECT

//I will use the technique of event delegation to update a project

projectList.addEventListener('click', async(e)=>{
    e.preventDefault()
    if(e.target.classList.contains('action-btn-update')){

        const id = e.target.parentElement.parentElement.id
        const res=  await fetch(`http://localhost:5000/api/v1/projects/get/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
            
        }) 

        const projectToBeUpdated = await res.json()

        project_name.value = projectToBeUpdated.project.project_name
        project_description.value = projectToBeUpdated.project.project_description
        addProject.textContent = 'Update Project'
        createProjectForm.setAttribute('id',id)
    }

    if(e.target.classList.contains('action-btn-delete')){

        const id = e.target.parentElement.parentElement.id
        const res = await fetch(`http://localhost:5000/api/v1/projects/delete/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json()
        alerts.innerHTML = `
        <div class="alerts">${data.msg}</div>
        `
        setTimeout(()=>{
            alerts.innerHTML =''
        },3000)
        await fetchProjects()
    }
    if(e.target.classList.contains('action-btn')){
        const id = e.target.parentElement.parentElement.id
        window.location.href = `../admin-dashboard/assign/index.html?id=${id}`
    }

})

complete.addEventListener('click',()=>{

    fetchProjects(true)

})

incomplete.addEventListener('click',()=>{
    fetchProjects(false)
})

allUsers.addEventListener('click',()=>{
    window.location.href = '../admin-dashboard/users/index.html';
})






