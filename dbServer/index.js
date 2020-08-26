
let express = require('express');
const jwt = require('jsonwebtoken')
let bp = require('body-parser');
let cors = require('cors');
let fs = require('fs');
const contactDataFile = "contact.json";
const loginDataFile = "login.json";
const flightDataFile = "search.json";
const bookDataFile = "info.json";
const port = 5454;
let search;
let usernamtest = '';
let glblusername;
let pnr

fs.readFile(contactDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        libConactData = JSON.parse(data);
    }
});

fs.readFile(flightDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        flightData = JSON.parse(data);
    }
}); 

fs.readFile(bookDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        bookData = JSON.parse(data);
    }
}); 

fs.readFile(loginDataFile, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        loginData = JSON.parse(data);
    }
});

const saveContactDataAndRespond = (resp) => {
    fs.writeFile(contactDataFile, JSON.stringify(libConactData), (err) => {
        if (err) {
            console.log(err);
            resp.status(500);
            resp.end();

        } else {
            resp.status(200);
            resp.end();

        }
    })
}

const saveBookDataAndRespond = (resp) => {
    fs.writeFile(bookDataFile, JSON.stringify(bookData), (err) => {
        if (err) {
            console.log(err);
            resp.status(500);
            resp.end();

        } else {
            resp.send({pnr});
            resp.status(200);
            resp.end();

        }
    })
}



const parseReqToContact = (req) => (
    {
        cid: req.body.cid,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        mail: req.body.mail,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        group: req.body.group
    }    
);

const parseReqToSearch = (req) => ({
        /* flightNo: req.body.flightNo,
         origin: req.body.origin,
         destination: req.body.destination,
         departureTerminal: req.body.departureTerminal,
         arrivalTerminal: req.body.arrivalTerminal,
         departureDate: req.body.departureDate,
         arrivalDate: req.body.arrivalDate,
         flightDistance: req.body.flightDistance,
         flightDuration: req.body.flightDuration,
         amount: req.body.amount,
         passengerType: req.body.passengerType,
         passengerNo: req.body.passengerNo */


        departuredate: req.body.departuredate,
        departurecity: req.body.departurecity,
        arrivalcity: req.body.arrivalcity,
        noofPassengers: req.body.noofPassengers,
        id: req.body.id,
       // totalAmount: req.body.totalAmount

       
    }
); 


const parseReqToBook = (req) => (
    {
       /* id: req.body.id,
        flightnumber: req.body.flightnumber,
        userEmail: req.body.userEmail,
        userMobile: req.body.userMobile,
        userAddress: req.body.userAddress,
        userTitle: req.body.userTitle,
        userName: req.body.userName,
        pnrNumber: req.body.pnrNumber*/

        passengerusername:glblusername,
        passengerpnr:pnr,
        passengerflightnumber:req.body.flightnumber,
        passengername: req.body.fullname,
        passengeremail: req.body.emailid,
        passengercity: req.body.phonenumber,
        passengerstate: req.body.city,
        passengercountry: req.body.state,
        passengernoofPassengers: req.body.noofPassengers,
        passengerdeparturecity: req.body.departurecity,
        passengerarrivalcity: req.body.arrivalcity,
        passengeramount: req.body.totalAmount*req.body.noofPassengers,
        passengerdeparturedate: req.body.departuredate

    }    
);

const parseReqToLogin = (req) => (

    {
        usernamtest: req.body.username,
        passwordtest: req.body.pass
    }    
);

let libServer = express();

libServer.use(bp.json());
libServer.use(bp.urlencoded({ extended: true }));
libServer.use(cors());

//default request
libServer.get('/', (req, resp) => {
    resp.send("Welcome to Lib Server");
});

libServer.get('/contacts', (req, resp) => {
    resp.send(libConactData.contacts);
});


libServer.get('/dashboard-page', (req, resp) => {
    resp.send(flightData);
});



libServer.get('/login', (req, resp) => {
    resp.send(loginData);
    
});
/*********************New Add *****************/
libServer.get('/book-page', (req, resp) => {
    const bookingresults = bookData.filter(x=>x.passengerusername == glblusername);
    console.log("Booking Data->" +bookingresults);
    resp.send(bookingresults);
});

libServer.get('/contacts/:id', (req, resp) => {
    let contact = libConactData.contacts.find(b => b.cid == req.params.id);
    if (contact) {
        resp.send(contact);
    } else {
        resp.status(404);
        resp.end();
    }

});


