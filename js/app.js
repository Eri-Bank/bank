let toggleList = document.querySelectorAll('.toggle');
let actionsContainer = document.querySelector('.account-actions');
function toggleSection(e){    
    let isSectionVisible = false;
    toggleList.forEach(function(section){
        if(section.classList. contains(e.target.id)){
            if(section.style.display == 'block'){
                section.style.display = 'none'
            }else{
                section.style.display = 'block';
                isSectionVisible = true;
            }
        }else{
            section.style.display = 'none';
        }

        if(isSectionVisible){
            actionsContainer.style.flexBasis = '200px';
        }else{
            actionsContainer.style.flexBasis = '100px';
        }
    })    
}

document.querySelector('#deposit').addEventListener('click', (e) => toggleSection(e));
document.querySelector('#transfer').addEventListener('click', function(e) {
    toggleSection(e)
    if(accountNumber && accountHolder){
    document.querySelector("#source-account option").innerHTML = document.querySelector("#search").value;
    }else{
        document.querySelector("#source-account option").innerHTML =  document.querySelector("#source-account option:first-of-type").value;
    }
});

document.querySelector('#withdraw').addEventListener('click', (e) => toggleSection(e))

let usersList = [
    {
        id: 123,
        firstName: 'Nate',
        lastName: 'Haile',
        email: 'natnael@gmail.com',
        tel: '00447654312566',
        address: {
            line1: '1 Oxford House',
            line2: 'Victoria Street',
            postcode: 'SW1E 5AD',
            city: 'London'
        },
        accounts: new Map([
            [
                'AC12345',
            {
                id: 321,
                type: 'CurrentAccount',
                accountNumber: 'AC12345',
                sortCode: '110022',
                balance: 10547
            }
        ]
        ])
    },
    {
        id: 124,
        firstName: 'Daniel',
        lastName: 'Ghirmay',
        email: 'daniel@gmail.com',
        tel: '00447854712566',
        address: {
            line1: 'Flat 1 George House',
            line2: 'King William Road',
            postcode: 'WC1 2HA',
            city: 'London'
        },
        accounts: new Map([
            [
                'AC12312',
            {
                id: 543,
                type: 'CurrentAccount',
                accountNumber: 'AC12312',
                sortCode: '125322',
                balance: 5000
            }
        ]
        ])
    }
]

let balance = document.querySelector("#balance");
let accountNumber ;
let accountHolder;
let searchBtn = document.querySelector(".btn-find");
searchBtn.addEventListener("click", function () {
    document.querySelector("#add-users").style.display = "none";
     document.querySelector("#alluserslist").style.display="none";
    document.querySelector(".account-transactions").style.display="none";
       accountNumber = document.querySelector("#search").value;
       accountHolder = usersList.find(user =>user.accounts.has(accountNumber));
    if(accountHolder && accountNumber != ''){
       populateAcountHolder(accountHolder)
       populateAccountSummary(accountHolder.accounts)
       balance.innerHTML = accountHolder.accounts.get(accountNumber).balance;
    }else{

        balance.innerHTML="";
       let card = document.querySelectorAll(".card-body span:nth-of-type(even)");
       card.forEach(x => x.textContent = "");
       document.querySelector("#search").value = "User Not Found";
    }
})
let srcfocus = document.querySelector("#search")

srcfocus.addEventListener("focus",function(){
    this.value = "";
    balance.innerHTML = "";
    document.querySelector(".account-transactions").style.display = "none";
    document.querySelector("#add-container").style.display="none";
    document.querySelector("#alluserslist").style.display = "none";
    let card = document.querySelectorAll(".card-body span:nth-of-type(even)");
    card.forEach(x => x.textContent = "");
    document.querySelector("#source-account option").innerHTML = document.querySelector("#source-account option:first-of-type").value;
})

function populateAccountSummary(summary){
    document.querySelector("#account-type").innerHTML = summary.get(accountNumber).type;
    document.querySelector("#sort-code").innerHTML = summary.get(accountNumber).sortCode;
    document.querySelector("#account-number").innerHTML = summary.get(accountNumber).accountNumber;
    document.querySelector("#balance").innerHTML = summary.get(accountNumber).balance;
}

