// Criar uma lista vazia de usuários
var userList = [];
var count = 1;

// Função para adicionar um novo usuário
function addUser(name, email) {
    var newUser = { id: count++, name: name, email: email, date: new Date().toLocaleString() };
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));
    renderUserList();
}

// Função para excluir um usuário
function deleteUser(userId) {
    var updatedUserList = userList.filter(user => user.id !== userId);
    if (updatedUserList.length < userList.length) {
        userList = updatedUserList;
        localStorage.setItem("userList", JSON.stringify(userList));
        renderUserList();
    } else {
        alert("Usuário não encontrado.");
    }
}
document.getElementById("btnExcluirTodos").addEventListener("click", excluirTodosUsuarios);


function excluirTodosUsuarios() {
    // Remover os usuários do Local Storage
    localStorage.removeItem("usuarios");

    // Atualizar a interface removendo todos os elementos da lista
    const listaUsuarios = document.getElementById("listaUsuarios"); 
    if (listaUsuarios) {
        listaUsuarios.innerHTML = ""; // Remove todos os itens da lista
    }

    alert("Todos os usuários foram excluídos!");
}

// Função para recuperar a lista de usuários do localStorage
function getUserList() {
    var storedList = JSON.parse(localStorage.getItem("userList"));
    userList = storedList || [];
}

// Função para renderizar a lista de usuários no HTML
function renderUserList(filteredList = null) {
    var userListElement = document.getElementById("listaUsuarios");
    userListElement.innerHTML = "";

    const listToRender = filteredList || userList;
    
    listToRender.forEach(user => {
        var listItem = document.createElement("li");
        listItem.innerHTML = `
            ${user.date} - <span class="user-name">${user.name}</span> (${user.email})
            <button class="delete-button" onclick="deleteUser(${user.id})">Excluir</button>
        `;
        userListElement.appendChild(listItem);
    });
}

// Função para limpar todos os usuários da lista
function limparLista() {
    localStorage.removeItem("userList");
    userList = [];
    renderUserList();
}

// Função para filtrar a lista de usuários
function filtrarLista() {
    var searchInput = document.getElementById("searchInput").value.toLowerCase();
    var filteredList = userList.filter(user => 
        user.name.toLowerCase().includes(searchInput) || 
        user.email.toLowerCase().includes(searchInput)
    );
    renderUserList(filteredList);
}

// Recuperar a lista de usuários do localStorage ao carregar a página
getUserList();
renderUserList();

// Event listener para o formulário de cadastro de usuários
document.querySelector(".CadAdmin").addEventListener("submit", function (event) {
    event.preventDefault();
    var nameInput = document.getElementById("cadNome");
    var emailInput = document.getElementById("cadEmail");

    if (nameInput.value.trim() === "" || emailInput.value.trim() === "") {
        alert("Preencha todos os campos!");
        return;
    }

    addUser(nameInput.value, emailInput.value);
    nameInput.value = "";
    emailInput.value = "";
});

function filtrarPosts() {
    var searchInput = document.getElementById("barraPesq").value.toLowerCase();
    var posts = document.querySelectorAll(".blog-post-item");

    posts.forEach(post => {
        var title = post.querySelector(".titlePost").innerText.toLowerCase();
        var content = post.querySelector(".ConteudoPost").innerText.toLowerCase();

        if (title.includes(searchInput) || content.includes(searchInput)) {
            post.style.display = "block"; // Exibe o post
        } else {
            post.style.display = "none"; // Esconde o post
        }
    });
}