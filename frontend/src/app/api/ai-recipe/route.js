import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
<<<<<<< HEAD
        const { productName, category, description, allergies, cuisinePreference, spiceLevel, cookingStyle } = await req.json();
=======
        const { productName, category, description } = await req.json();
>>>>>>> 407d5a0bd9f5778742f3cabd8cf45dbde1d78f2c

        if (!productName) {
            return NextResponse.json({ error: 'Product name required' }, { status: 400 });
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
<<<<<<< HEAD
            return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
        }

        // Build personalization context
        const personalizations = [];
        if (allergies && allergies.length > 0) personalizations.push(`IMPORTANT - The person has these allergies/dietary restrictions: ${allergies.join(', ')}. Do NOT use any ingredients that contain or are related to these allergens.`);
        if (cuisinePreference) personalizations.push(`Preferred cuisine style: ${cuisinePreference}`);
        if (spiceLevel) personalizations.push(`Preferred spice level: ${spiceLevel}`);
        if (cookingStyle) personalizations.push(`Preferred cooking style: ${cookingStyle}`);
        const personalizationBlock = personalizations.length > 0 ? `\n\nPersonalization preferences:\n${personalizations.join('\n')}` : '';

=======
            return NextResponse.json({ error: 'Groq API key not configured' }, { status: 500 });
        }

>>>>>>> 407d5a0bd9f5778742f3cabd8cf45dbde1d78f2c
        const prompt = `You are an expert Indian seafood chef specializing in Bay of Bengal cuisine.

Product: ${productName}
Category: ${category || 'Seafood'}
<<<<<<< HEAD
Description: ${description || ''}${personalizationBlock}

Please provide a personalized recipe taking into account all the preferences above:
=======
Description: ${description || ''}

Please provide:
>>>>>>> 407d5a0bd9f5778742f3cabd8cf45dbde1d78f2c
1. A featured signature recipe using this product — include dish name, a short intro, ingredients (as a bulleted list), and clear step-by-step cooking instructions.
2. 4 other quick dish recommendations using this product (just dish name + 1-line description each).
3. One pro chef tip specific to this product.

Format your response as valid JSON matching exactly this structure:
{
  "featuredRecipe": {
    "name": "string",
    "intro": "string",
    "prepTime": "string",
    "cookTime": "string",
    "serves": "string",
    "ingredients": ["string"],
    "steps": ["string"]
  },
  "otherDishes": [
    { "name": "string", "description": "string" }
  ],
  "chefTip": "string"
}`;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.7,
                max_tokens: 1500,
                response_format: { type: 'json_object' },
            }),
        });

        if (!response.ok) {
            const err = await response.text();
<<<<<<< HEAD
            console.error('Recipe API error:', err);
            return NextResponse.json({ error: 'Recipe generation failed' }, { status: 502 });
=======
            console.error('Groq API error:', err);
            return NextResponse.json({ error: 'Groq API error' }, { status: 502 });
>>>>>>> 407d5a0bd9f5778742f3cabd8cf45dbde1d78f2c
        }

        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        const parsed = JSON.parse(content);

        return NextResponse.json(parsed);
    } catch (err) {
        console.error('AI Recipe error:', err);
        return NextResponse.json({ error: 'Failed to generate recipe' }, { status: 500 });
    }
}
