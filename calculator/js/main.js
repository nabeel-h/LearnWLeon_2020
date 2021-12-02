class Calculations {
    /*
    Set of calculations that a user inputs and executes, will compute result.
    Keeps history of all calculations made until it is reset by user

    constructor values:
    - history of values and calculations in form of array: calcs = []
        - each element of array will have an object literal that shows each calculation step: 
            {initialOperand: 1,
            inputOperand: 1,
            operator: +,
            result: 2}
    */
    constructor() {
        this.calcs = [];
    }

    calculateResult(initialOperand, inputOperand, operator) {
        /*
        parameters are initialOperand, inputOperand and operator
        check if inputOperand makes sense
        returns calculated result e.g resultVal = initialOperand <operator> inputOperand
        */
        let resultVal = undefined

        // checkOperator or operands??
        switch (operator) {
            case '+':
                console.log(`${initialOperand} + ${inputOperand}`)
                resultVal = initialOperand + inputOperand
                break;
            case '-':
                console.log(`${initialOperand} - ${inputOperand}`)
                resultVal = initialOperand - inputOperand
                break;
            case '/':
                resultVal = initialOperand / inputOperand
                break;
            case 'X':
                resultVal = initialOperand * inputOperand
                break;
            case '^':
                resultVal = initialOperand ** inputOperand
                break;
            default:
                console.log(`${operator} doesn't make sense!`)
            }
        return resultVal;
    }

    updateCalculations(initialOp, inputOp, op, res) {
    /*
    updateCalculations :    parameters are initialOperand, inputOperand, operator & result
                            updates list of all calculations by adding additional
                            object literal in form of following to this.calcs 
                            {   initialOperand: 1,
                                inputOperand: 1,
                                operator: +,
                                result: 2}
    */
    
        const newCalc = {
                            initialOperand:  initialOp,
                            inputOperand: inputOp,
                            operator: op,
                            result: res
                        }
        this.calcs.push(newCalc);
    }
    
    getLatestCalculation() {
        /*
        : shows the last item in calcs array, specifically the result property.
        */
        const lastCalculatedVal = this.calcs[(this.calcs.length) - 1].result
        // edge case for result 0 that is falsy
        if (lastCalculatedVal === 0) {
            return 0
        }
        
        return (lastCalculatedVal ? lastCalculatedVal : NaN)
    }

    addCalculation(initialOp, inputOp, op) {
        /*  
            :   parameters are an initial operand, an input Operand and an operator,
                inputs to method for result (calculateResult)
                Finally updates list of all calculations so far with new calculation (updateCalculations)
        */
        const resultVal = this.calculateResult(initialOp, inputOp, op)
        this.updateCalculations(initialOp, inputOp, op, resultVal)   
    }

    getCalcHistory() {
        /*
        returns an array of strings, shows all of the calculation history by iterating over items in this.calcs array
        output each line as: initialOperand <operator> inputOperand = result
        */
       let calcHistoryStr = (this.calcs.length < 1) ? "No calculation history!" : this.calcs.map( (calc) => {
            return `${calc.initialOperand} ${calc.operator} ${calc.inputOperand} = ${calc.result}`
       })
       return calcHistoryStr
    }

    printCalcHistory() {
        /*
        Outputs Calculation History to console.
        */
        console.log("Getting Calculations History")
        const calcHistory = this.getCalcHistory()
        if (Array.isArray(calcHistory)) {
            for (const calc of calcHistory) {
                console.log(calc)
            }
        } else {
            console.log(calcHistory)
        }
    }

    resetCalculations(){
        this.calcs = []
    }
}

const Calculator = new Calculations

const ACButton = document.querySelector("#ACButton")
const backSpaceButton = document.querySelector("#backSpaceButton")
const numButtonsArray = Array.from(document.querySelectorAll(".numButtons"))
const evaluateButton = document.querySelector("#evaluatteButton")


backSpaceButton.addEventListener('click', backSpaceText)
ACButton.addEventListener('click', resetIOText)
evaluateButton.addEventListener('click', evaluateExpression)

for (const button of numButtonsArray) {
    button.addEventListener('click', updateIOText)
}

