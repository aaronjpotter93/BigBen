var accessToken = "access-development-5c1f0a50-38e4-4815-b6ce-c4953760d635";
var itemID = "ALnaJQVAZKu0rJnd450asQA1Yp7vQYT6OxqEk";

// Using Express
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors')
const corsOptions ={
  origin:'*',
  credentials:true,
  optionSuccessStatus:200,
}
app.use(cors(corsOptions));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const configuration = new Configuration({
    basePath: PlaidEnvironments['development'],
    baseOptions: {
      headers: {
        'PLAID-CLIENT-ID': '6144b210d9409600107b5f46',
        'PLAID-SECRET': '95f7393cbfd85793fa1a16c25ae223',
      },
    },
  });

const plaidClient = new PlaidApi(configuration);

// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

app.post('/api/create_link_token', async function(req, res) {
  var request = {
    user: {
        client_user_id: 'user-id',
    },
    client_name: 'Plaid Test App',
    products: ['auth'],
    country_codes: ['US'],
    language: 'en',
    webhook: 'http://localhost:8080',
    account_filters: {
        depository: {
            account_subtypes: ['checking', 'savings'],
        },
    },
};
    try {
        const createTokenResponse = await plaidClient.linkTokenCreate(request);
        res.json(createTokenResponse.data);
        console.log('createLinkToken function called')
        // res.send("POST request called");
        
      } catch (error) {
        console.log('an error occured calling createLinkToken function')
      }
});

app.post(
  '/api/exchange_public_token',
  async function (request, response, next) {
    const publicToken = request.body.public_token;
    console.log(publicToken);
    console.log(request.body);
    try {
      console.log('Exchange function called');
      const response = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
      accessToken = response.data.access_token;
      itemID = response.data.item_id;
      console.log(accessToken);
      console.log(itemID);
      
    } catch (error) {
      // handle error
      console.log('error occured with exchanging public token');
    }
  },
);

app.listen(1234, function(err) {
  if(err) console.log(err);
  console.log("Server listening on PORT 1234");
});

// Pull transactions for a date range
app.post('/api/get_transactions', async function(req, res) {
  var request = {
    access_token: accessToken,
    start_date: '2018-06-28',
    end_date: '2021-09-28',
    options: {
        count: 250,
        offset: 0,
    },
  };
  try {
    const response = await plaidClient.transactionsGet(request);
    const transactions = response.data.transactions;
    res.json(transactions);
    console.log(transactions);
  } catch(err) {
  // handle error
  }
});

async function searchInstitution(insitutionID) {
  const request = {
    institution_id: insitutionID,
    country_codes: ['US'],
  };
  try {
    const response = await plaidClient.institutionsGetById(request);
    const institution = response.data.institution;
    console.log(institution);
  } catch (error) {
    // Handle error
  }
}

searchInstitution("ins_113809");



