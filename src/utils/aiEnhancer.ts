interface EnhancementOptions {
  language: 'english' | 'indonesian';
  category: string;
  optimization?: 'basic' | 'advanced';
}

export async function enhancePrompt(basePrompt: string, options: EnhancementOptions): Promise<string> {
  // Check if API keys are available
  const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const openRouterKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  
  // If no API keys available, use local optimization
  if (!geminiKey && !openRouterKey) {
    console.log('No API keys available, using local optimization');
    return optimizePromptLocally(basePrompt, options);
  }

  // Try Gemini API first if key is available
  if (geminiKey) {
    try {
      const geminiResult = await enhanceWithGemini(basePrompt, options, geminiKey);
      if (geminiResult) return geminiResult;
    } catch (error) {
      console.warn('Gemini API failed, trying OpenRouter:', error);
    }
  }

  // Fallback to OpenRouter if key is available
  if (openRouterKey) {
    try {
      const openRouterResult = await enhanceWithOpenRouter(basePrompt, options, openRouterKey);
      if (openRouterResult) return openRouterResult;
    } catch (error) {
      console.warn('OpenRouter API failed:', error);
    }
  }

  // Final fallback to local optimization
  return optimizePromptLocally(basePrompt, options);
}

async function enhanceWithGemini(basePrompt: string, options: EnhancementOptions, apiKey: string): Promise<string> {
  const optimizationLevel = options.optimization === 'advanced' ? 'advanced' : 'standard';
  
  const systemPrompt = options.language === 'indonesian' 
    ? `Optimalkan prompt musik Suno AI ini untuk hasil yang lebih baik. ${optimizationLevel === 'advanced' ? 'Gunakan optimasi tingkat lanjut dengan analisis mendalam.' : ''} Buat lebih spesifik dan efektif sambil mempertahankan maksud asli:

Prompt asli: ${basePrompt}

Kategori: ${options.category}
Bahasa: Indonesia
Level optimasi: ${optimizationLevel}

Aturan optimasi:
1. Pertahankan tag genre dalam [kurung] di awal
2. Spesifik tentang instrumen, tempo, dan mood
3. Tambahkan catatan produksi untuk kualitas audio yang lebih baik
4. Pastikan prompt jelas dan dapat ditindaklanjuti untuk generasi musik AI
5. Optimalkan khusus untuk Suno AI
6. Maksimal 500 karakter
7. Gunakan bahasa Indonesia yang natural
${optimizationLevel === 'advanced' ? '8. Tambahkan detail teknis produksi\n9. Sertakan referensi gaya musik yang spesifik\n10. Optimalkan untuk hasil audio berkualitas tinggi' : ''}

Kembalikan hanya prompt yang dioptimalkan, tidak ada yang lain.`
    : `Optimize this Suno AI music prompt for better results. ${optimizationLevel === 'advanced' ? 'Use advanced optimization with deep analysis.' : ''} Make it more specific and effective while maintaining the original intent:

Original prompt: ${basePrompt}

Category: ${options.category}
Language: English
Optimization level: ${optimizationLevel}

Rules for optimization:
1. Keep genre tags in [brackets] at the beginning
2. Be specific about instruments, tempo, and mood
3. Add production notes for better audio quality
4. Ensure the prompt is clear and actionable for AI music generation
5. Optimize for Suno AI specifically
6. Maximum 500 characters
7. Use natural, flowing English
${optimizationLevel === 'advanced' ? '8. Add technical production details\n9. Include specific musical style references\n10. Optimize for high-quality audio output' : ''}

Return only the optimized prompt, nothing else.`;

  // Use the correct Gemini 2.0 Flash endpoint
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: systemPrompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 250,
      }
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text.trim();
}

