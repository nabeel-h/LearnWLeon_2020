document.querySelector('#check').addEventListener('click', check)
document.querySelector('#day').addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    console.log("enter pressed on input")
    document.querySelector('#check').click()
  }
})

function check() {

  const day = document.querySelector('#day').value.toLowerCase()
  let response = ""
  //Conditionals go here
  if (["tuesday", "thursday"].includes(day)) {
    response = "LEARN WITH LEON TIME"
  }
  else if (["sunday", "saturday"].includes(day)) {
    response = "PARTY TIME"
  }
  else if (["monday", "wednesday","friday"].includes(day)) {
    response = "MEH"
  }
  else {
    response = "NOT A DAY BITCH"
  }

  document.querySelector('#placeToSee').innerHTML = response

  setTimeout(() => {
    console.log("set timeout function running")
    document.querySelector('#placeToSee').innerHTML = ''}, 3000)
}
