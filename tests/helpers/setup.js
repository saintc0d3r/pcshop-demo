/**
 * Created by wendysa on 9/14/15.
 */

var wd = require('wd');

require('colors'); // Give colors to command line's outputs

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var should = chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

exports.should = should; // Exports should method to outside
exports.wd = wd; // Exports wd to outside