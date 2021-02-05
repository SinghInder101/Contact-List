const express = require('express');
const path = require('path');
const port = 8000;
const db= require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();
//Setting UP TEMPLATE ENGINE
app.set('view engine','ejs');//This sets the view engine to ejs
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//This is MIDDLEWARE.It reads the data from the form and puts it into req.body
app.use(express.static('assets'));
//middleware1
// app.use(function(req,res,next){
//     req.myName="Arpan";

//     //console.log('middleware 1 called');
//     next();

// });
// //middlerware2
// app.use(function(req,res,next){
//     console.log('My Name from MW2',req.myName);
//     console.log('middleware 2 called');
//     next();
// });
var contactList =[
    {
        name:"Arpan",
        phone:"1111111111"
    },
    {
        name: "Tony Stark",
        phone: "1234567890"
    },
    {
        name:"Steve",
        phone: "22222323323"
    }
]
app.get('/',function(req,res){
   
    
    return res.render('practice',{
        title:"My contacts list",
        contact_list:contactList
});
});

app.post('/create-contact',function(req,res){
    contactList.push({
        name: req.body.name,
        phone: req.body.phone

    });
    //we can also do contactList.push(req.body); because body is exactly name and phone.
    
    return res.redirect('/');// We can also do res.render('back') if the URL is long.
});
app.get('/delete-contact/:phone',function(req,res){
    console.log(req.params);
    let phone = req.params.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);
    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }
    return res.redirect('back');

    

});
app.listen(port,function(err){
    if(err){
        console.log("error in running the server");
    }
    console.log("Express server is running");
});
