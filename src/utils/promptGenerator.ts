interface PromptParams {
  mode: 'full' | 'instrumental' | 'lyrics' | 'custom';
  genres: string[];
  moods: string[];
  instruments: string[];
  tempo: number;
  duration: string;
  keySignature: string;
  vocalStyle: {
    gender: string;
    character: string;
  };
  songStructure: string[];
  advancedSettings: {
    styleReference: string;
    productionStyle: string;
    language: string;
    effects: string[];
  };
  theme?: string;
}

// Lyric database for different themes and genres
const lyricDatabase = {
  pop: {
    love: {
      verses: [
        "Walking down the street tonight\nYour memory burning bright\nEvery step reminds me of you\nWishing all my dreams come true",
        "In the silence of my room\nI can feel you through the gloom\nPromises we used to make\nEvery breath for your sake"
      ],
      chorus: [
        "You're the light that guides me home\nNever have to be alone\nIn your arms I feel so free\nYou're my perfect melody",
        "Take my hand and hold me tight\nEverything will be alright\nThis is love, this is true\nAll I need is me and you"
      ]
    },
    motivation: {
      verses: [
        "Rise up from the ashes now\nFind your strength, remember how\nEvery fall can make you strong\nThis is where you belong",
        "Dreams are calling out your name\nNothing left will be the same\nStep into the light today\nYou will find your way"
      ],
      chorus: [
        "You can fly above the clouds\nBreak away from all the crowds\nThis is your moment to shine\nVictory is yours by design",
        "Never give up, never fall\nYou can conquer it all\nBelieve in yourself today\nYou will find your way"
      ]
    }
  },
  rock: {
    rebellion: {
      verses: [
        "They try to hold us down\nBut we won't make a sound\nBreak the chains, ignite the fire\nWe are everything they fear",
        "Standing on the edge of time\nEvery reason, every rhyme\nWe won't bow, we won't bend\nThis fight will never end"
      ],
      chorus: [
        "We are the thunder in the night\nWe are the flame that burns so bright\nRebel hearts will never die\nWe will touch the sky",
        "Break the walls, feel the power\nThis is our finest hour\nWe won't back down, we won't fall\nWe will conquer all"
      ]
    }
  }
};

function generateCustomLyrics(theme: string, genre: string): string {
  const genreKey = genre.toLowerCase();
  const themeKey = theme.toLowerCase();
  
  if (lyricDatabase[genreKey] && lyricDatabase[genreKey][themeKey]) {
    const data = lyricDatabase[genreKey][themeKey];
    const randomVerse = data.verses[Math.floor(Math.random() * data.verses.length)];
    const randomChorus = data.chorus[Math.floor(Math.random() * data.chorus.length)];
    
    return `[Verse 1]
${randomVerse}

[Chorus]
${randomChorus}

[Verse 2]
${randomVerse}

[Chorus]
${randomChorus}

[Bridge]
${generateBridge(theme, genre)}

[Chorus]
${randomChorus}`;
  }
  
  return generateGenericLyrics(theme);
}

function generateBridge(theme: string, genre: string): string {
  const bridges = {
    love: "When the world gets cold and dark\nYou're the fire in my heart\nNothing else can tear apart\nThis love we have, this perfect start",
    motivation: "Every mountain that you climb\nEvery dream that takes its time\nYou're stronger than you know inside\nLet your spirit be your guide",
    rebellion: "We won't be silenced anymore\nThis is what we're fighting for\nFreedom calls from every door\nWe are the ones they can't ignore"
  };
  
  return bridges[theme] || bridges.love;
}

function generateGenericLyrics(theme: string): string {
  return `[Verse 1]
In the moments when we shine
Everything falls into line
This is our moment, this is our time
To make everything align

[Chorus]
We are more than what we seem
Living out our wildest dream
Nothing's quite the way it seems
We are more than what we dream

[Verse 2]
Through the darkness and the light
We will make everything right
This is our moment to ignite
The fire burning deep inside

[Chorus]
We are more than what we seem
Living out our wildest dream
Nothing's quite the way it seems
We are more than what we dream`;
}

