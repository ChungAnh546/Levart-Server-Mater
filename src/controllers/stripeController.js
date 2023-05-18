import vnPayService from "../services/vnPayService.js";
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const stripe_Payment = async (req, res) => {

    try {
        const amount = req.body.amount;
        const name = req.body.name;
        const success_url = req.body.success_url;
        const cancel_url = req.body.cancel_url;
        if (amount && name && success_url && cancel_url) {
            const session = await stripe.checkout.sessions.create(
                {
                    "mode": "payment",
                    "line_items": [{
                        "price_data": {
                            "unit_amount": amount,
                            "currency": "vnd",
                            "product_data": {
                                "name": name
                            }
                        },
                        "quantity": "1"
                    }],
                    "cancel_url": cancel_url,
                    "success_url": success_url,
                    "payment_method_types": {
                        "0": "card"
                    }
                }
            );
            return res.status(201).json({
                errCode: 0,
                errMessage: "",
                url: session.url
            });
        } else {
            return res.status(400).json({
                errCode: 1,
                errMessage: "Missing required parameters!",
                url: null
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            errCode: 1,
            errMessage: "fail",
            url: null
        });
    }



}

module.exports = { stripe_Payment: stripe_Payment }