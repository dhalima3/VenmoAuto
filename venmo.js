var page = require('webpage').create();

page.open('https://venmo.com/', function(status) {
    var status = page.evaluate(function() {
        if (document.title == "Venmo - Share Payments") {
            document.getElementsByClassName("sign-in").click();
            document.querySelector("input[name='username']").value = process.env.username;
            document.querySelector("input[name='password']").value = process.env.password;
            document.getElementsByClassName("login").click();
            console.log("logged in");
        }
    });

    window.setTimeout(function() {
        phantom.exit();
    }, 5000);
});
