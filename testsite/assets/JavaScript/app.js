
//Login validation
validate = () => {
    var userNameValue = document.getElementById('userName').value.toLowerCase();
    var passwordValue = document.getElementById('password').value.toLowerCase();

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



var dealers2 = [
    {
        Dealer: "AutoNation Inc.",
        Store: "AutoNation Ford Littleton",
        Location: "AutoNation Ford Littleton - Lot A",
        Inventory: "2020 F-150 Stock# F150-856"
    },
    {
        Dealer: "Penske Automotive Group Inc.",
        Store: "Audi South Coast",
        Location: "Audi South Coast Garage",
        Inventory: "2020 Q3 SUV Stock# Q3-125"
    },
    {
        Dealer: "CarMax Inc.",
        Store: "CarMax South Broadway",
        Location: "CarMax South Broadway - Lot B",
        Inventory: "2014 Honda Pilot Stock# HN-45692"
    }
];


//populate dropdown
//objects - the JSON object; id - id of the targeted dropdown; localKey - local storage key name
populateDropdown = (objects, id, localKey, index) => {
    //grab the selected element by its id
    var selectElement = document.getElementById(id);
    selectElement.options.length = 0;
    //pull data from JSON object  
    objects.forEach(function (item) {
        //create a dropdown option
        var option = document.createElement("option");
        //grab the key name of the specified object key
        var objKey = Object.keys(objects[0])[index];

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
    bindTable("head1", "body1", dealers2, "dealer", 0);
    //bindTable2(localKey1, bodyId, localKey2, objects, index, index2)
    bindTable2("store", "body2", "dealerOption", dealers2, 1, 0);
    bindTable2("location", "body3", "dealerOption2", dealers2, 2, 0);
    bindTable2("item", "body4", "location2", dealers2, 3, 2);
}

//bind data to table upon loading of page - for dealer table only
//need the headId & bodyID from the HTML table, objects is the JSON object being targeted
//localKey is the key name from localStorage
bindTable = (headID, bodyId, objects, localKey, index) => {

    //TODO: delete this header section upon completion
    // //generate table with data from JSON object
    // //create a row and append it to the thead element
    // var row = document.createElement("tr");
    // //grab the header tag in the HTML
    // var header = document.getElementById(headID);
    // //append the row to the header
    // header.appendChild(row);
    // //create a th element to house the object key text and attach to the row
    // var th = document.createElement("th");
    // //grab the value for the header from the JSON object
    // var headerValue = Object.keys(objects[0]);
    // //text for the 'th' element
    // th.innerHTML = headerValue;
    // //append it to the row created
    // row.appendChild(th);


    //for each item in the JSON object
    objects.forEach(function (eachItem) {
        //create a row
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        document.getElementById(bodyId).appendChild(row);
        row.appendChild(cell);
        //create a variable to store a reference to the JSON object key
        //var objKey = Object.keys(objects[0]).toString();
        var objKey = Object.keys(objects[0])[index];
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

//bind data to table for remaining three tables
bindTable2 = (localKey1, bodyId, localKey2, objects, index, index2) => {

    //bind from JSON object first
    objects.forEach(function (eachItem) {
        let row = document.createElement("tr");
        let cell = document.createElement("td");
        let cell2 = document.createElement("td");
        document.getElementById(bodyId).appendChild(row);
        row.appendChild(cell);
        row.appendChild(cell2);
        var objKey = Object.keys(objects[0])[index];
        var objKey2 = Object.keys(objects[0])[index2];
        let text = document.createTextNode(eachItem[objKey]);
        let text2 = document.createTextNode(eachItem[objKey2]);
        cell.appendChild(text);
        cell2.appendChild(text2);
    })



    //bind the items from local storage to tables
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
    //TODO: check input against data already in JSON object
    //get value currently stored in local storage
    var tempDealerName = [];
    if (localStorage.getItem("dealer"))
        tempDealerName = localStorage.getItem("dealer").split(",");
    //check that there is not a duplicate in localStorage
    if (tempDealerName.indexOf(newDealerName) === -1) {
        //push new item to array, if not a duplicate
        tempDealerName.push(newDealerName);
        localStorage.setItem("dealer", tempDealerName);

    }
    //append new Dealer name to existing table
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.innerHTML = newDealerName;
    newRow.append(newCell);
    document.getElementById("body1").appendChild(newRow);
    document.getElementById("dealerName").value = "";

    inputConfirmation();
}






//FIXME: if user inputs data with a column, this will separate the data into separate cells
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

clearStorage = () => {
    localStorage.clear();
    clearTable("body1");
    bindTable("head1", "body1", dealers2, "dealer", 0);
    clearTable("body2");
    //bindTable2 = (localKey1, bodyId, localKey2, objects, index, index2)
    bindTable2("store", "body2", "dealerOption", dealers2, 1, 0);
    clearTable("body3");
    bindTable2("location", "body3", "dealerOption2", dealers2, 2, 0);
    clearTable("body4");
    bindTable2("location", "body4", "dealerOption2", dealers2, 3, 2);
}

clearTable = (eleId) => {
    document.getElementById(eleId).innerHTML = "";
}




inputConfirmation = () => {

    $(document).ready(function () {
        $("#dialog").dialog({
            modal: true,
            title: "Success!",
            height: 100,
            dialogClass: "no-close",
            draggable: false,
            open: function (event, ui) {
                setTimeout(function () {
                    $('#dialog').dialog('close');
                }, 2000);
            }
        });
    })

}


// TODO:
//Once done with testing, have modals close after input 
//FIXME: bugs to fix for binding table
//Check for duplicate entries in JSON object before allowing input
//FIXME: commas in inputted data is seen as different items in the array of items in local storage and will create a new cell for data separated by commas
//Fix Clear User Data Button as sticky footer / or fixed footer
//add confirmation to all inputs


//      DONE - Brief confirmation acknowledging the user has input data
//      DONE - create JSON object for inventory locations?
//      DONE - When clear data is hit refresh the data in the tables
//      DONE - Add credentials to the login page and a note on purpose of this page
//      DONE - populateDropDown function add inventory location from local storage
//      DONE - create a newbindTable to bind the items into tables 2 -3 at pageLoad
//      DONE - Add a button to reset the local storage and reload the datas to the example tables
//      DONE - Tab for each table rather than all 4 tables on one page.
//      DONE - change "name" key to "dealer"
//      DONE - instead of hard-coded dealer name in HTML, bring names in from JSON object
//      DONE - PopulateDropDown function - have it get grab dealers from local storage
//      DONE - PopulateDropDown function - make sure this is working for the stores as well as dealers
//      DONE - Table#2 - hold added stores in localStorage and get them out of localStorage to populate table along with selected dealer
//      DONE - Table#3 - hold added inventory locations in localStorage and get them out of localStorage to populate table along with selected dealer
//      DONE - Table#4 - hold added inventory items in localStorage and get them out of localStorage to populate table along with slected inventory location
//      DONE - bindTable function needs to be reusable
