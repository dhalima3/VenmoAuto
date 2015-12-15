var page = require('webpage').create();
var system = require('system');
var username = "XXXXXX"
var password = "XXXXXX"

page.open('https://venmo.com/', function(status) {
    var status = page.evaluate(function() {
        if (document.title == "Venmo - Share Payments") {
            document.getElementsByClassName("sign-in").click();
            document.querySelector("input[name='username']").value = username;
            document.querySelector("input[name='password']").value = password;
            document.getElementsByClassName("login").click();
            console.log("logged in");
        }
    });

    window.setTimeout(function() {
        phantom.exit();
    }, 5000);
});