function populateAcountHolder(holder){
    document.querySelector("#fullname").innerHTML = `${holder.firstName} ${holder.lastName} `;
    document.querySelector("#email").innerHTML = `${holder.email} `;
    document.querySelector("#tel").innerHTML = `${holder.tel} `;
    document.querySelector("#address").innerHTML = `${holder.address.line1}; ${holder.address.line2}; ${holder.address.postcode} `;

 }
let balanceValue = balance.innerHTML;
let date = new Date().toLocaleDateString("en-GB");
let depositBtn = document.querySelector("#deposit-btn");
let table = document.querySelector("table");
depositBtn.addEventListener("click", function (y) {
    document.querySelector(".account-transactions").style.display="block";
    let tr = table.insertRow();
    let ammount = document.querySelector("#depositAmount").value;
    let newBalance = Number(ammount) + Number(balance.innerHTML);
    document.querySelector("#balance").innerHTML = newBalance;
    tr.innerHTML = `
    <td>${date}</td>
    <td>${y.target.innerHTML}</td>
    <td>${ammount}</td>
    <td>${"Cash"}</td>
    <td>${accountNumber}</td>
    <td>${newBalance}</td>
    `;
})

let transferBtn = document.querySelector("#transfer-btn");
transferBtn.addEventListener("click", function (t) {
    document.querySelector(".account-transactions").style.display="block";
    let targetinput = document.querySelector("#destination-account").value;
    let targetaccount = usersList.find(user =>user.accounts.get(targetinput));
    let amountTransfered = Number(document.querySelector("#transfer-amount").value);
    let balanceValue = Number(balance.innerHTML);
    if (accountHolder && targetaccount && accountNumber != "" && targetinput != "" && amountTransfered <= balanceValue && accountNumber != targetinput && amountTransfered != "") {
        alert(`Are You Sure you want to transfer?`);
        let newBalance = Number(balanceValue) - Number(amountTransfered);
        document.querySelector("#balance").innerHTML = newBalance;
         let tr = table.insertRow();
         tr.innerHTML = `
    <td>${date}</td>
    <td>${t.target.innerHTML}</td>
    <td>${amountTransfered}</td>
    <td>${accountNumber}</td>
    <td>${targetinput}</td>
    <td>${newBalance}</td>
    `;
    document.querySelector("#alert").style.display = "block";
    document.querySelector("#alert").innerHTML = "Succesfully Transfered !";
    document.querySelector("#source-account option").innerHTML = document.querySelector("#source-account option:first-of-type").value;
    document.querySelector("#destination-account option").innerHTML = document.querySelector("#destination-account option:first-of-type").value;
    document.querySelector("#transfer-amount").value = "";

}else{
    alert("Incorrect Input")
}

})
let withdrawBtn = document.querySelector("#withdraw-btn");
withdrawBtn.addEventListener("click", function (w) {
    document.querySelector(".account-transactions").style.display="block";
    let tr = table.insertRow();
    let wammount = document.querySelector("#withdrawAmount").value;
    let wbalance = Number(balance.innerHTML) - Number(wammount);
    balance.innerHTML = wbalance;
    tr.innerHTML = `
    <td>${date}</td>
    <td>${w.target.innerHTML}</td>
    <td>${wammount}</td>
    <td>${accountNumber}</td>
    <td>${"--"}</td>
     <td>${wbalance}</td>
    `
});
let addpop = document.querySelector("#add-account");
addpop.addEventListener("click", function () {
    document.querySelector("#alluserslist").style.display = "none";
    document.querySelector(".account-transactions").style.display="none";
    document.querySelector("#add-container").style.display="block";
    document.querySelector("#add-accnum").style.display = "flex";
    document.querySelector("#add-users").style.display = "none";
})
let addaccbtn = document.querySelector("#add-accbtn");
addaccbtn.addEventListener("click",function (){
  let id = document.querySelector("#add-id").value;
  let acctype = document.querySelector("#add-type").value;
  let accnum = document.querySelector("#add-acc").value;
  let addbalance = document.querySelector("#add-balance").value;
  let key = (document.querySelector("#add-key").value);
  accountHolder.accounts.set(key, {
    'id': id,
    'type': acctype,
    'accountNumber': accnum,
    'balance': addbalance
})
});
let adduserpop = document.querySelector("#add-userbtn")
adduserpop.addEventListener("click", function () {
    document.querySelector("#alluserslist").style.display = "none";
    document.querySelector(".account-transactions").style.display="none";
    document.querySelector("#add-container").style.display="block";
    document.querySelector("#add-accnum").style.display = "flex";
    document.querySelector("#add-users").style.display = "flex";
})  
let adduser = document.querySelector("#add-users");
 adduser.addEventListener("submit",function(){
    let id1 = document.querySelector("#addid").value;
    let first = document.querySelector("#add-first").value;
    let last = document.querySelector("#add-last").value;
    let email = document.querySelector("#add-email").value; 
    let tel = document.querySelector("#add-tel").value;
    let address = document.querySelector("#add-address").value;
    let id = document.querySelector("#add-id").value;
    let acctype = document.querySelector("#add-type").value;
    let accnum = document.querySelector("#add-acc").value;
    let addbalance = document.querySelector("#add-balance").value;
     let key = (document.querySelector("#add-key").value);

let storedData = localStorage.getItem("data");
     if (storedData) {
         let metkekh = JSON.parse(localStorage.getItem("data"));
let newUser = {
    'id': id1,
    'firstName': first,
    'lastName': last,
    'email': email,
    'tel': tel,
    'address': address,
    accounts: new Map([[key, {
        'id': id,
        'type': acctype,
        'accountNumber': accnum,
        'balance': addbalance
    }]])
};


let bvhr=storedData.push(newUser);
         localStorage.setItem("data", JSON.stringify(bvhr));
          } else {
       alert("not exist") 
}

 })

