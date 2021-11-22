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
    
    var table = document.createElement('table');
    table.className = "table";
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

    var addTableButton = document.getElementById("addTableButton");
    addTableButton.remove();
    var addTableButton = document.createElement("button");
    addTableButton.setAttribute("type", "button");
    addTableButton.setAttribute("onclick", "addTable()");
    addTableButton.setAttribute("id", "addTableButton");
    addTableButton.innerHTML = "+ ADD GROUP";

    myDiv.appendChild(document.createElement('br'));
    myDiv.appendChild(document.createElement('br'));
    myDiv.appendChild(document.createElement('br'));
    myDiv.appendChild(addTableButton);

    // innerHTML += broke all my table event listeners for some reason
    // myDiv.innerHTML += `<br><br><br>`;
    // myDiv.innerHTML += `<button type="button" onclick="addTable()" id="addTableButton">+ ADD GROUP</button>`;
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

function getCategory(category, buttonID) {
    var button = document.getElementById(buttonID);
    // alert(buttonID);
    button.innerHTML = category;
}

function createMenuCategories(div, dropdownMenuButton, i) {
    
    for (let j = 0; j < categories.length; j++) {
        var category = categories[j];
        var categoryID = "category" + j + i;
        div.innerHTML += `<a class="dropdown-item" href="#" id=${categoryID}>${category}</a>`;
        var item = document.getElementById(`${categoryID}`);
        item.setAttribute("onclick", `getCategory('${item.innerHTML}', '${dropdownMenuButton}')`);
        // alert(dropdownMenuButton);
    }
    
}

function transactionsButton() {
    // transactions table used to be on different html page  
    // window.location.href = "transactionsPage.html";

    // create transactions table
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

    // read transactions from json file and
    // populate all rows in transactions table
    $.getJSON("transactions.json", function(json) {
    
        for (let i = 0; i < json.length; i++) {

            row = table.insertRow(i+1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = json[i]['date'];
            cell2.innerHTML= json[i]['name']
            cell3.innerHTML = json[i]['amount']

            // create category multi-level dropdown button for cell4
            var divOne = "div1" + i;
            cell4.innerHTML = `<div class="dropdown" id=${divOne}></div>`;
            var div1 = document.getElementById(`${divOne}`);
            var dropdownMenuButton = "dropdownMenuButton" + i;
            div1.innerHTML = `<button class="btn btn-light dropdown-toggle" type="button" id=${dropdownMenuButton} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
        </button>`;
            var divTwo = "div2" + i;
            div1.innerHTML += `<div class="dropdown-menu" aria-labelledby=${dropdownMenuButton} id=${divTwo}>`;
            var div2 = document.getElementById(`${divTwo}`);
            var levelOneItemOne = "prediction1" + i;
            div2.innerHTML = `<a class="dropdown-item" href="#" id=${levelOneItemOne}>Fast Food</a>`;
            var prediction1 = document.getElementById(`${levelOneItemOne}`);
            prediction1.setAttribute("onclick", `getCategory('${prediction1.innerHTML}', '${dropdownMenuButton}')`);
            var levelOneItemTwo = "prediction2" + i;
            div2.innerHTML += `<a class="dropdown-item" href="#" id=${levelOneItemTwo}>Groceries</a>`;
            var prediction2 = document.getElementById(`${levelOneItemTwo}`);
            prediction2.setAttribute("onclick", `getCategory('${prediction2.innerHTML}', '${dropdownMenuButton}')`);
            var levelOneItemThree = "prediction3" + i;
            div2.innerHTML += `<a class="dropdown-item" href="#" id=${levelOneItemThree}>Utilities</a>`;
            var prediction3 = document.getElementById(`${levelOneItemThree}`);
            prediction3.setAttribute("onclick", `getCategory('${prediction3.innerHTML}', '${dropdownMenuButton}')`);
            var divThree = "div3" + i;
            div2.innerHTML += `<div class="dropdown dropstart" id=${divThree}>`;
            var div3 = document.getElementById(`${divThree}`);
            div3.innerHTML = `<a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Custom</a>`;
            var divFour = "div4" + i;
            div3.innerHTML += `<div class="dropdown-menu" aria-labelledby="dropdown-layouts" id=${divFour}>`;
            var div4 = document.getElementById(`${divFour}`);
            createMenuCategories(div4, dropdownMenuButton, i);

            /************* Optional 3rd Level Dropdown **************/
            // div4.innerHTML += `<div class="dropdown-divider"></div>`;
            // div4.innerHTML += `<div class="dropdown dropstart" id="div5">`;
            // var div5 = document.getElementById("div5");
            // div5.innerHTML = `<a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Custom</a>`;
            // div5.innerHTML += `<div class="dropdown-menu" aria-labelledby="dropdown-layouts" id="div6">`;
            // var div6 = document.getElementById("div6");
            // div6.innerHTML = `<a class="dropdown-item" href="#">Fullscreen</a>`;
            // div6.innerHTML += `<a class="dropdown-item" href="#">Empty</a>`;
            // div6.innerHTML += `<div class="dropdown-divider"></div>`;
            // div6.innerHTML += `<a class="dropdown-item" href="#">Magic</a>`;

            // magic script that keeps dropdown from closing
            // when clicking on the next level
            (function($bs) {
                const CLASS_NAME = 'has-child-dropdown-show';
                $bs.Dropdown.prototype.toggle = function(_orginal) {
                    return function() {
                        document.querySelectorAll('.' + CLASS_NAME).forEach(function(e) {
                            e.classList.remove(CLASS_NAME);
                        });
                        let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
                        for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                            dd.classList.add(CLASS_NAME);
                        }
                        return _orginal.call(this);
                    }
                }($bs.Dropdown.prototype.toggle);
            
                document.querySelectorAll('.dropdown').forEach(function(dd) {
                    dd.addEventListener('hide.bs.dropdown', function(e) {
                        if (this.classList.contains(CLASS_NAME)) {
                            this.classList.remove(CLASS_NAME);
                            e.preventDefault();
                        }
                        e.stopPropagation(); // do not need pop in multi level mode
                    });
                });
            
                // for hover
                document.querySelectorAll('.dropdown-hover, .dropdown-hover-all .dropdown').forEach(function(dd) {
                    dd.addEventListener('mouseenter', function(e) {
                        let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                        if (!toggle.classList.contains('show')) {
                            $bs.Dropdown.getOrCreateInstance(toggle).toggle();
                            dd.classList.add(CLASS_NAME);
                            $bs.Dropdown.clearMenus();
                        }
                    });
                    dd.addEventListener('mouseleave', function(e) {
                        let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
                        if (toggle.classList.contains('show')) {
                            $bs.Dropdown.getOrCreateInstance(toggle).toggle();
                        }
                    });
                });
            })(bootstrap);    
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
    
    // var newCategoriesDiv = document.getElementById("newCategories");
    // newCategoriesDiv.innerHTML += `<br>`;
    // newCategoriesDiv.innerHTML += `<br>`;
    // newCategoriesDiv.innerHTML += `<br>`;
    // newCategoriesDiv.innerHTML += `<button type="button" onclick="addTable()" id="addTableButton">+ ADD GROUP</button>`;

}



