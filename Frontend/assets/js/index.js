document.addEventListener("DOMContentLoaded", () => {
    // Kullanıcı menüsü dropdown'unu açıp kapatma
    document.querySelector('.user-menu').addEventListener('click', function() {
        const dropdown = this.querySelector('.dropdown');
        dropdown.classList.toggle('active');
    });
    
    // Çıkış yap butonu
    document.getElementById('logout').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.clear();
        alert("Sistemden çıkış yapılıyor...");
        window.location.href = "login.html";
    });
    const userName = localStorage.getItem("username");

    if (!userName) {
        return;
    }

    document.getElementById("username").textContent = userName;

    fetchUserTickets(userName);
});

// Kullanıcı logout işlemi
document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    window.location.href = "login.html";
});

// Kullanıcının ticketlerini backend'den çekme (POST isteği ile)
async function fetchUserTickets(userName) {
    try {
        const response = await fetch("http://45.10.151.249:8080/api/ticket/getTicket", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
            },
            body: JSON.stringify({
                user: {
                    userName: userName
                }
            }),
        });

        if (!response.ok) {
            throw new Error("Ticket verileri alınamadı!");
        }

        const tickets = await response.json();
        updateTicketTable(tickets);
    } catch (error) {
    }
}

// Ticket tablosunu güncelleme
function updateTicketTable(tickets) {
    const ticketBody = document.getElementById("ticket-body");
    ticketBody.innerHTML = ""; // Önce tabloyu temizle

    tickets.forEach(ticket => {
        const row = document.createElement("tr");

        let statusClass = "";
        if (ticket.statu === "Bekliyor") statusClass = "status-beklemede";
        if (ticket.statu === "İncelendi") statusClass = "status-incelendi";
        if (ticket.statu === "Onaylandı") statusClass = "status-onaylandi";
        if (ticket.statu === "Reddedildi") statusClass = "status-reddedildi";

        row.innerHTML = `
            <td>${ticket.ticketId}</td>
            <td>${new Date(ticket.olusturmaTarihi).toLocaleString()}</td>
            <td>${ticket.olayTanimi}</td>
            <td><span class="status ${statusClass}">${ticket.statu}</span></td>
            <td><button class="detail-btn" data-id="${ticket.ticketId}">Detay</button></td>
        `;
        
        ticketBody.appendChild(row);
    });

    

    // Detay butonlarına event ekle
    document.querySelectorAll(".detail-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const ticketId = e.target.dataset.id;
            const selectedTicket = tickets.find(t => t.ticketId == ticketId);
            openDetailModal(selectedTicket);
        });
    });
}

// Detay modalını açma fonksiyonu
function openDetailModal(ticket) {
    document.getElementById("modal-ticket-id").textContent = ticket.ticketId;
    document.getElementById("modal-ticket-date").textContent = new Date(ticket.olusturmaTarihi).toLocaleString();
    document.getElementById("modal-ticket-desc").textContent = ticket.olayTanimi;
    document.getElementById("modal-ticket-status").textContent = ticket.statu;
    document.getElementById("modal-ticket-details").innerHTML = `
        <p><strong>Olay Türü:</strong> ${ticket.olayTuru}</p>
        <p><strong>Etkilenen Sistem:</strong> ${ticket.etkilenenSistem}</p>
        <p><strong>Tespit Tarihi:</strong> ${new Date(ticket.tespitTarihi).toLocaleString()}</p>
        <p><strong>Tespit Yöntemi:</strong> ${ticket.tespitYontemi}</p>
        <p><strong>Siber İz Tespit Edildi mi?:</strong> ${ticket.siberTespitEdildi ? "Evet" : "Hayır"}</p>
        <p><strong>Olay Sistem Kesintisine Sebep Oldu mu?:</strong> ${ticket.sistemKesildiMi ? "Evet" : "Hayır"}</p>
        <p><strong>Alınan Önlem:</strong> ${ticket.onlemDetay}</p>
        <p><strong>Ek Bilgiler:</strong> ${ticket.ekBilgiler}</p>
        <p><strong>Admin Yorumu:</strong> ${ticket.adminYorum || "Henüz yorum yapılmadı."}</p>
    `;

    document.getElementById("ticketModal").style.display = "block";
}

// Detay modalını kapatma
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("ticketModal").style.display = "none";
});

// **Bilet Oluşturma Modali**
const ticketButton = document.getElementById("ticket-button");
const ticketFormModal = document.getElementById("ticketFormModal");
const ticketFormContainer = document.getElementById("ticketFormContainer");

if (ticketButton) {
    ticketButton.addEventListener("click", function () {
        if (!ticketFormContainer.innerHTML.trim()) {
            fetch("ticket.html")
                .then(response => response.text())
                .then(data => {
                    ticketFormContainer.innerHTML = data;
                    addModalEvents(); // Form yüklendikten sonra eventleri ekleyelim
                    
                    // **ticket.js dosyasını manuel olarak yükle**
                    const script = document.createElement("script");
                    script.src = "assets/js/ticket.js";
                    script.defer = true;
                    document.body.appendChild(script);
                });
        }
        ticketFormModal.style.display = "block";
    });
}


// Form eventlerini ekleme fonksiyonu (Form yüklendikten sonra çalışacak)
function addModalEvents() {
    const closeTicketForm = document.getElementById("close-ticket-form");

    if (closeTicketForm) {
        closeTicketForm.addEventListener("click", function () {
            ticketFormModal.style.display = "none";
        });
    }

    window.addEventListener("click", function (event) {
        if (event.target === ticketFormModal) {
            ticketFormModal.style.display = "none";
        }
    });

    const ticketForm = document.getElementById("ticket-form");
    if (ticketForm) {
        ticketForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Bildirim başarıyla oluşturuldu! Adminler tarafından incelenecek.");
            ticketFormModal.style.display = "none";
        });
    }
}

document.getElementById("wazuh-buton").addEventListener("click", function() {
    window.open("https://wazuh.sodefend.com", "_blank");
});