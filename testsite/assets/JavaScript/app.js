
//Login validation
validate = () => {
    var userNameValue = document.getElementById('userName').value;
    var passwordValue = document.getElementById('password').value;

    if (userNameValue === 'possum' && passwordValue === 'possum') {
        displayForm();
    } else {
        alert('username is "possum" and password is "possum"')
    }
}

//Input form
displayForm = () => {
    var form = document.getElementById('hiddenForm');
    var formDisplaySetting = form.style.display;
    var mainContainer = document.getElementById('main');

    if (formDisplaySetting === 'block') {
        form.style.display = 'none'
    } else {
        form.style.display = 'block'
        mainContainer.style.display = 'none';
    }
}


//dealer JSON object
var dealers = [
    {
        Dealer: "AutoNation Inc."
    },
    {
        Dealer: "Penske Automotive Group Inc."
    },
    {
        Dealer: "CarMax Inc."
    }
];

//location JSON object
var stores = [
    {
        Store: "AutoNation Ford Littleton"
    },
    {
        Store: "Audi South Coast"
    },
    {
        Store: "CarMax South Broadway"
    }
];

//TODO: make reusable - change the object key to generic for reuse.
//populate dropdown
populateDropdown = (objects, id) => {
    //grab the 
    var selectElement = document.getElementById(id);
    selectElement.options.length = 0;
    objects.forEach(function (obj) {
        var option = document.createElement("option");
        option.innerHTML = obj.Dealer;
        option.value = obj.Dealer;
        selectElement.options.add(option);
    })

}

onPageLoad = () => {
    bindTable("head1", "body1", dealers)

}

//bind data to table upon loading of page
bindTable = (headID, bodyId, data) => {


    //generate table with data from JSON object
    //create a row and append it to the thead element
    var row = document.createElement("tr");
    //grab the header tag in the HTML
    var header = document.getElementById(headID);
    //append the row to the header
    header.appendChild(row);
    //create a th element to house the object key text and attach to the row
    var th = document.createElement("th");
    //grab the value for the header from the JSON object
    var headerValue = Object.keys(data[0]);
    //text for the 'th' element
    th.innerHTML = headerValue;
    //append it to the row created
    row.appendChild(th);


    //for each item in the JSON object
    data.forEach(function (eachItem) {
        //create a row
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        document.getElementById(bodyId).appendChild(row);
        row.appendChild(cell);
        // grab the text
        let text = document.createTextNode(eachItem.Dealer);
        //append the text to the row
        cell.appendChild(text);

    })
    //pull fata from localStorage, if exists: first check if there is something in local storage
    if (localStorage.getItem("dealer")) {
        //get items from local storage and convert to an array
        var stored = localStorage.getItem("dealer").split(",");
        //for each item in local storage array
        for (var i = 0; i < stored.length; i++) {
            //            console.log(stored[i]);
            //create a new row
            var newRow = document.createElement("tr");
            //new table data
            var newCell = document.createElement("td");
            //each array item will be mapped to the td
            newCell.innerHTML = stored[i];
            //append td to the row
            newRow.append(newCell);
            //append the row to the table body element
            document.getElementById(bodyId).appendChild(newRow);
        }

    }

}



addDealerName = () => {
    //Grab user input and selection
    var newDealerName = document.getElementById("dealerName").value.trim();
    //console.log(newDealerName);
    //get value currently stored in local storage
    var tempDealerName = [];
    if (localStorage.getItem("dealer"))
        tempDealerName = localStorage.getItem("dealer").split(",");
    //check that there is not a duplicate in localStorage
    if (tempDealerName.indexOf(newDealerName) === -1) {
        //push new item to array, if not a duplicate
        tempDealerName.push(newDealerName);
        localStorage.setItem("dealer", tempDealerName);
        //also check that there is not a duplcate in the dealer JSON object
    }
    //append new Dealer name to existing table
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.innerHTML = newDealerName;
    newRow.append(newCell);
    document.getElementById("body1").appendChild(newRow);
    document.getElementById("dealerName").value = "";

}


// TODO:
    // Once done with testing, have modals close after input 
    //      DONE - change "name" key to "dealer"
    //      DONE - instead of hard-coded dealer name in HTML, bring names in from JSON object
    //Store Modal & inventory location modals- populate dealer list with items from localStorage, if any

    //PopulateDropDown function - have it get anything stored in localStorage
    //PopulateDropDown function - make sure this is working for the stores as well as dealers

    //Table#2 - remove hard-coded table in the HTML
    //Table#2 - hold added stores in localStorage and get them out of localStorage to populate table
    //Table#2 - make sure I am binding localStorage to the table when the page loads along with stores from JSON object

    //Table#3 - remove hard-coded table in the HTML
    //Table#3 - create JSON object for inventory locations
    //Table#3 - hold added inventory locations in localStorage and get them out of localStorage to populate table
    //Table#3 - make sure I am binding localStorage to the table when the page loads along with stores from JSON object

    //Table#4 - remove hard-coded table in the HTML
    //Table#4 - hold added inventory itemsin localStorage and get them out of localStorage to populate table
    //Table#4 - make sure I am binding localStorage to the table when the page loads along with stores from JSON object




