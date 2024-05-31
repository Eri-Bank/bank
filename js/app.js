
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
document.querySelector('#transfer').addEventListener('click', (e) => toggleSection(e))
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

let searchBtn = document.querySelector(".btn-find");
searchBtn.addEventListener("click",function(){
    accountNumber = document.querySelector("#search").value;
    accountHolder = usersList.find(user =>user.accounts.has(accountNumber));
    if(accountNumber){
       populateAcountHolder(accountHolder)
       populateAccountSummary(accountHolder.accounts)
    }
})
function populateAcountHolder(holder){
    document.querySelector("#fullname").innerHTML = `${holder.firstName} ${holder.lastName} `;
    document.querySelector("#email").innerHTML = `${holder.email} `;
    document.querySelector("#tel").innerHTML = `${holder.tel} `;
    document.querySelector("#address").innerHTML = `${holder.address.line1}; ${holder.address.line2}; ${holder.address.postcode} `;
    
 }
function populateAccountSummary(summary){
    document.querySelector("#account-type").innerHTML = summary.get(accountNumber).type;
    document.querySelector("#sort-code").innerHTML = summary.get(accountNumber).sortCode;
    document.querySelector("#account-number").innerHTML = summary.get(accountNumber).accountNumber;
}



/*..............................................................*/
const deposit = document.getElementById('deposit'),
    depositInput = document.getElementById('depositAmount'),
    depositBtn = document.getElementById('deposit-btn'),
    withdraw = document.getElementById('withdraw'),
    withdrawInput = document.getElementById('withdrawAmount'),
    withdrawBtn = document.getElementById('withdraw-btn'),
    balance = document.getElementById('balance');

    depositBtn.addEventListener('click', () => {
        const value = depositInput.value;
        const depositValue = Number(deposit.innerText) + Number(value);
        const balanceValue = Number(balance.innerText) + Number(value);
        balance.innerText = balanceValue;
        depositInput.value = '';
    })

    withdrawBtn.addEventListener('click', () => {
        const value = withdrawInput.value;
        if (Number(value) === 0) {
            alert("You don't have any balance to withdraw");
        } else if (Number(value) > Number(balance.innerText)) {
            alert("You don't have that much balance to withdraw");
        } else {
            const balanceValue = Number(balance.innerText) - Number(value);
            const withdrawValue = Number(withdraw.innerText) + Number(value);
            balance.innerText = balanceValue;
            withdrawInput.value = '';
        }
    })
    

    
       
 
   
    
