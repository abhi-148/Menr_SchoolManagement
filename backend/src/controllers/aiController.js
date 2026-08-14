const {
  askAIService
} = require("../services/aiService");


// =========================================================
// ASK AI
// =========================================================

const askAI = async (
  req,
  res
) => {

  try {

    const {
      message
    } = req.body;


    const result =
      await askAIService(
        message,
        req.user
      );


    return res.status(200).json({

      success: true,

      answer:
        result.answer,

      model:
        result.model

    });

  } catch (error) {

    console.error(
      "AI CONTROLLER ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Unable to get AI response."

    });

  }

};


module.exports = {
  askAI
};