async function enhanceWithOpenRouter(basePrompt: string, options: EnhancementOptions, apiKey: string): Promise<string> {
  const optimizationLevel = options.optimization === 'advanced' ? 'advanced' : 'standard';
  
  const systemMessage = options.language === 'indonesian'
    ? `Optimalkan prompt musik Suno AI ini: ${basePrompt}. Kategori: ${options.category}. Level: ${optimizationLevel}. Buat lebih spesifik untuk hasil yang lebih baik. Maksimal 500 karakter. Gunakan bahasa Indonesia.`
    : `Optimize this Suno AI music prompt: ${basePrompt}. Category: ${options.category}. Level: ${optimizationLevel}. Make it more specific for better results. Max 500 characters. Use English.`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': window.location.origin,
      'X-Title': 'Suno AI Prompt Generator'
    },
    body: JSON.stringify({
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [{
        role: 'user',
        content: systemMessage
      }],
      max_tokens: 250,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(`OpenRouter API error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

function optimizePromptLocally(basePrompt: string, options: EnhancementOptions): string {
  let optimized = basePrompt;

  // Basic optimizations
  optimized = optimized
    .replace(/\s+/g, ' ')
    .replace(/,\s*,/g, ',')
    .replace(/\s+\./g, '.')
    .trim();

  // Category-specific optimizations
  if (options.category === 'relaxation') {
    // Add relaxation-specific enhancements
    if (!optimized.includes('production') && !optimized.includes('produksi')) {
      const productionNote = options.language === 'indonesian' 
        ? ' Produksi berkualitas tinggi dengan mixing yang halus dan natural.'
        : ' High-quality production with smooth and natural mixing.';
      optimized += productionNote;
    }
    
    if (optimized.includes('ambient') || optimized.includes('nature')) {
      const relaxationNote = options.language === 'indonesian'
        ? ' Fokus pada ketenangan dan relaksasi mendalam.'
        : ' Focus on tranquility and deep relaxation.';
      optimized += relaxationNote;
    }
  }

  if (options.category === 'indonesian') {
    // Add Indonesian music specific enhancements
    const culturalNote = options.language === 'indonesian'
      ? ' Dengan nuansa budaya Indonesia yang kental.'
      : ' With rich Indonesian cultural nuances.';
    optimized += culturalNote;
  }

  if (options.category === 'commercial') {
    // Add commercial music enhancements
    const commercialNote = options.language === 'indonesian'
      ? ' Profesional dan mudah diingat untuk keperluan komersial.'
      : ' Professional and memorable for commercial use.';
    optimized += commercialNote;
  }

  // Ensure genre tags are at the beginning
  const genreTagMatch = optimized.match(/\[([^\]]+)\]/);
  if (genreTagMatch) {
    const tags = genreTagMatch[0];
    optimized = optimized.replace(tags, '').trim();
    optimized = tags + ' ' + optimized;
  }

  // Add tempo if missing
  if (!optimized.includes('BPM') && !optimized.includes('tempo')) {
    const tempoNote = options.language === 'indonesian'
      ? ' Tempo yang sesuai dan natural.'
      : ' Appropriate and natural tempo.';
    optimized += tempoNote;
  }

  // Advanced optimization features
  if (options.optimization === 'advanced') {
    // Add production quality notes
    if (!optimized.includes('stereo') && !optimized.includes('spatial')) {
      const spatialNote = options.language === 'indonesian'
        ? ' Dengan efek stereo yang luas dan spasial.'
        : ' With wide stereo and spatial effects.';
      optimized += spatialNote;
    }
    
    // Add mastering notes for better quality
    if (!optimized.includes('master') && !optimized.includes('quality')) {
      const masteringNote = options.language === 'indonesian'
        ? ' Mastering profesional untuk kualitas audio optimal.'
        : ' Professional mastering for optimal audio quality.';
      optimized += masteringNote;
    }

    // Add specific Suno AI optimization
    const sunoNote = options.language === 'indonesian'
      ? ' Dioptimalkan khusus untuk Suno AI dengan parameter terbaik.'
      : ' Specifically optimized for Suno AI with best parameters.';
    optimized += sunoNote;
  }

  // Ensure the prompt doesn't exceed 500 characters
  if (optimized.length > 500) {
    optimized = optimized.substring(0, 497) + '...';
  }

  return optimized;
}