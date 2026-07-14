// Mock signed-in member. The members area is member-only, so anyone here is an
// active MSA Pro member. The saved card stands in for the account used to pay
// MSA membership dues — the same one used to pay for training registrations.
export const currentMember = {
  name: "John Doe",
  email: "john.doe@example.com",
  tier: "MSA Pro",
  savedCard: { brand: "Visa", last4: "4242", exp: "09/28" },
};
