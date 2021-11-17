var tableNum = 3;
var numberOfRowsInEachTable = [1, 1];
var categoryTotals = [];

function sumArray(array) {
    var sum = 0;
    for(let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function addRowToIncomeTable() {
    var table = document.getElementById("myTable1");
    numberOfRowsInEachTable[0] += 1;
    var row = table.insertRow(numberOfRowsInEachTable[0]);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Paycheck 1";
    cell2.innerHTML = "$0.00";
    cell3.innerHTML = "$0.00";
    cell2.style = "text-align: end; padding-right: 46px;";
    cell3.style = "text-align: end; padding-right: 46px;";
}



function addRowToTable(tableName) {
    var tableNumberString = tableName.slice(-1);
    var tableNumber = parseInt(tableNumberString);
    var table = document.getElementById(tableName);
    console.log("numRows: " + (numberOfRowsInEachTable[tableNumber-1]+1));
    var row = table.insertRow(numberOfRowsInEachTable[tableNumber-1]+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = "Label";
    cell2.innerHTML = "$0.00";
    cell3.innerHTML = "$0.00";
    cell2.style = "text-align: end; padding-right: 46px;";
    cell3.style = "text-align: end; padding-right: 50px;";

    numberOfRowsInEachTable[tableNumber-1] += 1;
}

function addTable() {
    var myDiv = document.getElementById("newCategories");
    
    if(tableNum == 3) {
        myDiv.appendChild(document.createElement('br'));
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
    cell1.setAttribute("class", "label");
    cell1.style.textAlign = "center";
    cell2.innerHTML = "Planned";
    cell2.style.fontWeight = 'bold';
    cell2.style.textAlign = 'center';
    cell2.setAttribute("class", "plannedHeader");
    cell3.innerHTML = "Actual";
    cell3.style.fontWeight = 'bold';
    cell3.style.textAlign = 'center';
    cell3.setAttribute("class", "actualHeader");


    var row2 = table.insertRow(1);
    var cell4 = row2.insertCell(0);
    var cell5 = row2.insertCell(1);
    var cell6 = row2.insertCell(2);
    cell4.innerHTML = "Label";
    cell5.innerHTML = "$0.00";
    cell5.style = "text-align: end; padding-right: 46px;";
    cell6.innerHTML = "$0.00";
    cell6.style = "text-align: end; padding-right: 50px;";

    var totalRow = table.insertRow(2);
    var cell7 = totalRow.insertCell(0);
    var cell8 = totalRow.insertCell(1);
    var cell9 = totalRow.insertCell(2);
    cell7.innerHTML = "Total";
    cell8.innerHTML = "$0.00";
    cell8.style = "text-align: end; padding-right: 46px;";
    cell9.innerHTML = "$0.00";
    cell9.style = "text-align: end; padding-right: 50px;";

    table.setAttribute("border", "4");
    table.setAttribute("cellpadding", "10");
    table.setAttribute("cellspacing", "2");
    table.setAttribute("contenteditable", "true");
    table.style.width = '100%';
    var tableName = 'myTable' + tableNum;
    table.setAttribute("id", `${tableName}`);
    myDiv.appendChild(table);

    var button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("onclick", `addRowToTable(\'${tableName}\')`);
    button.innerHTML = "Add Item";

    myDiv.appendChild(button);
    tableNum++;

    numberOfRowsInEachTable.push(1);
    addTableEventListener(table);
}

function incomeTotals(table) {
    total = 0;
    var tableNumberString = table.getAttribute("id");
    var tableNumber = tableNumberString.slice(-1);

    for (var i = 1; i <= numberOfRowsInEachTable[tableNumber-1]; i++) {
        console.log("i: " + i);
        var row = table.rows[i];
        var plannedCellString = row.cells[1].innerHTML;
        var plannedCellValue = parseFloat(plannedCellString.slice(1));
        total += plannedCellValue;
    }
    
    var numberOfRowsInIncomeTable = numberOfRowsInEachTable[tableNumber-1];
    table.rows[numberOfRowsInIncomeTable+1].cells[1].innerHTML = '$' + total.toFixed(2);
    categoryTotals[tableNumber-1] = total;
}

function addTableEventListener(table) {
    table.addEventListener("input", function(e) {
        incomeTotals(table);

        var h2 = document.getElementsByTagName('h2')[0];
        var span = document.getElementsByTagName('span')[0];
        var span2 = document.getElementsByTagName('span')[1];

        var netBudget = calculateNetBudget().toFixed(2);
        span.innerHTML = '$' + netBudget;

            if (netBudget > 0) {
                span.style.color = "black";
                span2.innerHTML = " left to budget";
                span2.style.color = "gray";
            }
            else if (netBudget == 0) {
                span.innerHTML = "It's a zero-based budget!";
                span2.innerHTML = "";
                span.style.color = "green";
            }
            else {
                span.innerHTML = '$' + Math.abs(netBudget).toFixed(2);
                span.style.color = "red";
                span2.innerHTML = " over budget";
                span2.style.scolor = "gray";
            }

        console.log("Did Something");
    });
}

function transactionsButton() {
    window.location.href = "transactionsPage.html";
}

function calculateNetBudget() {
    var income = categoryTotals[0];
    var expenses = sumArray(categoryTotals) - categoryTotals[0];

    return income - expenses;
}

window.onload = function() {
    var x = document.getElementById("firstCell").innerText;
    console.log(x);
    var budgetTotal = document.createElement('h2');
    
    var span = document.createElement('span');
    span.innerHTML = x;
    var span2 = document.createElement('span');
    budgetTotal.appendChild(span);
    budgetTotal.appendChild(span2);
    var headerDiv = document.getElementById("header");
    headerDiv.appendChild(budgetTotal);

    // insert zero for first two tables
    categoryTotals[0] = 0;   
    categoryTotals[1] = 0;

    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tableNum -1; i++) {
        tables[i].addEventListener("input", function(e) {
            incomeTotals(e.target);
            
            var h2 = document.getElementsByTagName('h2')[0];

            var netBudget = calculateNetBudget().toFixed(2);
            span.innerHTML = '$' + netBudget;

            if (netBudget > 0) {
                span.style.color = "black";
                span2.innerHTML = " left to budget";
                span2.style.color = "gray";
            }
            else if (netBudget == 0) {
                span.innerHTML = "It's a zero-based budget!";
                span2.innerHTML = "";
                span.style.color = "green";
            }
            else {
                span.innerHTML = '$' + Math.abs(netBudget).toFixed(2);
                span.style.color = "red";
                span2.innerHTML = " over budget";
                span2.style.color = "gray";
            }

            console.log("Did Something");

            
        });
    }
    
}



