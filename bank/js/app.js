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



