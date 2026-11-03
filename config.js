/* ==========================================================================
   Everything you would normally edit lives in this file.
   URL parameters override some settings without editing anything:
     ?id=P07          pre-fills the participant code
     ?blocks=4        number of blocks
     ?trials=5        sentences per block
     ?mic=0           skip the microphone (parent records separately)
     ?example=0       skip the demo sentence
   ========================================================================== */

window.CONFIG = {
  expName: 'langloc_home',
  blockType: 'VIS-SENT',     // written to the block_type column, as in the scanner output

  blocks: 4,                 // 4 x 5 = 20 sentences
  trialsPerBlock: 5,         // scanner default is also 5

  minResponseSec: 0.6,       // taps sooner than this after a sentence appears are ignored (stops double-tap skips)
  itiSec: 0.5,               // fixation cross after each sentence (scanner: 0.1 s)
  blankSec: 0.5,             // blank screen after the block-start tap (same as scanner)
  restSec: 3,                // rest screen between blocks (scanner: 5–15 s)

  // One demo sentence before block 1, logged as block 0 / EXAMPLE. Set to '' to skip.
  exampleSentence: 'Kedi kasedeki sütü ___.',

  normalizeBlank: true,      // draw every run of underscores as the same-length line
                             // (the spreadsheet uses 2–6 underscores; the CSV keeps the original text)
  fullscreen: true,          // Android / desktop only; iPhone Safari has no page fullscreen
  audioBitsPerSecond: 64000,
};

/* Text shown on screen. Parent-facing screens use "siz", child-facing screens use "sen". */
window.TEXT = {
  title: 'Cümle Tamamlama Alıştırması',
  welcomeIntro: 'Bu kısa alıştırma, çocuğunuzun MR çekiminde yapacağı cümle tamamlama görevine benzer. Yaklaşık 5 dakika sürer.',
  tips: [
    'Sessiz bir oda seçin; televizyonu ve müziği kapatın.',
    'Telefonu sessize alın ve çocuğunuzun önüne, yaklaşık bir kol mesafesine koyun.',
    'Alıştırma sırasında başka bir uygulamaya geçmeyin.',
    'Örnek cümlede yardım edebilirsiniz; sonraki cümlelerde lütfen yardım etmeyin.',
  ],
  privacy: 'Ses kaydı internete yüklenmez; yalnızca bu cihazda oluşturulur ve saklanır. Alıştırma bitince dosyaları araştırmacıya siz gönderirsiniz.',
  inApp: 'Bu sayfa başka bir uygulamanın içinde açılmış görünüyor. Mikrofon çalışmazsa bağlantıyı Safari (iPhone) veya Chrome (Android) ile açın.',
  idLabel: 'Katılımcı kodu',
  idHelp: 'Araştırmacının size verdiği kodu yazın.',
  idMissing: 'Lütfen katılımcı kodunu yazın.',
  start: 'Başla',
  contact: '',               // e.g. 'Sorun olursa: Tamer Gezici, 05xx xxx xx xx' (shown on first and last screen)

  storedTitle: 'Bu cihazda kayıtlı oturumlar',
  storedTrials: 'cümle',
  storedPartial: 'yarım kaldı',
  storedSent: 'gönderildi',
  deleteBtn: 'Bu kaydı sil',
  deleteConfirm: 'Silmek için tekrar dokunun',

  micTitle: 'Mikrofon',
  micAsk: 'Alıştırma sırasında çocuğunuzun sesi kaydedilecek. Lütfen mikrofon izni verin.',
  micAllow: 'Mikrofona izin ver',
  micTest: 'Çocuğunuzdan birkaç kelime söylemesini isteyin. Konuşurken yeşil çubuk hareket etmeli.',
  micOk: 'Çubuk hareket ediyor, devam et',
  micSkip: 'Mikrofon olmadan devam et',
  micSkipNote: 'Mikrofon olmadan devam ederseniz, lütfen alıştırma boyunca sesi başka bir telefonla kaydedin (Ses Kaydedici / Sesli Notlar) ve o kaydı da gönderin.',
  micDenied: 'Mikrofon izni verilmedi. Tarayıcı ayarlarından bu site için mikrofona izin verip sayfayı yenileyin ya da mikrofon olmadan devam edin.',
  micFailed: 'Mikrofon açılamadı. Başka bir uygulama mikrofonu kullanıyor olabilir. Sayfayı yenileyip tekrar deneyin ya da mikrofon olmadan devam edin.',
  micUnsupported: 'Bu tarayıcı ses kaydını desteklemiyor. Bağlantıyı Safari (iPhone) veya Chrome (Android) ile açın ya da mikrofon olmadan devam edin.',

  // Child-facing (grey screens, like the scanner)
  instructions: 'Ekranda cümleler göreceksin.\nHer cümlenin sonunda bir boşluk var.\n\nCümleyi sesli oku ve boşluğa uyan kelimeyi söyle.\n\nBitirince BİTTİ düğmesine dokun.',
  ready: 'Hazırım',
  exampleLabel: 'ÖRNEK',
  doneBtn: 'BİTTİ',
  blockStartTouch: 'Başlamak için ekrana dokun.',
  blockStartKey: 'Başlamak için bir tuşa bas.',
  rest: 'Biraz dinlen.',
  paused: 'Ara verildi.\n\nDevam etmek için ekrana dokun.',
  finishedChild: 'Bitti!\nTeşekkürler 🌟',

  // End screen (parent)
  endTitle: 'Alıştırma tamamlandı. Teşekkürler!',
  endSend: 'Lütfen aşağıdaki dosyaları araştırmacıya gönderin.',
  endKeep: 'Sayfayı kapatırsanız, aynı bağlantıyı bu cihazda yeniden açarak dosyalara tekrar ulaşabilirsiniz.',
  endNoMic: 'Sesi başka bir telefonla kaydettiyseniz, o kaydı da gönderin.',
  shareBtn: 'Dosyaları gönder',
  shareHelp: 'Açılan menüden WhatsApp, e-posta veya Google Drive’ı seçin.',
  shared: 'Paylaşım tamamlandı. Dosyaların ulaştığını araştırmacıyla teyit edin.',
  shareFailed: 'Paylaşım menüsü açılamadı. Dosyaları aşağıdan indirip gönderebilirsiniz.',
  downloadHdr: 'Dosyaları indirin ve araştırmacıya gönderin:',
  downloadAlt: 'Gönderme çalışmazsa dosyaları indirin:',
};