let allusers = document.querySelector("#all-users");
allusers.addEventListener("click", () => {
    populateAllUsers;
     document.querySelector("#add-container").style.display="none";
    document.querySelector("#add-accnum").style.display = "none";
    document.querySelector(".account-transactions").style.display="none";
    document.querySelector("#alluserslist").style.display = "block";
})
function populateAllUsers(usersList){
    let table = document.querySelector("#table");
    usersList.forEach(function (customer) {        
        let row = document.createElement('tr');
        row.style.fontSize = "30px";
        let searchById = `${customer.id}`;

        let searchPerson = usersList.find(users => users.id == searchById)
        if (searchPerson) {
            let accnm = Array.from(searchPerson.accounts.keys())[0];
             row.innerHTML = `
        <td>${customer.firstName}</td>
        <td>${customer.lastName}</td>
        <td>${customer.email}</td> 
        <td>${customer.accounts.get(accnm).type}</td>
        <td>${customer.accounts.get(accnm).accountNumber}</td>
        <td>${customer.accounts.get(accnm).balance}</td>`
        }
        table.appendChild(row) 
        table.style.display = "block";   
});
}
populateAllUsers(usersList)

// let toggleList = document.querySelectorAll('.toggle');
// let actionsContainer = document.querySelector('.account-actions');
// function toggleSection(e){    
//     let isSectionVisible = false;
//     toggleList.forEach(function(section){
//         if(section.classList. contains(e.target.id)){
//             if(section.style.display == 'block'){
//                 section.style.display = 'none'
//             }else{
//                 section.style.display = 'block';
//                 isSectionVisible = true;
//             }
//         }else{
//             section.style.display = 'none';
//         }

//         if(isSectionVisible){
//             actionsContainer.style.flexBasis = '200px';
//         }else{
//             actionsContainer.style.flexBasis = '100px';
//         }
//     })    
// }

