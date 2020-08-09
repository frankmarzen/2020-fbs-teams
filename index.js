
var request = new XMLHttpRequest();
request.open("GET", "/data/teams.json");
request.send();
request.onreadystatechange = function () {
    if (request.readyState === 4 && request.status == "200") {
        renderTeams(JSON.parse(request.responseText));
    }
}

function renderTeams(teams) {
    var participatingTeams = 0;
    teams.forEach(team => {
        var teamElement = document.createElement("div");
        teamElement.classList.add("mb-1", "team");

        if (team.logo) {
            var teamLogo = document.createElement("img");
            teamLogo.setAttribute("src", `/data/logos/${team.logo}`);
            teamLogo.classList.add("team-logo", "mx-auto");
            var logoContainer = document.createElement("div");
            logoContainer.appendChild(teamLogo);
            logoContainer.classList.add("logo-container", "mr-1");
            teamElement.appendChild(logoContainer);
        }
        
        var teamName = document.createTextNode(team.name);
        teamElement.appendChild(teamName);

        document.getElementById(team.playing ? "participating_teams" : "not_participating_teams").appendChild(teamElement);
        participatingTeams += (team.playing) ? 1 : 0;
    });

    var participatingTeamsCountElements = document.getElementsByClassName("participating_teams_count");
    Array.prototype.forEach.call(participatingTeamsCountElements, function(participatingTeam) {
        participatingTeam.innerHTML = participatingTeams;
    });
    document.getElementById("not_participating_teams_count").innerHTML = teams.length - participatingTeams;
}
