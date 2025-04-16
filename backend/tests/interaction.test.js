const { validateInteraction } = require("../utils/validateInteraction");

test("valide une interaction correcte", () => {
  const input = { type: "boire", reponse: "slurp" };
  expect(validateInteraction(input)).toBe(true);
});

test("refuse une interaction vide", () => {
  const input = {};
  expect(validateInteraction(input)).toBe(false);
});
