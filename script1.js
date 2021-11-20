var tableNum = 3;
var numberOfRowsInEachTable = [1, 1];
var categoryTotals = [];
var categories = ['Transportation', 'Housing', 'Debt', 'Kids', 'Personal Care', 'Luna', 'Lifestyle']
var subcategories = [];

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

        // var subcategory = row.cells[0].innerHTML;
        // console.log(subcategory);
        // subcategories[i-1] = subcategory;
        // console.log(subcategories);
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

function getCategory(category, i) {
    var id = "dropdownMenuButton" + i;
    var button = document.getElementById(id);
    button.value = category;
}

function transactionsButton() {
    // window.location.href = "transactionsPage.html";

    var table = document.createElement('table');
    table.setAttribute('class', 'table');
    var header = table.createTHead();
    var row = header.insertRow(0);
    var th1 = document.createElement('TH');
    th1.setAttribute('scope', 'col');
    th1.innerHTML = "Date";
    row.appendChild(th1);
    var th2 = document.createElement('TH');
    th2.setAttribute('scope', 'col');
    th2.innerHTML = "Description";
    row.appendChild(th2);
    var th3 = document.createElement('TH');
    th3.setAttribute('scope', 'col');
    th3.innerHTML = "Amount";
    row.appendChild(th3);
    var th4 = document.createElement('TH');
    th4.setAttribute('scope', 'col');
    th4.innerHTML = "Category";
    row.appendChild(th4);

    $.getJSON("transactions.json", function(json) {
        // console.log(json); // this will show the info it in firebug console
    
        for (let i = 0; i < json.length; i++) {
            // var tableBody = document.createElement('TBODY');
            // table.appendChild(tableBody);

            row = table.insertRow(i+1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = json[i]['date'];
            cell2.innerHTML= json[i]['name']
            cell3.innerHTML = json[i]['amount']

            // create div 1
            var div_1 = document.createElement('div');
            div_1.className = "dropdown";
            // create button
            var btn = document.createElement('input');
            btn.className = "btn btn-secondary dropdown-toggle"
            btn.type = "button"; 
            btn.id = "dropdownMenuButton" + i;
            btn.setAttribute("data-bs-toggle", "dropdown");
            btn.setAttribute("aria-haspopup", "true");
            btn.setAttribute("aria-expanded", "false");
            btn.value = "Category";
            // create div 2
            var div_2 = document.createElement('div');
            div_2.className = "dropdown-menu";
            div_2.setAttribute("aria-labelledby", btn.id);
            // create anchor tag
            var ul = document.createElement('ul');
            ul.className = "dropdown-menu";
            ul.setAttribute("aria-labelledby", btn.id);
            var li1 = document.createElement('li');
            li1.className = "dropdown-item";
            li1.innerHTML = "Fast Food"
            li1.setAttribute("onclick", `getCategory('${li1.innerHTML}', '${i}')`);
            ul.appendChild(li1);
            var li2 = document.createElement('li');
            li2.className = "dropdown-item";
            li2.innerHTML = "Groceries";
            li2.setAttribute("onclick", `getCategory('${li2.innerHTML}', '${i}')`);
            ul.appendChild(li2);
            var li3 = document.createElement('li');
            li3.className = "dropdown-item";
            li3.innerHTML = "Utilities";
            li3.setAttribute("onclick", `getCategory('${li3.innerHTML}', '${i}')`);
            ul.appendChild(li3);
            var li4 = document.createElement('li');
            var divider = document.createElement('hr');
            divider.className = "dropdown-divider";
            li4.appendChild(divider);
            ul.appendChild(li4);
            var li5 = document.createElement('li');
            li5.className = "dropdown-menu-start";
            ul.appendChild(li5);
            var a = document.createElement('a');
            a.className = "dropdown-item dropdown-toggle";
            a.setAttribute("data-bs-toggle", "dropdown");
            a.innerHTML = "More Options";
            li5.appendChild(a);
            ul.appendChild(li5);
            var ul2 = document.createElement('ul');
            ul2.className = "dropdown-menu shadow";
    
            var li6 = document.createElement('li');
            li6.className = "dropdown-item";
            li6.innerHTML = "Transportation";
            ul2.appendChild(li6);
            a.appendChild(ul2);



            // var a = document.createElement('a');
            // a.className = "dropdown-item dropdown-toggle";
            // a.setAttribute("data-bs-toggle", "dropdown");
            // a.innerHTML = "left";
            // var ul2 = document.createElement('ul');
            // ul2.className = "dropdown-menu shadow";
            // li5.appendChild(ul2);
            // var li_next = document.createElement('li');
            // li_next.className  = "dropdown-item";
            // li_next.innerHTML = categories[0];
            // ul2.appendChild(li_next);
            
            
            div_1.appendChild(btn);
            div_1.appendChild(ul);
            cell4.appendChild(div_1);
            
            
        }
    });

    var myDiv = document.getElementById('transactionsDiv');
    myDiv.appendChild(table);

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



