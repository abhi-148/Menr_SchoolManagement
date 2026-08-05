const createEventPaymentValidation = (req, res, next) => {

  const {
    registration_id,
    amount,
    payment_method,
  } = req.body;

  if (!registration_id) {
    return res.status(400).json({
      success: false,
      message: "Registration is required.",
    });
  }

  if (!amount) {
    return res.status(400).json({
      success: false,
      message: "Amount is required.",
    });
  }

  if (!payment_method) {
    return res.status(400).json({
      success: false,
      message: "Payment Method is required.",
    });
  }

  next();
};

module.exports = {
  createEventPaymentValidation,
};