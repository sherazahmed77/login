const mangose=require('mangose');
const connect=mongose.connect("momgodb://localhost:28018/Login");


connect.then(()=>{
    console.log("Database Connected Successfully!");
})
.catch(()=>{
    console.log("Database Cannot be Connected");
});

const LoginSchema=new mongose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
const collection=new mongose.model("users", LoginSchema);
module.exports=collection;
