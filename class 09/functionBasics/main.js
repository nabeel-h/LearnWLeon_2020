let evaluateButton = document.querySelector("#evaluate").addEventListener('click', computePowers)



function computePowers() {
    let xValue = document.querySelector('#xValue').value
    let nPower = document.querySelector('#nPower').value

    console.log(`current values are ${xValue} & ${nPower}`)
    let result = pow(xValue, nPower)
    updateResult(result)
}

function pow(x, n) {
    console.log(`pow fn: x is ${x} & n is ${n}`)
    let result = x
    x = Number(x)
    n = Number(n)
      for (let power = 1; power < n+1; power++) {
          console.log(`loop: ${result} * ${x} & power is ${power}`)
      result = result * x
  }
    console.log(`pow fn: result is ${result}`)
  return result 
}

  function updateResult(result) {
    let resultH2 = document.querySelector("#resultH2")
    console.log(`updating result to ${result}`)
    resultH2.innerHTML = result
  }

