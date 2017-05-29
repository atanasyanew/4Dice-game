/**
 *
 *
 *   - CORRESPONDENCE WITH SERVER API
 *   
 */


function UserApi() {

    this.url = "http://193.10.30.163";

    this.user = {};
};

UserApi.prototype.logout = function () {
    let self = this;
    let request = new XMLHttpRequest();
    let url = this.url + "/users/logout";

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/xml");
    request.addEventListener("load", function () {

        if (this.status == "200") {
            window.location.hash = "playgraund";
            window.location.reload();
        } else {
            alert("Somthink went wrong, try again!");
        }

    });

    request.send("<data><session>" + this.user.session + "</session></data>");
}

UserApi.prototype.getTopScores = function () {

    let scriptTopScore = document.createElement("script");
    scriptTopScore.src = this.url + "/scores?callback=displayTopScore&session=" + this.user.session;
    document.head.appendChild(scriptTopScore);

}

UserApi.prototype.getPlayerScores = function () {

    let scriptMyScore = document.createElement("script");
    scriptMyScore.src = this.url + "/scores/" + this.user.username + "?callback=displayMyTopScore&session=" + this.user.session;
    document.head.appendChild(scriptMyScore);

}

UserApi.prototype.addScore = function (score) {

    let self = this;
    let request = new XMLHttpRequest();
    let url = this.url + "/scores/" + this.user.username;

    request.open("POST", url, true);
    request.setRequestHeader("Content-Type", "application/xml");
    request.addEventListener("load", function () {

                if (this.status == "200") {
                    alert("Hey, Congratulations score is added");
                    //refresh the list
                    self.getTopScores();
                    self.getPlayerScores();
                } else {
                    alert("Somthink went wrong, try again!");
                }
    });

    var xmlString = '<?xml version="1.0" encoding="UTF-8"?><data><session>' + this.user.session + '</session><score>' + score + '</score></data>';
    request.send(xmlString);
}

// callback function for rendering player scores data
function displayMyTopScore(response) {

    let dataTable = document.getElementById("tableMyTopScore");
    let tableBody = "";
    let scoresData = response.data.scores;

    if (response.status == "200" && scoresData.length != 0) {
        let scoresData = response.data.scores;

        for (var i = 0; i < scoresData.length; i++) {

            tableBody += "<tr class=\"item\">";

            for (var prop in scoresData[i]) {
                if (prop == "addedAt") {
                    let theDate = new Date(scoresData[i][prop] * 1000).toGMTString();
                    tableBody += "<td nowrap>" + theDate + "</td>";
                } else {
                    tableBody += "<td nowrap>" + scoresData[i][prop] + "</td>";
                }
            }
            tableBody += "</tr>";
        }

    } else if (response.status == "200" && scoresData.length == 0) {
        tableBody = "<tr><td colspan=\"2\"><h3>";
        tableBody += "You have no added score!</a>";
        tableBody += "</h3></td></tr>";

    } else {
        tableBody = "<tr><td colspan=\"2\"><h3>";
        tableBody += "An error has occurred</a>";
        tableBody += "</h3></td></tr>";

    }

    dataTable.innerHTML = tableBody;

};

// callback function for rendering top players score data
function displayTopScore(response) {

    let dataTable = document.getElementById("tableTopPlayers");
    let tableBody = "";

    if (response.status == "200") {
        let scoresData = response.data.scores;

        for (var i = 0; i < scoresData.length; i++) {

            tableBody += "<tr class=\"item\">";

            for (var prop in scoresData[i]) {
                if (prop == "addedAt") {
                    let theDate = new Date(scoresData[i][prop] * 1000).toGMTString();
                    tableBody += "<td nowrap>" + theDate + "</td>";
                } else {
                    tableBody += "<td nowrap>" + scoresData[i][prop] + "</td>";
                }
            }
            tableBody += "</tr>";
        }

    } else {
        tableBody = "<tr><td colspan=\"4\"><h3>";
        tableBody += "An error has occurred</a>";
        tableBody += "</h3></td></tr>";

    }

    dataTable.innerHTML = tableBody;

};
