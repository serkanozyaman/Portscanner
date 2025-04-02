let isLogin = true;

// Form geçişi (Giriş & Kayıt)
function toggleForm() {
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    if (isLogin) {
        loginBox.style.transform = 'translate(-160%, -50%)';
        registerBox.style.transform = 'translate(-50%, -50%)';
    } else {
        loginBox.style.transform = 'translate(-50%, -50%)';
        registerBox.style.transform = 'translate(150%, -50%)';
    }
    isLogin = !isLogin;
}

// **Admin Login İşlemi**
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const userName = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value.trim();

    if (!userName || !password) {
        alert("Kullanıcı adı ve şifre boş bırakılamaz!");
        return;
    }

    try {
        const response = await fetch('http://45.10.151.249:8080/api/admin/loginAdmin', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userName, password }),
        });
        
        const data = await response.json();
        
        if (response.ok) {
            if (data.token) {
                localStorage.setItem("username", userName);
                localStorage.setItem("authToken", data.token);
                alert("Giriş başarılı!");
                window.location.href = "manager.html";
            } else {
                alert("Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
            }
        } else {
            alert("Sunucu hatası! Lütfen tekrar deneyin.");
        }    
        } catch (error) {
            console.error("Giriş hatası:", error);
            alert("Sunucu hatası! Lütfen tekrar deneyin.");
        }
});

// **Boş Alan Kontrolü (Kayıt Ol)**
const registerForm = document.getElementById('register-form');
const registerButton = registerForm.querySelector("button");

registerForm.addEventListener("input", function() {
    const inputs = registerForm.querySelectorAll("input");
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });

    registerButton.disabled = !allFilled; // Eğer boş alan varsa butonu pasif yap
});

// **Admin Kayıt İşlemi**
registerForm.addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('register-firstname').value.trim();
    const surname = document.getElementById('register-lastname').value.trim();
    const userName = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();

    if (!name || !surname || !userName || !email || !password) {
        alert("Tüm alanları doldurmalısınız!");
        return;
    }

    const requestBody = { name, surname, userName, email, password };

    // try {
    //     const response = await fetch('http://localhost:8080/api/admin/addAdmin', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(requestBody),
    //     });

    //     const data = await response.text();
        
    //     if (response.ok) {
    //         alert("Kayıt başarılı! Giriş yapabilirsiniz.");
    //         toggleForm(); // Kullanıcıyı giriş formuna yönlendir
    //     } else {
    //         alert(data || "Kayıt başarısız!");
    //     }
    // } catch (error) {
    //     console.error("Kayıt hatası:", error);
    //     alert("Sunucu hatası! Lütfen tekrar deneyin.");
    // }
});

// **Çıkış İşlemi (Logout)**
function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("authToken");
    alert("Çıkış yapıldı!");
    window.location.href = "manager_login.html"; // Giriş sayfasına yönlendir
}

// **Kullanıcı giriş yapmamışsa yönlendirme**
document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("authToken");
    if (!token && window.location.pathname !== "/login.html") {
        window.location.href = "manager_login.html"; // Kullanıcı login değilse, login sayfasına yönlendir
    }
});
