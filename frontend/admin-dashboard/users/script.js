window.onload = (async()=>[
    await
     fetchUsers()
])


const tableBody = document.querySelector('#tableBody')
const fetchUsers = async ()=>{
    let tableRow = ``;
    const res = await fetch('http://localhost:5000/api/v1/users',{
        method:"GET",
        headers: {
            contentType:"application/json",
            'accept':'application/json'

        }
    })

    const data = await res.json()

    const users = data?.users

    users.map((user) => {

        tableRow += `
    <tr id=${user.id}>
    <td>${user.userName}</td>
    <td>${user.email}</td>
    <td>${user.isAssigned}</td>
    <div class="actions">
    <td><button class="btn-delete ${user.completed}">Delete</button></td>
    </div>
    </tr>
    `;
    // <td><button class="btn-update ${user.isAssigned}" ${user.isAssigned&&"disabled"}  >Update</button></td>
    tableBody.innerHTML = tableRow;

    })
}


// using event delegation be able to delete a user from the table 

tableBody.addEventListener('click', async (e)=>{    

if(e.target.classList.contains('btn-delete')){
    const id = e.target.parentElement.parentElement.id

    console.log(id)
    const res = await fetch(`http://localhost:5000/api/v1/users/delete/${id}`,{
        method:"DELETE",
        headers: {
            contentType:"application/json",
            'accept':'application/json'
        }
    })
    const data = await res.json()
    console.log(data)
    fetchUsers()
}

})
