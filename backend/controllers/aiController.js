import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const detectWaste = async (req, res) => {
  try {

    const { wasteName } = req.body;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
Identify this waste:

${wasteName}

Reply ONLY in JSON.

{
"wasteType":"",
"recyclable":"",
"suggestion":""
}
`;

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    res.json({
      success: true,
      result: response,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};