var tableNum = 2;
var numberOfRowsInEachTable = [1, 1];
var categoryTotals = [];
var categoriesTemplateList = ["Income", "Savings", "Housing", "Transportation", "Food", "Luna", "Lifestyle", "Health & Fitness", "Insurance", "Debt", "MISC"];
var subcategoriesTemplateList = {"Income": ['Paycheck', 'Side-Hustle', 'Child Tax Credit'], "Savings": ['Emergency Fund', 'Home Maintenance', 'Car Maintenance'], "Housing": ['Mortgage', 'Utilities', 'Internet', 'Home Repairs'], "Transportation": ['Gas', 'Car Repairs', 'Auto Insurance'], "Food": ['Groceries', 'Fast Food', 'Restaurants', 'Beverages'], "Luna": ['Pet Food & Supplies', 'Veterinary'], "Lifestyle": ['Cell Phones', 'Clothes', 'Subscriptions', 'Entertainment'], "Insurance": ['Life Insurance', 'Pet Insurance'], "Debt": ['Student Loans', 'Home Equity Loan', 'Home Depot Project Loan', 'Cassie Capital One', 'Braden Capital One', 'Deseret First Credit', 'Khols Credit'], "MISC": ['MISC'], "Health & Fitness": ['Doctor', 'Pharmacy', 'Dental & Vision Insurance', 'Dentist', 'Eyecare']};

var categories = ["Income", "Transportation"];
var subcategories = {"Income": ['Utah Independent Mortgage'], "Transportation": ['Gas']};

var predictionDictionary = {1: 'Mortgage', 2: 'Utilities', 3: 'Internet', 4: 'Home Repairs', 5: 'Gas', 6: 'Car Repairs', 7: 'Auto Insurance', 8: 'Groceries', 9: 'Fast Food', 10: 'Restaurants', 11: 'Beverages', 12: 'Pet Food & Supplies', 13: 'Veterinary', 14: 'Cell Phones', 15: 'Clothes', 16: 'Subscriptions', 17: 'Entertainment', 18: 'Life Insurance', 19: 'Pet Insurance', 20: 'Student Loans', 21: 'Home Equity Loan', 22: 'Home Depot Project Loan', 23: 'Cassie Capital One', 24: 'Braden Capital One', 25: 'Deseret First Credit', 26: 'Khols Credit', 27: 'MISC', 28: 'Pharmacy', 29: 'Dental & Vision Insurance', 30: 'Eyecare', 31: 'Doctor'}

var nn_predictions;
var numberOfTransactions;

fetch("ai/NeuralNetworkPredictions.json")
    .then(response => response.json())
    .then(data => {
        console.log(data.Predictions)
        nn_predictions = data.Predictions
    })

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
    var rowNumber = numberOfRowsInEachTable[0];
    cell1.innerHTML += `<div id="labelData" class="row_data" edit_type="click" col_name="fname" row=${rowNumber}>Paycheck 1</div>`;
    cell2.innerHTML = `<div id="finData" class="row_data" edit_type="click" col_name="fname" row=${rowNumber}>$0.00</div>`;
    cell3.innerHTML = "$0.00";

    // cell1.children[0].addEventListener("focusout", function(e) {

    //     var newSubcategory = cell1.children[0].innerHTML;

    //     for (let i = 0; i < numberOfTransactions; i++) {
    //         var divID = "Income" + "Menu" + i;
    //         var dropdownMenuButtonID = 'dropdownMenuButton' + i;
    //         var menuItemID = "Income" + newSubcategory + i;
    //         var menuDiv = document.getElementById(divID);
    //         menuDiv.innerHTML += `<a class="dropdown-item" id=${menuItemID} href="#" onclick="getSubcategory(${newSubcategory}, ${dropdownMenuButtonID})">${newSubcategory}</a>`;
            
    //     }

    //     subcategories["Income"].push(newSubcategory);
        
    // });
    
    // alert(Object.values(subcategories));
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
    numberOfRowsInEachTable[tableNumber - 1] += 1;
    var rowNumber = numberOfRowsInEachTable[tableNumber - 1];
    cell1.innerHTML = `<div id="labelData" class="row_data" edit_type="click" col_name="fname" row=${rowNumber}>Label</div>`;
    cell2.innerHTML = `<div id="finData" class="row_data" edit_type="click" col_name="fname" row=${rowNumber}>$0.00</div>`;
    cell3.innerHTML = "$0.00";

    // var category = table.children[0].rows[0].cells[0].children[0].innerHTML;
    // subcategories[category].push("Label");
    
    // subcategories[table.row[0].cells[0].innerHTML].push(cell1.innerHTML);
}

