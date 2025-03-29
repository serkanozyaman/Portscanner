
let isLogin = true;

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




//Başarılıysa yönlendirme yap, değilse hata göster
document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const userName = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:8080/api/public/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userName, password}),
    });


    if (response.ok) {
        const data = await response.json();
        if (data.token) {
            localStorage.setItem("username", userName)
            localStorage.setItem("authToken", data.token); // Token'ı sakla
            alert("Giriş başarılı!");
            window.location.href = "index.html"; // Başarılıysa yönlendir
        } else {
            alert("Giriş başarısız! Kullanıcı adı veya şifre hatalı.");
        }
    } else {
        alert("Sunucu hatası! Lütfen tekrar deneyin.");
    }
});


//Boş alan bırakılırsa buton pasif olur
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

//Verileri gönderme
 registerForm.addEventListener('submit', async function(event) {
     event.preventDefault();

     const isim = document.getElementById('register-firstname').value;
     const soyisim = document.getElementById('register-lastname').value;
     const userName = document.getElementById('register-username').value;
     const mail = document.getElementById('register-email').value;
     const password = document.getElementById('register-password').value;
     const telefon = document.getElementById('register-phone').value;

     const requestBody = { isim, soyisim, password, userName, mail, telefon };
     try {
        const response = await fetch('http://localhost:8080/api/public/addUsers', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
            credentials: 'include',
            withCredentials: true
        });

        const data = await response.text();
        
        if (response.ok) {
            alert("Kayıt başarılı! Giriş yapabilirsiniz.");
            toggleForm(); // Kullanıcıyı giriş formuna yönlendir
        } else {
            alert(data || "Kayıt başarısız!");
        }
    } catch (error) {
        console.error("Kayıt hatası:", error);
        alert("Sunucu hatası! Lütfen tekrar deneyin.");
    }
     
 })
    





