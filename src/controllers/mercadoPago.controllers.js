import mercadopago from "mercadopago";
import dotenv from "dotenv"

dotenv.config()

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MERCADOPAGO
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
        notification_url: process.env.URL + "/mp/webhook",
        back_urls: {
          success: process.env.URL_FRONT + "/#/cartShop",
          failure: process.env.URL_FRONT + "/#/cartShop",
          pending: process.env.URL_FRONT + "/#/cartShop",
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

export const getPayment = async (req,res) => {
  const paymentId = req.params.id;
  try {
      const response = await mercadopago.payment.findById(paymentId);
      if(response.body.status === "approved" && response.body.status_detail === "accredited") {
        res.status(200).json(response.body);
      }
      res.status(404).json({message:"Payment not found"});
  } catch (error) {
      res.status(500).json({error:error.message});
  }
}

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

