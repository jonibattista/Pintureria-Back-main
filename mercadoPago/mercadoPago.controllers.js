import mercadopago from "mercadopago";

mercadopago.configure({
    access_token: "TEST-5473784009343540-020513-09712b5cf60a102728d25173bddd5a6f-265309285"
});

export const createOrder = async (req, res) => {
    try {
        const preference = {
            items: [
                {
                    title: "Latex 10lt",
                    unit_price: 100,
                    quantity: 1,
                }
            ]
        };

        const response = await mercadopago.preferences.create(preference);
        res.json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOrder = async (req, res) => {
    res.json("get order")
};