// Main Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Check if first time visit
    if (!localStorage.getItem('initialized')) {
        addSampleData();
        localStorage.setItem('initialized', 'true');
    }
    
    // Render novels
    renderNovels();
});

// Add sample novels for demonstration
function addSampleData() {
    const sampleNovels = [
        {
            title: "Cinta di Musim Semi",
            genre: "romance",
            description: "Kisah cinta yang indah di tengah keindahan musim semi",
            cover: "",
            chapters: [
                {
                    title: "Pertemuan Pertama",
                    content: `<p>Matahari pagi menyinari taman kota dengan cahaya keemasan. Angin sepoi-sepoi membawa aroma bunga sakura yang baru mekar.</p>
                    
                    <p>Aku duduk di bangku favoritku, menikmati secangkir kopi hangat sambil membaca buku. Tiba-tiba, seseorang menabrak mejaku dari belakang.</p>
                    
                    <p>"Maaf!" suara lembut terdengar di telingaku.</p>
                    
                    <p>Aku berbalik dan melihat seorang gadis dengan rambut hitam panjang yang terurai indah. Matanya bulat dan bersinar seperti bintang.</p>
                    
                    <p>"Tidak apa-apa," jawabku sambil tersenyum.</p>
                    
                    <p>Itulah pertama kalinya aku bertemu dengannya. Dan aku tidak tahu bahwa pertemuan singkat itu akan mengubah hidupku selamanya...</p>`
                },
                {
                    title: "Perasaan yang Tumbuh",
                    content: `<p>Sudah seminggu sejak pertemuan pertama kami. Setiap hari, aku berharap bisa bertemu dengannya lagi di taman yang sama.</p>
                    
                    <p>Dan akhirnya, hari ini dia datang lagi. Dia mengenakan dress putih yang membuatnya terlihat seperti bidadari.</p>
                    
                    <p>"Hai," sapanya dengan senyum manis.</p>
                    
                    <p>Jantungku berdebar kencang. Aku mencoba tetap tenang meskipun dalam hati sudah panik.</p>
                    
                    <p>"Hai juga. Mau duduk?" tanyaku sambil menunjuk tempat di sampingku.</p>
                    
                    <p>Dia mengangguk dan duduk di sampingku. Kami mulai mengobrol tentang hal-hal kecil, tapi bagiku setiap kata darinya terasa sangat berarti.</p>`
                },
                {
                    title: "Pengakuan Cinta",
                    content: `<p>Hujan turun dengan deras malam itu. Aku berdiri di bawah pohon sakura, menunggu seseorang.</p>
                    
                    <p>Dia muncul dengan payung merah muda di tangannya. Rambutnya sedikit basah, tapi dia tetap terlihat cantik.</p>
                    
                    <p>"Kenapa kamu berdiri di sini tanpa payung?" tanyanya khawatir.</p>
                    
                    <p>Aku mengambil napas dalam-dalam. Ini saatnya.</p>
                    
                    <p>"Aku... aku ingin mengatakan sesuatu padamu."</p>
                    
                    <p>Dia menatapku dengan mata penuh pertanyaan.</p>
                    
                    <p>"Sejak pertama kali bertemu denganmu, hatiku tidak pernah berhenti berdebar. Kamu adalah orang yang paling spesial bagiku."</p>
                    
                    <p>Wajahnya memerah. Air matanya mulai berlinang, tapi kali ini bukan karena sedih.</p>
                    
                    <p>"Aku juga... merasa hal yang sama," bisiknya pelan.</p>
                    
                    <p>Dan di bawah hujan deras itu, kami akhirnya saling mengungkapkan perasaan kami...</p>`
                }
            ]
        },
        {
            title: "Petualangan Kerajaan Fantasi",
            genre: "fantasy",
            description: "Perjalanan epik menuju kerajaan yang hilang",
            cover: "",
            chapters: [
                {
                    title: "Dunia Baru",
                    content: `<p>Cahaya biru menyilaukan memenuhi ruangan. Portal ajaib terbuka di hadapanku, mengeluarkan energi mistis yang kuat.</p>
                    
                    <p>"Ini dia," kata penyihir tua itu. "Portal menuju Kerajaan Aetheria."</p>
                    
                    <p>Aku menelan ludah. Selama ini aku hanya mendengar cerita tentang kerajaan itu. Tapi sekarang, aku harus memasukinya.</p>
                    
                    <p>"Ingat," lanjut penyihir itu, "di sana waktu berjalan berbeda. Satu hari di sini bisa menjadi satu bulan di sana."</p>
                    
                    <p>Aku mengangguk, lalu melangkah masuk ke dalam portal...</p>`
                },
                {
                    title: "Sang Naga Penjaga",
                    content: `<p>Hutan kristal membentang luas di depanku. Pohon-pohon transparan bersinar dengan cahaya pelangi.</p>
                    
                    <p>Tiba-tiba, tanah berguncang. Dari balik bukit, seekor naga raksasa muncul dengan sisik berwarna emas.</p>
                    
                    <p>"Siapa kau, manusia?" suaranya menggema seperti petir.</p>
                    
                    <p>Aku berusaha tetap tenang. "Aku datang untuk mencari Raja Aetheria."</p>
                    
                    <p>Naga itu mendengus. "Banyak yang mencoba, sedikit yang berhasil. Apa yang membuatmu berbeda?"</p>
                    
                    <p>Aku menunjukkan amulet yang diberikan penyihir tua. Mata naga itu melebar.</p>
                    
                    <p>"Amulet Raja... Kau memang dipilih. Ikuti aku."</p>`
                }
            ]
        },
        {
            title: "Harem Sang Pangeran",
            genre: "harem",
            description: "Kehidupan romantis pangeran dengan banyak wanita",
            cover: "",
            chapters: [
                {
                    title: "Hari Pertama di Akademi",
                    content: `<p>Akademi Royal Elite adalah sekolah paling bergengsi di negara ini. Dan aku, Adrian Blackwood, adalah putra mahkota yang baru saja mendaftar.</p>
                    
                    <p>Saat memasuki gerbang akademi, semua mata tertuju padaku. Bukan karena statusku sebagai pangeran, tapi karena...</p>
                    
                    <p>"Wow, dia tampan sekali!" bisik seorang gadis berambut pirang.</p>
                    
                    <p>"Lihat ototnya!" tambah gadis lain dengan kacamata.</p>
                    
                    <p>Aku menghela napas. Sudah biasa sih. Tapi hari ini rasanya berbeda.</p>
                    
                    <p>Tiba-tiba, seseorang menabrakku dari samping. Buku-buku berhamburan.</p>
                    
                    <p>"Aduh! Maaf!" Gadis berambut merah itu buru-buru mengumpulkan bukunya.</p>
                    
                    <p>Aku membantu mengangkat salah satu bukunya. Judulnya: "Cara Merayu Pangeran dalam 30 Hari".</p>
                    
                    <p>Kami saling menatap. Wajahnya memerah padam.</p>
                    
                    <p>"Eh... itu... buku teman!" katanya gugup.</p>
                    
                    <p>Aku tersenyum. "Oh ya? Menarik juga judulnya."</p>
                    
                    <p>Entah kenapa, aku merasa tahun ajaran ini akan sangat menarik...</p>`
                }
            ]
        }
    ];

    sampleNovels.forEach(novel => {
        const savedNovel = StorageManager.addNovel({
            title: novel.title,
            genre: novel.genre,
            description: novel.description,
            cover: novel.cover
        });

        novel.chapters.forEach(chapter => {
            StorageManager.addChapter(savedNovel.id, chapter);
        });
    });

    console.log('Sample data added successfully!');
}