function evaluateExpression(e) {
    console.log("Evaluate button pressed")
    const IOText = document.querySelector("#IOText")

    // at least 3 chars needed for an operation
    if (IOText.innerHTML.length <3) {
        console.log(`Error: less than 3 chars`)
        return
    }

    // if operator not found, then cannot execute
    const countOfOperators = IOText.innerHTML.replace(/[^/ || X || -/ || + || ^]/g, "").length
    if (countOfOperators < 1) {
        console.log(`Error: operator not found`)
        return
    }
    // grab operator
    const operator = operatorReturn(IOText.innerHTML)

    // only evaluate with proper input (operand operator operand)
    // if less than 2 operands then not valid
    const operands = IOText.innerHTML.split(/[X,+,^,/,-]+/)
    if (operands.length < 2) {
        console.log(`Error: less than two operands found.`)
        return
    }

    // if either operand is === '.' then change it to 0
    // find better looping way to do this???
    for (i=0; i < operands.length; i++) {
        if (operands[i] === '.') {
            operands[i]=0
        }
    }

    // create new Calculation object if current one doesn't exist
    console.log(`Evaluating valid expression!: ${operands[0]} ${operator} ${operands[1]}`)

    // add to Calculation object if already exists
    Calculator.addCalculation(Number(operands[0]), Number(operands[1]), operator)

    // output result to IOScreen
    const calculationResult = Calculator.getLatestCalculation()
    IOText.innerHTML = calculationResult

    // update Calculation history with newest calculation
    updateCalculationHistory(Calculator.getCalcHistory())
}


function backSpaceText(e) {
    // deletes one char at a time on IO Screen
    const IOText = document.querySelector("#IOText")
    if (IOText.innerHTML.length > 0) {
        IOText.innerHTML = IOText.innerHTML.slice(0,-1)
    }
}

function resetIOText(e) {
    // Resets IO Screen as well as clearing calculation history
    const IOText = document.querySelector("#IOText")
    IOText.innerHTML = ''
    Calculator.resetCalculations()
    // need to clear calculation history lines
    resetCalcHistorySection()
    console.log(`Reset Calculator & deleted calculation history`)
}

function updateCalculationHistory(calcHistoryArray) {
    // resets calculation history then iterates over calcHistory strings and adds spans to parent section
    resetCalcHistorySection()
    const calcHistorySection = document.querySelector('#calcHistorySection')
    let calcCounter = 1
    for (const calc of calcHistoryArray) {
        const calcSpanNode = document.createElement('span')
        calcSpanNode.setAttribute('class', 'calcSpan')
        calcSpanNode.innerHTML = `(${calcCounter}) ${calc}`
        calcHistorySection.appendChild( calcSpanNode )
        calcCounter+=1
    }
}

function updateIOText(e){
    // check if input makes sense
    // 5+5 good
    // 555+55+55 no good
    // 5.5/6.7 good
    // 5.5.1/6.7 no good
    // 5.6+.9.2 no good

    const clickedButtonVal = e.srcElement.innerHTML
    console.log(`Button clicked: ${clickedButtonVal}`)
    const IOText = document.querySelector("#IOText")
    console.log(`Current value of IOText: ${IOText.innerHTML}`)

    const countOfOperators = IOText.innerHTML.replace(/[^/ || X || - || + || ^]/g, "").length
    const countOfDecimalPoints = IOText.innerHTML.replace(/[^.]/g, "").length

    // if at least 1 operator exists and current input button is an operator don't update string
    // ensures operator cannot be entered twice
    if ((countOfOperators === 1) && (['/', 'X', '-', '+', '^'].some(substring=>clickedButtonVal.includes(substring)))) {
        return
    }

    // if operator exists and period already exists on second operand and user has entered another period then don't update
    if ((countOfOperators === 1) && (['.'].some(substring=>clickedButtonVal.includes(substring)))) {
        if (IOText.innerHTML.split(/[X,+,^,/,-]+/)[1].includes(".")) {
            return
        }
    }
    
    // if period (.) exists then ok, but cannot allow more than 1 period on either side of the operator
    // if period already exists and user pressed on period again, then don't add another period.
    if ((countOfDecimalPoints === 1) && (['.'].some(substring=>clickedButtonVal.includes(substring)))) {
        // unless an operator exists then OK to allow period for the second operand value
        if (countOfOperators === 1) {
            IOText.innerHTML += clickedButtonVal
            return
        }
        return
    }

    // if at least 2 periods exist and user inputs another period, then don't update
    if ((countOfDecimalPoints >= 2) && (['.'].some(substring=>clickedButtonVal.includes(substring)))) {
        return
    }
    IOText.innerHTML += clickedButtonVal
}


// HELPER FUNCTION for returning the operator value from an expression string
function operatorReturn(expression){
    for (const char of expression) {
        if (['X', '+', "-", "^", "/"].some(operator => char.includes(operator))) {
          return char
        }
      }
}

function resetCalcHistorySection() {
    const calcHistorySection = document.querySelector('#calcHistorySection')
    while (calcHistorySection.firstChild) {
        calcHistorySection.removeChild(calcHistorySection.firstChild)
    }
}