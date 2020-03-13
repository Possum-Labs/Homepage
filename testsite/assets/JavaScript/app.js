
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
        name: "AutoNation Inc."
    },
    {
        name: "Penske Automotive Group Inc."
    },
    {
        name: "CarMax Inc."
    }
];

//location JSON object
var locations = [
    {
        name: "AutoNation Ford Littleton"
    },
    {
        name: "Audi South Coast"
    },
    {
        name: "CarMax South Broadway"
    }
];

//populate dropdown
populateDropdown = (objects, id) => {
    var selectElement = document.getElementById(id);
    selectElement.options.length = 0;
    objects.forEach(function (obj) {
        var option = document.createElement("option");
        option.innerHTML = obj.name;
        option.value = obj.name;
        selectElement.options.add(option);
    })

}

onPageLoad = () => {
    bindTable("body1")
}

//bind the table from localStorage
bindTable = (EleId) => {
    //first check if there is something in local storage
    if (localStorage.getItem("name")) {
        //get items from local storage and convert to an array
        var stored = localStorage.getItem("name").split(",");
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
            //append the row to the referenced element
            document.getElementById(EleId).appendChild(newRow);
        }

    }

}



addDealerName = () => {
    //Grab user input and selection
    var newDealerName = document.getElementById("dealerName").value.trim();
    //console.log(newDealerName);
    //get value currently stored in local storage
    var tempDealerName = [];
    if (localStorage.getItem("name"))
        tempDealerName = localStorage.getItem("name").split(",");
    //check that there is not a duplicate in localStorage
    if (tempDealerName.indexOf(newDealerName) === -1) {
        //push new item to array, if not a duplicate
        tempDealerName.push(newDealerName);
        localStorage.setItem("name", tempDealerName);
        //also check that there is not a duplcate in the dealer JSON object
    }


    //append new Dealer name to existing table
    var newRow = document.createElement("tr");
    var newCell = document.createElement("td");
    newCell.innerHTML = newDealerName;
    newRow.append(newCell);
    document.getElementById("body1").appendChild(newRow);
    document.getElementById("dealerName").value = "";

    // TODO:
    //close modal once done input?
    //change "name" key to "dealer"

}




