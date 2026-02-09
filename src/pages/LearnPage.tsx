import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tabs = ["🧬 Science", "🍳 Recipes", "🎯 Techniques", "❓ FAQ"];

const content: Record<string, { title: string; body: string }[]> = {
  "🧬 Science": [
    { title: "The DHT Myth", body: "DHT is not the root cause of hair loss — it's a symptom of scalp inflammation. When the scalp becomes chronically inflamed, DHT sensitivity increases, leading to miniaturization. Address the inflammation first." },
    { title: "Why Shampoo Damages Hair", body: "Commercial shampoos strip natural sebum, disrupting the scalp's microbiome. This triggers inflammation and weakens follicles. Water-only washing allows your scalp to self-regulate." },
    { title: "The 3-Pillar Approach", body: "Hair regrowth requires addressing three areas simultaneously: reducing inflammation (diet + lifestyle), improving blood flow (massage + microneedling), and supplying nutrients (diet + topicals)." },
    { title: "Blood Flow & Hair Growth", body: "Hair follicles require constant blood supply. Scalp tension restricts blood flow, leading to follicle miniaturization. Massage and microneedling restore circulation to dormant follicles." },
    { title: "Nutrient Requirements", body: "Hair is primarily made of keratin protein. Key nutrients include biotin, zinc, iron, vitamin D, and omega-3 fatty acids. Whole food sources are more bioavailable than supplements." },
  ],
  "🍳 Recipes": [
    { title: "Rosemary Oil Hair Mask", body: "Mix 3 tbsp castor oil + 5 drops rosemary essential oil + 3 drops peppermint oil. Massage into scalp, leave 4-7 hours or overnight. Wash with water only." },
    { title: "Egg & Avocado Mask", body: "2 eggs + 1 ripe avocado + 1 tbsp olive oil. Blend smooth, apply to scalp and hair. Leave 30-60 min, rinse with cool water." },
    { title: "Daily Power Breakfast", body: "3-4 eggs scrambled in grass-fed butter + sautéed spinach + mushrooms. Rich in protein, biotin, iron, and vitamin D — all essential for hair." },
    { title: "Lunch Template", body: "100g chicken/beef/fish + 1 cup white rice + sautéed mushrooms + leafy greens. Season with turmeric and black pepper for anti-inflammatory benefits." },
  ],
  "🎯 Techniques": [
    { title: "Scalp Massage (5 min)", body: "Use fingertips, NOT nails. Start at temples, work across scalp in circular motions. Apply firm pressure. Focus on areas of thinning. Do 2x daily." },
    { title: "Microneedling Guide", body: "Use a 0.5-1.0mm derma roller or stamp. Roll in all directions, 4-6 passes per area. Apply rosemary oil after. Do every other day. Replace roller monthly." },
    { title: "Inversion Therapy", body: "Hang head below heart level for 10-15 minutes. Use an inversion table or simply hang off bed edge. Increases blood flow to scalp by up to 70%." },
  ],
  "❓ FAQ": [
    { title: "When will I see results?", body: "Most people notice reduced hair fall by week 4, new growth by week 8-10. Full results take 12+ weeks. Consistency is key." },
    { title: "Can I use shampoo occasionally?", body: "Try to avoid it. If needed, use a sulfate-free, natural shampoo once a week maximum. The goal is to let your scalp's natural oils protect and nourish." },
    { title: "Is microneedling safe?", body: "Yes, when done correctly. Use proper needle depth (0.5-1.0mm), sanitize before use, and avoid active acne or irritated skin. Stop if you experience pain." },
    { title: "What if I miss a day?", body: "Don't stress. Missing one day won't undo progress. Resume the next day and maintain your streak. Consistency over perfection." },
  ],
};

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pb-24 pt-6">
      <div className="mx-auto max-w-lg px-4">
        <h1 className="mb-4 text-2xl font-bold text-foreground">Learn</h1>

        {/* Tabs */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setExpanded(null); }}
              className={cn(
                "flex-shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors touch-target",
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-2">
          {content[activeTab]?.map((item) => (
            <div key={item.title} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === item.title ? null : item.title)}
                className="flex w-full items-center justify-between p-4 text-left touch-target"
              >
                <span className="text-sm font-bold text-foreground">{item.title}</span>
                <ChevronDown className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  expanded === item.title && "rotate-180"
                )} />
              </button>
              <AnimatePresence>
                {expanded === item.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
