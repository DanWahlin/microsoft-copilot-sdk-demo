import { readFile } from "node:fs/promises";
import { z } from "zod";
import { defineTool } from "@github/copilot-sdk";

const orderSchema = z.object({
  id: z.string(),
  customer: z.string(),
  item: z.string(),
  status: z.string(),
  carrier: z.string().optional(),
  eta: z.string().optional(),
  deliveredOn: z.string().optional(),
});

export async function getOrder(orderId: string) {
  const id = orderId.trim().replace(/^#/, "");
  const orders = z.array(orderSchema).parse(
    JSON.parse(await readFile(new URL("./orders.json", import.meta.url), "utf8")),
  );
  const order = orders.find((entry) => entry.id === id);
  return order ? { found: true, order } : { found: false, orderId: id };
}

export const getOrderTool = defineTool("get_order", {
  description: "Look up an outdoor store order by its order number. Use this for all order status questions.",
  parameters: z.object({
    order_id: z.string().trim().min(1).max(40).describe("Order number, for example 1042"),
  }),
  handler: async ({ order_id }) => getOrder(order_id),
});
