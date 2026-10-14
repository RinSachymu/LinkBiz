import { useState, useRef } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────

type Business = {
  id: number;
  name: string;
  tagline: string;
  industry: string;
  size: string;
  location: string;
  founded: string;
  revenue: string;
  principles: string[];
  description: string;
  accentColor: string;
  initials: string;
  seeking: string;
  aiScore?: number;
  aiReason?: string;
};

type Investor = {
  id: number;
  name: string;
  type: string;
  focus: string[];
  stage: string;
  ticketSize: string;
  portfolio: string[];
  location: string;
  creditRating: string;
  description: string;
  accentColor: string;
  initials: string;
  requirements: string;
};

const businesses: Business[] = [
  {
    id: 1,
    name: "Meridian Labs",
    tagline: "Deep tech meets supply chain",
    industry: "Supply Chain Tech",
    size: "51–200",
    location: "Austin, TX",
    founded: "2019",
    revenue: "$4.2M ARR",
    principles: ["Sustainability", "Open Source", "B2B SaaS"],
    description:
      "We build AI-powered visibility tools for mid-market manufacturers. Looking for strategic partners in logistics or last-mile delivery.",
    accentColor: "#c6ff00",
    initials: "ML",
    seeking: "Logistics partner",
  },
  {
    id: 2,
    name: "Vault Financial",
    tagline: "Embedded finance for the trades",
    industry: "Fintech",
    size: "11–50",
    location: "Chicago, IL",
    founded: "2021",
    revenue: "$1.8M ARR",
    principles: ["Financial Inclusion", "API-First", "Transparency"],
    description:
      "Providing banking and credit tools specifically for contractors and tradespeople. Seeking distribution partners in construction or real estate.",
    accentColor: "#ff6b35",
    initials: "VF",
    seeking: "Distribution partner",
  },
  {
    id: 3,
    name: "Sable Health",
    tagline: "Rural healthcare, reimagined",
    industry: "Health Tech",
    size: "201–500",
    location: "Nashville, TN",
    founded: "2017",
    revenue: "$12M ARR",
    principles: ["Equity", "Remote-First", "Data Privacy"],
    description:
      "Telehealth and chronic care management platform focused on underserved rural markets. Looking for a tech or AI partner to accelerate diagnostics.",
    accentColor: "#7c3aed",
    initials: "SH",
    seeking: "AI/ML partner",
  },
  {
    id: 4,
    name: "Ironclad Robotics",
    tagline: "Automation for the real world",
    industry: "Robotics / Hardware",
    size: "11–50",
    location: "Pittsburgh, PA",
    founded: "2020",
    revenue: "$900K ARR",
    principles: ["American Manufacturing", "Safety", "Open Standards"],
    description:
      "Building ruggedized robots for warehouse and industrial environments. Seeking software partners to build workflow integrations.",
    accentColor: "#f59e0b",
    initials: "IR",
    seeking: "Software partner",
  },
  {
    id: 5,
    name: "Crescent Media",
    tagline: "Creator economy infrastructure",
    industry: "Media / AdTech",
    size: "11–50",
    location: "Los Angeles, CA",
    founded: "2022",
    revenue: "$2.1M ARR",
    principles: ["Creator Ownership", "Transparency", "Diverse Voices"],
    description:
      "Ad network and monetization platform built for independent media creators. Looking for brand partners or marketing agencies.",
    accentColor: "#ec4899",
    initials: "CM",
    seeking: "Brand / Agency partner",
  },
  {
    id: 6,
    name: "Oaken Agriculture",
    tagline: "Precision farming at scale",
    industry: "AgriTech",
    size: "51–200",
    location: "Des Moines, IA",
    founded: "2018",
    revenue: "$6.7M ARR",
    principles: ["Sustainability", "Food Security", "Rural Empowerment"],
    description:
      "IoT sensors and data analytics for large-scale crop operations. Seeking partners in drone tech, logistics, or agricultural insurance.",
    accentColor: "#10b981",
    initials: "OA",
    seeking: "Drone / Logistics partner",
  },
];

const investors: Investor[] = [
  {
    id: 1,
    name: "Apex Ventures",
    type: "Venture Capital",
    focus: ["B2B SaaS", "Supply Chain", "Fintech"],
    stage: "Series A–B",
    ticketSize: "$2M–$15M",
    portfolio: ["Shipbob", "Settle", "Conductor"],
    location: "San Francisco, CA",
    creditRating: "AAA",
    description:
      "Thesis-driven fund backing B2B companies disrupting legacy industries. We bring 40+ portfolio companies to the table for distribution.",
    accentColor: "#c6ff00",
    initials: "AV",
    requirements: "18+ months runway, $1M+ ARR",
  },
  {
    id: 2,
    name: "Helix Capital",
    type: "Growth Equity",
    focus: ["Health Tech", "BioTech", "Insurance Tech"],
    stage: "Series B–D",
    ticketSize: "$10M–$50M",
    portfolio: ["Transcarent", "Brightline", "Wellth"],
    location: "New York, NY",
    creditRating: "AA+",
    description:
      "Healthcare-focused growth equity firm with deep relationships across payers, providers, and pharma. Seeking companies with proven clinical outcomes.",
    accentColor: "#7c3aed",
    initials: "HC",
    requirements: "FDA pathway or payer contract in place",
  },
  {
    id: 3,
    name: "Blueprint Angels",
    type: "Angel Syndicate",
    focus: ["Hardware", "Manufacturing", "Robotics"],
    stage: "Pre-Seed–Seed",
    ticketSize: "$250K–$1.5M",
    portfolio: ["Fictiv", "Hadrian", "Machina Labs"],
    location: "Detroit, MI",
    creditRating: "AA",
    description:
      "100+ operators and engineers from Ford, GM, Boeing, and SpaceX pooling capital. We roll up our sleeves and help with talent and supply chains.",
    accentColor: "#f59e0b",
    initials: "BA",
    requirements: "Working prototype, clear path to $10M revenue",
  },
  {
    id: 4,
    name: "Crescendo Fund",
    type: "Impact Fund",
    focus: ["AgriTech", "CleanTech", "Rural Communities"],
    stage: "Seed–Series A",
    ticketSize: "$500K–$5M",
    portfolio: ["Indigo Ag", "Farmers Business Network"],
    location: "Minneapolis, MN",
    creditRating: "AA",
    description:
      "CDFI-backed impact fund prioritizing founders in underrepresented geographies. Returns through meaningful outcomes, not just multiples.",
    accentColor: "#10b981",
    initials: "CF",
    requirements: "Impact metrics tracked, diverse founding team preferred",
  },
];

