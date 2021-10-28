  
var tokenFromServer = async function() {
    var resultToken = (await $.post('http://localhost:1234/api/create_link_token')).link_token;
    console.log(resultToken);

    const linkHandler = Plaid.create({
        token: resultToken,
        onSuccess: (public_token, metadata) => {
          // Send the public_token to your app server.
          $.post('http://localhost:1234/api/exchange_public_token', {
            public_token: public_token,
          });
        },
        onExit: (err, metadata) => {
          // Optionally capture when your user exited the Link flow.
          // Storing this information can be helpful for support.
        },
        onEvent: (Event, metadata) => {
          // Optionally capture Link flow events, streamed through
          // this callback as your users connect an Item to Plaid.
          console.log(Event);
          if (Event == "HANDOFF") {
            getTransactions();
          }
        },
    });
    linkHandler.open();
  
}

function postTransactionsToWindow(transactions) {
    for (let index = 0; index < transactions.length; index++) {
      const transaction_date = JSON.stringify(transactions[index].date);
      const transaction_name = JSON.stringify(transactions[index].name);
      const transaction_amount = JSON.stringify(transactions[index].amount);
      var div = document.getElementById('transactionsDiv');
      div.innerHTML += transaction_date + " " + transaction_name + " " + transaction_amount;
      
      // document.body.appendChild(document.createElement('br'));
    }
};

var getTransactions = async function(request, response) {
  var transactions = (await $.post('http://localhost:1234/api/get_transactions'));
  console.log(transactions);
  postTransactionsToWindow(transactions);
};









