import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from '../webpack.config';
import Schema from './schema';
import { graphql } from 'graphql';
import bodyParser from 'body-parser';

const {
  NODE_ENV,
  PORT = "3002"
} = process.env;
const IS_PRODUCTION = NODE_ENV === "production"; 

// Configure webpck dev server
const devServer = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: !IS_PRODUCTION,
  compress: IS_PRODUCTION,
  historyApiFallback: true,
  setup(app) {
    app.use(bodyParser.json());
    var cors = require('cors');

    app.use(cors());
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

      if(req.url === '/graphql' && req.method === "POST") {
        // Executing the GraphQL query
        const {query, variables} = req.body;
        graphql(Schema, query, null, variables).then(result => {
          res.send(result);
        });
      } else {
        next();
      }
    });
  }
});

devServer.listen(PORT, (err, result) => {
  if(err) {
    throw err;
  }

  console.log(`Listening at localhost:${PORT}`);
});

