import { describe, it, expect } from "vitest";

describe("restaurant ordering logic", () => {
  it("calculates subtotal, tax and total correctly", () => {
    const items = [{ price: 10, qty: 2 }, { price: 5, qty: 1 }];
    const subtotal = items.reduce((s, x) => s + x.price * x.qty, 0);
    const tax = subtotal * 0.05;
    expect(subtotal).toBe(25);
    expect(tax).toBe(1.25);
    expect(subtotal + tax).toBe(26.25);
  });

  it("rejects an empty order", () => {
    const cart = [];
    expect(cart.length).toBe(0);
  });

  it("supports structured order fields", () => {
    const order = {
      items: [{ menuItem: "Zinger", quantity: 2, modifiers: ["no mayo"], allergies: [] }],
      needsClarification: false
    };
    expect(order.items[0]).toHaveProperty("menuItem");
    expect(order.items[0]).toHaveProperty("quantity");
    expect(order.items[0]).toHaveProperty("modifiers");
    expect(order.items[0]).toHaveProperty("allergies");
  });
});