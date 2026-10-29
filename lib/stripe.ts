import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });
export const PLANS = {
  free: { storage: 2 * 1024**3, projects: 1 },
  pro: { priceId: "price_pro_19", storage: 100 * 1024**3, projects: 9999 },
  agency: { priceId: "price_agency_49", storage: 1024**4, projects: 9999 }
};
