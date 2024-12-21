let usersContainer = document.querySelector(".users");
let searchButton = document.getElementById("btn_search");

function createUser(user){
    return `
            <div class="user">
                    <div class="box-info">
                        <h1>الاسم الكامل:</h1>
                        <h1>${user.name}</h1>
                    </div>
                    <div class="box-info">
                        <h1>اسم المستخدم:</h1>
                        <h1>${user.username}</h1>
                    </div>
                    <div class="box-info">
                        <h1>البريد الإكتروني:</h1>
                        <h1>${user.email}</h1>
                    </div>
                    <div class="box-info">
                        <h1>رقم الهاتف:</h1>
                        <h1>${user.phone}</h1>
                    </div>
                    <div class="box-info">
                        <h1 style="margin-top: 20px;">العنوان</h1>
                        <h1></h1>
                    </div>
                    <div class="box-info">
                        <h1>المدينة:</h1>
                        <h1>${user.address.city}</h1>
                    </div>
                    <div class="box-info">
                        <h1>الشارع:</h1>
                        <h1>${user.address.street}</h1>
                    </div>
            </div>
        `;
}

function getAllUsers(){
    fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => {
        if(!response.ok){
            throw new Error(`Error: ${response.status}`)
        }
        return response.json();
    })
    .then((users) => {
        console.log(users[0])
        let content = "";
        users.forEach(user => {
            content += createUser(user);
        })
        usersContainer.innerHTML = content
    })
    .catch((error) => {
        console.log(error);
        usersContainer.innerHTML = `<p style="color: red">حدثت مشكلة اثناء تحميل البيانات</p>`
    })
}

searchButton.addEventListener("click", function(e){
    e.preventDefault()
    let username = document.getElementById("username_input").value;
    if(username.length == 0) getAllUsers();
    
    fetch(`https://jsonplaceholder.typicode.com/users?username=${username}`)
    .then(response => {
        if(!response.ok){
            throw new Error(`Error: ${response.status}`);
        }
        return response.json();
    })
    .then(user => {
        let userCard  =  createUser(user[0]);
        usersContainer.innerHTML = userCard;
    })
    .catch(error => {
        console.log(error)
        usersContainer.innerHTML = `<p style="color: red">لا يوجد مستخدم بهذا الاسم </p>`;
    })
})

getAllUsers()