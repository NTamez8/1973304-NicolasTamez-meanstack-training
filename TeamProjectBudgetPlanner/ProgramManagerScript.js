function AddData() {

    if (!IsValidData()) {
        alert("Invalid Data: one or more values is empty");
        return;

    }

    Data = GatherData();

    var nextKey = "Key" + sessionStorage.length;
    sessionStorage.setItem(nextKey, Data);
    ClearData();
}

function IsValidData() {
    var ClientName = document.getElementById("ClientName").value;
    var ProjectName = document.getElementById("ProjectName").value;
    var Budget = document.getElementById("Budget").value;

    if (ClientName == "")
        return false;
    else if (ProjectName == "")
        return false;
    else if (Budget == "")
        return false;


    return true;
}


function GatherData() {
    var ClientName = document.getElementById("ClientName").value;
    var ProjectName = document.getElementById("ProjectName").value;
    var Budget = document.getElementById("Budget").value;

    var object = {
        CName: ClientName,
        PName: ProjectName,
        Budget: Budget


    }


    return JSON.stringify(object);
}

function ClearData() {
    document.getElementById("ClientName").value = "";
    document.getElementById("ProjectName").value = "";
    document.getElementById("Budget").value = "";
}