const aiRecommendations: (Business & { aiScore: number; aiReason: string })[] =
  [
    {
      ...businesses[0],
      aiScore: 97,
      aiReason:
        "Both operate in data-heavy B2B infrastructure with shared open-source values. Meridian's supply chain visibility directly complements your logistics gaps. High principle alignment score.",
    },
    {
      ...businesses[2],
      aiScore: 91,
      aiReason:
        "Overlapping commitment to equity and underserved markets. Cross-industry partnership opportunity: your fintech rails could power Sable's patient billing.",
    },
    {
      ...businesses[5],
      aiScore: 88,
      aiReason:
        "Both prioritize rural empowerment and sustainability. Geographic market overlap in the Midwest creates natural distribution synergies.",
    },
  ];

// ─── Types ─────────────────────────────────────────────────────────────────────

type View = "discover" | "matches" | "ai" | "profile";
type Mode = "b2b" | "b2i";
type OrganizationType = "startup" | "business" | "government";

type OnboardingProfile = {
  organizationType: OrganizationType;
  industry: string;
  fullName: string;
  organizationName: string;
  role: string;
  photo: string;
  goals: string[];
  plan: string;
};

const organizationTypes: {
  id: OrganizationType;
  eyebrow: string;
  title: string;
  description: string;
}[] = [
  {
    id: "startup",
    eyebrow: "BUILD",
    title: "Startup",
    description: "Early-stage teams looking for capital, talent, and market access.",
  },
  {
    id: "business",
    eyebrow: "SCALE",
    title: "Established business",
    description: "Operating companies ready for suppliers, partners, or expansion.",
  },
  {
    id: "government",
    eyebrow: "PROCURE",
    title: "Government",
    description: "Public-sector teams sourcing verified businesses and solutions.",
  },
];

const industries = [
  "Technology & SaaS",
  "Financial Services",
  "Manufacturing",
  "Retail & Commerce",
  "Healthcare",
  "Agriculture",
  "Logistics",
  "Professional Services",
  "Construction & Real Estate",
  "Government & Public Services",
];

const goalOptions = [
  { id: "Investor", detail: "Equity capital and strategic guidance" },
  { id: "Funder", detail: "Grants, loans, and non-dilutive funding" },
  { id: "Co-owner", detail: "A committed partner to build with" },
  { id: "Supplier", detail: "Reliable products, materials, or services" },
  { id: "Distributor", detail: "New channels and market reach" },
  { id: "Technology partner", detail: "Technical capability and integrations" },
  { id: "Government contracts", detail: "Public procurement opportunities" },
  { id: "Business client", detail: "Qualified B2B customers" },
];

const plansByType: Record<
  OrganizationType,
  { name: string; price: string; description: string; features: string[] }[]
> = {
  startup: [
    {
      name: "Launch",
      price: "FREE",
      description: "Build your first high-intent network.",
      features: ["10 connections / month", "Basic AI matches", "Verified profile"],
    },
    {
      name: "Fundraise",
      price: "₱1,490 / MO",
      description: "Move faster with investor-ready tools.",
      features: ["Unlimited connections", "Advanced AI reasoning", "Investor visibility"],
    },
  ],
  business: [
    {
      name: "Growth",
      price: "₱2,990 / MO",
      description: "For teams opening new B2B channels.",
      features: ["3 team seats", "Unlimited connections", "Partner analytics"],
    },
    {
      name: "Scale",
      price: "₱5,490 / MO",
      description: "For multi-market partnership teams.",
      features: ["10 team seats", "Priority recommendations", "CRM exports"],
    },
  ],
  government: [
    {
      name: "Public Sector",
      price: "VERIFIED ACCESS",
      description: "A compliant workspace for public teams.",
      features: ["Verified supplier pool", "Procurement shortlists", "Audit-ready activity"],
    },
    {
      name: "Institution",
      price: "CUSTOM",
      description: "For departments and multi-agency programs.",
      features: ["Unlimited seats", "Custom compliance", "Dedicated onboarding"],
    },
  ],
};

// ─── Sub-components ────────────────────────────────────────────────────────────