function addTable() {
    var myDiv = document.getElementById("newCategories");
    
    var table = document.createElement('table');
    table.className = "table table-info rounded";
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML += `<div id="categoryName" class="row_data" edit_type="click" col_name="fname">Untitled</div>`;
    cell1.style.fontWeight = 'bold';
    cell1.setAttribute("class", "label");
    cell2.innerHTML = "Planned";
    cell2.style.fontWeight = 'bold';
    cell2.setAttribute("class", "plannedHeader");
    cell3.innerHTML = "Actual";
    cell3.style.fontWeight = 'bold';
    cell3.setAttribute("class", "actualHeader");

    categories.push("Untitled");
    // subcategories["Untitled"].push("Label");

    var row2 = table.insertRow(1);
    var cell4 = row2.insertCell(0);
    var cell5 = row2.insertCell(1);
    var cell6 = row2.insertCell(2);
    cell4.innerHTML = `<div id="labelData" class="row_data" edit_type="click" col_name="fname" row="1">Label</div>`;
    cell5.innerHTML = `<div id="finData" class="row_data" edit_type="click" col_name="fname" row="1">$0.00</div>`;
    cell6.innerHTML = "$0.00";

    var totalRow = table.insertRow(2);
    var cell7 = totalRow.insertCell(0);
    var cell8 = totalRow.insertCell(1);
    var cell9 = totalRow.insertCell(2);
    cell7.innerHTML = "Total";
    cell8.innerHTML = "$0.00";
    cell9.innerHTML = "$0.00";

    // table.setAttribute("border", "4");
    // table.setAttribute("cellpadding", "10");
    // table.setAttribute("cellspacing", "2");
    // table.setAttribute("contenteditable", "true");
    table.style.width = '100%';
    tableNum++;
    var tableName = 'myTable' + tableNum;
    table.setAttribute("id", `${tableName}`);
    myDiv.appendChild(table);

    var button = document.createElement('button');
    button.setAttribute("type", "button");
    button.setAttribute("class", "btn btn-secondary btn-sm");
    button.setAttribute("onclick", `addRowToTable(\'${tableName}\')`);
    button.innerHTML = "Add Item";

    myDiv.appendChild(button);

    numberOfRowsInEachTable.push(1);
    // addTableEventListener(table);

    var addTableButton = document.getElementById("addTableButton");
    addTableButton.remove();
    var addTableButton = document.createElement("button");
    addTableButton.setAttribute("type", "button");
    addTableButton.setAttribute("class", "btn btn-secondary btn-sm");
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
    table = table.parentNode.parentNode.parentNode.parentNode
    var tableNumberString = table.getAttribute("id");
    var tableNumber = tableNumberString.slice(-1);
    
    for (var i = 1; i <= numberOfRowsInEachTable[tableNumber]; i++) {
        console.log("i: " + i);
        var row = table.rows[i];
        var plannedCellString = row.cells[1].children[0].innerText
        var plannedCellValue = parseFloat(plannedCellString.slice(1));
        total += plannedCellValue;

        var subcategory = row.cells[0].children[0].innerText;
        console.log(subcategory);
        // subcategories[i-1] = subcategory;
        // console.log(subcategories);
    }
    
    var numberOfRowsInIncomeTable = numberOfRowsInEachTable[tableNumber];
    table.rows[numberOfRowsInIncomeTable+1].cells[1].innerHTML = '$' + total.toFixed(2);
    categoryTotals[tableNumber] = total;
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

            e.target.style.color = "green";

        console.log("Did Something");
    });
}

function getCategory(category, buttonID) {
    var button = document.getElementById(buttonID);
    button.innerHTML = category;
}

