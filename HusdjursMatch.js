const prompt = require('prompt-sync')({ sigint: true })
const fs = require('fs');
const questions = require('./questions.json');
const answer1 = require('./answer.json');


let name = prompt('Vänligen skriv ditt namn: ')

let points = [0, 0, 0, 0];
for (let i = 0; i < 16; i++) {
  console.log(questions[i].Fråga);
  let answer = prompt('Y=Yes N=No : ').trim().toLocaleLowerCase();
  if (answer == 'y') {
    for (let j = 0; j < 4; j++) {
      points[j] += questions[i].Ja[j];
    }
  } else if (answer == 'n') {
    for (let j = 0; j < 4; j++) {
      points[j] += questions[i].Nej[j];
    }
  } else { console.log("Ogiligt svar") }
}


fs.readFile("answer.json", (err, data) => {
  let user = [];
  if (!err) {
    user = JSON.parse(data)
  };
  user.push(
    {
      Name: name,
      Date: new Date(),
      score: (`Detta djur passar dig bäst: ${ordning[0].djur}, med ${ordning[0].value} %`)
    })

  fs.writeFile("answer.json", JSON.stringify(user, null, 2), (err) => {
    if (err) throw err;
    console.log("Data writte to file");
  });
})

const totalt = (points[0] + points[1] + points[2] + points[3])

hundResult = (points[0] / totalt * 100).toFixed(2)
kattResult = (points[1] / totalt * 100).toFixed(2)
kaninResult = (points[2] / totalt * 100).toFixed(2)
fiskResult = (points[3] / totalt * 100).toFixed(2)

let ordning = [{
  djur: "Hund", value: hundResult
},
{
  djur: "Katt", value: kattResult
},
{
  djur: "Kanin", value: kaninResult
},
{
  djur: "Fisk", value: fiskResult
},
]
console.log(ordning.sort((first, second) => (first.value - second.value)).reverse());

console.log(`Detta djur passar dig bäst: ${ordning[0].djur}, ${ordning[0].value}%`);