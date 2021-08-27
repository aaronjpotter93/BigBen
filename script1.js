var tableNum = 3;

function addRowToIncomeTable() {
    var table = document.getElementById("myTable");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Paycheck 1";
    cell2.innerHTML = "";
    cell3.innerHTML = "";
}

function addRowToTable(tableName) {
    var table = document.getElementById(tableName);
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Label";
    cell2.innerHTML = "";
    cell3.innerHTML = "";
}

function addTable() {
    var myDiv = document.getElementById("newCategories");
    
    if(tableNum == 3) {
        myDiv.appendChild(document.createElement('br'));
        myDiv.appendChild(document.createElement('br'));
    } else {
        myDiv.appendChild(document.createElement('br'));
        myDiv.appendChild(document.createElement('br'));
        myDiv.appendChild(document.createElement('br'));
    }
    

    var table = document.createElement('table');
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Untitled";
    cell1.style.fontWeight = 'bold';
    cell2.innerHTML = "Planned";
    cell2.style.fontWeight = 'bold';
    cell3.innerHTML = "Remaining";
    cell3.style.fontWeight = 'bold';

    var row2 = table.insertRow(1);
    var cell4 = row2.insertCell(0);
    var cell5 = row2.insertCell(1);
    var cell6 = row2.insertCell(2);
    cell4.innerHTML = "Label";
    cell5.innerHTML = "$0.00";
    cell6.innerHTML = "$0.00";

    table.setAttribute("border", "5");
    table.setAttribute("cellpadding", "10");
    table.setAttribute("cellspacing", "2");
    table.setAttribute("contenteditable", "true");
    var tableName = 'myTable' + tableNum;
    table.setAttribute("id", `${tableName}`);
    myDiv.appendChild(table);

    var button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("onclick", `addRowToTable(\'${tableName}\')`);
    button.innerHTML = "Add Item";

    myDiv.appendChild(button);
    tableNum++;
}