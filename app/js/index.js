// fetch from url, then use results to update blocked list

// example of blocked list item
{/* <div id="userbox">
            <div id="avatararea">
                <img src="https://cdn.discordapp.com/avatars/159985870458322944/b50adff099924dd5e6b72d13f77eb9d7.webp" alt="avatar">
            </div>
            <div id="userinfo">
                <div id="username"><h3>MEE6</h3></div>
                <div id="userdesc">User ID - 159985870458322944</div>
            </div>
        </div> */}

const url = "http://localhost:3000/blocked"

var users = []

fetch(url)
.then(res => res.json())
.then(json => {
    users = json
    console.log(users)
    for (var i = 0; i < users.length; i++) {
        console.log(users[i]['id'])
    }
}).then(() => {
    // append users to blocked list on webpage

    for (var i = 0; i < users.length; i++) {
        var userbox = document.createElement('div')
        userbox.setAttribute('id', 'userbox')

        var avatararea = document.createElement('div')
        avatararea.setAttribute('id', 'avatararea')

        var avatar = document.createElement('img')
        avatar.setAttribute('src', `https://cdn.discordapp.com/avatars/${users[i]['id']}/${users[i]['user']['avatar']}.webp`)
        avatar.setAttribute('alt', 'avatar')

        var userinfo = document.createElement('div')
        userinfo.setAttribute('id', 'userinfo')

        var username = document.createElement('div')
        username.setAttribute('id', 'username')

        var usernameh3 = document.createElement('h3')
        usernameh3.innerHTML = users[i]['user']['username']

        var userdesc = document.createElement('div')
        userdesc.setAttribute('id', 'userdesc')
        userdesc.innerHTML = `User ID - ${users[i]['id']}`

        if (users[i]['user']['bot'] == true) {
            userdesc.innerHTML += ' (Bot)'
        }

        username.appendChild(usernameh3)
        avatararea.appendChild(avatar)
        userinfo.appendChild(username)
        userinfo.appendChild(userdesc)
        userbox.appendChild(avatararea)
        userbox.appendChild(userinfo)

        document.getElementById('userlist').appendChild(userbox)
    }
}
).catch(err => {
    console.log(err)
})