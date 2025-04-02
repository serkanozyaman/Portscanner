document.addEventListener('DOMContentLoaded', fetchNotifications);

let allNotifications = []; // Verileri saklamak için

function fetchNotifications() {
    fetch('http://45.10.151.249:8080/api/ticket/getAll', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        }
    })
        .then(response => response.json())
        .then(data => {
            allNotifications = data; // Gelen tüm verileri kaydediyoruz
            const tableBody = document.querySelector('#notification-table tbody');
            tableBody.innerHTML = '';

            data.forEach(notification => {
                const row = document.createElement('tr');

                let statusClass = "";
                if (notification.statu === "Bekliyor") statusClass = "status-beklemede";
                if (notification.statu === "İncelendi") statusClass = "status-incelendi";
                if (notification.statu === "Onaylandı") statusClass = "status-onaylandi";
                if (notification.statu === "Reddedildi") statusClass = "status-reddedildi";
                row.innerHTML = `
                    <td>${notification.ticketId || 'Bilinmiyor'}</td>
                    <td>${notification.userName || 'Bilinmiyor'}</td>
                    <td>${notification.olayTuru || 'Bilinmiyor'}</td>
                    <td>${new Date(notification.tespitTarihi).toLocaleString() || 'Bilinmiyor'}</td>
                    <td><span class="status ${statusClass}">${notification.statu}</span></td>
                    <td>${notification.adminYorum || 'Bilinmiyor'}</td>
                    <td><button class="details" onclick="showDetail(${notification.ticketId})">Detay</button></td>
                    <td><button class="edit" onclick="openEditModal(${notification.ticketId}, '${notification.statu}', '${notification.adminYorum}')">Düzenle</button></td>
                `;

                tableBody.appendChild(row);
            });
        })
}




function showDetail(ticketId) {
    const data = allNotifications.find(ticket => ticket.ticketId === ticketId);
    if (!data) {
        alert("Bildirime ulaşılamadı!");
        return;
    }

    document.getElementById('detail-content').innerHTML = `
        <h2>Ticket Detayları</h2>
        <strong>Ticket ID:</strong> ${data.ticketId || 'Bilinmiyor'} <br><br>
        
        <strong>Açılma Tarihi:</strong> ${new Date(data.olusturulmaTarihi).toLocaleString() || 'Bilinmiyor'} <br>
        <strong>Kısa Açıklama:</strong> ${data.kisaAciklama || 'Bilinmiyor'} <br><br>

        <strong>Durum:</strong> ${data.statu || 'Bilinmiyor'} <br><br>

        <strong>Detaylı Açıklama:</strong><br>
        <strong>Olay Türü:</strong> ${data.olayTuru || 'Bilinmiyor'} <br>
        <strong>Etkilenen Sistem:</strong> ${data.etkilenenSistem || 'Bilinmiyor'} <br>
        <strong>Tespit Tarihi:</strong> ${new Date(data.tespitTarihi).toLocaleString() || 'Bilinmiyor'} <br>
        <strong>Tespit Yöntemi:</strong> ${data.tespitYontemi || 'Bilinmiyor'} <br>
        <strong>Siber İz Tespit Edildi mi?:</strong> ${data.izKayitlari ? 'Evet' : 'Hayır'} <br>
        <strong>Olay Sistem Kesintisine Sebep Oldu mu?:</strong> ${data.sistemKesintisi ? 'Evet' : 'Hayır'} <br>
        <strong>Alınan Önlem:</strong> ${data.karsiOnlemler || 'Bilinmiyor'} <br>
        <strong>Ek Bilgiler:</strong> ${data.ekBilgi || 'Yok'} <br><br>

        <strong>Admin Yorumu:</strong> ${data.adminYorum || 'Henüz yorum yapılmadı.'} <br>
    `;

    document.getElementById('detail-modal').style.display = 'block';
}



function closeDetailModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

function openEditModal(ticketId, statu, adminYorum) {
    document.getElementById('status-select').value = statu;
    document.getElementById('admin-comment').value = adminYorum;
    document.getElementById('save-btn').setAttribute('onclick', `updateTicketStatus(${ticketId})`);
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function updateTicketStatus(ticketId) {
    const newStatus = document.getElementById('status-select').value;
    const newComment = document.getElementById('admin-comment').value;

    if (!newComment.trim()) {
        alert("Yorum boş olamaz!");
        return;
    }

    const body = {
        ticketId: ticketId,
        statu: newStatus,
        adminYorum: newComment
    };

    fetch('http://45.10.151.249:8080/api/ticket/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`
        },
        body: JSON.stringify(body)
    })
    .then(() => {
        alert('Bildirim güncellendi!');
        closeEditModal();
        fetchNotifications();
    })

}