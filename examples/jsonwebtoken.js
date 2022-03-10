const jwt = require("jsonwebtoken");

const payload = {
    name: "Brooke",
    hapi: "joi"
} //creates new payload

const secretkey = "mylittlesecret" //secretkey kind of like secret password to generate your tokens and verify

// jwt.sign(payload, secretkey, (err, token)=>{
//     console.log(token)
// }) //generate token

const tokenToCheck = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQnJvb2tlIiwiaGFwaSI6ImpvaSIsImlhdCI6MTYzNDgzNzYwMH0.yUdkyOofzQqiPj2YomuZRcc5wteTv2YGheRCjfc3PXc"

jwt.verify(tokenToCheck, secretkey,(err, payload)=>{
    if(err){
        console.log(err.message)

    }
    console.log(payload)
}); //checks whether or not token is valid


//console.log(token)