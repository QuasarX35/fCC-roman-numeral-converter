const numInput = document.querySelector('#number');
const convertBtn = document.querySelector('#convert-btn');
const output = document.querySelector('#output');

const isInvalidInput = (input) => {
    // ^: Matches the beginning of the string.
    // [-+]?: Matches an optional negative sign (-) or positive sign (+).
    // \d+: Matches one or more digits (0-9).
    // (\.\d+)?: Matches an optional decimal point followed by one or more digits (optional for whole numbers).
    // $: Matches the end of the string.
    const regex = /^[-+]?\d+(\.\d+)?$/;

    if (!input || !regex.test(input)) {
        return -2;
    } else if (input < 1) {
        return -1;
    } else if (input >= 4000) {
        return 0;
    } else {
        return 1;
    }
};

const displayError = (errorMsg) => {
    output.innerHTML = '';
    const errorMsgExists = document.querySelector('.errorMsg');
    if (errorMsgExists) return;

    const errorMsgEl = document.createElement('span');
    errorMsgEl.textContent = errorMsg;
    errorMsgEl.classList.add('error');
    errorMsgEl.classList.add('errorMsg');

    output.appendChild(errorMsgEl);
    output.removeAttribute('hidden');

    setTimeout(() => {
        errorMsgEl.remove();
        output.setAttribute('hidden', '');
    }, '3000');
}

const romanTable = [
    ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
    ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"],
    ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"],
    ["", "M", "MM", "MMM"]
]

// first working attempt
const convertToRomanV1 = (num) => {
    let numArr = String(num).split("").map((digit) => parseInt(digit)).reverse();
    if (num >= 1000) {
        return romanTable[3][numArr[3]] + romanTable[2][numArr[2]] + romanTable[1][numArr[1]] + romanTable[0][numArr[0]];
    } else if (num >= 100) {
        return romanTable[2][numArr[2]] + romanTable[1][numArr[1]] + romanTable[0][numArr[0]];
    } else if (num >= 10) {
        return romanTable[1][numArr[1]] + romanTable[0][numArr[0]];
    } else if (num >= 1) {
        return romanTable[0][numArr[0]];
    }
}

// second working attempt, more compact
const convertToRomanV2 = (num) => {
    let result = "";
    const numArr = String(num);
    const numLen = String(num).length;
    for (let i = 0; i < numLen; i++) {
        result = result + romanTable[numLen - 1 - i][numArr[i]];
    }
    return result;
}

// third attempt, no array conversion (more efficient)
const convertToRomanV3 = (num) => {
    let result = "";

    let digit1 = num % 10;
    result = romanTable[0][digit1] + result;
    num = Math.floor(num / 10);

    let digit2 = num % 10;
    result = romanTable[1][digit2] + result;
    num = Math.floor(num / 10);

    let digit3 = num % 10;
    result = romanTable[2][digit3] + result;
    num = Math.floor(num / 10);

    let digit4 = num % 10;
    result = romanTable[3][digit4] + result;
    num = Math.floor(num / 10);

    return result;
}

// more compact version of attempt 3, most compact and readable at the same time
const convertToRomanV4 = (num, i = 0, result = "") => {
    while (num > 0) {
        result = romanTable[i++][num % 10] + result;
        num = Math.floor(num / 10);
    }
    return result;
}

// fourth attempt, recursive
const convertToRomanV5 = (num, i = 0, result = "") => {
    result = romanTable[i++][num % 10] + result;
    num = Math.floor(num / 10);
    if (num > 0) {
        return convertToRomanV5(num, i, result);
    } else {
        return result;
    }
}

// most compact attempt, but hardly readable
const convertToRomanV6 = (num, i = 0, result = "") => {
    if (num > 0) return convertToRomanV5(num, i, result);
    return romanTable[i++][num % 10] + result && Math.floor(num / 10);
}

const displayResult = (result) => {
    output.innerHTML = result;
    output.removeAttribute('hidden');
}

const checkInput = (e) => {
    e.preventDefault();
    switch (isInvalidInput(numInput.value)) {
        case -2:
            displayError("Please enter a valid number");
            break;
        case -1:
            displayError("Please enter a number greater than or equal to 1");
            break;
        case 0:
            displayError("Please enter a number less than or equal to 3999");
            break;
        case 1:
            const result = convertToRomanV6(numInput.value);
            displayResult(result);
            break;
        default:
            break;
    }
};

convertBtn.addEventListener('click', checkInput);