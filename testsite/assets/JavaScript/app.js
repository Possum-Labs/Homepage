
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
    },
    {
        name: "Group 1 Automotive Inc."
    },
    {
        name: "Lithia Motors Inc."
    }
];

//location JSON object
var locations = [
    {
        "name": "AutoNation Ford Littleton"
    },
    {
        "name": "AutoNation Chrysler Jeep Broadway"
    },
    {
        "name": "AutoNation Buick GMC Park Meadows"
    },
    {
        "name": "Audi South Coast"
    },
    {
        "name": "East Madison Toyota"
    }
];

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

