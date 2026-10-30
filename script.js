
let drivers = [
    {name:"Max Verstappen", team:"Red Bull", speed:98, skill:97, tires:"Soft", time:0, status:"Racing", out:false},
    {name:"Lewis Hamilton", team:"Ferrari", speed:95, skill:98, tires:"Hard", time:0, status:"Racing", out:false},
    {name:"Charles Leclerc", team:"Ferrari", speed:97, skill:94, tires:"Soft", time:0, status:"Racing", out:false},
    {name:"Lando Norris", team:"McLaren", speed:96, skill:96, tires:"Hard", time:0, status:"Racing", out:false},
    {name:"George Russell", team:"Mercedes", speed:94, skill:94, tires:"Soft", time:0, status:"Racing", out:false},
    {name:"Oscar Piastri", team:"McLaren", speed:95, skill:93, tires:"Hard", time:0, status:"Racing", out:false},
    {name:"Carlos Sainz", team:"Williams", speed:93, skill:95, tires:"Soft", time:0, status:"Racing", out:false},
    {name:"Fernando Alonso", team:"Aston Martin", speed:92, skill:99, tires:"Hard", time:0, status:"Racing", out:false},
    {name:"Sergio Perez", team:"Red Bull", speed:91, skill:90, tires:"Soft", time:0, status:"Racing", out:false},
    {name:"Pierre Gasly", team:"Alpine", speed:90, skill:92, tires:"Hard", time:0, status:"Racing", out:false}
];

let round = 0;

function showDrivers() {
    let table = document.getElementById("drivers");
    table.innerHTML = "";

    drivers.forEach(d => {
        table.innerHTML += `
            <tr>
                <td>${d.name}</td>
                <td>${d.team}</td>
                <td>${d.speed}</td>
                <td>${d.skill}</td>
                <td>${d.tires}</td>
                <td>${d.time.toFixed(2)} sec</td>
                <td>${d.status}</td>
            </tr>
        `;
    });
}

function pitStop() {
    let i = document.getElementById("driver").value;
    let tire = document.getElementById("tires").value;

    let d = drivers[i];

    if (d.out) {
        alert("This driver is out of the race!");
        return;
    }

    if (d.tires === tire) {
        alert("Choose a different tire type!");
        return;
    }

    d.time += 20;
    d.tires = tire;
    d.status = "Pit stop";

    showDrivers();
    alert(d.name + " changed tires! 20 seconds added.");
}

function nextRound() {
    if (round >= 10) return;

    round++;

    drivers.forEach(d => {
        if (d.out) return;

        d.status = "Racing";

        let lapTime = 90 + (100 - d.speed) * 0.15
                         + (100 - d.skill) * 0.08;

        if (d.tires === "Soft") {
            lapTime -= 1;
        }

        lapTime += Math.random() * 3;

        // Overtaking
        if (Math.random() < 0.15) {
            lapTime -= 2;
            d.status = "Overtaking";
        }

        // Spinning
        if (Math.random() < 0.05) {
            lapTime += 5;
            d.status = "Spun";
        }

        d.time += lapTime;

        // Accident
        if (Math.random() < 0.02) {
            d.out = true;
            d.status = "Out";
        }
    });

    document.getElementById("round").innerText =
        "Round: " + round + " / 10";

    showDrivers();

    if (round === 10) {
        finishRace();
    }
}

function finishRace() {
    let finishers = drivers.filter(d => !d.out);

    finishers.sort((a, b) => a.time - b.time);

    if (finishers.length > 0) {
        document.getElementById("winner").innerText =
            "Winner: " + finishers[0].name;
    } else {
        document.getElementById("winner").innerText =
            "No driver finished the race!";
    }
}

showDrivers();
