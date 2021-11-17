let total = 0

document.querySelector('#pumpkin').addEventListener('click', makeZero)
document.querySelector('#dominosPizza').addEventListener('click', jumanji)
document.querySelector('#zebra').addEventListener('click', add9)
document.querySelector('#cantThinkOfAnything').addEventListener('click', sub2)
document.querySelector('#multiplyButton').addEventListener('click', multiplier)

function makeZero() {
  total = 0
  document.querySelector('#placeToPutResult').innerText = total
}

function jumanji() {
  total = total + 3
  document.querySelector('#placeToPutResult').innerText = total
}

function add9() {
  total = total + 9
  document.querySelector('#placeToPutResult').innerHTML = total
}

function sub2() {
  total = total - 2
  document.querySelector('#placeToPutResult').innerHTML = total
}

function multiplier() {
  
  const multiplierVal = Number(document.querySelector('#multiplier').value)
  console.log(`${multiplierVal}`)

  if (Number.isNaN(multiplierVal)) {
    console.log(`${multiplierVal} is not a number`)
  }
  else {
    console.log(`${multiplierVal} is a number`)
    total = multiplierVal * total
    console.log(total)
    document.querySelector('#placeToPutResult').innerHTML = total
  }

}
