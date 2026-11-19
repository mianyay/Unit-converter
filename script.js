const units = {
    length: ["meters", "centimeters", "millimeters", "feet", "inches", "yards", "miles", "light years"],
    weight: ["kilograms", "grams", "milligrams", "pounds", "ounce"],
    temperature: ["celsius", "fahrenheit", "kelvin"],
    time: ["seconds", "milliseconds", "nanoseconds", "minutes", "hours", "days", "weeks", "months", "years"]
};

const conversions = {
    length: {
        meters: a => a,
        centimeters: a => a * 100,
        millimeters: a => a * 1000,
        feet: a => a * 3.28084,
        inches: a => a * 39.3701,
        yards: a => a * 1.09361,
        miles: a => a * 0.000621371,
        "light years": a => a / 9.4607e15,
    },

    weight: {
        kilograms: a => a,
        grams: a => a * 1000,
        milligrams: a => a * 1e+6,
        pounds: a => a * 2.20462,
        ounce: a => a * 35.274,
    },

    temperature: {
        celsius: a => a,
        fahrenheit: a => (a * 9/5) + 32,
        kelvin: a => a + 273.15
    },

    time: {
        seconds: a => a,
        milliseconds: a => a * 1000,
        nanoseconds: a => a * 1e+9,
        minutes: a => a / 60,
        hours: a => a / 3600,
        days: a => a / 86400,
        weeks: a => a / 604800,
        months: a => a / 2.628e+6,
        years: a => a / 3.154e+7,
    }
};

const inverse = {
    length: {
        meters: a => a,
        centimeters: a => a / 100,
        millimeters: a => a / 1000,
        feet: a => a / 3.28084,
        inches: a => a / 39.3701,
        yards: a => a / 1.09361,
        miles: a => a / 0.000621371,
        "light years": a => a * 9.4607e15,
    },

    weight: {
        kilograms: a => a,
        grams: a => a / 1000,
        milligrams: a => a / 1e+6,
        pounds: a => a / 2.20462,
        ounce: a => a / 35.274,
    },

    temperature: {
        celsius: a => a,
        fahrenheit: a => (a - 32) * 5/9,
        kelvin: a => a - 273.15
    },

    time: {
        seconds: a => a,
        milliseconds: a => a / 1000,
        nanoseconds: a => a / 1e+9,
        minutes: a => a * 60,
        hours: a => a * 3600,
        days: a => a * 86400,
        weeks: a => a * 604800,
        months: a => a * 2.628e+6,
        years: a => a * 3.154e+7,
    }
};

function decimalpoint(n) {
    if (n !== 0 && Math.abs(n) < 0.01) {
        return n.toExponential(3);
    }
    return n.toFixed(2)
};

function updateUnits() {
    const type = document.getElementById("type").value;
    const from = document.getElementById("fromUnit");
    const to = document.getElementById("toUnit");
    from.innerHTML = "";
    to.innerHTML = "";
    units[type].forEach(u => {
        from.innerHTML += `<option value="${u}">${u}</option>`;
        to.innerHTML += `<option value="${u}">${u}</option>`;
    });
};

function savetolocalstorage() {
    try {
        return JSON.parse(localStorage.getItem("conversionHistory")) || [];
    } catch {
        return [];
    }
};

let conversionHistory = savetolocalstorage();

function renderhistory() {
    const body = document.getElementById("historyBody");
    body.innerHTML = "";
    conversionHistory.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = 
        `<td>${item.from}</td>
        <td>${item.to}</td>
        <td><button class="delete-btn" onclick="deleteEntry(${index})" title="Delete">🗑️</button></td>`
        body.appendChild(row);
    });
}

function clearHistory() {
    conversionHistory = [];
    localStorage.removeItem("conversionHistory");
    renderhistory();
}

function deleteEntry(index) {
    conversionHistory.splice(index, 1);
    localStorage.setItem("conversionHistory", JSON.stringify(conversionHistory));
    renderhistory();
}

function convert() {
    const type = document.getElementById("type").value;
    const value = parseFloat(document.getElementById("inputValue").value);
    const from = document.getElementById("fromUnit").value;
    const to = document.getElementById("toUnit").value;
    const resultBox = document.getElementById("result");


    if (isNaN(value)) {
        resultBox.textContent = "Enter a valid number."
        resultBox.style.display = "block";
        return;
    };

    const inBase = inverse[type][from](value);
    const finalValue = conversions[type][to](inBase);
    resultBox.textContent = `${value} ${from} = ${decimalpoint(finalValue)} ${to}`;
    resultBox.style.display = "block"

    conversionHistory.unshift({
        from: `${value} ${from}`,
        to: `${decimalpoint(finalValue)} ${to}`
    });
    conversionHistory = conversionHistory.slice(0, 20);
    localStorage.setItem("conversionHistory", JSON.stringify(conversionHistory));
    renderhistory();
}

updateUnits()
renderhistory()