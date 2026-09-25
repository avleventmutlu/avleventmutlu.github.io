/* Av. Levent Mutlu – Hukuki Asistan (kural tabanlı, ücretsiz)
   Tüm sayfalarda ortak kullanılır: <script src="/asistan.js" defer></script>
   Cevapları güncellemek için yalnızca aşağıdaki BILGI listesini düzenleyin. */
(function () {
  'use strict';

  var TEL = '0545 959 48 45';
  var TEL_LINK = 'tel:+905459594845';
  var WA_LINK = 'https://wa.me/905459594845';
  var LOG_URL = 'https://script.google.com/macros/s/AKfycbwxLk2mG7mIRbSOxrA62yukb5gmHuihFWTPRN7BSZ6d6F_aYuUX53ScKErtdgK5N8pLKQ/exec?mesaj=';

  var M = function (id, t) { return { t: t, u: '/makale/' + id + '.html' }; };
  var D = function (id, t) { return { t: t, u: '/dilekce.html#' + id }; };
  var H = function (id, t) { return { t: t, u: '/haber/' + id + '.html' }; };

  /* k: anahtar kelimeler (Türkçe karaktersiz, küçük harf yazın)
     c: cevap   l: bağlantılar   r: randevu düğmesi göster */
  var BILGI = [
    // ---------- GENEL ----------
    { k: ['merhaba', 'selam', 'iyi gunler', 'gunaydin', 'iyi aksamlar'], c: 'Merhaba! Hukuki sorunuzu kısaca yazın; size genel bilgi verip ilgili makale ve dilekçe örneklerini göstereyim.', ara: false, r: false, sadece: true },
    { k: ['tesekkur', 'sagol', 'sag ol', 'eyvallah'], c: 'Rica ederim. Başka bir sorunuz olursa buradayım. Dosyanızı ayrıntılı değerlendirmek isterseniz bizi arayabilirsiniz.', ara: false, r: true, sadece: true },
    { k: ['adres', 'nerede', 'ofis', 'buro', 'ekinoks', 'konum', 'nasil gelirim'], c: 'Büromuz İstanbul Beylikdüzü\'nde, Ekinoks Towers\'dadır (E-5 yanı). Görüşme için lütfen önceden randevu alın.', ara: false, r: true },
    { k: ['telefon', 'iletisim', 'numara', 'whatsapp', 'ulasmak', 'ulasabilir'], c: 'Bize ' + TEL + ' numaralı hattan veya WhatsApp üzerinden ulaşabilirsiniz.', ara: false, r: true },
    { k: ['ucret', 'fiyat', 'ne kadar tutar', 'maliyet', 'vekalet ucreti', 'kac para', 'avukat parasi'], c: 'Vekalet ücreti; dosyanın türüne, aşamasına ve iş yüküne göre belirlenir ve İstanbul Barosu tavsiye tarifesi ile Avukatlık Asgari Ücret Tarifesi dikkate alınır. Net bilgiyi dosyanızı dinledikten sonra verebiliriz.', ara: false, r: true },
    { k: ['randevu', 'gorusme', 'gorusmek', 'avukat lazim', 'avukat ariyorum', 'avukat tutmak'], c: 'Randevu için ' + TEL + ' numarasını arayabilir veya WhatsApp\'tan yazabilirsiniz. Görüşmeye varsa tebligat, iddianame, sözleşme gibi belgelerinizi getirmeniz faydalı olur.', ara: false, r: true },
    { k: ['emsal', 'yargitay karari', 'yargitay kararlari', 'ictihat', 'emsal karar'], c: 'Önemli Yargıtay, Anayasa Mahkemesi ve AİHM kararlarının özetlerini Emsal Kararlar sayfamızda bulabilirsiniz. Konunuzu yazarsanız ilgili kararı da göstermeye çalışırım.', l: [{ t: 'Emsal Kararlar', u: '/emsal-kararlar.html' }], r: false },
    { k: ['hangi adliye', 'adliyesi nerede', 'hangi mahkeme', 'yetkili mahkeme'], c: 'Özetle: Beylikdüzü, Esenyurt ve Büyükçekmece dosyaları Büyükçekmece Adliyesi\'nde; bu ilçelerin ağır ceza dosyaları Bakırköy\'de görülür. Avcılar Küçükçekmece\'ye, Bakırköy ve Bahçelievler Bakırköy\'e, Şişli ve Bayrampaşa Çağlayan\'a, Kadıköy, Üsküdar ve Maltepe Kartal\'daki Anadolu Adliyesi\'ne bağlıdır.', l: [{ t: 'İstanbul bölge sayfalarımız', u: '/istanbul-avukat.html' }], ara: false, r: false },

    // ---------- YARGI PAKETİ ----------
    { k: ['yargi paketi', '12 yargi', '12. yargi', '7589', 'af var mi', 'af cikacak', 'genel af', 'infaz indirimi', 'infaz duzenlemesi'], c: '12. Yargı Paketi (7589 sayılı Kanun) 31 Temmuz 2026\'da yürürlüğe girdi. Pakette genel af veya toplu infaz indirimi yoktur. Hesap kullandırmada ceza indirimi, belirsiz alacak davasının kaldırılması, kanuni faiz ve HAGB\'de değişiklikler getirdi. Nafaka ve infaz düzenlemelerinin 13. Yargı Paketi\'nde ele alınması bekleniyor; henüz taslaktır.', l: [H('12-yargi-paketi-yururlukte-7589', '12. Yargı Paketi yürürlüğe girdi'), H('13-yargi-paketi-sosyal-medya-nafaka-2026', '13. Yargı Paketi taslağı')], r: true },

    // ---------- BİLİŞİM / DOLANDIRICILIK ----------
    { k: ['iban', 'hesap kullandir', 'hesabimi kullandir', 'hesap kirala', 'hesabimi verdim', 'kartimi verdim', 'hesabima para geldi', 'hesap satma', '158/4'], c: 'Hesabınızı veya kartınızı başkasına kullandırdığınız için suçlanıyorsanız: Yargıtay\'a göre yalnızca IBAN sahibi olmak mahkûmiyet için yeterli değildir, kastın somut delille ispatı gerekir. 12. Yargı Paketi ile katkısı yalnızca hesap bilgisini vermekle sınırlı kalanların cezası yarı oranında indirilir (TCK 158/4). İfade vermeden önce mutlaka avukatla görüşün.', l: [M('banka-hesabi-kullandirma-beraat-savunmasi', 'Hesap kullandırmada beraat'), H('iban-hesap-kullandirma-ceza-indirimi-tck-158-4', 'TCK 158/4 ceza indirimi'), D('iban-kullandirma-savunma-dilekce', 'IBAN savunma dilekçesi'), { t: 'TCK 158 emsal kararları', u: '/emsal-kararlar.html#tck-158' }], r: true },
    { k: ['papara', 'ininal', 'tosla', 'dijital cuzdan'], c: 'Papara ve benzeri e-para hesaplarının başkasına kullandırılması da banka hesabı gibi değerlendirilir. Hesaba gelen paranın suçtan kaynaklandığını bilip bilmediğiniz belirleyicidir.', l: [M('papara-hesabi-kullandirdim-ceza-alir-miyim', 'Papara hesabı kullandırdım, ceza alır mıyım?'), D('papara-hesabi-savunma-dilekce', 'Papara savunma dilekçesi')], r: true },
    { k: ['bahis', 'kumar', 'iddaa', 'yasadisi bahis', '7258'], c: 'Yasa dışı bahis dosyalarında oynatma, aracılık, hesap kullandırma ve reklam yapma farklı suçlardır ve cezaları ayrıdır. Sadece oynayanlara ise idari para cezası uygulanır. Suçlamanın hangisi olduğu savunmayı doğrudan belirler.', l: [M('yasadisi-bahis-icin-hesap-kullandirmanin-cezasi-kapsamli-rehber', 'Bahis için hesap kullandırmanın cezası'), D('bahis-sorusturmasi-ifade-savunma', 'Bahis soruşturması savunma dilekçesi')], r: true },
    { k: ['masak', 'supheli islem', 'sib'], c: 'MASAK incelemesi veya bankanın şüpheli işlem bildirimi tek başına suçlu olduğunuz anlamına gelmez. Ancak hesap hareketlerinizin kaynağını belgeleyebilmeniz önemlidir.', l: [M('masak-incelemesi-nedir-2026', 'MASAK incelemesi nedir?'), D('masak-inceleme-savunma-dilekce', 'MASAK savunma dilekçesi')], r: true },
    { k: ['bloke', 'hesabima bloke', 'hesabim donduruldu', 'hesap kapatildi', 'blokaj'], c: 'Hesabınıza bloke konulduysa önce blokenin kim tarafından (banka, savcılık, icra, MASAK) ve hangi gerekçeyle konulduğunu öğrenin. Savcılık kararıyla konulan blokelere karşı kaldırma talebinde bulunulabilir.', l: [M('banka-hesabina-bloke-konulursa-ne-yapilir', 'Hesaba bloke konulursa ne yapılır?'), D('banka-hesabi-bloke-kaldirma', 'Bloke kaldırma dilekçesi')], r: true },
    { k: ['dolandirildim', 'dolandirici', 'dolandiricilik', 'param gitti', 'para kaptirdim', 'sahte ilan', 'sahte site', 'kandirildim'], c: 'Dolandırıcılığa uğradıysanız: 1) Hemen bankanızı arayıp işleme itiraz edin, 2) Tüm yazışma, ekran görüntüsü ve dekontları saklayın, 3) Cumhuriyet Başsavcılığı\'na veya kolluğa suç duyurusunda bulunun ve paranın gittiği hesaba bloke konulmasını talep edin. Hızlı hareket etmek paranın izini sürmek için kritiktir.', l: [M('dolandiricilik-sucu-turkiye', 'Dolandırıcılık suçu rehberi'), D('nitelikli-dolandiricilik-sikayet', 'Dolandırıcılık suç duyurusu dilekçesi')], r: true },
    { k: ['sms', 'link', 'phishing', 'oltalama', 'kart bilgi', 'hesabimdan para cekildi', 'kredi kartimdan', 'e-devlet linki'], c: 'Sahte SMS veya linkle banka bilgileriniz ele geçirildiyse: hemen bankanızı arayıp kart ve internet bankacılığını kapattırın, itiraz kaydı oluşturun ve suç duyurusunda bulunun. Bankanın güvenlik yükümlülüğünü ihlal ettiği durumlarda zararın bankadan tazmini de gündeme gelebilir.', l: [M('bilisim-sucu-internet-dolandiricilik-2026', 'İnternet dolandırıcılığı ve phishing'), D('oltalama-sahte-sms-banka-dolandiriciligi-suc-duyurusu', 'Sahte SMS dolandırıcılığı suç duyurusu')], r: true },
    { k: ['savciyim', 'sahte savci', 'polisim diye', 'jandarma diye aradi', 'telefonda savci'], c: 'Savcı, polis veya jandarma telefonda sizden asla para, altın ya da banka bilgisi istemez. Böyle bir arama aldıysanız telefonu kapatın ve 155\'i arayın. Para gönderdiyseniz derhal bankanızı ve kolluğu bilgilendirin.', l: [M('sahte-savci-telefon-dolandiricilik', 'Sahte savcı dolandırıcılığı')], r: true },
    { k: ['kripto', 'bitcoin', 'usdt', 'coin', 'binance', 'borsasi', 'borsasinda', 'borsa dolandir', 'yatirim dolandir', 'forex'], c: 'Kripto veya sahte yatırım platformu dolandırıcılığında transfer kayıtları, cüzdan adresleri ve yazışmalar en önemli delillerdir. Türkiye\'deki kripto varlık hizmet sağlayıcıları üzerinden yapılan transferlerde hesapların tespiti mümkün olabilir.', l: [M('kripto-para-dolandiriciligina-ugradim-ne-yapmaliyim', 'Kripto dolandırıcılığına uğradım'), D('kripto-dolandiricilik-suc-duyurusu', 'Kripto suç duyurusu dilekçesi')], r: true },
    { k: ['hesabim calindi', 'hesabimi ele gecir', 'hacklendi', 'hesabim hacklendi', 'instagram hesabim', 'whatsapp hesabim', 'sifremi degistir'], c: 'Sosyal medya veya WhatsApp hesabınız ele geçirildiyse: platforma kurtarma başvurusu yapın, yakınlarınızı sizden para istenebileceği konusunda uyarın ve suç duyurusunda bulunun. Hesaba giriş yapılan IP adreslerinin tespiti talep edilebilir.', l: [D('hesap-ele-gecirilmesi-suc-duyurusu', 'Hesabın ele geçirilmesi suç duyurusu')], r: true },
    { k: ['hakaret', 'kufur', 'sovdu', 'tehdit', 'santaj', 'sosyal medyada', 'instagramdan', 'twitter', 'yorum yazdi'], c: 'Hakaret şikâyete bağlı bir suçtur; şikâyet süresi, fiili ve faili öğrendiğiniz tarihten itibaren 6 aydır. Paylaşımın ekran görüntüsünü URL ve tarihiyle kaydedin. Tehdit ve şantaj ise daha ağır suçlardır. İçeriğin kaldırılması için Sulh Ceza Hakimliği\'ne ayrıca başvurulabilir.', l: [M('sosyal-medya-hakaret-tehdit-sucu', 'Sosyal medyada hakaret ve tehdit'), D('5651-erisim-engeli-icerik-cikarma-talebi', 'İçerik kaldırma / erişim engeli talebi')], r: true },
    { k: ['fotografimi paylasti', 'kisisel veri', 'numarami paylasti', 'adresimi paylasti', 'kvkk', 'ifsa'], c: 'Kişisel verilerinizin (fotoğraf, telefon, adres vb.) rızanız olmadan paylaşılması TCK 136 kapsamında suç oluşturabilir. Özel hayata ilişkin görüntülerin yayılması ise TCK 134 kapsamında daha ağır cezayı gerektirir. Paylaşımları delil olarak kaydedip suç duyurusunda bulunabilirsiniz.', l: [D('tck-136-kisisel-veri-yayma-suc-duyurusu', 'Kişisel veri yayma suç duyurusu')], r: true },
    { k: ['whatsapp mesaj', 'ekran goruntusu', 'delil olur mu', 'delil sayilir', 'ses kaydi'], c: 'WhatsApp, Telegram ve sosyal medya yazışmaları delil olarak kullanılabilir; ancak hukuka uygun elde edilmiş olmaları gerekir. Ekran görüntülerinin yanında mümkünse cihazın kendisini de saklayın. Gizlice alınan ses kayıtlarının delil değeri ise duruma göre değişir.', l: [M('whatsapp-mesajlari-delil-olur-mu', 'WhatsApp mesajları delil olur mu?'), M('bilisim-suclari-delil', 'Bilişim suçlarında dijital delil')], r: true },
    { k: ['telefonuma el kon', 'telefonum alindi', 'imaj', 'el koyma', 'arama karari'], c: 'Arama ve el koyma kararına karşı itiraz edilebilir. İnceleme tamamlandıktan sonra cihazın iadesi talep edilebilir; imaj alınmışsa cihazın uzun süre tutulması gerekmeyebilir.', l: [M('telefonuma-el-konuldu-nasil-geri-alabilirim-rehber', 'Telefonuma el konuldu'), D('telefon-inceleme-iadesi-dilekce', 'Telefon iadesi talep dilekçesi')], r: true },

    // ---------- CEZA USULÜ ----------
    { k: ['ifade', 'ifadeye cagrildim', 'karakola cagrildim', 'savcilik cagirdi', 'emniyet aradi', 'jandarmaya', 'sorgu'], c: 'İfade çok önemlidir ve ilk ifadede yapılan hatalar sonradan telafi edilemeyebilir. Susma hakkınız vardır, ifadenize avukat eşlik edebilir. Mümkünse ifadeye avukatınızla birlikte gidin ve suçlamanın ne olduğunu önceden öğrenin.', l: [M('ifade-vermeden-once-bilinmesi-gerekenler-2026', 'İfade vermeden önce bilinmesi gerekenler')], r: true },
    { k: ['tutuklandi', 'tutuklu', 'tutuklama', 'tahliye', 'cezaevinde'], c: 'Tutuklama kararına karşı 7 gün içinde itiraz edilebilir. Tutukluluğun devamı her aşamada gözden geçirilir; adli kontrol (imza, yurt dışı yasağı, ev hapsi vb.) gibi alternatif tedbirler talep edilebilir. Hızlı hareket etmek önemlidir.', l: [M('tutukluluk-sartlari-itiraz-2026', 'Tutukluluğa itiraz ve tahliye'), D('tutukluluga-itiraz-adli-kontrol-talep-dilekce', 'Tutukluluğa itiraz dilekçesi')], r: true },
    { k: ['adli kontrol', 'imza atiyorum', 'yurt disi yasagi', 'ev hapsi', 'elektronik kelepce'], c: 'Adli kontrol tedbirleri (imza, yurt dışı çıkış yasağı, ev hapsi vb.) orantılı olmalıdır. Koşullar değiştiyse kaldırılması veya hafifletilmesi talep edilebilir.', l: [M('adli-kontrol-nedir-ve-nasil-kaldirilir', 'Adli kontrol nasıl kaldırılır?'), D('adli-kontrol-kaldirilmasi-dilekce', 'Adli kontrol kaldırma dilekçesi')], r: true },
    { k: ['gozalti', 'gozaltina alindi', 'yakalandi'], c: 'Gözaltına alınan kişinin avukatla görüşme ve yakınına haber verilmesini isteme hakkı vardır. Gözaltı süresi kural olarak 24 saattir; toplu suçlarda uzatılabilir. Susma hakkını kullanmak suç delili sayılmaz.', r: true },
    { k: ['yakalama karari', 'aranan', 'hakkimda arama var', 'yakalama emri'], c: 'Hakkınızda yakalama kararı varsa, avukatınızla birlikte savcılığa veya mahkemeye kendiliğinden giderek ifade vermeniz genellikle en sağlıklı yoldur. Yakalama kararının kaldırılması da talep edilebilir.', l: [D('yakalama-karari-kaldirma-dilekce', 'Yakalama kararı kaldırma dilekçesi')], r: true },
    { k: ['hagb', 'hukmun aciklanmasi', 'aciklanmasinin geri'], c: 'HAGB, iki yıl veya daha az hapis ya da adli para cezalarında belirli şartlarla verilir ve 5 yıllık denetim süresi uygulanır. Bu sürede yeni kasıtlı suç işlenmezse dava düşer. 12. Yargı Paketi ile işkence ve eziyet gibi suçlarda HAGB verilemez hale geldi.', l: [M('hagb-nedir', 'HAGB nedir?'), M('hagb-sicile-isler-mi', 'HAGB sicile işler mi?')], r: true },
    { k: ['istinaf'], c: 'İstinaf, ilk derece mahkemesi kararının Bölge Adliye Mahkemesi\'nde yeniden incelenmesidir. Ceza davalarında istinaf süresi, hükmün açıklanmasından (yokluğunda verilmişse tebliğden) itibaren 2 haftadır.', l: [D('ceza-istinaf-basvuru-dilekcesi', 'Ceza istinaf dilekçesi')], r: true },
    { k: ['temyiz', 'yargitay', 'bozma'], c: 'Temyiz, Bölge Adliye Mahkemesi kararlarının Yargıtay tarafından hukuki denetimidir. Ceza davalarında temyiz süresi kararın tefhim veya tebliğinden itibaren 2 haftadır. Bu süreler hak düşürücüdür.', l: [D('ceza-temyiz-dilekcesi', 'Ceza temyiz dilekçesi')], r: true },
    { k: ['takipsizlik', 'kovusturmaya yer olmadigi', 'kyok'], c: 'Kovuşturmaya yer olmadığı (takipsizlik) kararına karşı, kararın tebliğinden itibaren 15 gün içinde Sulh Ceza Hakimliği\'ne itiraz edilebilir.', l: [D('kyok-kararina-itiraz-dilekcesi', 'KYOK itiraz dilekçesi')], r: true },
    { k: ['uzlasma', 'uzlastirma', 'barisma'], c: 'Uzlaştırma kapsamındaki suçlarda taraflar uzlaştırmacı aracılığıyla anlaşabilir. Uzlaşma sağlanırsa soruşturmada kovuşturmaya yer olmadığı, kovuşturmada düşme kararı verilir.', l: [M('hakaret-sucu-uzlasmaya-tabi-mi', 'Hakaret uzlaşmaya tabi mi?'), D('uzlastirma-talep-dilekce', 'Uzlaştırma talep dilekçesi')], r: true },
    { k: ['sabika', 'adli sicil', 'sicil kaydi', 'arsiv kaydi'], c: 'Adli sicil kayıtları, cezanın infazından sonra kanundaki koşullar oluştuğunda silinir ve arşiv kaydına alınır. Arşiv kayıtları da belirli sürelerin geçmesiyle silinebilir. Silme için Adli Sicil ve İstatistik Genel Müdürlüğü\'ne başvurulur.', l: [D('sabika-kaydi-silme-dilekce', 'Adli sicil kaydı silme dilekçesi')], r: true },
    { k: ['adli para cezasi', 'para cezasi taksit', 'para cezasini odeyemiyorum'], c: 'Adli para cezası, mahkemece veya infaz aşamasında taksitlendirilebilir. Ödenmeyen adli para cezası hapse çevrilebileceğinden süreyi kaçırmamak önemlidir.', l: [D('adli-para-cezasi-taksitlendirme-dilekce', 'Taksitlendirme dilekçesi')], r: true },
    { k: ['haksiz tutuk', 'tutuklama tazminat', 'beraat ettim tazminat', 'cmk 141'], c: 'Tutuklandıktan veya gözaltına alındıktan sonra beraat eden ya da hakkında kovuşturmaya yer olmadığı kararı verilen kişi, Devletten maddi ve manevi tazminat isteyebilir. Dava, kararın kesinleşmesinden itibaren 3 ay ve her halde 1 yıl içinde açılmalıdır.', l: [D('cmk-141-haksiz-tutuklama-tazminat-davasi', 'CMK 141 tazminat dava dilekçesi')], r: true },
    { k: ['yaralama', 'kavga', 'darp', 'dovdu', 'dovuldum'], c: 'Kasten yaralamada cezanın miktarı yaralanmanın ağırlığına göre belirlenir; basit yaralama şikâyete bağlıdır ve uzlaştırma kapsamındadır. Darp raporu almak ve kamera kayıtlarını hızla talep etmek önemlidir; kayıtlar kısa sürede silinebilir.', l: [M('kasten-yaralama-sucu-savunma', 'Kasten yaralama suçu')], r: true },
    { k: ['hirsizlik', 'caldi', 'calinti'], c: 'Hırsızlık suçunda, zarar kovuşturma başlamadan önce tamamen giderilirse etkin pişmanlık hükümleri uygulanır ve ceza önemli ölçüde indirilir.', l: [M('hirsizlik-sucu-ceza-savunma', 'Hırsızlık suçu ve savunma')], r: true },
    { k: ['trafik cezasi', 'hiz cezasi', 'kirmizi isik', 'ehliyet', 'ceza yedim', 'radar'], c: 'Trafik idari para cezasına, tebliğ veya tefhimden itibaren 15 gün içinde Sulh Ceza Hakimliği\'ne itiraz edilebilir. Bu süre kaçırılırsa ceza kesinleşir.', l: [M('trafik-cezasina-itiraz-2026', 'Trafik cezasına itiraz'), D('trafik-cezasi-itiraz-dilekce', 'Trafik cezası itiraz dilekçesi')], r: true },

    // ---------- AİLE ----------
    { k: ['anlasmali bosanma', 'anlasmali'], c: 'Anlaşmalı boşanma için evliliğin en az 1 yıl sürmüş olması, eşlerin birlikte başvurması veya birinin davasını diğerinin kabul etmesi ve hakimin protokolü uygun bulması gerekir. Genellikle tek duruşmada sonuçlanır.', l: [M('anlasmali-bosanma-protokolu-2026-rehberi', 'Anlaşmalı boşanma protokolü'), D('anlasmali-bosanma-dava-dilekcesi-protokol', 'Anlaşmalı boşanma dilekçesi ve protokol')], r: true },
    { k: ['bosanma', 'bosanmak', 'cekismeli', 'esimden ayril', 'evlilik'], c: 'Çekişmeli boşanma davaları deliller ve tanıklara bağlı olarak genellikle 1–3 yıl sürer; anlaşmalı boşanma ise çoğu zaman tek duruşmada biter. Nafaka, velayet, tazminat ve mal paylaşımı talepleri dava stratejisini doğrudan etkiler.', l: [M('cekismeli-bosanma-davasi-ne-kadar-surer', 'Çekişmeli boşanma ne kadar sürer?'), M('bosanmada-en-sik-yapilan-hatalar', 'Boşanmada en sık yapılan hatalar')], r: true },
    { k: ['aldatma', 'aldatti', 'zina', 'sadakatsiz'], c: 'Aldatma, boşanma davasında kusur değerlendirmesinde önemli bir etkendir. Delillerin hukuka uygun yollarla elde edilmesi gerekir; aksi halde delil kullanılamayabilir ve ayrıca suç oluşabilir.', l: [M('bosanmada-aldatma-delil-2026', 'Aldatma nasıl ispat edilir?')], r: true },
    { k: ['velayet', 'cocugu kim alir', 'cocugumu gostermiyor', 'cocukla gorus', 'kisisel iliski'], c: 'Velayette belirleyici ölçüt çocuğun üstün yararıdır. Koşullar değişirse velayetin değiştirilmesi davası açılabilir. Çocukla kişisel ilişki engelleniyorsa mahkemeden düzenleme veya icra yoluyla uygulanması talep edilebilir.', l: [M('velayet-degisikligi-nasil-yapilir-2026', 'Velayet değişikliği davası'), D('velayetin-degistirilmesi-dava-dilekcesi', 'Velayet değişikliği dilekçesi')], r: true },
    { k: ['suresiz nafaka', 'nafaka kalkti', 'nafaka iptal', 'aym nafaka', 'nafaka kalkacak'], c: 'Anayasa Mahkemesi, 4 Haziran 2026\'da TMK 175\'teki "süresiz" ibaresini iptal etti. İptal, gerekçeli kararın Resmi Gazete\'de yayımlanmasından 9 ay sonra yürürlüğe girecek. Mevcut nafakalar kendiliğinden kesilmez; kaldırma veya azaltma için dava açılması gerekir.', l: [H('suresiz-nafaka-aym-iptal-son-durum-2026', 'Süresiz nafaka iptali: son durum'), D('yoksulluk-nafakasi-kaldirma-dilekce', 'Nafaka kaldırma dilekçesi')], r: true },
    { k: ['nafaka odemiyor', 'nafaka odemezsem', 'nafaka borcu', 'tazyik'], c: 'Nafaka ödenmezse alacaklı icra takibi başlatabilir. Nafaka borcunu ödemeyen kişi hakkında, şikâyet üzerine 3 aya kadar tazyik hapsine karar verilebilir.', l: [M('nafaka-odememek-hapis-cezasi-2026', 'Nafaka ödemiyorsam ne olur?')], r: true },
    { k: ['nafaka artir', 'nafaka arttir', 'nafaka yetmiyor'], c: 'Tarafların ekonomik durumu veya çocuğun ihtiyaçları değiştiyse nafakanın artırılması davası açılabilir. Mahkeme; enflasyonu, tarafların gelirini ve çocuğun yaşını dikkate alır.', l: [M('cocuk-nafakasi-arttirilmasi-2026', 'Çocuk nafakası ne kadar olmalı?'), D('nafaka-arttirim-dava-dilekce', 'Nafaka artırım dilekçesi')], r: true },
    { k: ['nafaka', 'tedbir nafakasi', 'istirak nafakasi', 'yoksulluk nafakasi'], c: 'Üç tür nafaka vardır: dava süresince verilen tedbir nafakası, çocuk için ödenen iştirak nafakası ve boşanma nedeniyle yoksulluğa düşecek eşe bağlanan yoksulluk nafakası. Miktar, tarafların gelirine ve ihtiyaçlara göre belirlenir.', l: [M('nafaka-nasil-hesaplanir', 'Nafaka nasıl hesaplanır?')], r: true },
    { k: ['mal paylasimi', 'mal rejimi', 'edinilmis mal', 'ev kimin', 'katki payi'], c: 'Evlilik içinde edinilen mallar kural olarak eşit paylaşılır (edinilmiş mallara katılma rejimi). Evlilikten önce sahip olunan mallar ile miras ve bağış yoluyla edinilenler kişisel mal sayılır. Mal rejiminin tasfiyesi davası boşanma kesinleştikten sonra da açılabilir.', l: [M('bosanmada-mal-paylasimi-2026', 'Boşanmada mal paylaşımı')], r: true },
    { k: ['siddet', 'koruma karari', '6284', 'uzaklastirma'], c: 'Şiddete uğradıysanız veya tehlike altındaysanız 155 veya 112\'yi arayın. 6284 sayılı Kanun kapsamında koruma ve uzaklaştırma kararı, aile mahkemesinden veya kolluk ve savcılık aracılığıyla hızla alınabilir; delil şartı aranmaz.', r: true },

    // ---------- İŞ ----------
    { k: ['kidem', 'kidem tazminati'], c: 'Kıdem tazminatı, en az 1 yıl çalışmış işçiye her tam yıl için 30 günlük giydirilmiş brüt ücret üzerinden ödenir. 1 Temmuz–31 Aralık 2026 döneminde bir yıl için ödenebilecek en yüksek tutar 73.729,87 TL\'dir. Zamanaşımı 5 yıldır; dava öncesi arabulucuya başvurmak zorunludur.', l: [H('kidem-tazminati-tavani-temmuz-2026', 'Kıdem tazminatı tavanı'), M('kidem-tazminati-hesaplama-2026', 'Kıdem tazminatı hesaplama')], r: true },
    { k: ['ihbar', 'ihbar tazminati', 'ihbar suresi'], c: 'İhbar süresi çalışma süresine göre 2 ila 8 hafta arasındadır. İşveren bu süreye uymadan sözleşmeyi feshederse ihbar tazminatı ödemek zorundadır.', l: [M('ihbar-tazminati-haklari-2026-rehber', 'İhbar tazminatı hakları')], r: true },
    { k: ['ise iade', 'isten cikarildim', 'isten atildim', 'kovuldum', 'gecersiz fesih', 'tazminatsiz cikar'], c: 'İşten çıkarıldıysanız: 30 veya daha fazla işçi çalışan yerde en az 6 aylık kıdeminiz varsa işe iade davası açabilirsiniz. Fesih bildiriminden itibaren 1 ay içinde arabulucuya başvurmanız, anlaşma olmazsa 2 hafta içinde dava açmanız gerekir. Kıdem, ihbar ve diğer alacaklarınız ayrıca değerlendirilir.', l: [M('ise-iade-davasi-nedir', 'İşe iade davası nedir?'), D('ise-iade-davasi-dilekce', 'İşe iade dava dilekçesi')], r: true },
    { k: ['istifa', 'hakli nedenle fesih', 'maasim odenmiyor', 'maas yatmadi', 'sigortam yatmiyor'], c: 'Maaşınız ödenmiyor, sigortanız eksik yatırılıyor veya mobbinge uğruyorsanız sözleşmeyi haklı nedenle feshedebilirsiniz. Bu durumda istifa etseniz bile kıdem tazminatı alabilirsiniz. Fesih bildirimini yazılı ve gerekçeli yapmak çok önemlidir.', l: [M('hakli-nedenle-fesih-isci-hakli-istifa-2026', 'Haklı nedenle istifa ve kıdem')], r: true },
    { k: ['fazla mesai', 'mesai ucreti', 'yillik izin', 'izin ucreti', 'hafta tatili'], c: 'Haftalık 45 saati aşan çalışmalar fazla mesai sayılır ve yüzde 50 zamlı ödenir. Kullanılmayan yıllık izinler iş sözleşmesi sona erince ücrete dönüşür. 31 Temmuz 2026\'dan itibaren belirsiz alacak davası kaldırıldı; bu alacaklar yeni kısmi dava sistemiyle talep ediliyor.', l: [D('fazla-mesai-yillik-izin-alacagi-kismi-dava', 'Fazla mesai ve izin alacağı dilekçesi'), H('belirsiz-alacak-davasi-kaldirildi-kismi-dava', 'Belirsiz alacak davası kaldırıldı')], r: true },
    { k: ['sigortasiz', 'kayit disi', 'sgk bildirilmeden', 'hizmet tespiti', 'sigortam yok'], c: 'Sigortasız çalıştırıldıysanız hizmet tespiti davası açarak bu sürelerin SGK kaydına geçirilmesini isteyebilirsiniz. Dava, çalışmanın geçtiği yılın sonundan itibaren 5 yıl içinde açılmalıdır.', l: [M('sgk-bildirimsiz-calisma-haklari', 'Sigortasız çalışma: haklarınız'), D('hizmet-tespiti-sgk-dava-dilekce', 'Hizmet tespiti dilekçesi')], r: true },
    { k: ['is kazasi', 'iste yaralandim', 'is yerinde kaza'], c: 'İş kazasında işverenden maddi ve manevi tazminat talep edebilirsiniz; SGK\'dan da geçici iş göremezlik ödeneği ve şartları varsa sürekli iş göremezlik geliri bağlanır. Kaza tutanağını ve sağlık raporlarını mutlaka saklayın.', l: [M('is-kazasi-haklari-isci-2026', 'İş kazası: haklarınız'), D('is-kazasi-bildirim-dilekce', 'İş kazası dilekçesi')], r: true },
    { k: ['mobbing', 'psikolojik baski', 'yildirma'], c: 'İş yerinde sistematik psikolojik baskı (mobbing), işçiye sözleşmeyi haklı nedenle feshetme ve manevi tazminat isteme hakkı verebilir. Yazışmalar, tanıklar ve sağlık kayıtları önemli delillerdir.', l: [M('mobbing-is-yerinde-psikolojik-baski', 'İş yerinde mobbing')], r: true },
    { k: ['arabulucu', 'arabuluculuk'], c: 'İşçi-işveren uyuşmazlıklarında, ticari alacaklarda, tüketici uyuşmazlıklarının bir kısmında ve kira alacaklarında dava açmadan önce arabulucuya başvurmak zorunludur.', l: [M('arabuluculuk-zorunlu-davalar-2026', 'Hangi davalarda arabuluculuk zorunlu?')], r: true },

    // ---------- İCRA / BORÇ ----------
    { k: ['icra', 'odeme emri', 'icra takibi', 'borca itiraz', 'icradan kagit'], c: 'Ödeme emri aldıysanız itiraz süresi ilamsız takipte 7 gün, kambiyo senedine (çek, senet) dayalı takipte 5 gündür. Süre kaçırılırsa takip kesinleşir ve haciz aşamasına geçilir.', l: [D('ilamsiz-takibe-borca-itiraz-dilekcesi', 'Borca itiraz dilekçesi'), D('menfi-tespit-davasi-dilekce', 'Menfi tespit dilekçesi')], r: true },
    { k: ['haciz', 'maas haczi', 'maasima haciz', 'evime haciz', 'eşyalarima haciz', 'esyalarima haciz'], c: 'Maaşın kural olarak en fazla dörtte biri haczedilebilir. Ev eşyalarının bir kısmı ve borçlunun haline uygun evi gibi bazı mallar haczedilemez. Size ait olmayan bir mala haciz konulduysa istihkak davası açılabilir.', l: [D('maas-haczi-kaldirma-dilekce', 'Maaş haczi kaldırma dilekçesi'), D('haczedilmezlik-sikayeti-dilekce', 'Haczedilmezlik şikâyeti'), D('ucuncu-kisi-istihkak-davasi-dilekcesi', 'İstihkak davası dilekçesi')], r: true },
    { k: ['faiz', 'kanuni faiz', 'yasal faiz'], c: '12. Yargı Paketi ile, sözleşmede oran belirlenmemiş alacaklarda uygulanan kanuni faiz Merkez Bankası reeskont oranının yüzde 80\'ine bağlandı.', l: [H('kanuni-faiz-reeskont-yuzde-80', 'Kanuni faiz değişti')], r: true },
    { k: ['gss', 'genel saglik sigortasi', 'gss borcu'], c: 'GSS borçları için gelir testi yaptırarak borcun silinmesi veya yapılandırma imkânları değerlendirilebilir.', l: [M('gss-borcu-yapilandirma-2026', 'GSS borcu yapılandırma')], r: true },

    // ---------- KİRA / TÜKETİCİ ----------
    { k: ['kira artis', 'kira zammi', 'kira artisi', 'ev sahibi zam', 'kira ne kadar artar'], c: 'Konut kiralarında artış, bir önceki kira yılının TÜFE 12 aylık ortalamasını geçemez. Eylül 2026 için bu oran yüzde 31,79\'dur. Oran her ay TÜİK verileriyle güncellenir. Sözleşmede daha yüksek oran yazsa bile aşan kısım kiracıyı bağlamaz.', l: [H('eylul-2026-kira-artis-orani-3179', 'Eylül 2026 kira artış oranı')], r: true },
    { k: ['kira tespit', '5 yil', 'bes yil', 'rayic kira'], c: 'Beş yılı dolduran kira ilişkilerinde kira bedeli, emsal kiralar ve TÜFE dikkate alınarak mahkemece yeniden belirlenebilir. Yeni dönemden itibaren geçerli olması için davanın veya yazılı bildirimin zamanlaması önemlidir.', l: [M('kira-tespit-davasi-5-yil-sarti-2026-rehber', 'Kira tespit davası'), D('kira-tespit-davasi-dilekce', 'Kira tespit dilekçesi')], r: true },
    { k: ['tahliye', 'evden cikar', 'ev sahibi cikmami', 'kiraci cikmiyor', 'kiracim cikmiyor', 'kiracim', 'kiraciyi cikar', 'evimden cikmiyor', 'ihtiyac nedeniyle', 'ev sahibim cik'], c: 'Kiracı ancak kanunda sayılan sebeplerle (ihtiyaç, yeniden inşa, iki haklı ihtar, tahliye taahhüdü, 10 yıllık uzama süresi vb.) ve çoğu durumda mahkeme kararı veya icra yoluyla tahliye edilebilir. Kira alacaklarında arabuluculuk zorunludur.', l: [D('kiracinin-tahliye-ihtarname', 'Tahliye ihtarnamesi'), M('ev-kira-sozlesmesi-bilmeniz-gerekenler-2026', 'Kira sözleşmesinde dikkat edilecekler')], r: true },
    { k: ['depozito', 'guvence bedeli'], c: 'Depozito (güvence bedeli), kiralananın hasarsız teslim edilmesi halinde iade edilmelidir. Teslim tutanağı ve fotoğraflar önemli delildir. İade edilmezse ihtar, icra takibi veya dava yoluna gidilebilir.', r: true },
    { k: ['ayipli', 'bozuk urun', 'iade etmiyor', 'tuketici', 'garanti'], c: 'Ayıplı ürün aldıysanız; ücretsiz onarım, değişim, bedel indirimi veya sözleşmeden dönme haklarından birini seçebilirsiniz. Belirli bir tutarın altındaki uyuşmazlıklarda Tüketici Hakem Heyeti\'ne başvuru zorunludur.', l: [M('ayipli-urun-tuketici-haklari-2026', 'Ayıplı mal hakları'), D('tuketici-hakem-heyeti-basvuru-dilekce', 'Tüketici hakem heyeti başvurusu')], r: true },

    // ---------- MİRAS ----------
    { k: ['mirasi reddet', 'miras reddi', 'reddi miras', 'borclu miras', 'babamin borclari'], c: 'Mirası reddetmek için süre, ölümü öğrendiğiniz tarihten itibaren 3 aydır. Süre kaçırılırsa miras kabul edilmiş sayılır ve borçlardan sorumlu olabilirsiniz. Başvuru sulh hukuk mahkemesine yapılır.', l: [M('miras-reddi-nasil-yapilir-2026', 'Mirası reddetmek için 3 ay')], r: true },
    { k: ['tenkis', 'sakli pay', 'mirastan mahrum', 'mirastan cikar'], c: 'Saklı paylı mirasçıların (altsoy, ana-baba, eş) payı vasiyet veya bağışla ihlal edildiyse tenkis davası açılabilir.', l: [M('saklipay-mirasta-tenkis-davasi-2026', 'Tenkis davası')], r: true },
    { k: ['miras', 'mirasci', 'veraset', 'ortakligin giderilmesi', 'izale', 'miras paylasimi'], c: 'Miras paylaşımında önce mirasçılık belgesi (veraset ilamı) alınır. Mirasçılar anlaşamazsa ortaklığın giderilmesi davası açılabilir; mahkeme malın aynen bölünmesine veya satılarak bedelin paylaşılmasına karar verir.', l: [M('miras-tapu-iptali-davasi-2026', 'Mirasta tapu iptali'), M('vasiyetname-nasil-yapilir', 'Vasiyetname nasıl yapılır?')], r: true },

    // ---------- TAZMİNAT ----------
    { k: ['trafik kazasi', 'kaza yaptim', 'kazada yaralandim', 'sigorta odemiyor', 'deger kaybi'], c: 'Trafik kazasında dava açmadan önce sigorta şirketine başvurmanız gerekir. Sigorta 15 gün içinde ödeme yapmazsa dava açabilir veya Sigorta Tahkim Komisyonu\'na başvurabilirsiniz. Zamanaşımı süreleri eylemin suç oluşturup oluşturmamasına göre değişir.', l: [M('trafik-kazasi-sigorta-odeme-yapmiyorsa', 'Sigorta ödeme yapmıyorsa'), M('trafik-kazasi-tazminat-zamanasimi-2026', 'Trafik kazasında zamanaşımı')], r: true },
    { k: ['tazminat', 'manevi tazminat', 'maddi tazminat'], c: 'Haksız bir eylem nedeniyle zarar gördüyseniz maddi ve manevi tazminat talep edebilirsiniz. Zamanaşımı süreleri ve ispat yükü dava türüne göre değişir.', l: [D('maddi-manevi-tazminat-dilekce', 'Maddi ve manevi tazminat dilekçesi')], r: true }
  ];

  var GENEL = 'Bu konuda kesin bilgi verebilmek için dosyanızın ayrıntılarını görmemiz gerekir. Aşağıdaki içerikler işinize yarayabilir; dilerseniz bizi arayarak değerlendirme de isteyebilirsiniz.';

  // ---------- yardımcılar ----------
  function norm(s) {
    return (s || '').toLocaleLowerCase('tr').replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i').replace(/i̇/g, 'i')
      .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u').replace(/â/g, 'a').replace(/î/g, 'i').replace(/û/g, 'u')
      .replace(/[^a-z0-9/ .]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  var STOP = { 've': 1, 'ile': 1, 'bir': 1, 'bu': 1, 'da': 1, 'de': 1, 'mi': 1, 'mu': 1, 'ne': 1, 'nasil': 1, 'icin': 1, 'ben': 1, 'benim': 1, 'var': 1, 'yok': 1, 'olur': 1, 'olarak': 1, 'gibi': 1, 'ama': 1, 'cok': 1, 'daha': 1, 'kadar': 1, 'sonra': 1, 'once': 1, 'yapmaliyim': 1, 'nedir': 1, 'midir': 1, 'mudur': 1, 'hakkimda': 1, 'oldu': 1, 'olan': 1, 'diye': 1, 'sey': 1, 'her': 1, 'nasil': 1, 'neler': 1, 'hangi': 1 };
  function kelimeler(s) { return norm(s).split(' ').filter(function (w) { return w.length > 2 && !STOP[w]; }); }

  function eslestir(soru) {
    var s = ' ' + norm(soru) + ' ';
    var enIyi = null, puan = 0;
    BILGI.forEach(function (b) {
      var p = 0;
      b.k.forEach(function (k) { if (s.indexOf(k) > -1) p += k.length + (k.indexOf(' ') > -1 ? 4 : 0); });
      if (b.sadece && kelimeler(soru).length > 3) p = 0; // "merhaba, param gitti..." gibi uzun sorularda selamlaşmaya takılma
      if (p > puan) { puan = p; enIyi = b; }
    });
    return puan >= 4 ? enIyi : null;
  }

  var ICERIK = null;
  function icerikYukle() {
    if (ICERIK) return Promise.resolve(ICERIK);
    return Promise.all([
      fetch('/makaleler.json').then(function (r) { return r.json(); }).catch(function () { return []; }),
      fetch('/dilekceler.json').then(function (r) { return r.json(); }).catch(function () { return []; }),
      fetch('/haberler.json').then(function (r) { return r.json(); }).catch(function () { return []; }),
      fetch('/emsal-kararlar.json').then(function (r) { return r.json(); }).catch(function () { return []; })
    ]).then(function (v) {
      ICERIK = [];
      v[0].forEach(function (x) { ICERIK.push({ t: x.baslik, u: '/makale/' + x.id + '.html', m: norm(x.baslik + ' ' + x.ozet + ' ' + x.kategori), tip: 'Makale' }); });
      v[1].forEach(function (x) { ICERIK.push({ t: x.baslik, u: '/dilekce.html#' + x.id, m: norm(x.baslik + ' ' + x.aciklama), tip: 'Dilekçe' }); });
      v[2].forEach(function (x) { ICERIK.push({ t: x.baslik, u: '/haber/' + x.id + '.html', m: norm(x.baslik + ' ' + x.ozet), tip: 'Haber' }); });
      (v[3] || []).forEach(function (x) { ICERIK.push({ t: x.baslik, u: '/emsal/' + x.id + '.html', m: norm(x.baslik + ' ' + x.ozet + ' ' + x.kategori + ' ' + x.mahkeme), tip: 'Emsal Karar' }); });
      return ICERIK;
    });
  }
  function icerikAra(soru, haric, adet, esik) {
    var ks = kelimeler(soru);
    if (!ks.length || !ICERIK) return [];
    return ICERIK.map(function (x) {
      var p = 0;
      ks.forEach(function (k) { var kok = k.length > 5 ? k.slice(0, k.length - 2) : k; if (x.m.indexOf(kok) > -1) p += kok.length; if (norm(x.t).indexOf(kok) > -1) p += 2; });
      return { x: x, p: p };
    }).filter(function (o) { return o.p >= (esik || 5) && haric.indexOf(o.x.u) < 0; })
      .sort(function (a, b) { return b.p - a.p; }).slice(0, adet).map(function (o) { return { t: o.x.tip + ': ' + o.x.t, u: o.x.u }; });
  }

  // ---------- arayüz ----------
  function css(temel) {
    if (document.getElementById('la-css' + (temel ? '-t' : ''))) return;
    var st = document.createElement('style'); st.id = 'la-css' + (temel ? '-t' : '');
    st.textContent = temel ? (
      '.chat-btn{position:fixed;bottom:96px;right:28px;width:58px;height:58px;background:#6B1A1A;border:1px solid #B8943F;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.3);z-index:999;cursor:pointer;font-size:22px;color:#F5EFE0}' +
      '.chat-pencere{position:fixed;bottom:170px;right:28px;width:340px;max-height:520px;background:#FDFAF5;border:1px solid #B8943F;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,.2);z-index:998;display:none;flex-direction:column;overflow:hidden;font-family:Montserrat,sans-serif}' +
      '.chat-pencere.acik{display:flex}' +
      '.chat-header{background:#4A1010;padding:1rem 1.2rem;display:flex;align-items:center;justify-content:space-between}' +
      '.chat-header-isim{font-family:"Cormorant Garamond",serif;color:#F5EFE0;font-size:1rem}.chat-header-durum{font-size:.62rem;color:#B8943F}' +
      '.chat-kapat{background:none;border:none;color:rgba(245,239,224,.5);font-size:1.1rem;cursor:pointer}' +
      '.chat-mesajlar{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.8rem}' +
      '.chat-mesaj{padding:.75rem 1rem;border-radius:10px;font-size:.82rem;line-height:1.7;max-width:90%}' +
      '.chat-mesaj.bot{background:#F5EFE0;color:#2C1810;align-self:flex-start;border-left:3px solid #B8943F}' +
      '.chat-mesaj.kullanici{background:#6B1A1A;color:#F5EFE0;align-self:flex-end}' +
      '.chat-input-alani{padding:.8rem;border-top:1px solid #E8DCC8;display:flex;gap:.5rem}' +
      '.chat-input{flex:1;padding:.6rem .9rem;border:1px solid #E8DCC8;border-radius:20px;font-size:.8rem;outline:none}' +
      '.chat-gonder{width:36px;height:36px;background:#6B1A1A;border:none;border-radius:50%;color:#F5EFE0;cursor:pointer}' +
      '@media(max-width:768px){.chat-btn{width:50px;height:50px;bottom:80px;right:16px}.chat-pencere{width:calc(100vw - 32px);right:16px;bottom:140px}}') : (
      '.la-linkler{margin-top:.6rem;display:flex;flex-direction:column;gap:.35rem}' +
      '.la-linkler a{color:#6B1A1A;font-size:.76rem;text-decoration:none;border-bottom:1px dotted #B8943F;padding-bottom:1px;line-height:1.5}' +
      '.la-linkler a:hover{color:#8B2A2A}' +
      '.la-dugmeler{margin-top:.6rem;display:flex;gap:.4rem;flex-wrap:wrap}' +
      '.la-dugmeler a{display:inline-block;padding:.35rem .8rem;border-radius:4px;font-size:.7rem;font-weight:500;letter-spacing:.06em;text-transform:uppercase;text-decoration:none}' +
      '.la-ara{background:#6B1A1A;color:#F5EFE0}.la-wa{background:#25D366;color:#fff}' +
      '.la-not{font-size:.64rem;color:#8a7466;margin-top:.2rem}' +
      '.la-yaziyor{display:flex;gap:5px;padding:.75rem 1rem;background:#F5EFE0;border-left:3px solid #B8943F;border-radius:10px;align-self:flex-start}' +
      '.la-yaziyor span{width:7px;height:7px;background:#B8943F;border-radius:50%;animation:laz 1.2s infinite}.la-yaziyor span:nth-child(2){animation-delay:.2s}.la-yaziyor span:nth-child(3){animation-delay:.4s}' +
      '@keyframes laz{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-6px)}}');
    document.head.appendChild(st);
  }

  function arayuz() {
    css(false);
    if (document.getElementById('chatPencere')) return; // sayfada zaten var
    css(true);
    var w = document.createElement('div');
    w.innerHTML =
      '<button class="chat-btn" aria-label="Hukuki asistan" onclick="chatAc()">&#9878;</button>' +
      '<div class="chat-pencere" id="chatPencere">' +
      '<div class="chat-header"><div><div class="chat-header-isim">Hukuki Asistan</div><div class="chat-header-durum">Av. Levent Mutlu Hukuk Bürosu</div></div>' +
      '<button class="chat-kapat" onclick="chatKapat()" aria-label="Kapat">&#10005;</button></div>' +
      '<div class="chat-mesajlar" id="chatMesajlar"></div>' +
      '<div class="chat-input-alani"><input class="chat-input" id="chatInput" type="text" placeholder="Sorunuzu yazın..." onkeydown="if(event.key===\'Enter\')mesajGonder()">' +
      '<button class="chat-gonder" onclick="mesajGonder()" aria-label="Gönder">&#10148;</button></div></div>';
    while (w.firstChild) document.body.appendChild(w.firstChild);
  }

  function kutu(sinif) { var d = document.createElement('div'); d.className = 'chat-mesaj ' + sinif; return d; }
  function kaydir() { var m = document.getElementById('chatMesajlar'); m.scrollTop = m.scrollHeight; }

  function karsilama() {
    var m = document.getElementById('chatMesajlar');
    m.innerHTML = '';
    var a = kutu('bot');
    a.innerHTML = '👋 Merhaba! Hukuki sorunuzu kısaca yazın; size genel bilgi verip ilgili makale ve dilekçe örneklerini göstereyim.' +
      '<div class="la-not">Buradaki cevaplar genel bilgi niteliğindedir, avukatlık hizmeti yerine geçmez. Lütfen kimlik, telefon veya dosya numarası gibi kişisel bilgilerinizi yazmayın.</div>';
    m.appendChild(a);
    var b = kutu('bot');
    b.innerHTML = 'Örneğin şunları sorabilirsiniz:<div class="la-linkler">' +
      ['IBAN kullandırdım, ceza alır mıyım?', 'İşten çıkarıldım, haklarım neler?', 'Boşanma davası ne kadar sürer?', 'İfadeye çağrıldım, ne yapmalıyım?', 'Kira artış oranı ne kadar?']
        .map(function (q) { return '<a href="#" data-soru="' + q + '">→ ' + q + '</a>'; }).join('') + '</div>';
    b.addEventListener('click', function (e) {
      var q = e.target.getAttribute && e.target.getAttribute('data-soru');
      if (q) { e.preventDefault(); document.getElementById('chatInput').value = q; mesajGonder(); }
    });
    m.appendChild(b);
  }

  var baslatildi = false;
  function chatAc() {
    arayuz();
    if (!baslatildi) { karsilama(); baslatildi = true; }
    document.getElementById('chatPencere').classList.add('acik');
    var bl = document.getElementById('chatBalon'); if (bl) bl.style.display = 'none';
    icerikYukle();
    setTimeout(function () { var i = document.getElementById('chatInput'); if (i) i.focus(); }, 50);
  }
  function chatKapat() { var p = document.getElementById('chatPencere'); if (p) p.classList.remove('acik'); }

  function cevapYaz(soru) {
    var b = eslestir(soru);
    var d = kutu('bot');
    var p = document.createElement('div');
    p.textContent = b ? b.c : GENEL;
    d.appendChild(p);
    var linkler = (b && b.l) ? b.l.slice() : [];
    var ek = (b && b.ara === false) ? [] : icerikAra(soru, linkler.map(function (x) { return x.u; }), b ? 2 : 4, b ? 9 : 5);
    linkler = linkler.concat(ek).slice(0, 5);
    if (linkler.length) {
      var l = document.createElement('div'); l.className = 'la-linkler';
      linkler.forEach(function (x) { var a = document.createElement('a'); a.href = x.u; a.textContent = '📄 ' + x.t; l.appendChild(a); });
      d.appendChild(l);
    }
    if (!b || b.r !== false) {
      var g = document.createElement('div'); g.className = 'la-dugmeler';
      g.innerHTML = '<a class="la-ara" href="' + TEL_LINK + '">📞 Ara</a><a class="la-wa" href="' + WA_LINK + '" target="_blank" rel="noopener">WhatsApp</a>';
      d.appendChild(g);
    }
    return d;
  }

  function mesajGonder() {
    var input = document.getElementById('chatInput');
    var soru = (input.value || '').trim();
    if (!soru) return;
    input.value = '';
    var m = document.getElementById('chatMesajlar');
    var k = kutu('kullanici'); k.textContent = soru; m.appendChild(k);
    var y = document.createElement('div'); y.className = 'la-yaziyor'; y.innerHTML = '<span></span><span></span><span></span>'; m.appendChild(y);
    kaydir();
    try { (new Image()).src = LOG_URL + encodeURIComponent('ASISTAN | ' + location.pathname + ' | ' + soru); } catch (e) {}
    icerikYukle().then(function () {
      setTimeout(function () { y.remove(); m.appendChild(cevapYaz(soru)); kaydir(); }, 600);
    });
  }

  // eski sayfa içi fonksiyonların yerine geç
  window.chatAc = chatAc;
  window.chatKapat = chatKapat;
  window.mesajGonder = mesajGonder;
  window.cevapBul = function (s) { var b = eslestir(s); return b ? { c: b.c, r: b.r !== false } : { c: GENEL, r: true }; };
  window.LA_ASISTAN = { eslestir: eslestir, icerikAra: icerikAra, icerikYukle: icerikYukle, BILGI: BILGI };

  function kur() { arayuz(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', kur); else kur();
})();
