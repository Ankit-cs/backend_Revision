const age = prompt("Enter your age");
const ageNum = Number(age);

function checkAge() {
  if (ageNum < 18) {
    console.log("You get 20% discount");
  } else if (ageNum >= 18 && ageNum <= 65) {
    console.log("Normal ticket price applies");
  } else if (ageNum > 65) {
    console.log("You get 30% senior discount");
  } else {
    console.log("Invalid input");
  }
}

checkAge();
