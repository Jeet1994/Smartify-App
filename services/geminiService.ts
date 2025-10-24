
import { GoogleGenAI, Type } from "@google/genai";
import { NewsCategory } from '../types';

const fetchTopNews = async (): Promise<NewsCategory[]> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const newsCategories = ["Global Economics", "AI", "Technology", "Oil & Gas", "Finance"];

  const prompt = `
    Provide the 3 most important, current top news headlines for each of the following categories: ${newsCategories.join(', ')}.
    For each headline, include a concise one-sentence summary.
    The news should be very recent, ideally from the last 24 hours.
  `;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        categoryName: {
          type: Type.STRING,
          description: "The name of the news category.",
        },
        news: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              headline: {
                type: Type.STRING,
                description: "The news headline."
              },
              summary: {
                type: Type.STRING,
                description: "A one-sentence summary of the news article."
              }
            },
            required: ["headline", "summary"]
          },
          description: "A list of the top 3 news articles for the category."
        }
      },
      required: ["categoryName", "news"]
    }
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Basic validation
    if (!Array.isArray(parsedData) || parsedData.some(cat => !cat.categoryName || !Array.isArray(cat.news))) {
        throw new Error("Received malformed data from API");
    }

    return parsedData as NewsCategory[];
  } catch (error) {
    console.error("Error fetching news from Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to fetch news: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching news.");
  }
};

export default fetchTopNews;
