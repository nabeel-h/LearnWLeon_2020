/*

When buttons on .numButtons (except for =) are clicked, it needs to appear on #IOText.
User can enter as many digits for first operand, as soon as an operator is clicked (.operands besides AC)
then the first operand is set and next numbers entered will be considered the second operand until the '='
evaluate button is clicked.
When '=' is pressed the current expression is evaluated.
    - when a calculation is entered and executed for the first time, a Calculations object will be created
    - for a calculation to start, the first expression MUST have 2 operands and an operator
        * need function to evaluate if entered expression makes sense for initial calculation
    - afterwards only 1 operand and operator will be accepted, since this will be applied to
    the last result from previous expression.
        * need function to evaluate that current expression is not the first one and makes sense


*/


const ACButton = document.querySelector("#ACButton")
const backSpaceButton = document.querySelector("#backSpaceButton")
const numButtonsArray = Array.from(document.querySelectorAll(".numButtons"))


backSpaceButton.addEventListener('click', backSpaceText)
ACButton.addEventListener('click', resetIOText)

for (const button of numButtonsArray) {
    button.addEventListener('click', updateIOText)
}

function backSpaceText(e) {
    const IOText = document.querySelector("#IOText")
    if (IOText.innerHTML.length > 0) {
        IOText.innerHTML = IOText.innerHTML.slice(0,-1)
    }
}

function resetIOText(e) {
    const IOText = document.querySelector("#IOText")
    IOText.innerHTML = ''
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
        if (IOText.innerHTML.split(/[X,+,^,/,—]+/)[1].includes(".")) {
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
                 resultVal = initialOperand + inputOperand
                break;
            case '-':
                resultVal = initialOperand - inputOperand
                break;
            case '/':
                resultVal = initialOperand / inputOperand
                break;
            case '*':
                resultVal = initialOperand * inputOperand
                break;
            case '**':
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
        return (lastCalculatedVal ? lastCalculatedVal : NaN)
    }

    addCalculation(inputOp, op, initialOp=null) {
        /*  
            :   parameters are an inputOperand and operator,
                if initialOp argument passed that means this is the first operation, 
                otherwise grab result of the last calculation value from this.calcs (getLatestCalculation),
                then applies to that the operand and operator and calculates result (calculateResult)
                Finally updates list of all calculations so far with new calculation (updateCalculations)
        */

        
        // if less than two operands and no calculation history
        if ((initialOp === null) && (this.calcs.length < 1)) {
            console.log("Please enter two operands for your expression!")
        }
        // if less than two operands and calculation history exists
         else if (initialOp === null) {            
            const initialOperand = this.getLatestCalculation()
            const resultVal = this.calculateResult(initialOperand, inputOp, op)
            this.updateCalculations(initialOperand, inputOp, op, resultVal)
        // if two operands exist, so initial expression
         } else {
            const resultVal = this.calculateResult(initialOp, inputOp, op)
            this.updateCalculations(initialOp, inputOp, op, resultVal)
         }
    }

    getCalcHistory() {
        /*
        shows all of the calculation history by iterating over items in this.calcs array
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
}


// //TESTS
// const calcObj = new Calculations

// calcObj.addCalculation(3,'*')
// console.log(calcObj.printCalcHistory())

// calcObj.addCalculation(3,'*', 3)
// calcObj.addCalculation(3,'*')
// calcObj.addCalculation(9,'*')
// console.log(calcObj.printCalcHistory())