const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const userId1 = urlParams.get('id');
const projectContainer = document.querySelector('.projectContainer')
const checkbox1 = document.querySelector('#checkbox1')
const checkbox2 = document.querySelector('#checkbox2')
const checkbox3 = document.querySelector('#checkbox3')
const about = document.querySelector('.About')
const alerts= document.querySelector('.alertContainer')
const profileImg = document.querySelector('.profileImg')
const editProfile = document.querySelector('#editProfile')
const modalContainer = document.querySelector('#modalContainer')
const updateUser = document.querySelector('#updateUser')
const completeBtn = document.querySelector('#completeBtn')
const tasks = document.querySelector('.tasks')
const profileName = document.querySelector('.profileName')

let project =''
let postImages =[]
let projectId1 = ''

window.onload = async () => {
    await fetchAssignedProject();
    await getLoggedInUser()
    await fetchProfileImages()
}

// fetching random images from pixabay api
// Pixabay API Key
const API_KEY = '38362795-da8f36ddaa2f912e2f41af4b4';
const COUNT = 10; // Number of Images
const API_ENDPOINT = `https://pixabay.com/api/?key=${API_KEY}&q=nature&per_page=${COUNT}&safesearch=true`;




    function getRandomNumber(min, max) {
        // Generate a random number between 0 (inclusive) and 1 (exclusive)
        const randomValue = Math.random();
      
        // Scale the random value to the desired range [min, max]
        return Math.floor(randomValue * (max - min + 1)) + min;
      }

      const random = getRandomNumber(0, 10);

    //   console.log(postImages.length)


      const fetchProfileImages = async ()=>{

        try {

            const res = await fetch(API_ENDPOINT)
            const data = await res.json()

             // Iterating over 'hits' (each 'hit' is an image)
        data.hits.forEach(hit => {
            // Add the image URL to array
            postImages.push(hit.previewURL);
        });

            console.log(postImages[random])
        profileImg.innerHTML = `  
        <img src=${'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'} alt="" class="profilePic">
        `        
        } catch (error) {

            console.log(error)

            
        }

      }





const getLoggedInUser = async () => {
    // getuser by id
    
    const res = await fetch(`http://localhost:5000/api/v1/users/${userId1}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'accept': 'application/json',
        }

    })


    const data = await res.json()
    const user = data?.user[0];
    about.innerHTML =  user.about ===null ? `
    I am ${user?.userName}, and I'm ready to tackle this project head-on! With my skills, dedication, and enthusiasm, I'm confident that I can contribute to the project's success. Let's work together to achieve our goals and deliver outstanding results.

    Here's to a productive and successful project journey!
    
    Best regards,
    ${user?.userName}  
    `: user.about;
    profileName.innerHTML = user?.userName
    console.log(user?.userName)

    return user ;
}


let html =``

const fetchAssignedProject = async () => {
const res = await fetch(`http://localhost:5000/api/v1/users/getProjectAssigned/${userId1}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
})
const data = await res.json();

 project = await data?.project;
 
 projectId1 = project?.id;
 
 console.log(projectId1)

if(project){
    
    html = `
    <div class="project">
    <h5 class="name">${project.project_name}</h5>
    <p class="desc">${project.project_description}</p>
    <p class="deadline">Deadline : ${project.deadline}</p>
    </div>
    `
    projectContainer.innerHTML = html;


}
else{

    html = `
    <h5 class="name">Currently, you have no project assigned.</h5>
    `
    projectContainer.innerHTML = html;
}
}

// Making sure that all the three tasked are checked meaning completed for the completeBtn to be clickable


let completedTasks = 0

if(project){



checkbox1?.addEventListener('click', () => {
    if(checkbox1.checked){
        completedTasks++
    }else{
        completedTasks--
    }
    if(completedTasks === 3 && !project.completed){
        completeBtn.classList.remove('btn-disabled')
        completeBtn.classList.add('btn-primary')
    }
    else{
        completeBtn.classList.remove('btn-primary')
        completeBtn.classList.add('btn-disabled')
    }
})

checkbox2?.addEventListener('click', () => {
    if(checkbox2.checked){
        completedTasks++
    }else{
        completedTasks--
    }
    if(completedTasks === 3 && !project.completed){
        completeBtn.classList.remove('btn-disabled')
        completeBtn.classList.add('btn-primary')
    }
    else{
        completeBtn.classList.remove('btn-primary')
        completeBtn.classList.add('btn-disabled')
    }
})

checkbox3?.addEventListener('click', () => {
    if(checkbox3.checked){
        completedTasks++
    }else{
        completedTasks--
    }
    if(completedTasks === 3 && !project.completed ){
        completeBtn.classList.remove('btn-disabled')
        completeBtn.classList.add('btn-primary')
    }else{
        completeBtn.classList.remove('btn-primary')
        completeBtn.classList.add('btn-disabled')
    }
})

}else{
    completeBtn.classList.remove('btn-primary')
    completeBtn.classList.add('btn-disabled')
}

// Completeing a project 

completeBtn.addEventListener('click',async()=>{

    const updateDetails = {
        project_Id:projectId1
    }

    try {
        const res = await fetch(`http://localhost:5000/api/v1/users/completeProject/${userId1}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'accept':'application/json',
            },
            body:JSON.stringify(updateDetails)
        })

        const data =await res.json();
        console.log(data)

        alerts.innerHTML = `
        <div class="alerts">${data?.message}, email sent to Admin</div>
        
        `
        
    } catch (error) {
        console.log(error)
        
    }

})


// displaying the modal 

const username = document.querySelector('#userName')
const email = document.querySelector('#email')
const aboutUser = document.querySelector('#about')

editProfile.addEventListener('click',async()=>{
    console.log('clicked')
    modalContainer.classList.remove('hide')
    modalContainer.classList.add('show')
    const user = await  getLoggedInUser()
    username.value = user?.userName
    email.value = user?.email
    about.value = user?.about
})

updateUser.addEventListener('click',async(e)=>{
e.preventDefault()

try {

    const res = await fetch(`http://localhost:5000/api/v1/users/update/${userId1}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
            'accept':'application/json',
        },
        body:JSON.stringify({
            userName:username.value,
            email:email.value,
            about:aboutUser.value,
        })
    })

    await getLoggedInUser()

    const data = await res.json()

    console.log(data)

    setTimeout(()=>{
        modalContainer.classList.remove('show')
        modalContainer.classList.add('hide')
    })
    
} catch (error) {

    console.log(error)

    
}

})






