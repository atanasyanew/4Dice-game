/**
 *
 *
 *   - CORRESPONDENCE WITH SERVER API
 *   
 *      Create user
 *      Login 
 *      Logout 
 *      Add high score
 *      Get top 10 high scores
 *      Get user's high scores
 *   
 */  


function UserApi() {

        this.url = "http://193.10.30.163";

        this.user = {};

        this.topScores;

        this.userScores;
    
        // this.user:
        //      "email": "",
        //      "username": "",
        //      "password": "",
        //      "firstName": "",
        //      "lastName": "",
        //      "session": ""

    };


    UserApi.prototype.login = function(email, password) {
        let self = this;
        let request = new XMLHttpRequest();
        let url = this.url + "/users/login";
        let login = {
            "email": email,
            "password": password
        };

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function() {

            if (this.status == "200") {
                self.user = JSON.parse(request.responseText);
            } else {
                console.log("somthink went wrong, try again!");
            }

        });

        request.send(JSON.stringify(login));
    }

    UserApi.prototype.createUser = function(email, username, password, firstName, lastName) {
        let request = new XMLHttpRequest();
        let url = this.url + "/users";

        let register = {
            "email": email,
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName
        };

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/json");
        request.addEventListener("load", function() {

            if (this.status == "200") {
                console.log("user created");
                console.log(request.responseText);
            } else {
                console.log(this.status);
                console.log("somthink went wrong, try again!");
            }

        });

        request.send(JSON.stringify(register));
    }

    UserApi.prototype.logout = function() {
        let self = this;
        let request = new XMLHttpRequest();
        let url = this.url + "/users/logout";

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/xml");
        request.addEventListener("load", function() {

            if (this.status == "200") {
                console.log("successfully logged out");
                console.log(request.responseText);
                self.user = {
                    "logged out": true
                };
            } else {
                console.log("somthink went wrong, try again!");
            }

        });

        request.send("<data><session>" + this.user.session + "</session></data>");
    }

    UserApi.prototype.addScore = function(score) {
        let self = this;
        let request = new XMLHttpRequest();
        let url = this.url + "/users/" + this.user.username;

        request.open("POST", url, true);
        request.setRequestHeader("Content-Type", "application/xml");
        request.addEventListener("load", function() {

            if (this.status == "200") {
                console.log("added score");
                console.log(request.responseText);
            } else {
                console.log("somthink went wrong, try again!");
            }

        });

        let msg = "<data><session>" + this.user.session + "</session>";
        msg += "<score>" + score + "</score></data>";
        console.log(msg);
        request.send(msg);
    }



    //      Create user
    //      Login 
    //      Logout 
    //      Add high score
    //      Get top 10 high scores
    //      Get user's high scores



    var api = new UserApi();





    /*
    var request = new XMLHttpRequest();
    request.open("POST", "http://193.10.30.163/users/login", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", function() {
        if (request.status == "200") {
        console.log("We got response from server!");
        console.log("Status code: ", request.status);
        console.log("Body: ", request.responseText);
        } else {
            console.log("somthink went wrong, try again!");
        }
    });
    
    request.send('{"email": "aytest@aytest.com", "password": "aytest"}');
*/
    //create users
    //
    //    {
    //        "email": "aytest@aytest.com",
    //        "username": "aytest",
    //        "password": "aytest",
    //        "firstName": "aytest",
    //        "lastName": "aytest"
    //    }

    //check error codes, 
    // 200 OK The user was created.
    // 422:
    //    • emailTaken – There already exists a user with the given email.
    //    • usernameTaken – There already exists a user with the given username.
    //    • passwordEmpty – The empty string is not allowed as password.

    //  /users/login
    //    {
    //        "email": "aytest@aytest.com",
    //        "password": "aytest"
    //    }
    //401 Unauthorized - No account with the given email and password were found

    // POST /users/logout HTTP/1.1 Content-Type: application/xml
    //    <?xml version="1.0"?> 
    //        <data> 
    //        <session>b47...cc3</session>  //53edb04e2a3fcf0d954bfc025ca082ff
    //    </data>








    // works but have to change the method
    //    UserApi.prototype.getTopScores = function() {
    //
    //        let self = this;
    //        let url = this.url + "/scores?callback=toptenplayers&session=" + this.user.session;
    //        let request = new XMLHttpRequest();
    //
    //        request.open("GET", url, true);
    //        request.setRequestHeader("Content-Type", "application/javascript");
    //
    //        request.addEventListener("load", function() {
    //
    //            if (this.status == "200") {
    //                self.topScores = request.responseText;
    //                console.log(request.responseText);
    //            } else {
    //                console.log("somthink went wrong, try again!");
    //            }
    //
    //        });
    //
    //        request.send();
    //    }

    //    UserApi.prototype.getUserScores = function() {
    //
    //        let self = this;
    //        let url = this.url + "/scores/" + this.user.username + "?callback=playertopscore&session=" + this.user.session;
    //        let request = new XMLHttpRequest();
    //
    //        request.open("GET", url, true);
    //        request.setRequestHeader("Content-Type", "application/javascript");
    //
    //        request.addEventListener("load", function() {
    //
    //            if (this.status == "200") {
    //                self.userScores = request.responseText;
    //                console.log(request.responseText);
    //            } else {
    //                console.log("somthink went wrong, try again!");
    //            }
    //
    //        });
    //
    //        request.send();
    //    }
