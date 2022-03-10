const bcrypt = require("bcrypt");

bcrypt.hashSync('password', 10) //synchronous call

bcrypt.hashSync('password',10,(err,hash)=>{ //asynchronous call
    console.log(`hashAsync: ${hash}`)
})




// bcrypt.genSalt((err, salt)=>{ //10 is the default | generates salt for us using bcrypt
//     console.log(salt)

//     bcrypt.hash('password')
// })