// document.querySelector('#deposit').addEventListener('click', (e) => toggleSection(e));
// document.querySelector('#transfer').addEventListener('click', function(e) {
//     toggleSection(e)
//     if(accountNumber && accountHolder){
//     document.querySelector("#source-account option").innerHTML = document.querySelector("#search").value;
//     }else{
//         document.querySelector("#source-account option").innerHTML =  document.querySelector("#source-account option:first-of-type").value;
//     }
// });

// document.querySelector('#withdraw').addEventListener('click', (e) => toggleSection(e))

// let usersList = [
//     {
//         id: 123,
//         firstName: 'Nate',
//         lastName: 'Haile',
//         email: 'natnael@gmail.com',
//         tel: '00447654312566',
//         address: {
//             line1: '1 Oxford House',
//             line2: 'Victoria Street',
//             postcode: 'SW1E 5AD',
//             city: 'London'
//         },
//         accounts: new Map([
//             [
//                 'AC12345',
//             {
//                 id: 321,
//                 type: 'CurrentAccount',
//                 accountNumber: 'AC12345',
//                 sortCode: '110022',
//                 balance: 10500
//             }
//         ]
//         ])
//     },
//     {
//         id: 124,
//         firstName: 'Daniel',
//         lastName: 'Ghirmay',
//         email: 'daniel@gmail.com',
//         tel: '00447854712566',
//         address: {
//             line1: 'Flat 1 George House',
//             line2: 'King William Road',
//             postcode: 'WC1 2HA',
//             city: 'London'
//         },
//         accounts: new Map([
//             [
//                 'AC12312',
//             {
//                 id: 543,
//                 type: 'CurrentAccount',
//                 accountNumber: 'AC12312',
//                 sortCode: '125322',
//                 balance: 5000
//             }
//         ]
//         ])
//     }
// ]

// let balance = document.querySelector("#balance");
// let accountNumber ;
// let accountHolder ;
// let searchBtn = document.querySelector(".btn-find");
// searchBtn.addEventListener("click",function(){
//     document.querySelector(".account-transactions").style.display="block";
//        accountNumber = document.querySelector("#search").value;
//        accountHolder = usersList.find(user =>user.accounts.has(accountNumber));
//     if(accountHolder && accountNumber != ''){
//        populateAcountHolder(accountHolder)
//        populateAccountSummary(accountHolder.accounts)
//        balance.innerHTML = accountHolder.accounts.get(accountNumber).balance
//     }else{
       
//         balance.innerHTML="";
//        let card = document.querySelectorAll(".card-body span:nth-of-type(even)");
//        card.forEach(x => x.textContent = "");
//        document.querySelector("#search").value = "User Not Found";
//     }
// })
// let srcfocus = document.querySelector("#search")

// srcfocus.addEventListener("focus",function(){
//     document.querySelector("#search").value = "";
//     balance.innerHTML="";
//     let card = document.querySelectorAll(".card-body span:nth-of-type(even)");
//     card.forEach(x => x.textContent = "");
//     document.querySelector("#source-account option").innerHTML = document.querySelector("#source-account option:first-of-type").value;
// })
// function populateAcountHolder(holder){
//     document.querySelector("#fullname").innerHTML = `${holder.firstName} ${holder.lastName} `;
//     document.querySelector("#email").innerHTML = `${holder.email} `;
//     document.querySelector("#tel").innerHTML = `${holder.tel} `;
//     document.querySelector("#address").innerHTML = `${holder.address.line1}; ${holder.address.line2}; ${holder.address.postcode} `;
    
//  }

// function populateAccountSummary(summary){
//    document.querySelector("#balance").innerHTML= result;
//     document.querySelector("#account-type").innerHTML = summary.get(accountNumber).type;
//     document.querySelector("#sort-code").innerHTML = summary.get(accountNumber).sortCode;
//     document.querySelector("#account-number").innerHTML = summary.get(accountNumber).accountNumber;
  
