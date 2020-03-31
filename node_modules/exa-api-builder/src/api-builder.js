
'use strict';

const util = require('util');
const ExpressApiBuilder = require('./express-api-builder');
const AwsLambdaApiBuilder = require('./aws-lambda-api-builder');

module.exports = class ApiBuilder {

	constructor() {}

	build(options) {
		if(options.aws) {
			return new AwsLambdaApiBuilder(options);
		} else if(options.express) {
			return new ExpressApiBuilder(options);
		}
	}
};