function generateInstrumentalPrompt(params: PromptParams): string {
  const { genres, moods, instruments, tempo, duration, keySignature, songStructure, advancedSettings } = params;
  
  let prompt = "[instrumental] Create ";
  
  // Add genres with tags
  if (genres.length > 0) {
    const genreTags = genres.map(g => g.toLowerCase()).join(', ');
    prompt = `[${genreTags}, instrumental] Create `;
    
    if (genres.length === 1) {
      prompt += `an instrumental ${genres[0].toLowerCase()} track `;
    } else {
      prompt += `an instrumental ${genres.slice(0, -1).join(", ").toLowerCase()} and ${genres[genres.length - 1].toLowerCase()} fusion track `;
    }
  } else {
    prompt += "an instrumental track ";
  }
  
  prompt += `at ${tempo} BPM in ${keySignature} `;
  
  if (instruments.length > 0) {
    if (instruments.length === 1) {
      prompt += `featuring ${instruments[0].toLowerCase()} `;
    } else {
      prompt += `featuring ${instruments.slice(0, -1).join(", ").toLowerCase()}, and ${instruments[instruments.length - 1].toLowerCase()} `;
    }
  }
  
  if (moods.length > 0) {
    prompt += `The mood should be ${moods.join(" and ").toLowerCase()} `;
  }
  
  prompt += `Duration: ${duration}. `;
  
  if (songStructure.length > 0) {
    prompt += `Structure: ${songStructure.join("-")}. `;
  }
  
  prompt += "No vocals, focus on melody and harmony. ";
  
  if (advancedSettings.styleReference.trim()) {
    prompt += `Style similar to ${advancedSettings.styleReference}. `;
  }
  
  if (advancedSettings.effects.length > 0) {
    prompt += `Include ${advancedSettings.effects.join(", ").toLowerCase()} effects. `;
  }
  
  return prompt.trim();
}

function generateLyricsPrompt(params: PromptParams): string {
  const { genres, moods, instruments, tempo, vocalStyle, advancedSettings, theme } = params;
  
  const customLyrics = generateCustomLyrics(theme || 'love', genres[0] || 'pop');
  
  let prompt = "";
  
  // Add genre tags
  if (genres.length > 0) {
    const genreTags = genres.map(g => g.toLowerCase()).join(', ');
    prompt = `[${genreTags}] `;
  }
  
  prompt += `Create a ${genres[0]?.toLowerCase() || 'pop'} song `;
  
  if (vocalStyle.gender !== 'Instrumental') {
    prompt += `with ${vocalStyle.character.toLowerCase()} ${vocalStyle.gender.toLowerCase()} vocals `;
  }
  
  prompt += `at ${tempo} BPM. `;
  
  if (moods.length > 0) {
    prompt += `Mood: ${moods.join(" and ").toLowerCase()}. `;
  }
  
  if (instruments.length > 0) {
    prompt += `Instruments: ${instruments.join(", ").toLowerCase()}. `;
  }
  
  prompt += `\n\nLyrics:\n${customLyrics}`;
  
  if (advancedSettings.styleReference.trim()) {
    prompt += `\n\nStyle similar to ${advancedSettings.styleReference}.`;
  }
  
  return prompt.trim();
}

