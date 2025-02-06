import mercadopago from "mercadopago";
import {URL, HTTPS} from "../config.js"
import { NUMBER } from "sequelize";

mercadopago.configure({
    access_token: "TEST-5473784009343540-020513-09712b5cf60a102728d25173bddd5a6f-265309285"
});

export const createOrder = async (req, res) => {
  const cartProds = req.body;
  if (cartProds) {
    const items = cartProds.map((i) => {
      return {
        title: i.description,
        unit_price: Number(i.price),
        quantity: Number(i.quantity),
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
        items: items,
        notification_url: HTTPS + "/webhook",
        back_urls: {
          success: URL + "/success",
          failure: URL + "/failure",
          pending: URL + "/pending",
        },
      };
      const response = await mercadopago.preferences.create(preference);
      res.status(200).json(response.body);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }else res.status(404).json({message:"Data undefined"})
};

export const webhook = async (req, res) => {
    const payment = req.body;
    try {
      if (payment.type === "payment") {
        const data = await mercadopago.payment.findById(payment["data.id"]);
        // store in database
        console.log(data)
        res.status(200).json(data);
      }
    } catch (error) {
      return res.status(500).json(error);
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

