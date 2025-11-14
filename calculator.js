const input = document.querySelector("input");
const buttons = document.querySelectorAll(".btn:not(#historyBtn)");
const historyBtn = document.getElementById("historyBtn");
let history = [];


buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;

        if (value === "C") {
            input.value = "";
        } else if (value === "+/-") {
            if (input.value) {
                if (input.value.startsWith("-")) {
                    input.value = input.value.slice(1);
                } else {
                    input.value = "-" + input.value;
                }
            }
        } else if (value === "%") {
            if (input.value) {
                input.value = parseFloat(input.value) / 100;
            }
        } else if (value === "=") {
            try {
                const result = eval(input.value);
                history.push(`${input.value} = ${result}`);
                input.value = result;
            } catch {
                input.value = "Error";
            }
        } else {
            input.value += value;
        }
    });
});

function updateHistoryPanel() {
    let historyContainer = document.getElementById("historyPanel");

    if (!historyContainer) {
        historyContainer = document.createElement("div");
        historyContainer.id = "historyPanel";
        historyContainer.style.position = "absolute";
        historyContainer.style.top = "103px";
        historyContainer.style.width = "130px";
        historyContainer.style.background = "rgba(82, 79, 79, 0.9)";
        historyContainer.style.color = "white";
        historyContainer.style.padding = "10px";
        historyContainer.style.borderRadius = "10px";
        historyContainer.style.maxHeight = "300px";
        historyContainer.style.overflowY = "auto";
        historyContainer.style.fontSize = "0.9em";
        historyContainer.style.margin = "0 0 0 15px";
        document.querySelector(".calculator").appendChild(historyContainer);
    }

    historyContainer.innerHTML = history.slice(-10).reverse().join("<br>");
}

historyBtn.addEventListener("click", () => {
    const historyPanel = document.getElementById("historyPanel");
    if (historyPanel) {
        historyPanel.remove();
    } else {
        updateHistoryPanel();
    }
});