function getSubcategory(category, buttonID) {
    var button = document.getElementById(buttonID);
    button.innerHTML = category;
}

function createSubcategories(div, dropdownMenuButton, i, j, category) {
    
    if (subcategories[category] != null) {
        for (let k = 0; k < subcategories[category].length; k++) {
            var aID = 'subcategory' + i + j + k;
            div.innerHTML += `<a class="dropdown-item" id=${aID} href="#">${subcategories[category][k]}</a>`;
            var item = document.getElementById(`${aID}`);
            item.setAttribute("onclick", `getSubcategory('${item.innerHTML}', '${dropdownMenuButton}')`);
        }
    }
        
    
}

function createMenuCategories(div, dropdownMenuButton, i) {
    
    for (let j = 0; j < categories.length; j++) {
        var category = categories[j];
        var categoryID = "categoryMenu"+ i + "item" + j;
        div.innerHTML += `<div class="dropdown dropstart" id=${categoryID}>`;
        var div2 = document.getElementById(categoryID);
        div2.innerHTML = `<a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">${category}</a>`;
        var divThree = `${category}` + "Menu" + i;
        div2.innerHTML += `<div class="dropdown-menu" aria-labelledby="dropdown-layouts" id=${divThree}>`;
        var div3 = document.getElementById(`${divThree}`);
        createSubcategories(div3, dropdownMenuButton, i, j, category);
    }
    
}

var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