/* Sentences: all 101 rows of sent_comp_TR_PEDIATRIC_NEW.xlsx, in spreadsheet order.
   stim_no in the output CSV = position in this list = Excel row number.
   Each session draws sentences at random without repeats (like the scanner script).
   To give the home practice its own items, replace this list. */
window.SENTENCES = [
  "Yolda yürürken ayağı takıldı ve ___.",
  "Kayıp oyuncağımı bulunca çok ___.",
  "Her sabah saat yedide okula _____.",
  "Kulaklığını takıp müzik ___.",
  "Montumun düğmesi ___.",
  "Sabah kahvaltıda yumurta ___.",
  "Doğum günümde pastamın mumlarını ___.",
  "Güneş açınca hava ___.",
  "Çantamdan renkli boya kalemlerimi ___. ",
  "Gece uyumadan önce dişlerimi ___. ",
  "Top oynarken yanlışlıkla  camı ___. ",
  "Elimden düşen cam bardak __",
  "Kardeşimle parkta saklambaç ___. ",
  "Gece olunca yatağıma yatıp ___. ",
  "Ağaçtaki kırmızı elmayı koparıp ___. ",
  "Televizyonda en sevdiğim çizgi filmi ___. ",
  "Babamla dışarıda yürümeyi çok ______.",
  "Annem bana uyumadan önce masal ___. ",
  "Soğuk havada üşümemek için atkımı ___. ",
  "Parktan dönünce ellerimi sabunla ___. ",
  "Öğretmenimin sorduğu soruyu doğru ___. ",
  "Fırından yeni çıkan sıcak patatesleri  ___. ",
  "Yarışmada birinci olunca ödül ___. ",
  "Öğretmenimiz tahtadaki yazıyı silgiyle ___. ",
  "Sabah uyanınca yüzümü suyla ___. ",
  "Marketten aldığımız yumurtalar yolda ___. ",
  "Kışın kocaman bir kardan adam ___. ",
  "Acıktığım için kantinden tost ___. ",
  "Yaz tatilinde denizde _____. ",
  "Oynadıktan sonra oyuncaklarımı  ___. ",
  "Babamla birlikte diş doktoruna ___. ",
  "Saksıdaki çiçeklere bir bardak su ___. ",
  "Karlı yolda kaymamak için botlarımı ___. ",
  "Yolda karşıdan karşıya geçerken dikkatli ___. ",
  "Akşam hava kararınca odamın ışığını  ___. ",
  "Arkadaşım bana hediye  ___.",
  "On beş dakikadır kapıda seni ___.",
  "Yere düşünce pantolonum ___.",
  "Arkadaşım evimize gelince ona kek  ____.",
  "Seneye üçüncü sınıfa ____.",
  "Hava ısınınca yerdeki karlar ___.",
  "Amcam hortumla bahçeyi ___.",
  "Ağacın dalına iki kuş ___.",
  "Yağmur yağdığı için şemsiyeni ___.",
  "Çiftçi tarlasına tohum ___.",
  "Mayomu unuttuğum için denize ____.",
  "Öğretmeni öğrencilere ödev ___.",
  "Annem çayına iki şeker ___.",
  "Babası oğluna doğum günü hediyesi ____.",
  "Komşumuzun kızı bu sene beşinci sınıfa ___.",
  "Eve gelirken bakkaldan iki ekmek ____.",
  "Dedem yemekte çorba ____.",
  "Bulaşık yıkarken tabağı yere ___.",
  "Parkta çocuklar oyun _____.",
  "Salonda kardeşiyle oyun  ____.",
  "Berber, amcamın saçını çok kısa ____.",
  "Servis beni evime kadar ___.",
  "Ablam çok yüksek sesli müzik _____.",
  "Harçlığımı kardeşime hediye almak için  ____.",
  "Parktaki kaydıraktan ___.",
  "Geçen hafta ilk kez uçağa ____.",
  "Hastalanmamak için portakal suyu ____.",
  "Geçen sene grip aşısı ___.",
  "Bugün okulda en sevdiğim yemek ____.",
  "Kırtasiyeden yeni bir silgi ___.",
  "Hava çok sıcak olduğu için _____.",
  "Babam evi temizlerken ona yardım ___.",
  "Sokakta yürürken yolda bir kedi ___.",
  "Baharda çiçekler ___.",
  "Çok kar yağdığı için yollar ___.",
  "Yapbozumun bir parçası ___.",
  "Tatilde bol bol ___.",
  "Kazağım kirlendiği için ___.",
  "Kalemimi evde unutunca arkadaşımdan ___.",
  "Kardeşim hastalandığı için okula ___.",
  "Ödevlerimi bitirince kitap ___.",
  "Televizyonda belgesel izlemeyi çok _____.",
  "Arkadaşımla marketten çikolata ___.",
  "Eve gelen misafirlere çay ___.",
  "Sıcak havalarda su ___.",
  "Parkta koluma uğur böceği ___.",
  "Odam dağınık olunca ___.",
  "Çok şeker yediğim için karnım ___.",
  "Yazın ailemle tatile ___.",
  "Kurabiyeler pişince çok güzel ___.",
  "Gece yatmadan önce süt ___.",
  "Sabah olunca horoz ___.",
  "Boyama kitabım yırtılınca yenisini ___.",
  "Yavru kediye mama ___.",
  "Sinemaya gittiğimde patlamış mısır ___.",
  "Bugün lunaparkta çok ___.",
  "Bayramda büyüklerimin elini ___.",
  "Kardeşimin ödevine yardım ___.",
  "Karşımızdaki eve yeni insanlar ___.",
  "Yediğim çikolatının çöpünü çöpe ___.",
  "Dedemin bahçesinden çilek ___.",
  "Babamla pazardan sebze ___.",
  "Annem yaptığım resmi çok ___.",
  "Bu akşam Ankara'ya _____.",
  "En sevdiğim arkadaşımla oyun _____.",
  "Bu sabah erken ______."
];
