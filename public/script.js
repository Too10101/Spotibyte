const $songsContainer = document.querySelector("section#songs")
const $usersContainer = document.querySelector("section#userSelection")
const $likedSongs = document.querySelector("section#likedSongs ul")
let songs = []
let users = []
let inLikedSongs = []

loadSongs()

function loadSongs() {
    fetch("/songs")
        .then( response => response.json() )
        .then( response => {
        console.log(response)
            createSongCards(response) 
        })
        .catch(err => console.error(err))
}

function loadUsers() {
    fetch("/users")
        .then( response => response.json() )
        .then( response => {
        console.log(response)
            createUserCards(response) 
        })
        .catch(err => console.error(err))
}

function createSongCards(_songs) {
    songs = _songs
    const songsHTML = _songs.map(song => 
        `<div class="song">
            <h4>${song.name}</h4>  
            <h5>by: ${song.artist}</h5>
            <button onClick="addToLikedSongs(${song.songID}, event)">Like</button>
        </div>`
    ).join('')
    $songsContainer.innerHTML = songsHTML    
}

function addUser(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[0]
    const order = {
        user: {
            username: $form.username.value,
            email: $form.email.value,
            password: $form.password.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/addUser",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))

}

function addNewSong(event) {
    event.preventDefault()
    //create order object
    const $form = document.forms[2]
    const order = {
        newSong: {
            name: $form.name.value,
            artistName: $form.artistName.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/addSong",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))
}

function login(event) {
     event.preventDefault()
    //create order object
    const $form = document.forms[1]
    const order = {
        user: {
            username: $form.usernameLogin.value,
            password: $form.passwordLogin.value
        }
    }
    //POST on /login
    const config = {
        method: "POST",
        body: JSON.stringify( order ),
        headers: {
            "Content-Type":"application/json"
        }
    }
    fetch("/login",config)
        .then( response => response.json() )
        .then( response => console.log(response) )
        .catch(err => console.error(err))
}


function addToLikedSongs(id, event) {
    const song = songs.find(song => song.songID == id)

    const $newSong = document.createElement("li")
    $newSong.innerHTML = 
        `${song.name}`
    $likedSongs.append($newSong)
    inLikedSongs.push(song)
  //  document.querySelector("span#songCount").innerHTML = //inLikedSongs.length
}