// }
// let result = JSON.parse(localStorage.getItem('localbalance'));
// let balanceValue = balance.innerHTML;
// let depositBtn = document.querySelector("#deposit-btn");
// let table = document.querySelector("table");
// depositBtn.addEventListener("click",function(y) {
//       let tr = table.insertRow();
//       let td1 = tr.insertCell();
//       td1.innerHTML = new Date().toLocaleDateString("en-GB");
//       let td2 = tr.insertCell();
//       td2.innerHTML = y.target.innerHTML;
//       let td3 = tr.insertCell();
//       let ammount = document.querySelector("#depositAmount").value;
//       td3.innerHTML = ammount;
//       let td4 = tr.insertCell();
//       td4.innerHTML = "Cash";
//       let td5 = tr.insertCell();
//       td5.innerHTML = accountHolder.accounts.get(accountNumber).accountNumber;
//       let td6 = tr.insertCell();
//       let newBalance = Number(ammount) +Number( balance.innerHTML);
//       td6.innerHTML = newBalance;
//       document.querySelector("#balance").innerHTML = result;
  
//       if(result){
//        document.querySelector('#balance').innerHTML = result;
//        }
//    let localbalance = 1;
//       function storedata(){
//         ++localbalance;
//         if(accountNumber !== undefined){
//             localStorage.setItem('localbalance',JSON.stringify(newBalance));
//         }
//        }
//        storedata();
// })

// let transferBtn= document.querySelector("#transfer-btn");
// transferBtn.addEventListener("click",function(t) {
//     let srcinput = document.querySelector("#search").value;
//     let srcaccount = usersList.find(user =>user.accounts.get(srcinput));
//     let targetinput = document.querySelector("#destination-account").value;
//     let targetaccount = usersList.find(user =>user.accounts.get(targetinput));
//     let amountTransfered = Number(document.querySelector("#transfer-amount").value);
//     let balanceValue = Number(balance.innerHTML); 
//     if(srcaccount && targetaccount && srcinput != "" && targetinput !="" && amountTransfered <= balanceValue && srcinput != targetinput && amountTransfered != ""){
//     let tr = table.insertRow();
//     let td1 = tr.insertCell();
//     td1.innerHTML = new Date().toLocaleDateString("en-GB");
//     let td2 = tr.insertCell();
//     td2.innerHTML = t.target.innerHTML;
//     let td3 = tr.insertCell();
//     td3.innerHTML = amountTransfered;
//     let td4 = tr.insertCell();
//     td4.innerHTML = srcaccount.accounts.get(srcinput).accountNumber;
//     let td5 = tr.insertCell();
//     td5.innerHTML= document.querySelector("#destination-account").value;
//     let td6 = tr.insertCell();
//     let newBalance = Number( balanceValue) -  Number(amountTransfered) ;
//     td6.innerHTML = newBalance;
//     document.querySelector("#balance").innerHTML = newBalance;
//     document.querySelector("#source-account option").innerHTML = document.querySelector("#source-account option:first-of-type").value;
//     document.querySelector("#destination-account option").innerHTML = "To";
//     document.querySelector("#transfer-amount").value = "";
//     alert(`Are You Sure you want to transfer?`)
//     document.querySelector("#alert").style.display = "block" 
//     document.querySelector("#alert").innerHTML = "Succesfully Transfered !"
// }else{
//     alert("Incorrect Input")
// }

