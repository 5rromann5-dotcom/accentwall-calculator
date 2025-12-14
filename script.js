let step = 1;
let formData = {
    width: null,
    height: null,
    design: null,
    surface: null,
    email: null,
    phone: null
};

function renderStep() {
    const box = document.getElementById("step-container");

    if (step === 1) {
        box.innerHTML = `
            <h2>Enter Wall Dimensions</h2>
            <label>Width (ft):</label>
            <input id="widthInput" type="number">

            <label>Height (ft):</label>
            <input id="heightInput" type="number">
        `;
    }

    if (step === 2) {
        box.innerHTML = `
            <h2>Select Wall Design</h2>
            <button onclick="selectDesign('Design A')">Design A</button>
            <button onclick="selectDesign('Design B')">Design B</button>
            <button onclick="selectDesign('Design C')">Design C</button>
        `;
    }

    if (step === 3) {
        box.innerHTML = `
            <h2>Surface Type</h2>
            <button onclick="selectSurface('Smooth')">Smooth</button>
            <button onclick="selectSurface('Texture')">Textured</button>
        `;
    }

    if (step === 4) {
        box.innerHTML = `
            <h2>Your Info</h2>
            <label>Email:</label>
            <input id="emailInput" type="email">

            <label>Phone (optional):</label>
            <input id="phoneInput" type="tel">
        `;
    }

    if (step === 5) {
        box.innerHTML = `
            <h2>Finalizing...</h2>
            <p>Sending to server...</p>
        `;

        sendToN8N();
    }
}

function selectDesign(d) {
    formData.design = d;
    step++;
    renderStep();
}

function selectSurface(s) {
    formData.surface = s;
    step++;
    renderStep();
}

document.getElementById("nextBtn").onclick = () => {
    if (step === 1) {
        formData.width = document.getElementById("widthInput").value;
        formData.height = document.getElementById("heightInput").value;
        if (!formData.width || !formData.height) {
            alert("Please enter all dimensions.");
            return;
        }
    }

    if (step === 4) {
        formData.email = document.getElementById("emailInput").value;
        formData.phone = document.getElementById("phoneInput").value;
    }

    step++;
    renderStep();
};

document.getElementById("backBtn").onclick = () => {
    if (step > 1) {
        step--;
        renderStep();
    }
};

// Send to n8n webhook
async function sendToN8N() {
    try {
        const response = await fetch(
            "https://wallartacwllc.app.n8n.cloud/webhook/accentwall/order",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            }
        );

        document.getElementById("step-container").innerHTML =
            `<h2>Thank you!</h2><p>Your order was submitted.</p>`;
    } catch (error) {
        document.getElementById("step-container").innerHTML =
            `<h2>Error</h2><p>${error}</p>`;
    }
}

renderStep();
