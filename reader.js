// Reader Functions
let currentNovel = null;
let currentChapter = null;
let readerSettings = {
    fontSize: 16,
    fontFamily: 'Georgia',
    theme: 'light',
    lineHeight: 1.6
};

// Load novel and chapter
function loadNovel(novelId) {
    currentNovel = StorageManager.getNovelById(parseInt(novelId));
    if (!currentNovel) {
        alert('Novel tidak ditemukan!');
        window.history.back();
        return;
    }

    document.getElementById('pageTitle').textContent = currentNovel.title;
    renderChapterList();
    
    // Load last read chapter or first chapter
    const progress = StorageManager.getProgress(currentNovel.id);
    const chapterNum = progress ? progress.chapter : 1;
    loadChapter(chapterNum);
}

function loadChapter(chapterNumber) {
    currentChapter = StorageManager.getChapter(currentNovel.id, chapterNumber);
    
    if (!currentChapter) {
        alert('Bab tidak ditemukan!');
        return;
    }

    document.getElementById('chapterTitle').textContent = 
        `Bab ${currentChapter.number}: ${currentChapter.title}`;
    
    document.getElementById('chapterContent').innerHTML = 
        `<div class="chapter-text">${currentChapter.content}</div>`;
    
    // Update navigation buttons
    updateNavButtons();
    
    // Update progress bar
    updateProgressBar();
    
    // Highlight current chapter in list
    highlightCurrentChapter(chapterNumber);
    
    // Restore scroll position if exists
    const progress = StorageManager.getProgress(currentNovel.id);
    if (progress && progress.chapter === chapterNumber) {
        setTimeout(() => {
            window.scrollTo(0, progress.position || 0);
        }, 100);
    } else {
        window.scrollTo(0, 0);
    }
    
    // Save current chapter as last read
    StorageManager.saveProgress(currentNovel.id, chapterNumber, 0);
}

function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentChapter.number <= 1;
    nextBtn.disabled = currentChapter.number >= currentNovel.chapters.length;
}

function updateProgressBar() {
    const progress = (currentChapter.number / currentNovel.chapters.length) * 100;
    document.getElementById('readingProgress').style.width = progress + '%';
}

function previousChapter() {
    if (currentChapter.number > 1) {
        loadChapter(currentChapter.number - 1);
    }
}

function nextChapter() {
    if (currentChapter.number < currentNovel.chapters.length) {
        loadChapter(currentChapter.number + 1);
    }
}

function renderChapterList() {
    const list = document.getElementById('chapterList');
    if (!list || !currentNovel) return;
    
    list.innerHTML = currentNovel.chapters.map(chapter => `
        <div class="chapter-item" data-number="${chapter.number}" 
             onclick="loadChapter(${chapter.number})">
            Bab ${chapter.number}: ${chapter.title}
        </div>
    `).join('');
}

function searchChapters() {
    const query = document.getElementById('chapterSearch').value.toLowerCase();
    const items = document.querySelectorAll('.chapter-item');
    
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'block' : 'none';
    });
}

function toggleChapterList() {
    const sidebar = document.getElementById('chapterSidebar');
    sidebar.classList.toggle('open');
}

function highlightCurrentChapter(number) {
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.classList.remove('active');
        if (parseInt(item.dataset.number) === number) {
            item.classList.add('active');
        }
    });
}

// Reader Settings
function toggleReaderSettings() {
    const modal = document.getElementById('settingsModal');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function updateFontSize(size) {
    readerSettings.fontSize = size;
    document.getElementById('fontSizeValue').textContent = size + 'px';
    applyReaderSettings();
}

function updateFontFamily(font) {
    readerSettings.fontFamily = font;
    applyReaderSettings();
}

function updateLineHeight(height) {
    readerSettings.lineHeight = height;
    applyReaderSettings();
}

function setReaderTheme(theme) {
    readerSettings.theme = theme;
    const container = document.querySelector('.reader-container');
    container.className = 'reader-container';
    
    if (theme !== 'light') {
        container.classList.add(`reader-${theme}`);
    }
    
    // Save preference
    localStorage.setItem('readerTheme', theme);
}

function applyReaderSettings() {
    const content = document.getElementById('chapterContent');
    content.style.fontSize = readerSettings.fontSize + 'px';
    content.style.fontFamily = readerSettings.fontFamily;
    content.style.lineHeight = readerSettings.lineHeight;
}

function goBack() {
    window.location.href = 'index.html';
}

// Initialize reader
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const novelId = params.get('id');
    
    if (novelId) {
        loadNovel(novelId);
        
        // Load saved settings
        const savedTheme = localStorage.getItem('readerTheme');
        if (savedTheme) {
            setReaderTheme(savedTheme);
        }
    }
    
    // Save scroll position periodically
    window.addEventListener('scroll', function() {
        if (currentNovel && currentChapter) {
            StorageManager.saveProgress(
                currentNovel.id, 
                currentChapter.number, 
                window.scrollY
            );
        }
    });
});
