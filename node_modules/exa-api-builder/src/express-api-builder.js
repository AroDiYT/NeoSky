'use.strict'

const cors = require('cors');
const uuid = require('uuid/v4');
const express = require('express');
const bodyParser = require('body-parser');
const httpContext = require('express-http-context');

module.exports = function ExpressApiBuilder(options) {

  let supportedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    app = express(),
    router = express.Router(),
    postDeploySteps = {},
    self = this;

  this.environemnt = undefined;

  app.use(bodyParser.json({
    type: 'application/json'
  }));
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use((req, res, next) => {
    if (self.environemnt) {
      let route = req.path.replace('/', '');
      req.env = this.environemnt[route].variables;
    } else {
      req.env = {};
    }
    next();
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send(err);
  });
  if (options.cors.enabled) {
    app.use(cors(options.cors.config || {}));
  }
  app.use('/', router);
  router.use(httpContext.middleware);

  self.addPostDeployStep = function (name, stepFunction) {
    if (typeof name !== 'string') {
      throw new Error('addPostDeployStep requires a step name as the first argument');
    }
    if (typeof stepFunction !== 'function') {
      throw new Error('addPostDeployStep requires a function as the second argument');
    }
    if (postDeploySteps[name]) {
      throw new Error(`Post deploy hook "${name}" already exists`);
    }
    postDeploySteps[name] = stepFunction;
  };

  self.addPostDeployConfig = function (stageVarName, prompt, configOption) {

  };

  self.postDeploy = function (options, environmentDetails, utils) {
    const steps = Object.keys(postDeploySteps),
      stepResults = {},
      executeStepMapper = function (acc, stepName) {
        acc.push(Promise.resolve()
          .then(() => postDeploySteps[stepName](options, environmentDetails, utils))
          .then(result => stepResults[stepName] = result));
        return acc;
      };
    if (!steps.length) {
      return Promise.resolve(false);
    }
    let promises = steps.reduce(executeStepMapper, []);
    return Promise.all(promises).then(() => stepResults);
  };

  self.defineEnvironment = function (environemnt) {
    self.environemnt = environemnt;
  };

  setUpHandler = function (method) {
    let m = method.toLowerCase();
    self[m] = function (route, handler, options) {
      let canonicalRoute = route;
      if (!/^\//.test(canonicalRoute)) {
        canonicalRoute = '/' + route;
      }
      var responseHandler = (req, res, next) => {
        httpContext.set('traceId', uuid());
        handler(req).then(r => res.send(r)).catch(e => next(e));
      };

      switch (m) {
        case 'get':
          router.get(canonicalRoute, responseHandler);
          break;
        case 'post':
          router.post(canonicalRoute, responseHandler);
          break;
        case 'put':
          router.put(canonicalRoute, responseHandler);
          break;
        case 'delete':
          router.delete(canonicalRoute, responseHandler);
          break;
        case 'head':
          router.head(canonicalRoute, responseHandler);
          break;
        case 'patch':
          router.patch(canonicalRoute, responseHandler);
          break;
      }
    };
  };
  ['ANY'].concat(supportedMethods).forEach(setUpHandler);
  let port = options.port || 3000;
  app.listen(port, () => console.log(`exa APIs listening on port ${port}!`));
}