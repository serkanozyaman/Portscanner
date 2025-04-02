document.getElementById("ticket-button").addEventListener("click", function () {
    document.getElementById("ticketFormModal").style.display = "block";
});

document.getElementById("close-ticket-form").addEventListener("click", function () {
    document.getElementById("ticketFormModal").style.display = "none";
});

const steps = document.querySelectorAll(".form-step");
const stepButtons = document.querySelectorAll(".step-button");

function validateStep(stepNumber) {
    const stepElement = document.getElementById(`step-${stepNumber}`);
    const inputs = stepElement.querySelectorAll("input, select, textarea");
    let isValid = true;

    inputs.forEach((input) => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add("error");
        } else {
            input.classList.remove("error");
        }
    });

    return isValid;
}

stepButtons.forEach((button) => {
    button.addEventListener("click", function () {
        const step = this.dataset.step;
        const currentStep = document.querySelector(".form-step.active").id.split("-")[1];
        if (step > currentStep && !validateStep(currentStep)) {
            return;
        }
        steps.forEach((s) => s.classList.remove("active"));
        document.getElementById(`step-${step}`).classList.add("active");

        document.querySelectorAll(".step").forEach((s, index) => {
            s.classList.toggle("active", index + 1 == step);
        });

        if (step == "3") {
            const formData = {
                eventType: document.getElementById("event-type").value,
                shortDescription: document.getElementById("short-description").value,
                startDate: document.getElementById("start-date").value,
                detectDate: document.getElementById("detect-date").value,
                detectionMethod: document.getElementById("detection-method").value,
                systemDowntime: document.getElementById("system-downtime").value,
                affectedSystems: document.getElementById("affected-systems").value,
                logDetection: document.getElementById("log-detection").value,
                countermeasures: document.getElementById("countermeasures").value,
                additionalInfo: document.getElementById("additional-info").value,
            };

            document.getElementById("preview-event-type").textContent = formData.eventType;
            document.getElementById("preview-short-description").textContent = formData.shortDescription;
            document.getElementById("preview-start-date").textContent = formData.startDate;
            document.getElementById("preview-detect-date").textContent = formData.detectDate;
            document.getElementById("preview-detection-method").textContent = formData.detectionMethod;
            document.getElementById("preview-system-downtime").textContent = formData.systemDowntime;
            document.getElementById("preview-affected-systems").textContent = formData.affectedSystems;
            document.getElementById("preview-log-detection").textContent = formData.logDetection;
            document.getElementById("preview-countermeasures").textContent = formData.countermeasures;
            document.getElementById("preview-additional-info").textContent = formData.additionalInfo;
        }
    });
});

document.getElementById("ticket-form").addEventListener("submit", async function (event) {
    event.preventDefault();
    
    const token = localStorage.getItem("token"); // Tokeni localStorage'dan alıyoruz
    const username = localStorage.getItem("username"); // Kullanıcı adını alıyoruz
    
    const requestBody = {
        user: {
            userName: username
        },
        olayTuru: document.getElementById("event-type").value,
        olayTanimi: document.getElementById("short-description").value,
        tespitTarihi: document.getElementById("detect-date").value, // Doğrudan LocalDateTime formatında alıyoruz
        tespitYontemi: document.getElementById("detection-method").value,
        sistemKesildiMi: document.getElementById("system-downtime").value === "Evet",
        etkilenenSistem: document.getElementById("affected-systems").value,
        siberTespitEdildi: document.getElementById("log-detection").value === "Evet",
        onlemDetay: document.getElementById("countermeasures").value,
        ekBilgiler: document.getElementById("additional-info").value,
        adminYorum: "" // Admin yorumu backend tarafında eklenir
    };

    try {
        const response = await fetch("http://45.10.151.249:8080/api/ticket/addTicket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error("Bildirim gönderme başarısız!");
        }

        alert("Bildirim başarıyla gönderildi!");
        document.getElementById("ticketFormModal").style.display = "none";
    } catch (error) {
        alert("Bildirim gönderilirken hata oluştu!");
    }
});
