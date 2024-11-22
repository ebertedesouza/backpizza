import { Request, Response } from "express";
import { SendOrderService } from "../../services/order/SendOrderService";

class SendOrderController {
  async handle(req: Request, res: Response) {
    const { order_id } = req.body;
  
    const sendOrder = new SendOrderService();
  
    try {
      const order = await sendOrder.execute({ order_id });
      return res.json(order);
    } catch (error) {
      console.error(error); // Adiciona log do erro
      return res.status(500).json({ message: "Erro ao finalizar o pedido, tente novamente mais tarde." });
    }
  }
  
}

export { SendOrderController };
