var steps = [];
var testindex = 0;
var loadInProgress = false;
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36';
page.settings.javascriptEnabled = true;
page.settings.loadImages = false;//Script is much faster with this field set to false
phantom.cookiesEnabled = true;
phantom.javascriptEnabled = true;

steps = [
    function() {
        console.log("Step 1 - Open Home Page");
        page.open("https://venmo.com/", function(status) {

        });
    },

    function() {
        console.log("Step 2 - Click the Sign in Button");
        page.evaluate(function() {
            document.getElementsByClassName("sign-in")[0].click();
        });
    },

    function() {
        console.log("Step 3 - Fill in login form and submit it");
        page.evaluate(function() {
            document.querySelector("input[name='username']").value = process.env.username;
            document.querySelector("input[name='password']").value = process.env.password;
            document.getElementsByClassName("login")[0].click();
            console.log("Success Login");
        });
    },

    function() {
        console.log("Step 4 - Wait to login. Woo");
        var fs = require('fs');
        var result = page.evaluate(function() {
            return document.querySelectorAll("html")[0].outerHTML;
        });
        fs.write('VenmoLoggedIn.html', result, 'w');
    },
];

interval = setInterval(executeRequestsStepByStep, 5000);

function executeRequestsStepByStep(){
    if (loadInProgress == false && typeof steps[testindex] == "function") {
        steps[testindex]();
        testindex++;
    }
    if (typeof steps[testindex] != "function") {
        console.log("test complete!");
        phantom.exit();
    }
}

/**
 * These listeners are very important in order to phantom work properly. Using these listeners, we control loadInProgress marker which controls, weather a page is fully loaded.
 * Without this, we will get content of the page, even a page is not fully loaded.
 */
page.onLoadStarted = function() {
    loadInProgress = true;
    console.log('Loading started');
};
page.onLoadFinished = function() {
    loadInProgress = false;
    console.log('Loading finished');
};
page.onConsoleMessage = function(msg) {
    console.log(msg);
};
