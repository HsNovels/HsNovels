// Storage Manager using localStorage
const StorageManager = {
    // Get all novels
    getNovels() {
        const novels = localStorage.getItem('novels');
        return novels ? JSON.parse(novels) : [];
    },

    // Save novels
    saveNovels(novels) {
        localStorage.setItem('novels', JSON.stringify(novels));
    },

    // Add new novel
    addNovel(novel) {
        const novels = this.getNovels();
        novel.id = Date.now();
        novel.chapters = [];
        novel.createdAt = new Date().toISOString();
        novels.push(novel);
        this.saveNovels(novels);
        return novel;
    },

    // Get novel by ID
    getNovelById(id) {
        const novels = this.getNovels();
        return novels.find(n => n.id === id);
    },

    // Update novel
    updateNovel(id, updates) {
        const novels = this.getNovels();
        const index = novels.findIndex(n => n.id === id);
        if (index !== -1) {
            novels[index] = { ...novels[index], ...updates };
            this.saveNovels(novels);
        }
    },

    // Delete novel
    deleteNovel(id) {
        let novels = this.getNovels();
        novels = novels.filter(n => n.id !== id);
        this.saveNovels(novels);
    },

    // Add chapter to novel
    addChapter(novelId, chapter) {
        const novels = this.getNovels();
        const novel = novels.find(n => n.id === novelId);
        if (novel) {
            chapter.id = Date.now();
            chapter.number = novel.chapters.length + 1;
            novel.chapters.push(chapter);
            this.saveNovels(novels);
        }
    },

    // Get chapter by number
    getChapter(novelId, chapterNumber) {
        const novel = this.getNovelById(novelId);
        if (novel) {
            return novel.chapters.find(c => c.number === chapterNumber);
        }
        return null;
    },

    // Save reading progress
    saveProgress(novelId, chapterNumber, scrollPosition) {
        const key = `progress_${novelId}`;
        localStorage.setItem(key, JSON.stringify({
            chapter: chapterNumber,
            position: scrollPosition,
            timestamp: new Date().toISOString()
        }));
    },

    // Get reading progress
    getProgress(novelId) {
        const key = `progress_${novelId}`;
        const progress = localStorage.getItem(key);
        return progress ? JSON.parse(progress) : null;
    }
};