function generateFullPrompt(params: PromptParams): string {
  const {
    genres,
    moods,
    instruments,
    tempo,
    duration,
    keySignature,
    vocalStyle,
    songStructure,
    advancedSettings
  } = params;

  let prompt = "";

  // Add genre tags for Suno
  if (genres.length > 0) {
    const genreTags = genres.map(g => g.toLowerCase()).join(', ');
    prompt = `[${genreTags}] `;
  }

  prompt += "Create ";

  // Add genres
  if (genres.length > 0) {
    if (genres.length === 1) {
      prompt += `a ${genres[0].toLowerCase()} song `;
    } else {
      prompt += `a ${genres.slice(0, -1).join(", ").toLowerCase()} and ${genres[genres.length - 1].toLowerCase()} fusion song `;
    }
  } else {
    prompt += "a song ";
  }

  // Add tempo and key
  prompt += `at ${tempo} BPM in ${keySignature} `;

  // Add instruments
  if (instruments.length > 0) {
    if (instruments.length === 1) {
      prompt += `featuring ${instruments[0].toLowerCase()} `;
    } else if (instruments.length === 2) {
      prompt += `featuring ${instruments[0].toLowerCase()} and ${instruments[1].toLowerCase()} `;
    } else {
      prompt += `featuring ${instruments.slice(0, -1).join(", ").toLowerCase()}, and ${instruments[instruments.length - 1].toLowerCase()} `;
    }
  }

  // Add vocals
  if (vocalStyle.gender !== 'Instrumental') {
    prompt += `with ${vocalStyle.character.toLowerCase()} ${vocalStyle.gender.toLowerCase()} vocals `;
  }

  // Add mood
  if (moods.length > 0) {
    prompt += `The mood should be ${moods.join(" and ").toLowerCase()} `;
  }

  // Add duration
  prompt += `Duration: ${duration}. `;

  // Add song structure
  if (songStructure.length > 0) {
    prompt += `Structure: ${songStructure.join("-")}. `;
  }

  // Add advanced settings
  if (advancedSettings.styleReference.trim()) {
    prompt += `Style similar to ${advancedSettings.styleReference}. `;
  }

  if (advancedSettings.productionStyle !== 'Modern') {
    prompt += `Production style: ${advancedSettings.productionStyle.toLowerCase()}. `;
  }

  if (advancedSettings.language !== 'English') {
    prompt += `Language: ${advancedSettings.language}. `;
  }

  if (advancedSettings.effects.length > 0) {
    prompt += `Audio effects: ${advancedSettings.effects.join(", ").toLowerCase()}. `;
  }

  return prompt.trim();
}

function generateCustomPrompt(params: PromptParams): string {
  // For custom mode, generate a more detailed, technical prompt
  const fullPrompt = generateFullPrompt(params);
  
  let customPrompt = fullPrompt;
  
  // Add technical details
  customPrompt += ` Technical specifications: ${params.tempo} BPM, ${params.keySignature}, ${params.duration} duration.`;
  
  // Add production notes
  if (params.advancedSettings.productionStyle) {
    customPrompt += ` Production: ${params.advancedSettings.productionStyle} style recording with professional mixing.`;
  }
  
  // Add arrangement details
  if (params.songStructure.length > 0) {
    customPrompt += ` Arrangement follows ${params.songStructure.join(" → ")} structure.`;
  }
  
  return customPrompt;
}

export function generateSmartPrompt(params: PromptParams): string {
  const { mode } = params;
  
  let prompt = "";
  
  switch(mode) {
    case 'instrumental':
      prompt = generateInstrumentalPrompt(params);
      break;
    case 'lyrics':
      prompt = generateLyricsPrompt(params);
      break;
    case 'full':
      prompt = generateFullPrompt(params);
      break;
    case 'custom':
      prompt = generateCustomPrompt(params);
      break;
    default:
      prompt = generateFullPrompt(params);
  }
  
  return optimizePrompt(prompt);
}

export function optimizePrompt(prompt: string): string {
  // Remove redundant words and improve structure
  return prompt
    .replace(/\s+/g, ' ')
    .replace(/,\s*,/g, ',')
    .replace(/\s+\./g, '.')
    .replace(/\band\s+and\b/g, 'and')
    .replace(/\bthe\s+the\b/g, 'the')
    .replace(/\bvery\s+very\b/g, 'very')
    .replace(/\breally\s+really\b/g, 'really')
    .trim();
}