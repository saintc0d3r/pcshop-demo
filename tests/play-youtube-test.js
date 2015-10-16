/**
 * Created by wendysa on 9/14/15.
 */

require('./helpers/setup');

var testConfig = require('./helpers/test-config');

describe("Tests for Playing youtube video feature", function(){
    var driver;

    /**
     * Setup
     */
    before(function(){
        driver = wd.promiseChainRemote(testConfig.test_server);
        testConfig.configure_logging(driver);
        return driver.init(testConfig.test_device);
    });

    /**
     * Tear down
     */
    after(function(){
        return driver.quit();
    });

    // TODO: add specs here
    it("should be able playing youtube video of an feed's item", function(){
        // TODO: Implement this
    });
});