function Tag({ label }: { label: string }) {
  return (
    <span
      className="text-xs font-medium px-2 py-0.5 rounded-sm border"
      style={{
        fontFamily: "var(--font-mono)",
        borderColor: "var(--color-border)",
        color: "var(--color-muted-strong)",
        background: "var(--color-surface)",
      }}
    >
      {label}
    </span>
  );
}

function NavButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="nav-button flex flex-col items-center gap-1 px-4 py-2 transition-all"
      style={{ color: active ? "var(--color-lime-dim)" : "var(--color-muted)" }}
    >
      <span className="text-xl">{icon}</span>
      <span
        className="text-xs font-medium"
        style={{ fontFamily: "var(--font-mono)", fontSize: 10 }}
      >
        {label}
      </span>
    </button>
  );
}

// ─── Business Card ─────────────────────────────────────────────────────────────

function BusinessCard({ b, style }: { b: Business; style?: React.CSSProperties }) {
  return (
    <div
      className="business-card rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        width: "100%",
        maxWidth: 380,
        ...style,
      }}
    >
      {/* Header strip */}
      <div
        className="flex items-center gap-4 p-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{
            width: 52,
            height: 52,
            background: b.accentColor + "22",
            color: b.accentColor,
            fontFamily: "var(--font-display)",
            border: `1px solid ${b.accentColor}44`,
          }}
        >
          {b.initials}
        </div>
        <div className="min-w-0">
          <div
            className="font-semibold text-lg leading-tight truncate"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            {b.name}
          </div>
          <div className="text-sm truncate" style={{ color: "var(--color-muted)" }}>
            {b.tagline}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-4 flex-1">
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted-strong)" }}>
          {b.description}
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "SIZE", value: b.size },
            { label: "FOUNDED", value: b.founded },
            { label: "REVENUE", value: b.revenue },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-3 flex flex-col gap-1"
              style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
            >
              <span
                className="text-xs"
                style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 9 }}
              >
                {s.label}
              </span>
              <span
                className="text-sm font-semibold leading-tight"
                style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className="flex flex-wrap gap-1.5">
          {b.principles.map((p) => (
            <Tag key={p} label={p} />
          ))}
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm" style={{ color: "var(--color-muted)" }}>
          <span>📍</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
            {b.location}
          </span>
          <span className="ml-auto text-xs" style={{ color: b.accentColor, fontFamily: "var(--font-mono)" }}>
            SEEKING: {b.seeking}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Investor Card ─────────────────────────────────────────────────────────────

function InvestorCard({ inv, style }: { inv: Investor; style?: React.CSSProperties }) {
  return (
    <div
      className="business-card rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        width: "100%",
        maxWidth: 380,
        ...style,
      }}
    >
      <div
        className="flex items-center gap-4 p-5"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div
          className="rounded-xl flex items-center justify-center text-lg font-bold flex-shrink-0"
          style={{
            width: 52,
            height: 52,
            background: inv.accentColor + "22",
            color: inv.accentColor,
            fontFamily: "var(--font-display)",
            border: `1px solid ${inv.accentColor}44`,
          }}
        >
          {inv.initials}
        </div>
        <div className="min-w-0">
          <div
            className="font-semibold text-lg leading-tight truncate"
            style={{ fontFamily: "var(--font-display)", color: "var(--color-text)" }}
          >
            {inv.name}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm" style={{ color: "var(--color-muted)" }}>{inv.type}</span>
            <span
              className="text-xs px-1.5 py-0.5 rounded"
              style={{
                background: "#c6ff0022",
                color: "#c6ff00",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
              }}
            >
              ★ {inv.creditRating}
            </span>
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4 flex-1">
        <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted-strong)" }}>
          {inv.description}
        </p>

        <div className="grid grid-cols-2 gap-2">
          {[
            { label: "TICKET SIZE", value: inv.ticketSize },
            { label: "STAGE", value: inv.stage },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-3 flex flex-col gap-1"
              style={{ background: "var(--color-surface-2)", border: "1px solid var(--color-border)" }}
            >
              <span
                className="text-xs"
                style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 9 }}
              >
                {s.label}
              </span>
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--color-text)", fontFamily: "var(--font-mono)" }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {inv.focus.map((f) => (
            <Tag key={f} label={f} />
          ))}
        </div>

        <div className="text-xs rounded-lg p-3" style={{ background: "var(--color-lime-wash)", border: "1px solid var(--color-lime-border)", color: "var(--color-lime-dim)", fontFamily: "var(--font-mono)" }}>
          ✓ REQUIREMENTS: {inv.requirements}
        </div>
      </div>
    </div>
  );
}

// ─── Discover View ─────────────────────────────────────────────────────────────

