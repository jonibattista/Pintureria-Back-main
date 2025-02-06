import mercadopago from "mercadopago";
import {URL, URLS} from "../config.js"

mercadopago.configure({
    access_token: "TEST-5473784009343540-020513-09712b5cf60a102728d25173bddd5a6f-265309285"
});

export const createOrder = async (req, res) => {
    const data = req.body.cartProds
    const items = data.map((i) => {
        return {
            title: i.description,
            unit_price: i.price,
            quantity: i.quantity,
        };
    });
    try {
        const preference = {
            // items: [
            //     {
            //         title: "Latex 10lt",
            //         unit_price: 100,
            //         quantity: 1,
            //     }
            // ],
            items:items,
            notification_url:URLS + "/webhook",
            back_urls: {
                success: URL +"/success",
                failure: URL +"/failure",
                pending: URL +"/pending"
            }
        }

        const response = await mercadopago.preferences.create(preference);
        res.json(response);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const webhook = async (req, res) => {
    const payment = req.body;
    try {
      if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
        // store in database
        console.log(data)
        res.status(204).json(data);
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  };

export const getOrder = async (req, res) => {
    res.json("get order")
};

export const success = async (req, res) => {
    res.json("success")
};

export const pending = async (req, res) => {
    res.json("pending")
};

export const failure = async (req, res) => {
    res.json("failure")
};

