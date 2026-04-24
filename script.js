const form = document.getElementById("form")
const usernameEl = document.getElementById("username-input")
const avatar = document.getElementById("avatar")
const username = document.getElementById("username")
const follower = document.getElementById("follower")
const following = document.getElementById("following")
const repos = document.getElementById("repos")
const link = document.getElementById("link")
const card = document.getElementById("profile-card")
const message = document.getElementById("error-message")


form.addEventListener("submit",async (event)=>{
    event.preventDefault()
    myusername = usernameEl.value.trim()
    showstatus("loading")
    try{
        const data = await fetchapi(myusername)
        renderdata(data)
    }catch{
        showstatus("error")
    }
})

function fetchapi(username){
    const url = `https://api.github.com/users/${username}`
    return fetch(url).then((result)=>{
        if(!result.ok){
            throw new Error("Username Not Found")
        }
        else return result.json()
    }).then((data)=>{
        return data
    }).catch((error)=>{
        console.log(error.message)
    })
}


function showstatus(status){
    switch (status){
        case "loading":
            message.classList.remove("not-show")
            card.classList.add("not-show")
            message.textContent = "Loading ..."
            break
        case "error":
            message.classList.remove("not-show")
            card.classList.add("not-show")
            message.textContent = "Username Not Found"
            break  
    }
}

function renderdata(data){
    message.classList.add("not-show")
    card.classList.remove("not-show")
    avatar.src = data.avatar_url
    username.textContent = data.login
    follower.textContent = data.followers
    following.textContent = data.following
    repos.textContent = data.public_repos
    link.href = data.html_url
}
