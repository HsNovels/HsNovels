// Novel Management Functions
let currentFilter = 'all';

function renderNovels(novels = null) {
    const grid = document.getElementById('novelGrid');
    if (!grid) return;

    const novelsToRender = novels || StorageManager.getNovels();
    
    if (novelsToRender.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: white;">
                <h2>📚 Belum Ada Novel</h2>
                <p>Klik tombol + untuk menambahkan novel pertama Anda!</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = novelsToRender.map(novel => `
        <div class="novel-card" onclick="openNovel(${novel.id})">
            <img src="${novel.cover || 'https://via.placeholder.com/300x400?text=No+Cover'}" 
                 alt="${novel.title}" 
                 class="novel-cover"
                 onerror="this.src='https://via.placeholder.com/300x400?text=No+Cover'">
            <div class="novel-info">
                <div class="novel-title">${novel.title}</div>
                <span class="novel-genre">${novel.genre}</span>
                <div class="novel-stats">
                    <span>📖 ${novel.chapters.length} Bab</span>
                    <span>⭐ ${calculateRating(novel)}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function calculateRating(novel) {
    // Simulasi rating berdasarkan jumlah bab
    const baseRating = 4.0;
    const bonus = Math.min(novel.chapters.length * 0.1, 1.0);
    return (baseRating + bonus).toFixed(1);
}

function filterByGenre(genre) {
    currentFilter = genre;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const novels = StorageManager.getNovels();
    const filtered = genre === 'all' 
        ? novels 
        : novels.filter(n => n.genre === genre);
    
    renderNovels(filtered);
}

function searchNovels() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const novels = StorageManager.getNovels();
    
    const filtered = novels.filter(novel => 
        novel.title.toLowerCase().includes(query) ||
        novel.genre.toLowerCase().includes(query)
    );
    
    renderNovels(filtered);
}

function openNovel(novelId) {
    window.location.href = `reader.html?id=${novelId}`;
}

function showAddModal() {
    document.getElementById('addModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addModal').style.display = 'none';
    document.getElementById('addNovelForm').reset();
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addNovelForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const novel = {
                title: document.getElementById('novelTitle').value,
                genre: document.getElementById('novelGenre').value,
                description: document.getElementById('novelDescription').value,
                cover: document.getElementById('novelCover').value
            };
            
            StorageManager.addNovel(novel);
            closeModal();
            renderNovels();
            
            alert('Novel berhasil ditambahkan!');
        });
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('addModal');
    if (event.target === modal) {
        closeModal();
    }
                      }