libServer.get('/dashboard-page/:id', (req, resp) => {
    //let priceDetails = flightData.find(b => b.id == req.params.id);
    let priceDetails = flightData.filter(b => b.id == req.params.id);
    console.log("Testing purpose" + priceDetails.totalAmount);
    console.log("Fare Checking" + priceDetails.baseFare);
    if (priceDetails) {
        resp.send(priceDetails);
    } else {
        resp.status(404);
        resp.end();
    }

}); 



libServer.post('/contacts', (req, resp) => {

    let contact = parseReqToContact(req);
    libConactData.contacts.push(contact);
    saveContactDataAndRespond(resp);

});

libServer.post('/book-page', (req, resp) => {

    pnr="PNR"+Math.floor((Math.random() * 10000000000) + 1);
    let userDetails = parseReqToBook(req);
    console.log("user info" + userDetails.emailid);
    bookData.push(userDetails);
    //console.log(bookData.push(userDetails));
    saveBookDataAndRespond(resp);

});

 libServer.post('/dashboard-page', (req, resp) => {
    let search = parseReqToSearch(req);
    console.log(search.departurecity);
    console.log(search.departuredate);
   // console.log(flightData.filter());


   const result = flightData.filter(x=>x.departurecity == search.departurecity && 
    x.departuredate == search.departuredate && x.arrivalcity == search.arrivalcity &&
    x.noofPassengers>= search.noofPassengers);
    console.log("Response")
    console.log(result);
    /*const sortByFare = result.sort(function(a,b){
          return a.totalAmount - b.totalAmount
    })
    console.log(sortByFare);*/
resp.send(result);
if(flightData.filter(x=>x.departurecity == search.departurecity && 
x.departuredate == search.departuredate && x.arrivalcity == search.arrivalcity/*&&
x.noofPassengers >= search.noofPassengers*/).length>0)
{

   console.log("Flight Data Returning!!!");
   //resp.send({"isValid":"True"});
   //resp.send(flightData);
   resp.status(200);
   resp.end();
}
else{
    console.log("Flight details are not available!!!");
    resp.send({"isValid":"False"});
    resp.status(500);
    resp.end();
}


    
  /* if(flightData.filter(y=>y.origin == flight.origin).length>0)
{

    console.log("Flight is Available!!!");
    resp.send({"isValid":"True"});
    resp.status(200);
    resp.end();
} 
else{
    console.log("Flight is not Available!!!");
    resp.send({"isValid":"False"});
    resp.status(500);
    resp.end();
}*/

}); 

libServer.post('/login', (req, resp) => {

    let login = parseReqToLogin(req);
    /*login.username = 'abhau003'
    login.password = 'arun123'*/
   // saveContactDataAndRespond(resp);
   glblusername = login.usernamtest
    console.log("Hi"+glblusername)
    console.log(login);
    //console.log(req.body.username)
    console.log("Souvik" + login.passwordtest)
    //console.log('Arindam'+JSON.stringify(loginData));

//    loginData.forEach(element => {
//     //    console.log("AAAA" +element.username)
//     //    console.log("BBBB" +login.usernamtest)
//     //    console.log(typeof element.username)
//     //    console.log(typeof login.usernamtest)
//       if(element.username==login.usernamtest && element.pass == login.passwordtest)
//        {
//           console.log("Good")
//           console.log("User is Valid!!!");
//           resp.send({"isValid":"True"});
//           resp.status(200);
//       }
//       else{
//           console.log("User is not Valid!!!");
//           resp.send({"isValid":"False"});
//           resp.status(500);
          
//       }
//       resp.end();
//     })
//   });
   
   console.log("testing" + login.passwordtest) ;
   if(loginData.filter(x=>x.username == login.usernamtest && x.pass == login.passwordtest).length>0)
   {

       console.log("User is Valid!!!");
       console.log(login.usernamtest);
       //resp.send({"isValid":"True"});
       let payload = { subject: resp.id }
       console.log("Payload" +payload)
       let token = jwt.sign(payload, 'secretKey')
       console.log("Hi " + token);
       resp.send({token});
       resp.status(200);
       resp.end();
   }
   else{
       console.log("User is not Valid!!!");
       resp.send({"isValid":"False"});
       resp.status(500);
       resp.end();
   }

});

libServer.put('/contacts', (req, resp) => {
    let contact = parseReqToContact(req);
    let index = libConactData.contacts.findIndex(b => b.cid == contact.cid);
    libConactData.contacts[index] = contact;
    saveContactDataAndRespond(resp);

});

libServer.delete('/contacts/:id', (req, resp) => {
    let index = libConactData.contacts.findIndex(b => b.cid == req.params.id);
    libConactData.contacts.splice(index, 1);
    saveContactDataAndRespond(resp);

});

libServer.listen(port, () => {
    console.log(`Server is ready at ${port}`)
});
