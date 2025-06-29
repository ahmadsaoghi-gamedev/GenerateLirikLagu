import React, { useState } from 'react';
import { Play, Sparkles, Heart, Download, Zap, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react';
import { PromptData } from '../App';
import { enhancePrompt } from '../utils/aiEnhancer';

interface TemplateSelectorProps {
  onSavePrompt: (prompt: PromptData) => void;
  language: 'english' | 'indonesian';
  darkMode: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  onSavePrompt, 
  language, 
  darkMode 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('relaxation');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [enhancedPrompts, setEnhancedPrompts] = useState<{english: string, indonesian: string}>({
    english: '',
    indonesian: ''
  });
  const [copied, setCopied] = useState<{english: boolean, indonesian: boolean}>({
    english: false,
    indonesian: false
  });
  const [error, setError] = useState<string>('');

  const translations = {
    english: {
      title: 'AI-Powered Template Generator',
      subtitle: 'Choose from specialized templates optimized for different use cases',
      categories: {
        relaxation: 'Relaxation & Nature',
        indonesian: 'Indonesian Music',
        international: 'International Genres',
        commercial: 'Commercial & Business'
      },
      generateBtn: 'Generate & Optimize with AI',
      optimizeBtn: 'Auto-Optimize Results',
      enhancing: 'Enhancing with AI...',
      optimizing: 'Optimizing...',
      copyBtn: 'Copy',
      copied: 'Copied!',
      saveBtn: 'Save to History',
      englishPrompt: 'English Prompt',
      indonesianPrompt: 'Indonesian Prompt',
      error: 'Error occurred. Using local optimization.',
      success: 'Prompts generated successfully!'
    },
    indonesian: {
      title: 'Generator Template Bertenaga AI',
      subtitle: 'Pilih dari template khusus yang dioptimalkan untuk berbagai kegunaan',
      categories: {
        relaxation: 'Relaksasi & Alam',
        indonesian: 'Musik Indonesia',
        international: 'Genre Internasional',
        commercial: 'Komersial & Bisnis'
      },
      generateBtn: 'Generate & Optimasi dengan AI',
      optimizeBtn: 'Auto-Optimasi Hasil',
      enhancing: 'Mengoptimalkan dengan AI...',
      optimizing: 'Mengoptimalkan...',
      copyBtn: 'Salin',
      copied: 'Tersalin!',
      saveBtn: 'Simpan ke Riwayat',
      englishPrompt: 'Prompt Bahasa Inggris',
      indonesianPrompt: 'Prompt Bahasa Indonesia',
      error: 'Terjadi kesalahan. Menggunakan optimasi lokal.',
      success: 'Prompt berhasil dibuat!'
    }
  };

  const relaxationTemplates = {
    sleepMusic: {
      name: "Sleep Music",
      nameId: "Musik Tidur",
      description: "Gentle instrumental music for deep sleep",
      descriptionId: "Musik instrumental lembut untuk tidur nyenyak",
      icon: "🌙",
      prompt: "[ambient, instrumental, sleep] Create very slow peaceful music at 40-60 BPM with soft piano, gentle strings, and subtle nature sounds. No percussion, extremely calming for deep sleep. 8-10 minutes duration with gradual fade.",
      promptId: "[ambient, instrumental, tidur] Buat musik yang sangat lambat dan damai pada 40-60 BPM dengan piano lembut, string halus, dan suara alam yang subtle. Tanpa perkusi, sangat menenangkan untuk tidur nyenyak. Durasi 8-10 menit dengan fade bertahap.",
      tags: ["sleep", "ambient", "instrumental", "peaceful"],
      effect: "Deep sleep induction, stress relief"
    },
    rainSounds: {
      name: "Rain & Thunder",
      nameId: "Suara Hujan & Petir",
      description: "Natural rain sounds with distant thunder",
      descriptionId: "Suara hujan alami dengan petir di kejauhan",
      icon: "🌧️",
      prompt: "[nature, ambient, rain] Create natural rain soundscape with gentle rainfall, distant thunder, and forest ambience. No musical instruments, focus on realistic weather sounds. Continuous loop-friendly, very relaxing. 15-30 minutes duration.",
      promptId: "[alam, ambient, hujan] Buat soundscape hujan alami dengan curah hujan lembut, petir jauh, dan suasana hutan. Tanpa instrumen musik, fokus pada suara cuaca yang realistis. Ramah untuk loop berkelanjutan, sangat santai. Durasi 15-30 menit.",
      tags: ["nature", "rain", "thunder", "ambient"],
      effect: "Mental relaxation, sleep aid"
    },
    bambooGarden: {
      name: "Bamboo Garden Serenity",
      nameId: "Ketenangan Taman Bambu",
      description: "Peaceful bamboo garden with water sounds",
      descriptionId: "Taman bambu yang damai dengan suara air",
      icon: "🎋",
      prompt: "[nature, zen, instrumental] Create serene bamboo garden atmosphere with gentle water flowing from bamboo pipes into stone pools, soft wind chimes, rustling bamboo leaves, and distant bird sounds. Include subtle koto or flute melody. Very peaceful and meditative at 50-70 BPM.",
      promptId: "[alam, zen, instrumental] Buat suasana taman bambu yang tenang dengan air yang mengalir lembut dari pipa bambu ke kolam batu, lonceng angin yang lembut, daun bambu berdesir, dan suara burung jauh. Sertakan melodi koto atau suling yang halus. Sangat damai dan meditatif pada 50-70 BPM.",
      tags: ["bamboo", "water", "zen", "meditation"],
      effect: "Mindfulness, meditation support"
    },
    forestMorning: {
      name: "Forest Morning",
      nameId: "Pagi Hutan",
      description: "Early morning forest with birds and gentle breeze",
      descriptionId: "Hutan pagi hari dengan kicau burung dan angin sepoi",
      icon: "🌲",
      prompt: "[nature, forest, morning] Create peaceful morning forest ambience with various bird songs, gentle breeze through trees, distant water stream, and warm sunlight filtering through leaves. Add subtle acoustic guitar or piano. Fresh and rejuvenating mood.",
      promptId: "[alam, hutan, pagi] Buat suasana hutan pagi yang damai dengan berbagai kicau burung, angin sepoi-sepoi melalui pepohonan, aliran air jauh, dan sinar matahari hangat menyaring melalui daun. Tambahkan gitar akustik atau piano yang halus. Suasana segar dan menyegarkan.",
      tags: ["forest", "birds", "morning", "nature"],
      effect: "Natural tranquility, energy renewal"
    },
    oceanWaves: {
      name: "Ocean Waves & Coastal Breeze",
      nameId: "Ombak Laut & Angin Pantai",
      description: "Sounds of rolling waves, seagulls, sea breeze",
      descriptionId: "Suara ombak bergulung, burung camar, angin laut",
      icon: "🌊",
      prompt: "[ocean, nature, ambient] Create coastal soundscape with rolling ocean waves, distant seagulls calling, gentle sea breeze, and soft sand shifting. Include subtle water movement and occasional wave crashes. Very calming and rhythmic at 50-60 BPM natural wave rhythm.",
      promptId: "[laut, alam, ambient] Buat soundscape pantai dengan ombak laut bergulung, burung camar jauh, angin laut lembut, dan pasir halus bergeser. Sertakan gerakan air halus dan sesekali ombak menghantam. Sangat menenangkan dan berirama pada 50-60 BPM ritme ombak alami.",
      tags: ["ocean", "waves", "coastal", "seagulls"],
      effect: "Mental relaxation, suitable for meditation or stress relief"
    },
    deepSpace: {
      name: "Deep Space Ambient",
      nameId: "Ambient Luar Angkasa",
      description: "Soft synth pads, cosmic sound effects, no dominant rhythm",
      descriptionId: "Synth pad lembut, efek suara kosmik, tanpa ritme dominan",
      icon: "🌌",
      prompt: "[ambient, space, cosmic] Create ethereal deep space ambience with soft synthesizer pads, distant cosmic drones, subtle stellar wind effects, and floating atmospheric textures. No rhythm or percussion, focus on vast expansive feeling. 40-50 BPM breathing tempo.",
      promptId: "[ambient, angkasa, kosmik] Buat suasana luar angkasa yang ethereal dengan pad synthesizer lembut, drone kosmik jauh, efek angin stellar halus, dan tekstur atmosfer mengambang. Tanpa ritme atau perkusi, fokus pada perasaan luas ekspansif. 40-50 BPM tempo pernapasan.",
      tags: ["space", "cosmic", "ethereal", "floating"],
      effect: "Floating feeling, suitable for deep relaxation or yoga nidra"
    },
    desertWinds: {
      name: "Desert Winds & Distant Drums",
      nameId: "Angin Gurun & Drum Jauh",
      description: "Desert wind, soft ethnic instruments (handpan, soft darbuka)",
      descriptionId: "Angin gurun, instrumen etnik lembut (handpan, darbuka halus)",
      icon: "🏜️",
      prompt: "[desert, ethnic, ambient] Create mystical desert atmosphere with gentle wind sounds, soft handpan melodies, distant soft darbuka rhythms, and occasional sand shifting. Include subtle Middle Eastern or North African instruments. Exotic and tranquil at 60-70 BPM.",
      promptId: "[gurun, etnik, ambient] Buat suasana gurun mistis dengan suara angin lembut, melodi handpan halus, ritme darbuka jauh yang lembut, dan sesekali pasir bergeser. Sertakan instrumen Timur Tengah atau Afrika Utara yang halus. Eksotis dan tenang pada 60-70 BPM.",
      tags: ["desert", "ethnic", "handpan", "mystical"],
      effect: "Provides tranquility with an exotic feel"
    },
    mountainStream: {
      name: "Mountain Stream & Wind Chimes",
      nameId: "Aliran Gunung & Lonceng Angin",
      description: "Rumbling of mountain water, bamboo or metal wind chimes",
      descriptionId: "Gemericik air gunung, lonceng angin bambu atau logam",
      icon: "⛰️",
      prompt: "[mountain, water, chimes] Create peaceful mountain stream ambience with clear flowing water over rocks, gentle bamboo and metal wind chimes, distant mountain echoes, and soft breeze through pine trees. Include subtle nature sounds and water droplets. 50-60 BPM natural flow rhythm.",
      promptId: "[gunung, air, lonceng] Buat suasana aliran gunung yang damai dengan air jernih mengalir di atas batu, lonceng angin bambu dan logam lembut, gema gunung jauh, dan angin sepoi melalui pohon pinus. Sertakan suara alam halus dan tetesan air. 50-60 BPM ritme aliran alami.",
      tags: ["mountain", "stream", "chimes", "nature"],
      effect: "Mindfulness, suitable for accompanying studying or reading"
    },
    fireplace: {
      name: "Fireplace Crackling & Winter Ambience",
      nameId: "Api Unggun & Suasana Musim Dingin",
      description: "Sounds of campfire, burning wood, minimalist background music",
      descriptionId: "Suara api unggun, kayu terbakar, musik latar minimalis",
      icon: "🔥",
      prompt: "[fireplace, winter, cozy] Create warm fireplace ambience with crackling wood fire, gentle burning sounds, occasional wood settling, and soft minimalist piano or acoustic guitar in background. Include subtle winter wind outside. Very cozy and intimate at 50-60 BPM.",
      promptId: "[perapian, musim dingin, hangat] Buat suasana perapian hangat dengan api kayu berderak, suara pembakaran lembut, sesekali kayu bergeser, dan piano minimalis atau gitar akustik lembut di latar belakang. Sertakan angin musim dingin halus di luar. Sangat nyaman dan intim pada 50-60 BPM.",
      tags: ["fireplace", "cozy", "winter", "warm"],
      effect: "Warm and cozy feeling, suitable for winter or nighttime"
    },
    tibetanBowls: {
      name: "Healing Tibetan Bowls & Gong",
      nameId: "Mangkuk Tibet Penyembuhan & Gong",
      description: "Sounds of Tibetan bowls, gongs, long resonant tones",
      descriptionId: "Suara mangkuk Tibet, gong, nada resonan panjang",
      icon: "🎎",
      prompt: "[tibetan, healing, meditation] Create healing soundscape with authentic Tibetan singing bowls, deep resonant gongs, long sustained tones, and subtle harmonic overtones. Include meditation bells and peaceful silence between sounds. Focus on healing frequencies and spiritual resonance.",
      promptId: "[tibet, penyembuhan, meditasi] Buat soundscape penyembuhan dengan mangkuk Tibet autentik, gong resonan dalam, nada berkelanjutan panjang, dan overtone harmonik halus. Sertakan lonceng meditasi dan keheningan damai di antara suara. Fokus pada frekuensi penyembuhan dan resonansi spiritual.",
      tags: ["tibetan", "healing", "spiritual", "meditation"],
      effect: "Helps meditation, healing energy, spiritual relaxation"
    },
    caveEchoes: {
      name: "Cave Echoes & Underground Ambience",
      nameId: "Gema Gua & Suasana Bawah Tanah",
      description: "Natural echo effect, water droplets in cave, soft atmospheric sounds",
      descriptionId: "Efek gema alami, tetesan air di gua, suara atmosfer lembut",
      icon: "🕳️",
      prompt: "[cave, echo, underground] Create mysterious underground cave atmosphere with natural echo effects, slow water droplets, distant underground streams, and vast cavernous reverb. Include subtle rock settling sounds and deep atmospheric drones. Very spacious and isolating feeling.",
      promptId: "[gua, gema, bawah tanah] Buat suasana gua bawah tanah misterius dengan efek gema alami, tetesan air lambat, aliran bawah tanah jauh, dan reverb gua yang luas. Sertakan suara batu bergeser halus dan drone atmosfer dalam. Perasaan sangat luas dan terisolasi.",
      tags: ["cave", "echo", "mysterious", "spacious"],
      effect: "Sensation of vast space and isolation, very relaxing"
    },
    morningBirds: {
      name: "Morning Birds & Countryside Field",
      nameId: "Burung Pagi & Ladang Pedesaan",
      description: "Morning birdsong, meadow sounds, gentle breeze",
      descriptionId: "Kicau burung pagi, suara padang rumput, angin sepoi",
      icon: "🐦",
      prompt: "[morning, birds, countryside] Create peaceful countryside morning with diverse bird songs, meadow grass rustling in gentle breeze, distant farm sounds, and warm sunrise atmosphere. Include various songbirds, larks, and nature awakening sounds. Fresh and uplifting at natural tempo.",
      promptId: "[pagi, burung, pedesaan] Buat pagi pedesaan yang damai dengan beragam kicau burung, rumput padang berdesir dalam angin sepoi, suara peternakan jauh, dan suasana matahari terbit hangat. Sertakan berbagai burung penyanyi, burung skylark, dan suara alam yang terbangun. Segar dan mengangkat pada tempo alami.",
      tags: ["morning", "birds", "countryside", "peaceful"],
      effect: "Natural tranquility like being in the countryside"
    },
    pianoMinimalist: {
      name: "Piano Solo Minimalist (Slow Ambient)",
      nameId: "Piano Solo Minimalis (Ambient Lambat)",
      description: "Soft piano playing, slow tempo, sometimes without strong melody",
      descriptionId: "Piano lembut dimainkan, tempo lambat, kadang tanpa melodi kuat",
      icon: "🎹",
      prompt: "[piano, minimalist, ambient] Create slow minimalist piano composition with soft, contemplative playing, gentle sustained notes, subtle pedal resonance, and spacious silence between phrases. Focus on emotional depth rather than melody. Very slow at 40-50 BPM with meditative pacing.",
      promptId: "[piano, minimalis, ambient] Buat komposisi piano minimalis lambat dengan permainan lembut dan kontemplatif, nada berkelanjutan halus, resonansi pedal halus, dan keheningan luas di antara frasa. Fokus pada kedalaman emosi daripada melodi. Sangat lambat pada 40-50 BPM dengan pacing meditatif.",
      tags: ["piano", "minimalist", "contemplative", "emotional"],
      effect: "Emotional relaxation, increasing focus"
    },
    desertFlute: {
      name: "Wind Desert Flute & Ethnic Ambience",
      nameId: "Suling Angin Gurun & Suasana Etnik",
      description: "Ethnic flute like Native American Flute, accompanied by light ambience",
      descriptionId: "Suling etnik seperti Suling Indian Amerika, diiringi suasana ringan",
      icon: "🪶",
      prompt: "[native, flute, spiritual] Create spiritual desert ambience with Native American flute melodies, gentle wind sounds, distant canyon echoes, and subtle ethnic percussion. Include natural reverb and spacious atmosphere. Focus on contemplative and meditative qualities at 50-60 BPM.",
      promptId: "[pribumi, suling, spiritual] Buat suasana gurun spiritual dengan melodi suling Indian Amerika, suara angin lembut, gema ngarai jauh, dan perkusi etnik halus. Sertakan reverb alami dan atmosfer luas. Fokus pada kualitas kontemplatif dan meditatif pada 50-60 BPM.",
      tags: ["native", "flute", "spiritual", "contemplative"],
      effect: "Spiritual, meditative, suitable for contemplation"
    },
    volcanicSprings: {
      name: "Volcanic Hot Springs & Geothermal Ambience",
      nameId: "Mata Air Panas Vulkanik & Suasana Geotermal",
      description: "Bubbling hot springs, steam vents, volcanic earth sounds",
      descriptionId: "Mata air panas bergelembung, ventilasi uap, suara bumi vulkanik",
      icon: "🌋",
      prompt: "[volcanic, geothermal, nature] Create therapeutic volcanic hot springs ambience with gentle bubbling water, natural steam vents, distant volcanic rumbles, and mineral-rich earth sounds. Include subtle underground thermal activity and peaceful water movement. Healing and rejuvenating at 45-55 BPM natural rhythm.",
      promptId: "[vulkanik, geotermal, alam] Buat suasana mata air panas vulkanik yang terapeutik dengan air bergelembung lembut, ventilasi uap alami, gemuruh vulkanik jauh, dan suara bumi kaya mineral. Sertakan aktivitas termal bawah tanah yang halus dan gerakan air yang damai. Penyembuhan dan peremajaan pada 45-55 BPM ritme alami.",
      tags: ["volcanic", "geothermal", "healing", "therapeutic"],
      effect: "Therapeutic relaxation, muscle tension relief, natural healing"
    }
  };

  const indonesianTemplates = {
    koplo: {
      name: "Dangdut Koplo",
      nameId: "Dangdut Koplo",
      description: "Modern koplo with electronic beats",
      descriptionId: "Koplo modern dengan beat elektronik",
      icon: "💃",
      prompt: "[dangdut, koplo, electronic] Create energetic dangdut koplo song at 140-160 BPM with heavy electronic beats, synthesizer, traditional kendang, and powerful Indonesian female vocals. Party atmosphere, very danceable and catchy.",
      promptId: "[dangdut, koplo, elektronik] Buat lagu dangdut koplo yang energik pada 140-160 BPM dengan beat elektronik yang berat, synthesizer, kendang tradisional, dan vokal wanita Indonesia yang kuat. Suasana pesta, sangat dapat ditari dan catchy.",
      tags: ["dangdut", "koplo", "dance", "indonesian"]
    },
    hiphopIndo: {
      name: "Indonesian Hip-Hop",
      nameId: "Hip-Hop Indonesia",
      description: "Indonesian rap with local flavor",
      descriptionId: "Rap Indonesia dengan cita rasa lokal",
      icon: "🎤",
      prompt: "[hip-hop, indonesian, rap] Create Indonesian hip-hop track at 85-95 BPM with heavy bass, crisp drums, and Indonesian male rap vocals. Include traditional Indonesian instrument samples like gamelan or angklung. Urban but culturally rooted.",
      promptId: "[hip-hop, indonesia, rap] Buat track hip-hop Indonesia pada 85-95 BPM dengan bass yang berat, drum yang crisp, dan vokal rap pria Indonesia. Sertakan sample instrumen tradisional Indonesia seperti gamelan atau angklung. Urban tapi berakar budaya.",
      tags: ["hip-hop", "rap", "indonesian", "urban"]
    },
    djRemix: {
      name: "DJ Remix Indonesian",
      nameId: "DJ Remix Indonesia",
      description: "Electronic dance remix of Indonesian songs",
      descriptionId: "Remix dance elektronik lagu Indonesia",
      icon: "🎧",
      prompt: "[electronic, remix, dance] Create high-energy DJ remix at 128-132 BPM with progressive house beats, heavy drops, synthesizer leads, and remixed Indonesian vocal samples. Club-ready with build-ups and breakdowns.",
      promptId: "[elektronik, remix, dance] Buat remix DJ berenergi tinggi pada 128-132 BPM dengan beat progressive house, drop yang berat, lead synthesizer, dan sample vokal Indonesia yang diremix. Siap untuk klub dengan build-up dan breakdown.",
      tags: ["electronic", "remix", "dance", "club"]
    },
    keroncong: {
      name: "Modern Keroncong",
      nameId: "Keroncong Modern",
      description: "Contemporary take on traditional keroncong",
      descriptionId: "Interpretasi kontemporer keroncong tradisional",
      icon: "🎻",
      prompt: "[keroncong, traditional, modern] Create modern keroncong music with traditional ukulele, violin, flute, and cello, but add contemporary production. Gentle 70-80 BPM, nostalgic and romantic mood with Indonesian vocals.",
      promptId: "[keroncong, tradisional, modern] Buat musik keroncong modern dengan ukulele tradisional, biola, suling, dan cello, tapi tambahkan produksi kontemporer. Lembut 70-80 BPM, suasana nostalgia dan romantis dengan vokal Indonesia.",
      tags: ["keroncong", "traditional", "romantic", "nostalgic"]
    },
    indoPopBallad: {
      name: "Indo Pop Ballad",
      nameId: "Balada Pop Indonesia",
      description: "Emotional Indonesian pop ballads, perfect for romantic and nostalgic moods",
      descriptionId: "Balada pop Indonesia yang emosional, sempurna untuk suasana romantis dan nostalgia",
      icon: "💜",
      prompt: "[pop, ballad, indonesian] Create emotional Indonesian pop ballad at 70-85 BPM with soft piano, gentle strings, acoustic guitar, and heartfelt Indonesian vocals. Melancholic and romantic atmosphere with beautiful melodic lines and emotional depth. Perfect for love songs and nostalgic moments.",
      promptId: "[pop, balada, indonesia] Buat balada pop Indonesia yang emosional pada 70-85 BPM dengan piano lembut, string halus, gitar akustik, dan vokal Indonesia yang penuh perasaan. Suasana melankolis dan romantis dengan garis melodi yang indah dan kedalaman emosi. Sempurna untuk lagu cinta dan momen nostalgia.",
      tags: ["pop", "ballad", "indonesian", "melancholy", "romantic"]
    },
    ethnicFusion: {
      name: "Ethnic Fusion Nusantara",
      nameId: "Fusi Etnik Nusantara",
      description: "Modern fusion of Indonesian traditional instruments with contemporary world music elements",
      descriptionId: "Fusi modern instrumen tradisional Indonesia dengan elemen musik dunia kontemporer",
      icon: "🟠",
      prompt: "[ethnic, traditional, fusion] Create modern Indonesian ethnic fusion combining traditional gamelan, angklung, sasando, and kendang with contemporary world music elements like electronic beats, modern bass, and atmospheric synths. Blend ancient Nusantara heritage with global sounds at 90-110 BPM. Rich cultural textures with modern production.",
      promptId: "[etnik, tradisional, fusi] Buat fusi etnik Indonesia modern yang menggabungkan gamelan tradisional, angklung, sasando, dan kendang dengan elemen musik dunia kontemporer seperti beat elektronik, bass modern, dan synth atmosferik. Padukan warisan Nusantara kuno dengan suara global pada 90-110 BPM. Tekstur budaya yang kaya dengan produksi modern.",
      tags: ["ethnic", "traditional", "fusion", "nusantara", "world music"]
    }
  };

  const internationalTemplates = {
    lofiHiphop: {
      name: "Lo-fi Hip Hop",
      nameId: "Lo-fi Hip Hop",
      description: "Chill beats for studying and relaxing",
      descriptionId: "Beat santai untuk belajar dan relaksasi",
      icon: "📚",
      prompt: "[lo-fi, hip-hop, chill] Create relaxed lo-fi hip-hop beats at 70-90 BPM with vinyl crackle, mellow piano, soft drums, and ambient textures. Perfect for studying, working, or relaxing. Instrumental only.",
      promptId: "[lo-fi, hip-hop, santai] Buat beat lo-fi hip-hop yang santai pada 70-90 BPM dengan suara vinyl, piano lembut, drum halus, dan tekstur ambient. Sempurna untuk belajar, bekerja, atau relaksasi. Hanya instrumental.",
      tags: ["lo-fi", "chill", "study", "instrumental"]
    },
    synthwave: {
      name: "Synthwave Retro",
      nameId: "Synthwave Retro",
      description: "80s inspired electronic music",
      descriptionId: "Musik elektronik inspirasi tahun 80an",
      icon: "🌆",
      prompt: "[synthwave, retro, electronic] Create nostalgic synthwave track at 110-120 BPM with vintage synthesizers, retro drums, and neon-soaked atmosphere. 80s inspired but modern production. Instrumental with epic lead synths.",
      promptId: "[synthwave, retro, elektronik] Buat track synthwave nostalgia pada 110-120 BPM dengan synthesizer vintage, drum retro, dan atmosfer neon. Inspirasi 80an tapi produksi modern. Instrumental dengan lead synth yang epik.",
      tags: ["synthwave", "retro", "80s", "electronic"]
    }
  };

  const commercialTemplates = {
    corporate: {
      name: "Corporate Presentation",
      nameId: "Presentasi Korporat",
      description: "Professional background music for business",
      descriptionId: "Musik latar profesional untuk bisnis",
      icon: "💼",
      prompt: "[corporate, ambient, professional] Create inspiring corporate background music at 100-110 BPM with clean piano, subtle strings, and uplifting atmosphere. Professional and motivational without being distracting. Perfect for presentations and business videos.",
      promptId: "[korporat, ambient, profesional] Buat musik latar korporat yang menginspirasi pada 100-110 BPM dengan piano bersih, string halus, dan atmosfer yang mengangkat. Profesional dan motivasi tanpa mengganggu. Sempurna untuk presentasi dan video bisnis.",
      tags: ["corporate", "professional", "business", "presentation"]
    },
    commercial: {
      name: "Commercial Jingle",
      nameId: "Jingle Komersial",
      description: "Catchy music for advertisements",
      descriptionId: "Musik catchy untuk iklan",
      icon: "📢",
      prompt: "[commercial, jingle, upbeat] Create catchy commercial jingle at 120-130 BPM with bright instruments, memorable melody, and positive energy. 15-30 seconds duration, perfect for radio and TV ads. Include space for voiceover.",
      promptId: "[komersial, jingle, ceria] Buat jingle komersial yang catchy pada 120-130 BPM dengan instrumen cerah, melodi yang mudah diingat, dan energi positif. Durasi 15-30 detik, sempurna untuk iklan radio dan TV. Sertakan ruang untuk voice over.",
      tags: ["commercial", "jingle", "advertising", "catchy"]
    }
  };

  const allTemplates = {
    relaxation: relaxationTemplates,
    indonesian: indonesianTemplates,
    international: internationalTemplates,
    commercial: commercialTemplates
  };

  const categories = [
    { id: 'relaxation', name: translations[language].categories.relaxation, icon: '🧘' },
    { id: 'indonesian', name: translations[language].categories.indonesian, icon: '🇮🇩' },
    { id: 'international', name: translations[language].categories.international, icon: '🌍' },
    { id: 'commercial', name: translations[language].categories.commercial, icon: '💼' }
  ];

  const handleGeneratePrompt = async (template: any) => {
    setSelectedTemplate(template);
    setIsEnhancing(true);
    setError('');
    
    try {
      const [enhancedEnglish, enhancedIndonesian] = await Promise.all([
        enhancePrompt(template.prompt, { language: 'english', category: selectedCategory }),
        enhancePrompt(template.promptId, { language: 'indonesian', category: selectedCategory })
      ]);
      
      setEnhancedPrompts({
        english: enhancedEnglish,
        indonesian: enhancedIndonesian
      });
      
      // Show success message
      setTimeout(() => {
        setError('');
      }, 3000);
      
    } catch (error) {
      console.error('Enhancement failed:', error);
      setError(translations[language].error);
      
      // Fallback to original prompts
      setEnhancedPrompts({
        english: template.prompt,
        indonesian: template.promptId
      });
    }
    
    setIsEnhancing(false);
  };

  const handleOptimizeResults = async () => {
    if (!enhancedPrompts.english && !enhancedPrompts.indonesian) return;
    
    setIsOptimizing(true);
    setError('');
    
    try {
      const [optimizedEnglish, optimizedIndonesian] = await Promise.all([
        enhancePrompt(enhancedPrompts.english, { 
          language: 'english', 
          category: selectedCategory,
          optimization: 'advanced'
        }),
        enhancePrompt(enhancedPrompts.indonesian, { 
          language: 'indonesian', 
          category: selectedCategory,
          optimization: 'advanced'
        })
      ]);
      
      setEnhancedPrompts({
        english: optimizedEnglish,
        indonesian: optimizedIndonesian
      });
      
    } catch (error) {
      console.error('Optimization failed:', error);
      setError(translations[language].error);
    }
    
    setIsOptimizing(false);
  };

  const copyToClipboard = async (text: string, lang: 'english' | 'indonesian') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(prev => ({ ...prev, [lang]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [lang]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const saveToHistory = (prompt: string, lang: 'english' | 'indonesian') => {
    const promptData: PromptData = {
      id: Date.now().toString(),
      prompt: prompt,
      promptId: lang === 'english' ? enhancedPrompts.indonesian : enhancedPrompts.english,
      genres: selectedTemplate?.tags || [],
      moods: [],
      tempo: 120,
      instruments: [],
      vocalStyle: { gender: 'Female', character: 'Smooth' },
      duration: '2min',
      keySignature: 'C Major',
      songStructure: [],
      timestamp: Date.now(),
      favorite: false,
      language: lang,
      category: selectedCategory
    };
    onSavePrompt(promptData);
  };

  const t = translations[language];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {t.subtitle}
        </p>
      </div>

      {/* Error/Success Message */}
      {error && (
        <div className="flex items-center justify-center space-x-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
          <span className="text-yellow-800 dark:text-yellow-200">{error}</span>
        </div>
      )}

      {/* Category Selector */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-center ${
              selectedCategory === category.id
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 shadow-lg'
                : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:border-purple-300 hover:bg-purple-50 dark:hover:bg-gray-600'
            }`}
          >
            <div className="text-4xl mb-3">{category.icon}</div>
            <div className="font-semibold">{category.name}</div>
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(allTemplates[selectedCategory]).map(([key, template]) => (
          <div
            key={key}
            className="p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl text-white ${
                template.icon === '💜' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                template.icon === '🟠' ? 'bg-gradient-to-r from-orange-600 to-amber-600' :
                'bg-gradient-to-r from-purple-600 to-blue-600'
              }`}>
                <span className="text-2xl">{template.icon}</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {language === 'indonesian' ? template.nameId : template.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">
              {language === 'indonesian' ? template.descriptionId : template.description}
            </p>

            {template.effect && (
              <p className="text-xs text-green-600 dark:text-green-400 mb-4 italic">
                Effect: {template.effect}
              </p>
            )}

            <div className="mb-4">
              <div className="flex flex-wrap gap-1 mb-2">
                {template.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      template.icon === '💜' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                      template.icon === '🟠' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' :
                      'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => handleGeneratePrompt(template)}
              disabled={isEnhancing}
              className={`w-full flex items-center justify-center space-x-2 text-white py-3 px-4 rounded-lg font-medium transition-all disabled:opacity-50 ${
                template.icon === '💜' ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' :
                template.icon === '🟠' ? 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700' :
                'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
              }`}
            >
              {isEnhancing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>{t.enhancing}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{t.generateBtn}</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Enhanced Results */}
      {selectedTemplate && enhancedPrompts.english && (
        <div className="space-y-6">
          {/* Auto-Optimize Button */}
          <div className="text-center">
            <button
              onClick={handleOptimizeResults}
              disabled={isOptimizing}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-6 rounded-lg font-medium transition-all disabled:opacity-50"
            >
              {isOptimizing ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span>{t.optimizing}</span>
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  <span>{t.optimizeBtn}</span>
                </>
              )}
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* English Result */}
            <div className="bg-white border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 flex items-center space-x-2">
                  <span>🇺🇸</span>
                  <span>{t.englishPrompt}</span>
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(enhancedPrompts.english, 'english')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      copied.english
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {copied.english ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => saveToHistory(enhancedPrompts.english, 'english')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-blue-800 dark:text-blue-200">
                  {enhancedPrompts.english}
                </pre>
              </div>
            </div>

            {/* Indonesian Result */}
            <div className="bg-white border-2 border-red-200 dark:border-red-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 flex items-center space-x-2">
                  <span>🇮🇩</span>
                  <span>{t.indonesianPrompt}</span>
                </h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => copyToClipboard(enhancedPrompts.indonesian, 'indonesian')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      copied.indonesian
                        ? 'bg-green-500 text-white'
                        : 'bg-red-600 hover:bg-red-700 text-white'
                    }`}
                  >
                    {copied.indonesian ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => saveToHistory(enhancedPrompts.indonesian, 'indonesian')}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap text-sm text-red-800 dark:text-red-200">
                  {enhancedPrompts.indonesian}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suno Guide */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4 flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>🎵 {language === 'indonesian' ? 'Cara Menggunakan di Suno AI' : 'How to Use in Suno AI'}</span>
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2 text-sm text-green-700 dark:text-green-300">
            <p><strong>{language === 'indonesian' ? 'Langkah 1:' : 'Step 1:'}</strong> {language === 'indonesian' ? 'Salin prompt yang dihasilkan' : 'Copy the generated prompt'}</p>
            <p><strong>{language === 'indonesian' ? 'Langkah 2:' : 'Step 2:'}</strong> {language === 'indonesian' ? 'Buka Suno.ai dan buat lagu baru' : 'Go to Suno.ai and create new song'}</p>
            <p><strong>{language === 'indonesian' ? 'Langkah 3:' : 'Step 3:'}</strong> {language === 'indonesian' ? 'Tempel prompt di kolom deskripsi' : 'Paste prompt in description field'}</p>
            <p><strong>{language === 'indonesian' ? 'Langkah 4:' : 'Step 4:'}</strong> {language === 'indonesian' ? 'Klik Generate dan tunggu lagu Anda!' : 'Click Generate and wait for your song!'}</p>
          </div>
          <div className="flex justify-center">
            <a
              href="https://suno.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>{language === 'indonesian' ? 'Buka Suno AI' : 'Open Suno AI'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;