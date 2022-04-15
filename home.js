const homePage = `<h1>BOARDS API</h1>
<h3>USERS</h3>
<ul>
    <li>GET /api/users
        <ul>
            <li><a target="_blank" href="https://safe-forest-85043.herokuapp.com/api/users">/api/users</a></li>
        </ul>
    </li>
    <li>GET /api/users/:id
        <ul>
            <li><a target="_blank" href="https://safe-forest-85043.herokuapp.com/api/users/2">/api/users/2</a></li>
        </ul>
    </li>
    <li>POST /api/users   body:{username:"",email:"",password:""}</li>
    <li>PUT /api/users/:id  body:{username:"",email:"",password:""}</li>
    <li>DELETE /api/users/:id</li>
</ul>
<h3>BOARDS</h3>
<ul>
    <li>GET /api/boards
        <ul>
            <li><a target="_blank" href="https://safe-forest-85043.herokuapp.com/api/boards">/api/boards</a></li>
        </ul>
    </li>
    <li>GET /api/boards/:id
        <ul>
            <li><a target="_blank" href="https://safe-forest-85043.herokuapp.com/api/boards/2">/api/boards/2</a></li>
        </ul>
    </li>
    <li>POST /api/boards   body:{boardId:"",titulo:"",content:""}</li>
    <li>PUT /api/boards/:id  body:{boardId:"",titulo:"",content:""}</li>
    <li>DELETE /api/boards/:id</li>
</ul>
`

module.exports = homePage