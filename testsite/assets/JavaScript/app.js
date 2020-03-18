
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

//inventory location JSON object
var locations = [
    {
        Location: "AutoNation Ford Littleton - Lot A"
    },
    {
        Location: "Audi South Coast Garage"
    },
    {
        Location: "CarMax South Broadway - Lot B"
    }
];


//populate dropdown
//objects - the JSON object; id - id of the targeted dropdown; localKey - local storage key name
populateDropdown = (objects, id, localKey) => {
    //grab the selected element by its id
    var selectElement = document.getElementById(id);
    selectElement.options.length = 0;
    //pull data from JSON object  
    objects.forEach(function (item) {
        //create a dropdown option
        var option = document.createElement("option");
        //grab the key name of the specified object key
        var objKey = Object.keys(objects[0]).toString();
        //text for that option will be the individual object key items
        option.innerHTML = item[objKey];
        //value will be the same
        option.value = item[objKey];
        //add the options to the targeted element
        selectElement.options.add(option);
    })

    //pull data from localStorage to populate the dropdown
    if (localStorage.getItem(localKey)) {
        //create a variable to store the items in local storage
        var storedLocally = localStorage.getItem(localKey).split(",");
        //for each item in local storage
        storedLocally.forEach(function (eachLocalItem) {
            //create a new option element for the dropdown
            var option = document.createElement("option");
            //console.log(eachLocalItem);
            //text for option
            option.innerHTML = eachLocalItem;
            //value for the option
            option.value = eachLocalItem;
            //add the localStorage items to the dropdown
            selectElement.options.add(option);
        })

    }

}



onPageLoad = () => {
    bindTable("head1", "body1", dealers, "dealer");
    bindTable2("store", "body2", "dealerOption");
    bindTable2("location", "body3", "dealerOption2");
    bindTable2("item", "body4", "location2");
}

//bind data to table upon loading of page
//need the headId & bodyID from the HTML table, objects is the JSON object being targeted
//localKey is the key name from localStorage
bindTable = (headID, bodyId, objects, localKey) => {

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
    var headerValue = Object.keys(objects[0]);
    //text for the 'th' element
    th.innerHTML = headerValue;
    //append it to the row created
    row.appendChild(th);


    //for each item in the JSON object
    objects.forEach(function (eachItem) {
        //create a row
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        document.getElementById(bodyId).appendChild(row);
        row.appendChild(cell);
        //create a variable to store a reference to the JSON object key
        var objKey = Object.keys(objects[0]).toString();
        // create a text variable to store the text for the table data cells
        let text = document.createTextNode(eachItem[objKey]);
        //append the text to the row
        cell.appendChild(text);

    })

    //pull data from localStorage, if exists: first check if there is something in local storage
    if (localStorage.getItem(localKey)) {
        //get items from local storage and convert to an array
        var stored = localStorage.getItem(localKey).split(",");
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
};

bindTable2 = (localKey1, bodyId, localKey2) => {
    //bind the items from local storage to table two

    //key#1: pull data from localStorage, if exists: first check if there is something in local storage for the first key
    if (localStorage.getItem(localKey1)) {
        //get items from local storage and convert to an array
        var stored = localStorage.getItem(localKey1).split(",");

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
    //FIXME: When binding after a page refresh the localKey2 is dropping to the second row 
    //key#2: pull data from localStorage, if exists: first check if there is something in local storage for the second key
    if (localStorage.getItem(localKey2)) {
        //get items from local storage and convert to an array
        var stored = localStorage.getItem(localKey2).split(",");
        //for each item in local storage array
        for (var i = 0; i < stored.length; i++) {
            //            console.log(stored[i]);

            // //new table data
            var newCell2 = document.createElement("td");
            //each array item will be mapped to the td
            newCell2.innerHTML = stored[i];
            //append td to the existing row
            newRow.append(newCell2);

        }

    }

}



addDealerName = () => {
    //store dealer name value to 'newDealerName' variable
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
        //TODO: also check that there is not a duplcate in the dealer JSON object
    }
    //append new Dealer name to existing table
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.innerHTML = newDealerName;
    newRow.append(newCell);
    document.getElementById("body1").appendChild(newRow);
    document.getElementById("dealerName").value = "";
}


//FIXME: disallow commas in input or need to split array by another method
addInput = (eleId, localKey1, bodyId, eleId2, localKey2) => {
    //store the store name value to 'newStoreName' variable
    var newName1 = document.getElementById(eleId).value.trim();
    //console.log(newName1);
    //get store values from localStorage and store in an array
    var tempName1 = [];
    if (localStorage.getItem(localKey1))
        tempName1 = localStorage.getItem(localKey1).split(",");
    //check there is not a duplicate in localStorage
    //if (tempName1.indexOf(newName1) === -1) {
    //if no duplcate push to 'newName1
    tempName1.push(newName1);
    localStorage.setItem(localKey1, tempName1)
    //}
    //append new store name to existing table
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.innerHTML = newName1;
    newRow.append(newCell);
    document.getElementById(bodyId).appendChild(newRow);
    document.getElementById(eleId).value = "";
    //target the dealer dropdown in the Store modal
    var newName2 = document.getElementById(eleId2);
    //grab the value selected by the user from the targeted dropdown to the 'selectedOption' variable
    var selectedOption = newName2.options[newName2.selectedIndex].value;
    var tempName2 = [];
    if (localStorage.getItem(localKey2))
        tempName2 = localStorage.getItem(localKey2).split(",");
    tempName2.push(selectedOption);
    localStorage.setItem(localKey2, tempName2);
    //push the selected item to the table
    var newCell2 = document.createElement("td");
    newCell2.innerHTML = selectedOption;
    newRow.append(newCell2);

}




// TODO:
// Once done with testing, have modals close after input 
//      DONE - change "name" key to "dealer"
//      DONE - instead of hard-coded dealer name in HTML, bring names in from JSON object

//      DONE - PopulateDropDown function - have it get grab dealers from local storage
//      DONE - PopulateDropDown function - make sure this is working for the stores as well as dealers
//PopulateDropDown function add store local storage
//populateDropDown function add inventory location from local storage and create JSON object?

//      DONE - bindTable function needs to be reusable 

//FIXME: bugs to fix for binding table
//create a newbindTable to bind the items into tables 2 -3 at pageLoad

    //      DONE - Table#2 - hold added stores in localStorage and get them out of localStorage to populate table along with selected dealer

    //      DONE - Table#3 - hold added inventory locations in localStorage and get them out of localStorage to populate table along with selected dealer

    //      DONE - Table#4 - hold added inventory items in localStorage and get them out of localStorage to populate table along with slected inventory location

