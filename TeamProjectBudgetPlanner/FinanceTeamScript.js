function CreateTable() {
    var key = "Key";
    var NumRows = sessionStorage.length;
    var totalValue = 0;
    for (var x = 0; x < NumRows; x++) {
        var object = JSON.parse(sessionStorage.getItem(key + x));
        totalValue += Number.parseFloat(object.Budget);
        AddLineItem(object.CName, object.PName, object.Budget);
    }
    AddTotalRow(totalValue);
}

function AddLineItem(cName, pName, budget) {
    var tbody = document.getElementById("TableBody");
    var row = document.createElement("tr");
    var clientData = document.createElement("td");
    var projectData = document.createElement("td");
    var budgetData = document.createElement("td");

    var CurrencyFormatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'},);

    clientData.innerHTML = cName;
    projectData.innerHTML = pName;
    budgetData.innerHTML =  CurrencyFormatter.format(budget);

    row.appendChild(clientData);
    row.appendChild(projectData);
    row.appendChild(budgetData);

    tbody.appendChild(row);

}

function AddTotalRow(Total) {
    var tbody = document.getElementById("TableBody");
    var totalRow = document.createElement("tr");
    var TotalLabel = document.createElement("td");
    var TotalBudget = document.createElement("td");

    var CurrencyFormatter = new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'},);

    TotalLabel.colSpan = 2;
    TotalLabel.innerHTML = "Total: "
    TotalBudget.innerHTML = CurrencyFormatter.format(Total);

    totalRow.appendChild(TotalLabel);
    totalRow.appendChild(TotalBudget);

    tbody.appendChild(totalRow);
}