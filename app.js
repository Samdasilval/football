"use strict";

//const FOOTBALL_API_KEY = "CHANGE ME!";

// const requestOptions = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": FOOTBALL_API_KEY,
//     "x-rapidapi-host": "https://v3.football.api-sports.io/"
//   },
//   redirect: "follow"
// };

// Utilisez l'objet pour tester votre logiciel si aucun match n'est joué en ce moment
// Il s'agit d'une réponse de l'API lors du match Corée - Ghana du 28.11.22

const fixture = {
  "get": "fixtures",
  "parameters": {
      "live": "all",
      "league": "1"
  },
  "errors": [],
  "results": 1,
  "paging": {
      "current": 1,
      "total": 1
  },
  "response": [
      {
          "fixture": {
              "id": 855757,
              "referee": "Anthony Taylor, England",
              "timezone": "UTC",
              "date": "2022-11-28T13:00:00+00:00",
              "timestamp": 1669640400,
              "periods": {
                  "first": 1669640400,
                  "second": null
              },
              "venue": {
                  "id": null,
                  "name": "Education City Stadium",
                  "city": "Al Rayyan"
              },
              "status": {
                  "long": "First Half",
                  "short": "1H",
                  "elapsed": 30
              }
          },
          "league": {
              "id": 1,
              "name": "World Cup",
              "country": "World",
              "logo": "https://media.api-sports.io/football/leagues/1.png",
              "flag": null,
              "season": 2022,
              "round": "Group Stage - 2"
          },
          "teams": {
              "home": {
                  "id": 17,
                  "name": "South Korea",
                  "logo": "https://media.api-sports.io/football/teams/17.png",
                  "winner": false
              },
              "away": {
                  "id": 1504,
                  "name": "Ghana",
                  "logo": "https://media.api-sports.io/football/teams/1504.png",
                  "winner": true
              }
          },
          "goals": {
              "home": 0,
              "away": 1
          },
          "score": {
              "halftime": {
                  "home": 0,
                  "away": 1
              },
              "fulltime": {
                  "home": null,
                  "away": null
              },
              "extratime": {
                  "home": null,
                  "away": null
              },
              "penalty": {
                  "home": null,
                  "away": null
              }
          },
          "events": [
              {
                  "time": {
                      "elapsed": 21,
                      "extra": null
                  },
                  "team": {
                      "id": 1504,
                      "name": "Ghana",
                      "logo": "https://media.api-sports.io/football/teams/1504.png"
                  },
                  "player": {
                      "id": 3421,
                      "name": "D. Amartey"
                  },
                  "assist": {
                      "id": null,
                      "name": null
                  },
                  "type": "Card",
                  "detail": "Yellow Card",
                  "comments": "Elbowing"
              },
              {
                  "time": {
                      "elapsed": 24,
                      "extra": null
                  },
                  "team": {
                      "id": 1504,
                      "name": "Ghana",
                      "logo": "https://media.api-sports.io/football/teams/1504.png"
                  },
                  "player": {
                      "id": 47480,
                      "name": "M. Salisu"
                  },
                  "assist": {
                      "id": null,
                      "name": null
                  },
                  "type": "Goal",
                  "detail": "Normal Goal",
                  "comments": null
              },
              {
                  "time": {
                      "elapsed": 27,
                      "extra": null
                  },
                  "team": {
                      "id": 17,
                      "name": "South Korea",
                      "logo": "https://media.api-sports.io/football/teams/17.png"
                  },
                  "player": {
                      "id": 2903,
                      "name": "Jung Woo-Young"
                  },
                  "assist": {
                      "id": null,
                      "name": null
                  },
                  "type": "Card",
                  "detail": "Yellow Card",
                  "comments": "Holding"
              }
          ]
      }
  ]
}

const bodySelector = document.querySelector("body");

const away = document.querySelector(".away");
const home = document.querySelector(".home");
const time = document.querySelector(".time");


const changeSpinnerState = () => {
  bodySelector.setAttribute("data-loaded", "true");
}

const urlTeam = (data, team) => {
  let name = "";
  let logo = "";
  let score = "";

  if (team === "home"){
    name = data.teams.home.name;
    logo = data.teams.home.logo;
    score = data.goals.home;
  } else {
    name = data.teams.away.name;
    logo = data.teams.away.logo;
    score = data.goals.away;
  }

  return `<h1 class="country">${name}</h1><img class="flag" src="${logo}" alt=""><div class="score">${score}</div>`;
}

const renderGame = (url, team) => {
  if (team === "away"){
    away.insertAdjacentHTML("beforeend", url);
  } else {
    home.insertAdjacentHTML("beforeend", url);
  }
}

const renderTime = (data) => {
  const tempsEcoule = data.fixture.status.elapsed;
  time.insertAdjacentHTML("beforeend", `<p>${tempsEcoule}</p>`);
}


const addGameInfo = (res) => {
  try {
    const data = res.response[0];
    console.log(data);
    const urlAway = urlTeam(data, "away");
    const urlHome = urlTeam(data, "home");

    renderGame(urlAway, "away");
    renderGame(urlHome, "home");
    renderTime(data);

    changeSpinnerState();

  } catch (e) {
    console.error(e.message);
  }
}

addGameInfo(fixture);

