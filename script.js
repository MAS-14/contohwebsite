// script.js

document.addEventListener('DOMContentLoaded', function() {
    // --- Fitur Pencarian Interaktif (Universal) ---
    // Karena sekarang hanya ada satu set input/tombol pencarian di overlay
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        searchInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }

    function performSearch(searchTerm) {
        searchTerm = searchTerm.toLowerCase().trim();

        if (searchTerm === '') {
            // Menggunakan pesan kustom alih-alih alert()
            displayMessage('Silakan masukkan kata kunci pencarian.', 'warning');
            return;
        }

        // Logika pencarian sederhana berdasarkan kata kunci
        if (searchTerm.includes('html')) {
            window.location.href = 'materi.html#materi-html';
        } else if (searchTerm.includes('css')) {
            window.location.href = 'materi.html#materi-css';
        } else if (searchTerm.includes('javascript') || searchTerm.includes('js')) {
            window.location.href = 'materi.html#materi-javascript';
        } else if (searchTerm.includes('acode') || searchTerm.includes('plugin')) {
            window.location.href = 'materi.html#materi-acode-plugin';
        } else if (searchTerm.includes('galeri') || searchTerm.includes('foto') || searchTerm.includes('video')) {
            window.location.href = 'gallery.html';
        } else if (searchTerm.includes('beranda') || searchTerm.includes('home')) {
            window.location.href = 'index.html';
        } else if (searchTerm.includes('maarif') || searchTerm.includes('sukorame')) {
            window.location.href = 'index.html'; // Arahkan ke beranda jika mencari nama lembaga
        } else {
            // Menggunakan pesan kustom alih-alih alert()
            displayMessage('Konten dengan kata kunci "' + searchTerm + '" tidak ditemukan. Coba kata kunci lain seperti "HTML", "CSS", "JavaScript", "Acode", "Galeri", atau "Beranda".', 'info');
        }
    }

    // --- Fungsi untuk menampilkan pesan kustom (pengganti alert()) ---
    function displayMessage(message, type = 'info') {
        let messageBox = document.getElementById('custom-message-box');
        if (!messageBox) {
            messageBox = document.createElement('div');
            messageBox.id = 'custom-message-box';
            messageBox.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #333;
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 2000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
                font-family: 'Poppins', sans-serif;
                font-size: 1rem;
                text-align: center;
            `;
            document.body.appendChild(messageBox);
        }

        messageBox.textContent = message;
        if (type === 'warning') {
            messageBox.style.backgroundColor = '#ffc107'; // Kuning
            messageBox.style.color = '#333';
        } else if (type === 'info') {
            messageBox.style.backgroundColor = '#007bff'; // Biru
            messageBox.style.color = 'white';
        }
        
        messageBox.style.opacity = '1';
        messageBox.style.visibility = 'visible';

        setTimeout(() => {
            messageBox.style.opacity = '0';
            messageBox.style.visibility = 'hidden';
        }, 3000); // Pesan akan hilang setelah 3 detik
    }


    // --- Menu Hamburger Interaktif (Universal) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const closeMenu = document.querySelector('.close-menu');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const navLinksInOverlay = document.querySelectorAll('.overlay-nav .nav-link'); // Target navigasi di overlay

    if (menuToggle && mobileMenuOverlay && closeMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenuOverlay.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // Mencegah scrolling body saat menu terbuka
        });

        closeMenu.addEventListener('click', function() {
            mobileMenuOverlay.classList.remove('is-open');
            document.body.style.overflow = ''; // Mengembalikan scrolling body
        });

        // Menutup menu saat link di dalam overlay diklik
        navLinksInOverlay.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenuOverlay.classList.remove('is-open');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Efek Kelas Aktif pada Navigasi (Hanya untuk overlay nav) ---
    const navLinksOverlay = document.querySelectorAll('.overlay-nav .nav-link');
    const currentPath = window.location.pathname.split('/').pop();

    function setActiveLink(links) {
        links.forEach(link => {
            link.classList.remove('active'); // Hapus kelas 'active' dari semua link
            if (link.getAttribute('href') === currentPath) {
                link.classList.add('active'); // Tambahkan kelas 'active' jika href sesuai
            }
        });
    }

    // Panggil fungsi untuk navigasi overlay
    setActiveLink(navLinksOverlay);
});