function transactionsButton() {
    // transactions table used to be on different html page  
    // window.location.href = "transactionsPage.html";

    // create transactions table
    var table = document.createElement('table');
    table.setAttribute('class', 'table table-info rounded');
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
    $.getJSON("newFilteredTransactions.json", function(json) {
        
        numberOfTransactions = json.length;

        for (let i = 0; i < json.length; i++) {

            row = table.insertRow(i+1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);

            var date = json[i]['date']

            cell1.innerHTML = date.slice(5);
            cell2.innerHTML= json[i]['merchant_name'];
            cell3.innerHTML = json[i]['amount'];

            // create category multi-level dropdown button for cell4
            var divOne = "div1" + i;
            cell4.innerHTML = `<div class="dropdown" id=${divOne}></div>`;
            var div1 = document.getElementById(`${divOne}`);
            var dropdownMenuButton = "dropdownMenuButton" + i;
            div1.innerHTML = `<button class="btn btn-light dropdown-toggle" type="button" id=${dropdownMenuButton} data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</button>`;
            var divTwo = "div2" + i;
            div1.innerHTML += `<div class="dropdown-menu" aria-labelledby=${dropdownMenuButton} id=${divTwo}>`;
            var div2 = document.getElementById(`${divTwo}`);
            var levelOneItemOne = "prediction1" + i;
            div2.innerHTML = `<a class="dropdown-item" href="#" id=${levelOneItemOne}>Fast Food</a>`;
            var firstPrediction = document.getElementById(levelOneItemOne);
            firstPrediction.innerHTML = predictionDictionary[nn_predictions[i][0]];
            var prediction1 = document.getElementById(`${levelOneItemOne}`);
            prediction1.setAttribute("onclick", `getCategory('${prediction1.innerHTML}', '${dropdownMenuButton}')`);
            var levelOneItemTwo = "prediction2" + i;
            var secondPrediction = predictionDictionary[nn_predictions[i][1]];
            div2.innerHTML += `<a class="dropdown-item" href="#" id=${levelOneItemTwo}>${secondPrediction}</a>`;
            var prediction2 = document.getElementById(`${levelOneItemTwo}`);
            prediction2.setAttribute("onclick", `getCategory('${prediction2.innerHTML}', '${dropdownMenuButton}')`);
            var levelOneItemThree = "prediction3" + i;
            var thirdPrediction = predictionDictionary[nn_predictions[i][2]];
            div2.innerHTML += `<a class="dropdown-item" href="#" id=${levelOneItemThree}>${thirdPrediction}</a>`;
            var prediction3 = document.getElementById(`${levelOneItemThree}`);
            prediction3.setAttribute("onclick", `getCategory('${prediction3.innerHTML}', '${dropdownMenuButton}')`);
            var divThree = "div3" + i;
            div2.innerHTML += `<div class="dropdown" id=${divThree}>`;
            var div3 = document.getElementById(`${divThree}`);
            div3.innerHTML = `<a class="dropdown-item dropdown-toggle" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Custom</a>`;
            var divFour = "categoryMenu" + i;
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

    return income - expenses
}



window.onload = function() {
    var x = document.getElementById("firstCell").innerText;
    console.log(x);
    var budgetTotal = document.createElement('h2');
    budgetTotal.className = "display-6";
    
    var span = document.createElement('span');
    span.innerHTML = x;
    var span2 = document.createElement('span');
    budgetTotal.appendChild(span);
    budgetTotal.appendChild(span2);
    var headerDiv = document.getElementById("budgetTotal");
    headerDiv.appendChild(budgetTotal);

    // insert zero for first two tables
    categoryTotals[0] = 0;   
    categoryTotals[1] = 0;

    //--->make div editable > start
    $(document).on('click', '.row_data', function(event) 
    {
        event.preventDefault(); 

        if($(this).attr('edit_type') == 'button')
        {
            return false; 
        }

        //make div editable
        $(this).closest('div').attr('contenteditable', 'true');
        //add bg css
        $(this).addClass('bg-light').css('padding','5px');

        $(this).focus();
    })	
    //--->make div editable > end

    //--->save single field data > start
    $(document).on('focusout', '.row_data', function(event) 
    {
        event.preventDefault();

        if($(this).attr('edit_type') == 'button')
        {
            return false; 
        }

        var row_id = $(this).closest('tr').attr('row_id'); 
        
        var row_div = $(this)				
        .removeClass('bg-light') //add bg css
        .css('padding','')

        var col_name = row_div.attr('col_name'); 
        var col_val = row_div.html(); 
        
        var arr = {};
        arr[col_name] = col_val;

        //use the "arr"	object for your ajax call
        $.extend(arr, {row_id:row_id});

        //out put to show
        $('.post_msg').html( '<pre class="bg-success">'+JSON.stringify(arr, null, 2) +'</pre>');

        if (event.target.id == "finData") {
            incomeTotals(event.target);
            
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
        }
        if (event.target.id == "categoryName") {
            var table = event.target.parentNode.parentNode.parentNode.parentNode
            var tableNumberString = table.getAttribute("id");
            var tableNumber = tableNumberString.slice(-1);
            var category = event.target.innerHTML;
            categories[tableNumber - 1] = category;
            
            // Adding categoryName to all dropdown menus
            for (let i = 0; i < numberOfTransactions; i++) {
                var divID = "categoryMenu" + i;
                var menuItemID = divID + "item" + (categories.length - 1);
                var menuDiv = document.getElementById(divID);
                menuDiv.innerHTML += `<div class="dropdown dropstart" id=${menuItemID}></div>`;
                var menuDivCategoryName = document.getElementById(menuItemID);
                menuDivCategoryName.innerHTML += `<a class="dropdown-item dropdown-toggle show" href="#" id="dropdown-layouts" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="true">${category}</a>`;
            }

            if (numberOfRowsInEachTable[tableNumber - 1] == 1) {
                subcategories[category] = ["Label"];
            }
        }
        if (event.target.id == "labelData") {
            var newSubcategory = event.target.innerHTML;
            let table = event.target.parentNode.parentNode.parentNode.parentNode;
            var category = table.rows[0].cells[0].children[0].innerHTML;

            for (let i = 0; i < numberOfTransactions; i++) {
                var divID = category + "Menu" + i;
                var dropdownMenuButtonID = 'dropdownMenuButton' + i;
                var menuItemID = category + newSubcategory + i;
                var menuDiv = document.getElementById(divID);
                menuDiv.innerHTML += `<a class="dropdown-item" id=${menuItemID} href="#" onclick="getSubcategory(${newSubcategory}, ${dropdownMenuButtonID})">${newSubcategory}</a>`;

            }
            
            var rowNumber = event.target.getAttribute("row");
            subcategories[category][rowNumber - 1] = newSubcategory;
            // alert(subcategories[category]);
            // alert(rowNumber)
        }
    });	
    //--->save single field data > end
}



