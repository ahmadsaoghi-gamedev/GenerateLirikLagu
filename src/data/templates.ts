export const templates = [
  {
    id: 'youtube-background',
    name: 'YouTube Background',
    description: 'Perfect ambient music for video content without distracting from narration',
    icon: '📺',
    tags: ['Ambient', 'Instrumental', 'Background'],
    prompt: 'Create ambient instrumental background music at 90 BPM featuring soft piano, subtle strings, and gentle pads. The mood should be peaceful and non-distracting, perfect for video content. Keep dynamics low and avoid sudden changes. Structure: Seamless loop with subtle variations.',
    genres: ['Ambient'],
    moods: ['Peaceful', 'Soft'],
    tempo: 90,
    instruments: ['Piano', 'Synthesizer'],
    vocalStyle: { gender: 'Instrumental', character: 'Smooth' },
    duration: '3min',
    keySignature: 'C Major',
    songStructure: ['Intro', 'Main Theme', 'Variation 1', 'Variation 2', 'Outro']
  },
  {
    id: 'podcast-intro',
    name: 'Podcast Intro',
    description: '30-second energetic intro music perfect for podcast openings',
    icon: '🎙️',
    tags: ['Intro', 'Energetic', 'Short'],
    prompt: 'Create an energetic 30-second podcast intro at 120 BPM featuring upbeat drums, electric guitar, and inspiring synths. The mood should be motivational and professional with a strong hook in the first 5 seconds. Build to a climax and end with a clean resolution.',
    genres: ['Pop', 'Rock'],
    moods: ['Upbeat', 'Motivational'],
    tempo: 120,
    instruments: ['Electric Guitar', 'Drums', 'Synthesizer'],
    vocalStyle: { gender: 'Instrumental', character: 'Powerful' },
    duration: '30s',
    keySignature: 'G Major',
    songStructure: ['Hook', 'Build', 'Climax', 'Resolution']
  },
  {
    id: 'commercial-jingle',
    name: 'Commercial Jingle',
    description: 'Catchy and memorable jingle perfect for advertisements and branding',
    icon: '📢',
    tags: ['Commercial', 'Catchy', 'Brand'],
    prompt: 'Create a catchy commercial jingle at 130 BPM featuring bright piano, cheerful vocals, and upbeat percussion. The mood should be happy and memorable with a simple, repeatable melody. Include space for brand messaging and end with a memorable hook.',
    genres: ['Pop'],
    moods: ['Cheerful', 'Happy'],
    tempo: 130,
    instruments: ['Piano', 'Drums'],
    vocalStyle: { gender: 'Female', character: 'Smooth' },
    duration: '30s',
    keySignature: 'C Major',
    songStructure: ['Hook', 'Verse', 'Hook', 'Tag']
  },
  {
    id: 'workout-music',
    name: 'Workout Music',
    description: 'High-energy music designed to keep you motivated during exercise',
    icon: '💪',
    tags: ['Workout', 'High Energy', 'Motivational'],
    prompt: 'Create high-energy workout music at 140 BPM featuring powerful electronic beats, driving bass, and energetic synths. The mood should be motivational and intense with consistent energy throughout. Include build-ups and drops to maintain engagement.',
    genres: ['EDM', 'Electronic'],
    moods: ['Energetic', 'Powerful'],
    tempo: 140,
    instruments: ['Electronic Beats', 'Synthesizer', 'Bass Guitar'],
    vocalStyle: { gender: 'Instrumental', character: 'Powerful' },
    duration: '4min',
    keySignature: 'E Minor',
    songStructure: ['Intro', 'Build', 'Drop', 'Verse', 'Build', 'Drop', 'Breakdown', 'Drop', 'Outro']
  },
  {
    id: 'meditation',
    name: 'Meditation Music',
    description: 'Calming instrumental music perfect for meditation and relaxation',
    icon: '🧘',
    tags: ['Meditation', 'Relaxing', 'Instrumental'],
    prompt: 'Create peaceful meditation music at 60 BPM featuring soft piano, gentle strings, and nature sounds. The mood should be deeply relaxing and meditative with slow, flowing melodies. Avoid sudden changes and maintain consistent, calming energy throughout.',
    genres: ['Ambient', 'Classical'],
    moods: ['Peaceful', 'Meditative'],
    tempo: 60,
    instruments: ['Piano', 'Violin', 'Synthesizer'],
    vocalStyle: { gender: 'Instrumental', character: 'Soft' },
    duration: '4min',
    keySignature: 'F Major',
    songStructure: ['Gentle Intro', 'Main Theme', 'Variation', 'Return', 'Fade Out']
  },
  {
    id: 'gaming-bgm',
    name: 'Gaming Background',
    description: 'Epic background music perfect for gaming streams and videos',
    icon: '🎮',
    tags: ['Gaming', 'Epic', 'Loop'],
    prompt: 'Create epic gaming background music at 110 BPM featuring orchestral elements, electronic beats, and cinematic synths. The mood should be epic and adventurous with sections that loop seamlessly. Include both intense and calm moments for gameplay variety.',
    genres: ['Cinematic', 'Electronic'],
    moods: ['Epic', 'Cinematic'],
    tempo: 110,
    instruments: ['Orchestra', 'Electronic Beats', 'Synthesizer'],
    vocalStyle: { gender: 'Instrumental', character: 'Powerful' },
    duration: '3min',
    keySignature: 'D Minor',
    songStructure: ['Intro', 'Adventure Theme', 'Battle Theme', 'Exploration', 'Climax', 'Loop Point']
  },
  {
    id: 'wedding-song',
    name: 'Wedding Song',
    description: 'Romantic acoustic song perfect for wedding ceremonies and receptions',
    icon: '💒',
    tags: ['Wedding', 'Romantic', 'Acoustic'],
    prompt: 'Create a romantic wedding song at 75 BPM featuring acoustic guitar, soft piano, and heartfelt vocals. The mood should be deeply romantic and emotional with lyrics about eternal love and commitment. Include a memorable chorus perfect for special moments.',
    genres: ['Folk', 'Pop'],
    moods: ['Romantic', 'Heartfelt'],
    tempo: 75,
    instruments: ['Acoustic Guitar', 'Piano', 'Violin'],
    vocalStyle: { gender: 'Male', character: 'Soft' },
    duration: '3min',
    keySignature: 'G Major',
    songStructure: ['Intro', 'Verse', 'Chorus', 'Verse', 'Chorus', 'Bridge', 'Chorus', 'Outro']
  },
  {
    id: 'corporate',
    name: 'Corporate Music',
    description: 'Professional background music perfect for business presentations',
    icon: '💼',
    tags: ['Corporate', 'Professional', 'Inspiring'],
    prompt: 'Create professional corporate music at 100 BPM featuring clean piano, subtle strings, and inspiring melodies. The mood should be confident and inspiring without being distracting. Perfect for presentations, company videos, and professional content.',
    genres: ['Pop', 'Ambient'],
    moods: ['Inspiring', 'Professional'],
    tempo: 100,
    instruments: ['Piano', 'Violin', 'Synthesizer'],
    vocalStyle: { gender: 'Instrumental', character: 'Smooth' },
    duration: '2min',
    keySignature: 'C Major',
    songStructure: ['Intro', 'Main Theme', 'Development', 'Climax', 'Resolution']
  }
];