function DiscoverView({
  mode,
  onMatch,
}: {
  mode: Mode;
  onMatch: (name: string, accent: string) => void;
}) {
  const deck = mode === "b2b" ? businesses : investors;
  const [index, setIndex] = useState(0);
  const [swipeClass, setSwipeClass] = useState("");
  const [actionLabel, setActionLabel] = useState<null | "CONNECT" | "PASS">(null);

  const current = deck[index];
  const next = deck[index + 1];

  function swipe(dir: "left" | "right") {
    setSwipeClass(dir === "right" ? "swiping-right" : "swiping-left");
    setActionLabel(dir === "right" ? "CONNECT" : "PASS");
    setTimeout(() => {
      if (dir === "right") {
        onMatch(
          (current as Business).name || (current as unknown as Investor).name,
          (current as Business).accentColor || (current as unknown as Investor).accentColor
        );
      }
      setIndex((i) => Math.min(i + 1, deck.length - 1));
      setSwipeClass("");
      setActionLabel(null);
    }, 350);
  }

  const exhausted = index >= deck.length - 1 && swipeClass === "";

  return (
    <div className="flex flex-col items-center gap-6 px-4 pt-4 pb-2 w-full max-w-md mx-auto">
      {/* Card stack */}
      <div className="discover-deck relative w-full" style={{ height: 520 }}>
        {/* Ghost card behind */}
        {next && (
          <div
            className="absolute inset-0 flex justify-center"
            style={{ transform: "scale(0.95) translateY(12px)", zIndex: 0, opacity: 0.5 }}
          >
            {mode === "b2b" ? (
              <BusinessCard b={next as Business} />
            ) : (
              <InvestorCard inv={next as Investor} />
            )}
          </div>
        )}

        {/* Active card */}
        {!exhausted && (
          <div
            className={`absolute inset-0 flex justify-center card-swipe ${swipeClass}`}
            style={{ zIndex: 1 }}
          >
            {/* Swipe label overlay */}
            {actionLabel && (
              <div
                className="absolute top-6 left-1/2 -translate-x-1/2 z-10 text-2xl font-black px-4 py-1 rounded border-2"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: actionLabel === "CONNECT" ? "#c6ff00" : "#ff3b3b",
                  borderColor: actionLabel === "CONNECT" ? "#c6ff00" : "#ff3b3b",
                  background: "#080808cc",
                  letterSpacing: 3,
                }}
              >
                {actionLabel}
              </div>
            )}
            {mode === "b2b" ? (
              <BusinessCard b={current as Business} />
            ) : (
              <InvestorCard inv={current as Investor} />
            )}
          </div>
        )}

        {exhausted && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-2xl"
            style={{ border: "1px dashed var(--color-border)", background: "var(--color-surface)" }}
          >
            <div className="text-4xl">🔄</div>
            <div style={{ fontFamily: "var(--font-display)", color: "var(--color-muted)", fontSize: 20 }}>
              You've seen them all
            </div>
            <button
              onClick={() => setIndex(0)}
              className="mt-2 text-sm px-4 py-2 rounded-lg"
              style={{
                background: "#c6ff0015",
                color: "#c6ff00",
                border: "1px solid #c6ff0040",
                fontFamily: "var(--font-mono)",
              }}
            >
              RESTART DECK
            </button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {!exhausted && (
        <div className="flex items-center gap-6">
          <button
            onClick={() => swipe("left")}
            className="rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{
              width: 64,
              height: 64,
              background: "#ff3b3b18",
              border: "1px solid #ff3b3b44",
              color: "#ff3b3b",
              fontSize: 26,
            }}
          >
            ✕
          </button>
          <button
            onClick={() => swipe("right")}
            className="rounded-full flex items-center justify-center transition-all active:scale-95 ai-pulse"
            style={{
              width: 72,
              height: 72,
              background: "#c6ff0020",
              border: "2px solid #c6ff00",
              color: "#c6ff00",
              fontSize: 30,
            }}
          >
            ✓
          </button>
          <button
            className="rounded-full flex items-center justify-center transition-all active:scale-95"
            style={{
              width: 64,
              height: 64,
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              color: "var(--color-muted)",
              fontSize: 22,
            }}
          >
            ★
          </button>
        </div>
      )}

      <div
        className="text-center text-xs"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
      >
        {index + 1} / {deck.length} — {mode === "b2b" ? "BUSINESSES" : "INVESTORS"}
      </div>
    </div>
  );
}

// ─── Matches View ──────────────────────────────────────────────────────────────

