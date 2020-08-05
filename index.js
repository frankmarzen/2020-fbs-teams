
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
        var teamElement = document.createElement("li");
        var teamContent = document.createTextNode(team.name);
        teamElement.appendChild(teamContent);

        document.getElementById(team.playing ? "participating_teams" : "not_participating_teams").appendChild(teamElement);
        participatingTeams += (team.playing) ? 1 : 0;
    });

    document.getElementById("participating_teams_count").innerHTML = participatingTeams;
    document.getElementById("not_participating_teams_count").innerHTML = teams.length - participatingTeams;
}
