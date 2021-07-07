const express = require('express');
const Http = require('http');
const { default: ParseServer, ParseGraphQLServer } = require('parse-server');
const ParseDashboard = require('parse-dashboard');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const SimpleSendGridAdapter = require('parse-server-sendgrid-adapter');
const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const routes = require('./routes/index');

// env values
const server = process.env.PARSE_SERVER_URL;
const appName = process.env.APP_NAME;
const databaseURI = process.env.DATABASE_URI;
const appID = process.env.APP_ID;
const masterKey = process.env.MASTER_KEY;
const parseURL = `/${process.env.PARSE_API_MOUNT}`;
const graphqlMountPoint = `/${process.env.GRAPHQL_API_MOUNT}`;
const dasboardURL = `/${process.env.PARSE_DASHBOARD_MOUNT}`;
const port = process.env.PORT;
const serverURL = `${server}:${port}${parseURL}`;
const graphqlURL = `${server}:${port}${graphqlMountPoint}`;
const dbDashboard = `${server}:${port}${dasboardURL}`;

if (server && appName && databaseURI && appID && masterKey && parseURL && dasboardURL && port) {
  console.log('server started successfully, up & running ..!');
  console.log(serverURL);
} else {
  console.log('Error in starting server ');
}

// app setup

const app = express();

// CORS handler
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

const parseServer = new ParseServer({
  publicServerURL: serverURL,
  appName,
  emailAdapter: SimpleSendGridAdapter({
    apiKey: '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',
    fromAddress: 'sanjeev.extrabox@gmail.com',
  }),
  databaseURI,
  cloud: `${__dirname}/cloud/main.js`,
  appId: appID,
  masterKey,
  serverURL,
  liveQuery: {
    classNames: ['Posts', 'Comments'], // List of classes to support for query subscriptions
  },
});

const options = { allowInsecureHTTP: true };
const parseDashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL,
        graphQLServerURL: graphqlURL,
        appId: appID,
        masterKey,
        appName,
      },
    ],
    users: [
      {
        user: 'one',
        pass: 'one',
      },
    ],
    // "useEncryptedPasswords": true
  },
  options,
);
const parseGraphQLServer = new ParseGraphQLServer(
  parseServer,
  {
    graphQLPath: '/graphql',
    // playgroundPath: '/playground'
  }
);

parseGraphQLServer.applyGraphQL(app);
// parseGraphQLServer.applyPlayground(app);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, '/public')));
app.use(parseURL, parseServer.app);
app.use(dasboardURL, parseDashboard);
app.use(routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error responder
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send({
    message: err.message,
  });
});
const httpServer = Http.createServer(app);
mongoose
  .connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`REST API running on ${serverURL}`);
      console.log(`GraphQL API running on ${graphqlURL}`);
      console.log(`Dashboard running on ${dbDashboard}`);
    });
  })
  .catch(() => {
    console.log('error in connecting with db..');
  });
  // httpServer.listen(port, () => {
  //   console.log(`REST API running on ${serverURL}`);
  //   console.log(`GraphQL API running on ${graphqlURL}`);
  //   console.log(`Dashboard running on ${dbDashboard}`);
  //   ParseServer.createLiveQueryServer(httpServer);
  // });

// This will enable the Live Query real-time server