function MatchesView({ matches }: { matches: { name: string; accent: string; time: string }[] }) {
  const [active, setActive] = useState<null | number>(null);

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-full px-8 text-center">
        <div className="text-5xl">🤝</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--color-muted)" }}>
          No connections yet
        </div>
        <div className="text-sm" style={{ color: "var(--color-muted)" }}>
          Swipe right on businesses or investors you want to connect with.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-4 py-4">
      <div
        className="text-xs mb-2 px-1"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
      >
        {matches.length} CONNECTION{matches.length > 1 ? "S" : ""}
      </div>
      {matches.map((m, i) => (
        <button
          key={i}
          onClick={() => setActive(active === i ? null : i)}
          className="w-full rounded-xl p-4 flex items-center gap-4 text-left transition-all"
          style={{
            background: active === i ? "var(--color-surface-2)" : "var(--color-surface)",
            border: `1px solid ${active === i ? m.accent + "55" : "var(--color-border)"}`,
          }}
        >
          <div
            className="rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0"
            style={{
              width: 44,
              height: 44,
              background: m.accent + "20",
              color: m.accent,
              border: `1px solid ${m.accent}44`,
              fontFamily: "var(--font-display)",
            }}
          >
            {m.name.slice(0, 2).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate" style={{ color: "var(--color-text)" }}>
              {m.name}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
              Matched {m.time}
            </div>
          </div>
          <div
            className="text-xs px-2 py-1 rounded-full flex-shrink-0"
            style={{ background: m.accent + "18", color: m.accent, fontFamily: "var(--font-mono)" }}
          >
            MESSAGE
          </div>
        </button>
      ))}

      {active !== null && (
        <div
          className="rounded-xl p-4 mt-2 slide-up"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <div className="text-sm mb-3" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}>
            START A CONVERSATION
          </div>
          <textarea
            placeholder="Introduce your company and why you'd like to connect…"
            rows={3}
            className="w-full rounded-lg p-3 text-sm resize-none outline-none"
            style={{
              background: "var(--color-surface-2)",
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              fontFamily: "var(--font-sans)",
            }}
          />
          <button
            className="mt-3 w-full py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95"
            style={{
              background: "#c6ff00",
              color: "#080808",
              fontFamily: "var(--font-mono)",
              letterSpacing: 1,
            }}
          >
            SEND INTRO →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── AI Picks View ─────────────────────────────────────────────────────────────

function AIPicksView({ onMatch }: { onMatch: (name: string, accent: string) => void }) {
  const [expanded, setExpanded] = useState<number | null>(0);
  const [connected, setConnected] = useState<Set<number>>(new Set());

  function connect(id: number, name: string, accent: string) {
    setConnected((s) => new Set(s).add(id));
    onMatch(name, accent);
  }

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      {/* Header */}
      <div
        className="rounded-xl p-4 flex items-start gap-3"
        style={{ background: "var(--color-lime-wash)", border: "1px solid var(--color-lime-border)" }}
      >
        <div
          className="rounded-lg flex items-center justify-center text-xl flex-shrink-0 ai-pulse"
          style={{
            width: 44,
            height: 44,
            background: "#c6ff0018",
            border: "1px solid #c6ff0044",
          }}
        >
          ⚡
        </div>
        <div>
          <div
            className="font-semibold mb-1"
            style={{ fontFamily: "var(--font-display)", color: "#c6ff00", fontSize: 15 }}
          >
            AI Match Engine
          </div>
          <div className="text-sm" style={{ color: "var(--color-lime-dim)" }}>
            Analyzes shared principles, market overlap, and complementary capabilities to surface high-probability partnerships.
          </div>
        </div>
      </div>

      <div
        className="text-xs px-1"
        style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)" }}
      >
        TOP RECOMMENDATIONS FOR YOUR PROFILE
      </div>

      {aiRecommendations.map((b, i) => {
        const isConnected = connected.has(b.id);
        const isOpen = expanded === i;

        return (
          <div
            key={b.id}
            className="rounded-xl overflow-hidden transition-all"
            style={{ border: `1px solid ${isOpen ? b.accentColor + "44" : "var(--color-border)"}`, background: "var(--color-surface)" }}
          >
            <button
              onClick={() => setExpanded(isOpen ? null : i)}
              className="w-full p-4 flex items-center gap-3 text-left"
            >
              {/* Score badge */}
              <div
                className="rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 flex-col"
                style={{
                  width: 48,
                  height: 48,
                  background: b.accentColor + "18",
                  border: `1px solid ${b.accentColor}44`,
                }}
              >
                <span style={{ color: b.accentColor, fontFamily: "var(--font-mono)", fontSize: 14, lineHeight: 1 }}>
                  {b.aiScore}
                </span>
                <span style={{ color: b.accentColor + "80", fontFamily: "var(--font-mono)", fontSize: 8 }}>
                  MATCH
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate" style={{ fontFamily: "var(--font-display)", color: "var(--color-text)", fontSize: 15 }}>
                  {b.name}
                </div>
                <div className="text-xs mt-0.5 truncate" style={{ color: "var(--color-muted)" }}>
                  {b.industry} · {b.location}
                </div>
              </div>
              <span style={{ color: "var(--color-muted)", fontSize: 12 }}>{isOpen ? "▲" : "▼"}</span>
            </button>

            {isOpen && (
              <div className="px-4 pb-4 flex flex-col gap-3 slide-up">
                <div
                  className="rounded-lg p-3 text-sm"
                  style={{ background: "var(--color-lime-wash)", border: "1px solid var(--color-lime-border)", color: "var(--color-lime-dim)", lineHeight: 1.6 }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#c6ff00", display: "block", marginBottom: 4 }}>
                    ⚡ WHY THIS MATCH
                  </span>
                  {b.aiReason}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {b.principles.map((p) => <Tag key={p} label={p} />)}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => connect(b.id, b.name, b.accentColor)}
                    disabled={isConnected}
                    className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:opacity-60"
                    style={{
                      background: isConnected ? "#1a2a1a" : "#c6ff00",
                      color: isConnected ? "#c6ff00" : "#080808",
                      fontFamily: "var(--font-mono)",
                      letterSpacing: 1,
                    }}
                  >
                    {isConnected ? "✓ CONNECTED" : "CONNECT →"}
                  </button>
                  <button
                    className="px-4 py-2.5 rounded-lg text-sm transition-all"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-muted)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    SKIP
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Profile View ──────────────────────────────────────────────────────────────

function ProfileView({
  profile,
  onEditOnboarding,
}: {
  profile: OnboardingProfile;
  onEditOnboarding: () => void;
}) {
  const myBusiness: Business = {
    id: 0,
    name: profile.organizationName,
    tagline: `${profile.role} · ${organizationTypes.find((item) => item.id === profile.organizationType)?.title}`,
    industry: profile.industry,
    size: "11–50",
    location: "Philippines",
    founded: "2023",
    revenue: "Verified",
    principles: profile.goals.slice(0, 3),
    description: `${profile.organizationName} is using LinkBiz to connect with ${profile.goals.join(", ").toLowerCase()}.`,
    accentColor: "#c6ff00",
    initials: profile.organizationName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    seeking: profile.goals.slice(0, 2).join(" + "),
  };

  return (
    <div className="flex flex-col gap-4 px-4 py-4">
      <div className="flex items-center justify-between mb-2">
        <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--color-text)" }}>
          Your Profile
        </div>
        <button
          onClick={onEditOnboarding}
          className="text-sm px-3 py-1.5 rounded-lg"
          style={{
            border: "1px solid var(--color-border)",
            color: "var(--color-muted-strong)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
          }}
        >
          EDIT
        </button>
      </div>

      <BusinessCard b={myBusiness} />

      <div className="profile-owner">
        {profile.photo ? (
          <img className="profile-owner__photo" src={profile.photo} alt={profile.fullName} />
        ) : (
          <div className="profile-owner__fallback">
            {profile.fullName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
        <div className="profile-owner__copy">
          <span className="profile-owner__label">PROFILE OWNER</span>
          <strong>{profile.fullName}</strong>
          <span>{profile.role}</span>
        </div>
        <div className="profile-owner__verified">VERIFIED</div>
      </div>

      {/* Settings blocks */}
      {[
        { label: "ACCOUNT TYPE", value: organizationTypes.find((item) => item.id === profile.organizationType)?.title, icon: "01" },
        { label: "LOOKING FOR", value: profile.goals.join(" · "), icon: "02" },
        { label: "SUBSCRIPTION", value: profile.plan, icon: "03" },
        { label: "INDUSTRY", value: profile.industry, icon: "04" },
      ].map((row) => (
        <div
          key={row.label}
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
        >
          <span className="profile-setting-index">{row.icon}</span>
          <div className="flex-1">
            <div className="text-xs mb-0.5" style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", fontSize: 9 }}>
              {row.label}
            </div>
            <div className="text-sm" style={{ color: "var(--color-text)" }}>{row.value}</div>
          </div>
          <span style={{ color: "var(--color-muted)" }}>›</span>
        </div>
      ))}

      <button
        className="mt-2 w-full py-3 rounded-xl text-sm"
        style={{
          border: "1px solid var(--color-border)",
          color: "var(--color-muted)",
          fontFamily: "var(--font-mono)",
          letterSpacing: 1,
        }}
      >
        SIGN OUT
      </button>
    </div>
  );
}

// ─── Match Toast ───────────────────────────────────────────────────────────────

function MatchToast({
  name,
  accent,
  onClose,
}: {
  name: string;
  accent: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      style={{ background: "rgba(36, 35, 31, 0.48)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="rounded-2xl p-8 flex flex-col items-center gap-4 text-center match-pop"
        style={{
          background: "var(--color-surface)",
          border: `1px solid ${accent}55`,
          maxWidth: 320,
          width: "100%",
        }}
      >
        <div
          className="rounded-full flex items-center justify-center text-3xl"
          style={{
            width: 80,
            height: 80,
            background: accent + "20",
            border: `2px solid ${accent}`,
          }}
        >
          🤝
        </div>
        <div>
          <div
            className="text-3xl font-black mb-1"
            style={{ fontFamily: "var(--font-display)", color: accent }}
          >
            It's a Match!
          </div>
          <div className="text-sm" style={{ color: "var(--color-muted-strong)" }}>
            You connected with{" "}
            <span className="font-semibold" style={{ color: "var(--color-text)" }}>
              {name}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-sm"
            style={{
              background: accent,
              color: "#080808",
              fontFamily: "var(--font-mono)",
              letterSpacing: 1,
            }}
          >
            SEND INTRO →
          </button>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl text-sm"
            style={{
              color: "var(--color-muted)",
              fontFamily: "var(--font-mono)",
            }}
          >
            KEEP SWIPING
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Onboarding ────────────────────────────────────────────────────────────────

function Onboarding({
  initialProfile,
  onComplete,
}: {
  initialProfile?: OnboardingProfile;
  onComplete: (profile: OnboardingProfile) => void;
}) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<OnboardingProfile>(
    initialProfile ?? {
      organizationType: "startup",
      industry: "",
      fullName: "",
      organizationName: "",
      role: "",
      photo: "",
      goals: [],
      plan: "",
    },
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const plans = plansByType[profile.organizationType];

  const canContinue =
    step === 0 ||
    (step === 1 && Boolean(profile.industry)) ||
    (step === 2 &&
      Boolean(profile.fullName.trim()) &&
      Boolean(profile.organizationName.trim()) &&
      Boolean(profile.role.trim())) ||
    (step === 3 && profile.goals.length > 0) ||
    (step === 4 && Boolean(profile.plan));

  function chooseOrganizationType(organizationType: OrganizationType) {
    setProfile((current) => ({ ...current, organizationType, plan: "" }));
  }

  function toggleGoal(goal: string) {
    setProfile((current) => ({
      ...current,
      goals: current.goals.includes(goal)
        ? current.goals.filter((item) => item !== goal)
        : [...current.goals, goal],
    }));
  }

  function handlePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setProfile((current) => ({ ...current, photo: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  function continueFlow() {
    if (!canContinue) return;
    if (step < 4) {
      setStep((current) => current + 1);
      return;
    }
    onComplete(profile);
  }

  function skipIdentity() {
    setProfile((current) => ({
      ...current,
      fullName: current.fullName.trim() || "LinkBiz Member",
      organizationName:
        current.organizationName.trim() ||
        (current.organizationType === "startup" ? "Stealth Startup" : "Organization profile"),
      role:
        current.role.trim() ||
        (current.organizationType === "startup" ? "Founder" : "Representative"),
    }));
    setStep(3);
  }

  const stepMeta = [
    ["YOUR ORGANIZATION", "What are you building?", "Choose the profile that best describes your organization today."],
    ["BUSINESS CATEGORY", "Where do you operate?", "This helps the matching engine understand your market and recommend relevant partners."],
    ["PROFESSIONAL PROFILE", "Put a name to the business.", "Verified identities build trust. Add the person who will represent this organization."],
    ["MATCH INTENT", "What do you need next?", "Select every outcome that matters. You can change these priorities at any time."],
    ["YOUR LINKBIZ PLAN", "Choose your access level.", `Plans tailored for ${profile.organizationType === "government" ? "public-sector teams" : profile.organizationType === "business" ? "established businesses" : "startups"}.`],
  ];

  return (
    <div className="onboarding-shell">
      <div className="onboarding-grid" aria-hidden="true" />
      <header className="onboarding-header">
        <div className="onboarding-brand">
          Link<span>B</span>iz
        </div>
        <div className="onboarding-progress-copy">
          <span>PROFILE SETUP</span>
          <strong>{String(step + 1).padStart(2, "0")} / 05</strong>
        </div>
      </header>

      <main className="onboarding-main">
        <div className="onboarding-progress" aria-label={`Step ${step + 1} of 5`}>
          {[0, 1, 2, 3, 4].map((item) => (
            <div key={item} className={item <= step ? "is-active" : ""} />
          ))}
        </div>

        <section className="onboarding-stage" key={step}>
          <div className="onboarding-intro">
            <span className="onboarding-eyebrow">{stepMeta[step][0]}</span>
            <h1>{stepMeta[step][1]}</h1>
            <p>{stepMeta[step][2]}</p>
          </div>

          {step === 0 && (
            <div className="selection-grid selection-grid--three">
              {organizationTypes.map((item, index) => {
                const selected = profile.organizationType === item.id;
                return (
                  <button
                    key={item.id}
                    className={`choice-card ${selected ? "is-selected" : ""}`}
                    onClick={() => chooseOrganizationType(item.id)}
                    type="button"
                  >
                    <span className="choice-card__number">0{index + 1}</span>
                    <span className="choice-card__eyebrow">{item.eyebrow}</span>
                    <strong>{item.title}</strong>
                    <span className="choice-card__description">{item.description}</span>
                    <span className="choice-card__check">{selected ? "SELECTED" : "SELECT"}</span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 1 && (
            <div className="industry-grid">
              {industries.map((industry, index) => (
                <button
                  key={industry}
                  type="button"
                  className={profile.industry === industry ? "is-selected" : ""}
                  onClick={() => setProfile((current) => ({ ...current, industry }))}
                >
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{industry}</strong>
                  <i>{profile.industry === industry ? "SELECTED" : "+"}</i>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="identity-layout">
              <div className="photo-uploader">
                <button type="button" onClick={() => fileInput.current?.click()}>
                  {profile.photo ? (
                    <img src={profile.photo} alt="Professional profile preview" />
                  ) : (
                    <span className="photo-uploader__empty">
                      <b>+</b>
                      <strong>ADD PHOTO</strong>
                      <small>JPG OR PNG · MAX 5MB</small>
                    </span>
                  )}
                </button>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handlePhoto}
                  tabIndex={-1}
                />
                <p>A clear, professional headshot helps partners know who they are meeting.</p>
              </div>
              <div className="form-stack">
                <label>
                  <span>FULL NAME</span>
                  <input
                    value={profile.fullName}
                    onChange={(event) =>
                      setProfile((current) => ({ ...current, fullName: event.target.value }))
                    }
                    placeholder="e.g. Alex Rivera"
                  />
                </label>
                <label>
                  <span>ORGANIZATION NAME</span>
                  <input
                    value={profile.organizationName}
                    onChange={(event) =>
                      setProfile((current) => ({
                        ...current,
                        organizationName: event.target.value,
                      }))
                    }
                    placeholder="e.g. Northstar Labs"
                  />
                </label>
                <label>
                  <span>YOUR ROLE</span>
                  <input
                    value={profile.role}
                    onChange={(event) =>
                      setProfile((current) => ({ ...current, role: event.target.value }))
                    }
                    placeholder="e.g. Founder & CEO"
                  />
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <>
              <div className="goal-grid">
                {goalOptions.map((goal, index) => {
                  const selected = profile.goals.includes(goal.id);
                  return (
                    <button
                      type="button"
                      key={goal.id}
                      className={selected ? "is-selected" : ""}
                      onClick={() => toggleGoal(goal.id)}
                    >
                      <span className="goal-grid__index">{String(index + 1).padStart(2, "0")}</span>
                      <span className="goal-grid__copy">
                        <strong>{goal.id}</strong>
                        <small>{goal.detail}</small>
                      </span>
                      <span className="goal-grid__toggle">{selected ? "✓" : "+"}</span>
                    </button>
                  );
                })}
              </div>
              <div className="selection-count">
                <strong>{String(profile.goals.length).padStart(2, "0")}</strong>
                <span>PRIORITIES SELECTED</span>
              </div>
            </>
          )}

          {step === 4 && (
            <div className="plan-grid">
              {plans.map((plan, index) => {
                const selected = profile.plan === plan.name;
                return (
                  <button
                    type="button"
                    key={plan.name}
                    className={`plan-card ${selected ? "is-selected" : ""}`}
                    onClick={() =>
                      setProfile((current) => ({ ...current, plan: plan.name }))
                    }
                  >
                    {index === 1 && <span className="plan-card__recommended">RECOMMENDED</span>}
                    <span className="plan-card__type">
                      {profile.organizationType.toUpperCase()} PLAN
                    </span>
                    <strong className="plan-card__name">{plan.name}</strong>
                    <span className="plan-card__price">{plan.price}</span>
                    <p>{plan.description}</p>
                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>— {feature}</li>
                      ))}
                    </ul>
                    <span className="plan-card__action">
                      {selected ? "PLAN SELECTED" : "CHOOSE PLAN"}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <footer className="onboarding-actions">
          <button
            type="button"
            className="onboarding-back"
            disabled={step === 0}
            onClick={() => setStep((current) => Math.max(0, current - 1))}
          >
            ← BACK
          </button>
          <div className="onboarding-actions__forward">
            {step === 2 && (
              <button
                type="button"
                className="onboarding-skip"
                onClick={skipIdentity}
              >
                SKIP FOR NOW
              </button>
            )}
            <button
              type="button"
              className="onboarding-continue"
              disabled={!canContinue}
              onClick={continueFlow}
            >
              {step === 4 ? "ENTER LINKBIZ" : "CONTINUE"} <span>→</span>
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("discover");
  const [mode, setMode] = useState<Mode>("b2b");
  const [matches, setMatches] = useState<{ name: string; accent: string; time: string }[]>([]);
  const [toast, setToast] = useState<{ name: string; accent: string } | null>(null);
  const [profile, setProfile] = useState<OnboardingProfile | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);

  function handleMatch(name: string, accent: string) {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMatches((m) => [{ name, accent, time: `today at ${time}` }, ...m]);
    setToast({ name, accent });
  }

  function completeOnboarding(nextProfile: OnboardingProfile) {
    setProfile(nextProfile);
    setMode(
      nextProfile.goals.some((goal) => goal === "Investor" || goal === "Funder")
        ? "b2i"
        : "b2b",
    );
    setEditingProfile(false);
    setView("discover");
  }

  if (!profile || editingProfile) {
    return (
      <Onboarding
        initialProfile={profile ?? undefined}
        onComplete={completeOnboarding}
      />
    );
  }

  return (
    <div
      className="app-shell flex flex-col h-full max-w-lg mx-auto relative"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Header */}
      <div
        className="app-header flex items-center justify-between px-5 pt-5 pb-3 flex-shrink-0"
        style={{ borderBottom: "1px solid var(--color-border)" }}
      >
        <div className="app-brand-lockup">
          <div
            className="app-logo font-black tracking-tight"
            style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--color-text)", fontStyle: "italic" }}
          >
            Link<span style={{ color: "#c6ff00" }}>B</span>iz
          </div>
          <div
            className="app-brand-subtitle text-xs"
            style={{ color: "var(--color-muted)", fontFamily: "var(--font-mono)", letterSpacing: 1 }}
          >
            BUSINESS MATCHMAKING
          </div>
        </div>

        {/* Mode toggle — only in discover */}
        {view === "discover" && (
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)" }}
          >
            {(["b2b", "b2i"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-3 py-1.5 text-xs font-medium transition-all"
                style={{
                  fontFamily: "var(--font-mono)",
                  background: mode === m ? "#c6ff00" : "transparent",
                  color: mode === m ? "var(--color-ink)" : "var(--color-muted)",
                  letterSpacing: 0.5,
                }}
              >
                {m === "b2b" ? "B2B" : "INVEST"}
              </button>
            ))}
          </div>
        )}

        {/* Match count badge */}
        {matches.length > 0 && view !== "matches" && (
          <button
            onClick={() => setView("matches")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
            style={{
              background: "#c6ff0015",
              border: "1px solid #c6ff0030",
              color: "#c6ff00",
              fontFamily: "var(--font-mono)",
            }}
          >
            🤝 {matches.length}
          </button>
        )}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        {view === "discover" && (
          <DiscoverView mode={mode} onMatch={handleMatch} />
        )}
        {view === "matches" && <MatchesView matches={matches} />}
        {view === "ai" && <AIPicksView onMatch={handleMatch} />}
        {view === "profile" && (
          <ProfileView
            profile={profile}
            onEditOnboarding={() => setEditingProfile(true)}
          />
        )}
      </div>

      {/* Bottom nav */}
      <div
        className="app-bottom-nav flex justify-around items-center py-2 flex-shrink-0"
        style={{ borderTop: "1px solid var(--color-border)", background: "var(--color-surface)" }}
      >
        <NavButton
          icon="⚡"
          label="DISCOVER"
          active={view === "discover"}
          onClick={() => setView("discover")}
        />
        <NavButton
          icon="🤝"
          label={`MATCHES${matches.length > 0 ? ` (${matches.length})` : ""}`}
          active={view === "matches"}
          onClick={() => setView("matches")}
        />
        <NavButton
          icon="🧠"
          label="AI PICKS"
          active={view === "ai"}
          onClick={() => setView("ai")}
        />
        <NavButton
          icon="👤"
          label="PROFILE"
          active={view === "profile"}
          onClick={() => setView("profile")}
        />
      </div>

      {/* Match toast */}
      {toast && (
        <MatchToast
          name={toast.name}
          accent={toast.accent}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
