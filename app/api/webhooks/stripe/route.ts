import { headers } from "next/headers";
import Stripe from "stripe";
import { createAdminClient } from "@/lib/supabase/server";
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: Request){
  const body=await req.text(); const sig=headers().get("stripe-signature")!;
  let event: Stripe.Event;
  try{ event=stripe.webhooks.constructEvent(body,sig,process.env.STRIPE_WEBHOOK_SECRET!); }catch(e:any){ return new Response(`Webhook Error: ${e.message}`,{status:400}); }
  const admin=createAdminClient();
  if(event.type.startsWith("customer.subscription")){
    const sub=event.data.object as Stripe.Subscription;
    const lookup=(sub.items.data[0].price as any).lookup_key as string;
    const tier=lookup?.includes("agency")?"agency":lookup?.includes("pro")?"pro":"free";
    const finalTier=event.type==="customer.subscription.deleted"?"free":tier;
    await admin.from("profiles").update({plan_tier:finalTier}).eq("stripe_customer_id",sub.customer as string);
  }
  return new Response("ok",{status:200});
}
