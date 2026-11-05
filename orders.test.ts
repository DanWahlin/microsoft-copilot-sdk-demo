import assert from "node:assert/strict";
import { test } from "node:test";
import { getOrder } from "./orders.js";

test("looks up shipped, processing, and delivered orders from the fixture", async () => {
  for (const [id, status] of [["1042", "Shipped"], ["1043", "Processing"], ["1044", "Delivered"]]) {
    const result = await getOrder(id);
    assert.equal(result.found, true);
    assert.equal(result.order?.status, status);
  }
});

test("normalizes pasted order numbers", async () => {
  assert.equal((await getOrder("  #1042  ")).order?.carrier, "Contoso Shipping");
});

test("explicitly reports missing orders without fabricating data", async () => {
  assert.deepEqual(await getOrder("9999"), { found: false, orderId: "9999" });
});
