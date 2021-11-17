let evaluateButton = document.querySelector("#evaluate").addEventListener('click', computePowers)



function computePowers() {
    let xValue = document.querySelector('#xValue').value
    let nPower = document.querySelector('#nPower').value

    console.log(`current values are ${xValue} & ${nPower}`)
    let result = pow(xValue, nPower)
    updateResult(result)
}

function pow(x, n) {
    let result = x
      for (let power = 1; power < n+1; power++) {
      result = x * x
  }
  return result 
}

  function updateResult(result) {
    let resultH2 = document.querySelector("#resultH2")
    console.log(`updating result to ${result}`)
    resultH2.innerHTML = result
  }

