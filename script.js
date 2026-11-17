const units = {
    length: ["meters", "feet", "inches"],
    weight: ["kilograms", "pounds"],
    temperature: ["celsius", "fahrenheit", "kelvin"]
};

const conversions = {
    length: {
        meters: a => a,
        feet: a => a * 3.28084,
        inches: a => a * 39.3701,
    },

    weight: {
        kilograms: a => a,
        pounds: a => a * 2.20462,
    },

    temperature: {
        celsius: a => a,
        fahrenheit: a => (a * 9/5) + 32,
        kelvin: a => a + 273.15
    },
};

const inverse = {
    length: {
        meters: a => a,
        feet: a => a / 3.28084,
        inches: a => a / 39.3701
    },

    weight: {
        kilograms: a => a,
        pounds: a => a / 2.20462,
    },

    temperature: {
        celsius: a => a,
        fahrenheit: a => (a - 32) * 5/9,
        kelvin: a => a - 273.15
    },
};

function updateUnits() {
    const type = document.getElementById("type").value;
    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");
    from.innerHTML = "",
    to.innerHTML = "",
    units[type].forEach(u => {
        from.innerHTML += `<option value="${u}">${u}</option>`;
        to.innerHTML += `<option value="${u}">${u}</option>`;
    });
};

function convert() {
    const type = document.getElementById("type").value;
    const value = parseFloat(document.getElementById("inputValue").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const resultBox = document.getElementById("result");
};

if (isNaN(value)) {
    resultBox.textContent = "Enter a valid number.",
    resultBox.style.display = "block";
    return;
};

const inBase = inverse[type][from](value);
const finalValue = conversions[type][to](inBase);
resultBox.textContent = `${value} ${from} = ${finalValue.toFixed(2)}${to}`;
resultBox.style.display = "block"

updateUnits()