// })
// let withdrawBtn = document.querySelector("#withdraw-btn");
// withdrawBtn.addEventListener("click",function(w) {
//     let tr = table.insertRow();
//     let td1 = tr.insertCell();
//     td1.innerHTML = new Date().toLocaleDateString("en-GB");
//     let td2 = tr.insertCell();
//     td2.innerHTML = w.target.innerHTML;
//     let td3 = tr.insertCell();
//     let wammount =  document.querySelector("#withdrawAmount").value;
//     td3.innerHTML =wammount
//     let td4 = tr.insertCell();
//     td4.innerHTML = accountHolder.accounts.get(accountNumber).accountNumber;
//     let td5 = tr.insertCell();
//     td5.innerHTML = "--"
//     let td6 = tr.insertCell();
//    let wbalance =  Number(balance.innerHTML) - Number( wammount);
//    balance.innerHTML = wbalance;
//    td6.innerHTML = wbalance;
// })
//  let addclose = document.querySelector("#addclose")
//  addclose.addEventListener("click",function(){
//     document.querySelector("#add-container").style.display="none";
//  })
// let addpop = document.querySelector("#add-account")
// addpop.addEventListener("click",function(){
//     document.querySelector("#add-container").style.display="block";
//     document.querySelector("#add-accnum").style.display = "flex";
// })
// let addaccbtn = document.querySelector("#add-accbtn")
// addaccbtn.addEventListener("click",function (){
//   let id = document.querySelector("#add-id").value;
//   let acctype = document.querySelector("#add-type").value;
//   let accnum = document.querySelector("#add-acc").value;
//   let addbalance = document.querySelector("#add-balance").value;
//   let key = (document.querySelector("#add-key").value);
//   accountHolder.accounts.set(key, {
//     'id': id,
//     'type': acctype,
//     'accountNumber': accnum,
//     'balance': addbalance
// })
// });
// let adduserpop = document.querySelector("#add-userbtn")
// adduserpop.addEventListener("click",function(){
//     document.querySelector("#add-container").style.display="block";
//     document.querySelector("#add-accnum").style.display = "flex";
//     document.querySelector("#add-users").style.display = "flex";
// })  
// let adduser = document.querySelector("#add-users")
//  adduser.addEventListener("click",function(){
//     let id1 = document.querySelector("#addid").value;
//     let first = document.querySelector("#add-first").value;
//     let last = document.querySelector("#add-last").value;
//     let email = document.querySelector("#add-email").value; 
//     let tel = document.querySelector("#add-tel").value;
//     let address = document.querySelector("#add-address").value;
//     let id = document.querySelector("#add-id").value;
//     let acctype = document.querySelector("#add-type").value;
//     let accnum = document.querySelector("#add-acc").value;
//     let addbalance = document.querySelector("#add-balance").value;
//     let key = (document.querySelector("#add-key").value);
//      usersList.push( 
//     {
//         'id':id1,
//         'firstName' : first,
//         'lastName' : last,
//         'email' : email,
//         'tel' : tel,
//         'address' : address
//   ,
//     accounts : new Map([[ key, {
//     'id': id,
//     'type': acctype,
//     'accountNumber': accnum,
//     'balance': addbalance

// }]])  })
 
//  function saveData(){
//     localStorage.setItem("data",JSON.stringify(usersList));
//     }
//     saveData();
//     let storeddata = JSON.parse(localStorage.getItem("data"));
// if(storeddata){
//    console.log(storeddata)
// }else{
//     alert("not added")
// }
// })

// let allusers = document.querySelector("#all-users");
// allusers.addEventListener("click",() => {
//     populateAllUsers
//     document.querySelector("#alluserslist").style.display = "block"
// })
   
// function populateAllUsers(usersList){
//     let userscontainer = document.querySelector("#alluserslist");
  
//     let table = document.createElement("table");
//     let heading = document.createElement("tr");
//     heading.innerHTML = `
//     <th>First Name</th>
//     <th>Last Name</th>
//     <th>Email</th>
//     <th>Account Type</th>
//     <th>Account Number</th>
//     <th>Balance</th>
// `
// table.appendChild(heading);
// userscontainer.appendChild(table)

//  usersList.forEach(function (customer) { 
//     let row = document.createElement('tr');
//     let searchByName = `${customer.firstName}`
//     let person = usersList.find(user => user.firstName == searchByName)
//     if(person ){
//         let accperson = Array.from(person.accounts.keys())[0];
    
//     row.innerHTML = `
//         <td>${customer.firstName}</td>
//         <td>${customer.lastName}</td>
//         <td>${customer.email}</td> 
//         <td>${customer.accounts.get(accperson).type}</td> 
//         <td>${customer.accounts.get(accperson).accountNumber}</td> 
//         <td>${customer.accounts.get(accperson).balance}</td> 
//         `
//     }
//     table.appendChild(row)
//    table.style.display = "block"
// });

// }
// populateAllUsers(usersList)



