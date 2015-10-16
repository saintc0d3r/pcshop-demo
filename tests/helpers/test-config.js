/**
 * Created by wendysa on 9/14/15.
 */

// Appium's server config
exports.test_server = {
    host: '127.0.0.1',
    port: 4723
};

// Configure web driver's loggings
exports.configure_logging = function (driver) {
    // See whats going on
    driver.on('status', function (info) {
        console.log(info.cyan);
    });
    driver.on('command', function (meth, path, data) {
        console.log(' > ' + meth.yellow, path.grey, data || '');
    });
    driver.on('http', function (meth, path, data) {
        console.log(' > ' + meth.magenta, path, (data || '').grey);
    });
};

// The location of Mobile apps to test
var apps_to_test = {
    iOS: '/Users/wendysa/Documents/projects/pcshop-demo/platforms/ios/build/emulator/PC Shop.app',
    android: ''
};

// device config to use for testing
exports.test_device = {
    browserName: '',
    'appium-version': '1.4',            // 1.3, 1.4
    platformName: 'iOS',                // iOS or Android
    platformVersion: '8.1',             // iOS: 8.1,8.2,8.3,8.4 Android: 4.1, 4.2, 4.3, etc
    deviceName: 'iPhone Simulator',     // or Android Emulator
    app: apps_to_test.iOS               // app_to_test.iOS or app_to_test.android
};
