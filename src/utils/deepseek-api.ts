
interface DeepSeekMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface DeepSeekResponse {
  id: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

/**
 * Send a chat request to the DeepSeek API
 * @param messages Array of messages in the conversation
 * @param apiKey DeepSeek API key
 * @returns The response from the DeepSeek API
 */
export const generateAIResponse = async (
  messages: DeepSeekMessage[],
  apiKey: string,
  temperature: number = 0.7
): Promise<string> => {
  try {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages,
        temperature,
        max_tokens: 1000,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`DeepSeek API error: ${errorData.error?.message || response.statusText}`);
    }

    const data: DeepSeekResponse = await response.json();
    return data.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.';
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    return 'I encountered an error while generating a response. Please try again later.';
  }
};

/**
 * Create a system prompt for Kundali analysis based on birth chart data
 * @param kundaliInsights The birth chart data
 * @returns A system prompt string
 */
export const createKundaliSystemPrompt = (kundaliInsights: any): string => {
  // If no kundali data is available, provide a general system prompt
  if (!kundaliInsights || Object.keys(kundaliInsights).length === 0) {
    return "You are a Vedic astrology expert assistant. Answer user queries about Vedic astrology in general terms. If they ask about their personal chart, request their birth details.";
  }

  // Create a detailed system prompt with the user's birth chart information
  return `You are a Vedic astrology expert assistant with access to the user's birth chart.

BIRTH CHART INFORMATION:
- Ascendant (Lagna): ${kundaliInsights.ascendant || 'Unknown'}
- Moon Sign: ${kundaliInsights.moonSign || 'Unknown'}
- Sun Sign: ${kundaliInsights.sunSign || 'Unknown'}
- Current Dasha: ${kundaliInsights.currentDasha || 'Unknown'}

PLANETARY POSITIONS:
${kundaliInsights.planets?.map((planet: any) => 
  `- ${planet.name}: in ${planet.sign} (House ${planet.house})${planet.nakshatra ? `, ${planet.nakshatra} nakshatra` : ''}`
).join('\n') || 'No planetary data available'}

HOUSE STRENGTHS:
- Strong Houses: ${kundaliInsights.strongHouses?.join(', ') || 'Unknown'}
- Weak Houses: ${kundaliInsights.weakHouses?.join(', ') || 'Unknown'}

Provide insights based on this chart when answering queries about career, relationships, health, finances, and spiritual growth. Be specific to their chart but explain concepts in simple terms. If they ask about remedies or future predictions, focus on general guidance rather than specific time-bound predictions. Respond in the language the user is using.`;
};

