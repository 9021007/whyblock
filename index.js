const express = require('express')
const app = express()
const fs = require('node:fs');
const port = 3000
const url = "https://discord.com/api/v9/users/@me/relationships"
const fetch = require('node-fetch')
// const token = ""

const token = JSON.parse(fs.readFileSync('config.json'))['token']

const headers = {
    "authorization": token
}

var blocked = []

app.get('/blocked', (req, res) => {
    res.send(blocked)
})

// publish all in app folder
app.use(express.static('app'))

app.listen(port, () => {
  console.log(`Now serving at http://localhost:${port}`)
})

function refresh() {
    console.log('Upadting blocked user list')

    blocked = []

    fetch(url, {headers})
    .then(res => res.json())
    .then(json => {
        json.forEach(user => {
            if (user.type == 2) {
                blocked.push(user)
            }
        })
    }).then(() => {
        console.log('Blocked user list updated')
        // console.log(blocked)
        // for (var i = 0; i < blocked.length; i++) {
        //     console.log(blocked[i]['id'])
        // }
    }).catch(err => {
        console.log(err)
    })
}

// setinterval
const interval = setInterval(() => {
    refresh()

    }, 300000)

refresh()