import mercadopago from "mercadopago";
import dotenv from "dotenv"

dotenv.config()

mercadopago.configure({
    access_token: process.env.TEST_MERCADOPAGO
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
        items: items,
        notification_url: process.env.HTTPS + "/mp/webhook",
        back_urls: {
          success: "http://localhost:3000/cartShop",
          failure:  "http://localhost:3000/cartShop",
          pending:  "http://localhost:3000/cartShop",
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
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      const body = data.body
      if (body.status === "approved" && body.status_detail === "accredited") {
        res.status(200);
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
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

