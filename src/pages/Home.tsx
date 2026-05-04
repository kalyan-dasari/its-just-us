import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Clock3,
  Heart,
  LogOut,
  Mail,
  MessageCircle,
  Plus,
  Quote,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useMemories, type Memory } from "../hooks/useMemories";
import { MemoryCard } from "../components/MemoryCard";
import { MemoryForm } from "../components/MemoryForm";

type SectionKey = "hub" | "memories" | "chats" | "quotes" | "timeline" | "letters" | "random";

type ChatEntry = {
  id: string;
  side: "Him" | "Her";
  time: string;
  text: string;
};

type QuoteEntry = {
  id: string;
  quote: string;
  author: string;
  category: string;
};

type TimelineEntry = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
};

type LetterEntry = {
  id: string;
  title: string;
  openWhen: string;
  content: string;
};

const sectionCards = [
  {
    key: "memories" as SectionKey,
    title: "Our Memories",
    icon: Heart,
    accent: "#ff2d8f",
    gradient: "linear-gradient(135deg, rgba(117, 24, 38, 0.95), rgba(107, 14, 61, 0.88))",
    border: "#ff2d8f",
    text: "Memories we keep forever",
  },
  {
    key: "chats" as SectionKey,
    title: "Our Chats",
    icon: MessageCircle,
    accent: "#7c4dff",
    gradient: "linear-gradient(135deg, rgba(46, 51, 122, 0.95), rgba(61, 39, 131, 0.88))",
    border: "#7c4dff",
    text: "Little talks, every day",
  },
  {
    key: "quotes" as SectionKey,
    title: "Our Quotes",
    icon: Quote,
    accent: "#19c7ff",
    gradient: "linear-gradient(135deg, rgba(0, 73, 112, 0.95), rgba(8, 89, 117, 0.88))",
    border: "#19c7ff",
    text: "Words that stay with us",
  },
  {
    key: "timeline" as SectionKey,
    title: "Timeline",
    icon: Clock3,
    accent: "#b04dff",
    gradient: "linear-gradient(135deg, rgba(74, 31, 121, 0.95), rgba(58, 26, 107, 0.88))",
    border: "#b04dff",
    text: "How it all unfolded",
  },
  {
    key: "letters" as SectionKey,
    title: "Future Letters",
    icon: Mail,
    accent: "#ff4cd5",
    gradient: "linear-gradient(135deg, rgba(97, 17, 81, 0.95), rgba(125, 21, 82, 0.88))",
    border: "#ff4cd5",
    text: "Messages for later",
  },
  {
    key: "random" as SectionKey,
    title: "Random Memory",
    icon: Sparkles,
    accent: "#ffb300",
    gradient: "linear-gradient(135deg, rgba(126, 70, 0, 0.95), rgba(159, 85, 0, 0.88))",
    border: "#ffb300",
    text: "A memory chosen for you",
  },
] as const;

const meetingDate = new Date("2025-11-26T00:00:00");
const dayCount = Math.max(1, Math.floor((Date.now() - meetingDate.getTime()) / 86400000));

const hubQuotes = [
  "Not every important person comes early. Some arrive late and still become home.",
  "We met in a chapter I never expected, yet you became one of the most important lines in my story.",
  "Some people are not dreams you chase; they are dreams life quietly gifts you. My sapna found me in you.",
];

const inputStyle = {
  width: "100%",
  borderRadius: "1rem",
  border: "1px solid rgba(123, 31, 162, 0.5)",
  background: "rgba(35, 7, 59, 0.72)",
  color: "#ffffff",
  padding: "0.9rem 1rem",
  fontSize: "1rem",
  outline: "none",
} as const;

export const Home = () => {
  const { memories, loading, error, addMemory, deleteMemory } = useMemories();
  const { handleLogout } = useAuth();
  const [activeSection, setActiveSection] = useState<SectionKey>("hub");
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [showChatForm, setShowChatForm] = useState(false);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
  const [showTimelineForm, setShowTimelineForm] = useState(false);
  const [showLetterForm, setShowLetterForm] = useState(false);
  const [chatSide, setChatSide] = useState<"Him" | "Her">("Him");
  const [chatMessage, setChatMessage] = useState("");
  const [quoteText, setQuoteText] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [quoteCategory, setQuoteCategory] = useState("Personal");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0]);
  const [eventType, setEventType] = useState("Milestone");
  const [letterTitle, setLetterTitle] = useState("");
  const [letterOpenWhen, setLetterOpenWhen] = useState("Open when you miss me");
  const [letterContent, setLetterContent] = useState("");
  const [randomMemoryId, setRandomMemoryId] = useState<string | null>(null);

  const [chatEntries, setChatEntries] = useState<ChatEntry[]>([
    { id: "chat-1", side: "Him", time: "11:11", text: "Him" },
    { id: "chat-2", side: "Her", time: "11:11", text: "Her" },
  ]);
  const [quotes, setQuotes] = useState<QuoteEntry[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [letters, setLetters] = useState<LetterEntry[]>([]);

  const username = localStorage.getItem("username") || "sapna";

  const currentMemory = useMemo(() => {
    if (!randomMemoryId) {
      return memories[0] ?? null;
    }

    return memories.find((memory) => memory.id === randomMemoryId) ?? memories[0] ?? null;
  }, [memories, randomMemoryId]);

  const handleAddMemory = async (memoryData: Omit<Memory, "id" | "createdAt" | "updatedAt">) => {
    await addMemory(memoryData);
    setShowMemoryForm(false);
  };

  const handleDeleteMemory = async (id: string) => {
    if (confirm("Are you sure you want to delete this memory?")) {
      await deleteMemory(id);
    }
  };

  const handleRandomMemory = () => {
    if (!memories.length) {
      return;
    }

    const index = Math.floor(Math.random() * memories.length);
    setRandomMemoryId(memories[index].id);
  };

  const topShellStyle = {
    minHeight: "100vh",
    position: "relative" as const,
    overflowX: "hidden" as const,
    background: "radial-gradient(circle at top, rgba(92, 18, 160, 0.35), transparent 30%), linear-gradient(180deg, #040008 0%, #160320 34%, #1a0031 100%)",
  };

  const glowStyle = (top: string, left: string, size: string, color: string) => ({
    position: "absolute" as const,
    top,
    left,
    width: size,
    height: size,
    borderRadius: "999px",
    background: color,
    filter: "blur(100px)",
    opacity: 0.38,
    pointerEvents: "none" as const,
  });

  const pageFrameStyle = {
    maxWidth: "1240px",
    margin: "0 auto",
    padding: "28px 20px 48px",
    position: "relative" as const,
    zIndex: 1,
  };

  const sectionPanelStyle = {
    background: "rgba(36, 8, 64, 0.88)",
    border: "1px solid rgba(139, 56, 191, 0.34)",
    borderRadius: "24px",
    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.3)",
    backdropFilter: "blur(16px)",
  } as const;

  const sectionHeaderStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "26px",
  } as const;

  const renderHub = () => (
    <div style={{ ...pageFrameStyle, paddingTop: "20px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "12px" }}>
        <button
          onClick={handleLogout}
          style={{
            border: "none",
            background: "transparent",
            color: "#caa0ea",
            cursor: "pointer",
            fontSize: "0.95rem",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ textAlign: "center", padding: "26px 0 34px" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(3rem, 5vw, 4.75rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            color: "#f6c2ef",
          }}
        >
          Kal Ka Sapna
        </h1>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
            minWidth: "280px",
            padding: "18px 28px",
            borderRadius: "18px",
            background: "linear-gradient(90deg, rgba(91, 24, 145, 0.94), rgba(174, 48, 122, 0.88))",
            boxShadow: "0 18px 40px rgba(140, 38, 164, 0.28)",
            color: "#f5c8f5",
            fontWeight: 700,
            fontSize: "1.8rem",
          }}
        >
          {dayCount} Days of Memories
        </div>

        <div style={{ maxWidth: "920px", margin: "34px auto 0", color: "#bca0d8" }}>
          {hubQuotes.map((quote, index) => (
            <p
              key={quote}
              style={{
                margin: index === 0 ? "0 0 28px" : "0 0 28px",
                fontSize: index === 1 ? "1.08rem" : "1rem",
                lineHeight: 1.7,
                fontStyle: index === 2 ? "italic" : "normal",
                opacity: index === 0 ? 0.96 : 0.82,
              }}
            >
              {index === 0 ? `"${quote}"` : index === 2 ? `"${quote}"` : `"${quote}"`}
            </p>
          ))}
        </div>

        <div
          style={{
            marginTop: "42px",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "22px",
          }}
        >
          {sectionCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                key={card.key}
                onClick={() => setActiveSection(card.key)}
                style={{
                  border: `2px solid ${card.border}`,
                  borderRadius: "22px",
                  minHeight: "164px",
                  background: card.gradient,
                  boxShadow: "0 10px 26px rgba(0,0,0,0.22)",
                  color: "white",
                  cursor: "pointer",
                  padding: "24px 18px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "18px",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 18px 32px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 26px rgba(0,0,0,0.22)";
                }}
              >
                <Icon size={48} strokeWidth={2.2} />
                <div style={{ fontSize: "1.18rem", fontWeight: 700 }}>{card.title}</div>
              </button>
            );
          })}
        </div>

        <p style={{ marginTop: "58px", color: "#9f87c7", fontStyle: "italic" }}>
          This website may be small, but it carries pieces of us that time shouldn&apos;t erase.
        </p>
      </div>
    </div>
  );

  const sectionTitle = sectionCards.find((card) => card.key === activeSection)?.title ?? "";
  const sectionAccent = sectionCards.find((card) => card.key === activeSection)?.accent ?? "#f6c2ef";

  const renderSection = () => {
    if (activeSection === "memories") {
      return (
        <div style={pageFrameStyle}>
          <div style={sectionHeaderStyle}>
            <button
              onClick={() => setActiveSection("hub")}
              style={{
                border: "none",
                background: "transparent",
                color: "#cdb0eb",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h2 style={{ margin: 0, color: "#f5c2ee", fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800 }}>
              Our Memories
            </h2>

            <button
              onClick={() => setShowMemoryForm((value) => !value)}
              style={{
                border: "none",
                background: "linear-gradient(90deg, #ff3ba5, #b54cff)",
                color: "white",
                borderRadius: "999px",
                padding: "14px 20px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontWeight: 700,
              }}
            >
              <Plus size={18} />
              Add Memory
            </button>
          </div>

          {showMemoryForm && (
            <div style={{ marginBottom: "22px" }}>
              <MemoryForm onSubmit={handleAddMemory} onCancel={() => setShowMemoryForm(false)} />
            </div>
          )}

          {error && (
            <div
              style={{
                marginBottom: "18px",
                padding: "14px 16px",
                borderRadius: "14px",
                background: "rgba(239, 68, 68, 0.16)",
                border: "1px solid rgba(239, 68, 68, 0.42)",
                color: "#ffc0c0",
              }}
            >
              {error}
            </div>
          )}

          {loading ? (
            <div style={{ padding: "60px 0", textAlign: "center", color: "#dcc7f0" }}>Loading memories...</div>
          ) : memories.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                gap: "22px",
              }}
            >
              {memories.map((memory) => (
                <div key={memory.id} style={{ position: "relative" }}>
                  <MemoryCard memory={memory} />
                  <button
                    onClick={() => handleDeleteMemory(memory.id)}
                    style={{
                      position: "absolute",
                      top: "14px",
                      right: "14px",
                      border: "none",
                      borderRadius: "12px",
                      width: "38px",
                      height: "38px",
                      display: "grid",
                      placeItems: "center",
                      cursor: "pointer",
                      color: "white",
                      background: "rgba(239, 68, 68, 0.9)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
                    }}
                    title="Delete memory"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                ...sectionPanelStyle,
                padding: "42px",
                textAlign: "center",
                color: "#dcc7f0",
              }}
            >
              <Heart size={54} color="#ff3ba5" style={{ marginBottom: "14px" }} />
              <div style={{ fontSize: "1.15rem", fontWeight: 600 }}>No memories yet. Create your first one!</div>
            </div>
          )}
        </div>
      );
    }

    if (activeSection === "chats") {
      return (
        <div style={pageFrameStyle}>
          <div style={sectionHeaderStyle}>
            <button onClick={() => setActiveSection("hub")} style={{ border: "none", background: "transparent", color: "#cdb0eb", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600 }}>
              <ArrowLeft size={18} /> Back
            </button>
            <h2 style={{ margin: 0, color: sectionAccent, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800 }}>Our Chats</h2>
            <button onClick={() => setShowChatForm((value) => !value)} style={{ border: "none", background: "linear-gradient(90deg, #7c4dff, #8b5cf6)", color: "white", borderRadius: "999px", padding: "14px 20px", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 700 }}>
              <Plus size={18} /> Add Chat
            </button>
          </div>

          {showChatForm && (
            <div style={{ ...sectionPanelStyle, padding: "20px", marginBottom: "20px" }}>
              <div style={{ display: "grid", gap: "18px" }}>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Who said this?</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {(["Him", "Her"] as const).map((side) => (
                      <button
                        key={side}
                        type="button"
                        onClick={() => setChatSide(side)}
                        style={{
                          border: "1px solid rgba(123, 31, 162, 0.55)",
                          background: chatSide === side ? "linear-gradient(90deg, rgba(51, 90, 173, 0.95), rgba(43, 63, 147, 0.95))" : "rgba(35, 7, 59, 0.75)",
                          color: chatSide === side ? "#cce0ff" : "#a992c7",
                          borderRadius: "16px",
                          padding: "15px",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        {side}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Message</div>
                  <textarea value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="What was said?" rows={4} style={{ ...inputStyle, resize: "none", minHeight: "120px" }} />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!chatMessage.trim()) return;
                    setChatEntries((items) => [
                      ...items,
                      { id: crypto.randomUUID(), side: chatSide, time: "11:11", text: chatMessage.trim() },
                    ]);
                    setChatMessage("");
                    setShowChatForm(false);
                  }}
                  style={{ border: "none", borderRadius: "16px", padding: "16px", fontSize: "1rem", fontWeight: 700, color: "white", background: "linear-gradient(90deg, #8b5cf6, #3b82f6)", cursor: "pointer" }}
                >
                  Save Chat
                </button>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gap: "26px", maxWidth: "900px", margin: "0 auto" }}>
            {chatEntries.map((entry) => (
              <div
                key={entry.id}
                style={{
                  display: "flex",
                  justifyContent: entry.side === "Him" ? "flex-start" : "flex-end",
                }}
              >
                <div
                  style={{
                    minWidth: "74px",
                    padding: "12px 14px",
                    borderRadius: "16px",
                    background: entry.side === "Him" ? "rgba(51, 90, 173, 0.82)" : "rgba(142, 42, 109, 0.82)",
                    color: "white",
                    border: entry.side === "Him" ? "1px solid rgba(67, 138, 255, 0.55)" : "1px solid rgba(255, 77, 177, 0.55)",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.18)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "1rem", fontWeight: 700 }}>{entry.time}</div>
                  <div style={{ fontSize: "0.82rem", opacity: 0.72, marginTop: "8px" }}>{entry.side}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeSection === "quotes") {
      return (
        <div style={pageFrameStyle}>
          <div style={sectionHeaderStyle}>
            <button onClick={() => setActiveSection("hub")} style={{ border: "none", background: "transparent", color: "#cdb0eb", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600 }}>
              <ArrowLeft size={18} /> Back
            </button>
            <h2 style={{ margin: 0, color: sectionAccent, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800 }}>Quotes Vault</h2>
            <button onClick={() => setShowQuoteForm((value) => !value)} style={{ border: "none", background: "linear-gradient(90deg, #15b8ff, #1e90ff)", color: "white", borderRadius: "999px", padding: "14px 20px", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 700 }}>
              <Plus size={18} /> Add Quote
            </button>
          </div>

          {showQuoteForm && (
            <div style={{ ...sectionPanelStyle, padding: "22px", marginBottom: "22px" }}>
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Quote</div>
                  <textarea value={quoteText} onChange={(e) => setQuoteText(e.target.value)} placeholder="The quote that means something..." rows={4} style={{ ...inputStyle, resize: "none", minHeight: "124px" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Author / Source</div>
                    <input value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} placeholder="Who said it?" style={inputStyle} />
                  </div>
                  <div>
                    <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Category</div>
                    <select value={quoteCategory} onChange={(e) => setQuoteCategory(e.target.value)} style={inputStyle}>
                      <option>Personal</option>
                      <option>Romantic</option>
                      <option>Favorite</option>
                      <option>Inspiration</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!quoteText.trim()) return;
                    setQuotes((items) => [
                      ...items,
                      { id: crypto.randomUUID(), quote: quoteText.trim(), author: quoteAuthor.trim() || "Unknown", category: quoteCategory },
                    ]);
                    setQuoteText("");
                    setQuoteAuthor("");
                    setShowQuoteForm(false);
                  }}
                  style={{ border: "none", borderRadius: "16px", padding: "16px", fontSize: "1rem", fontWeight: 700, color: "white", background: "linear-gradient(90deg, #14b8ff, #3b82f6)", cursor: "pointer" }}
                >
                  Save Quote
                </button>
              </div>
            </div>
          )}

          {quotes.length > 0 ? (
            <div style={{ display: "grid", gap: "16px", maxWidth: "900px", margin: "0 auto" }}>
              {quotes.map((quote) => (
                <div key={quote.id} style={{ ...sectionPanelStyle, padding: "20px 22px", color: "#dfe7ff" }}>
                  <div style={{ fontSize: "1.05rem", lineHeight: 1.7 }}>{quote.quote}</div>
                  <div style={{ marginTop: "14px", color: "#96a9e7", display: "flex", justifyContent: "space-between", gap: "16px", fontSize: "0.92rem" }}>
                    <span>{quote.author}</span>
                    <span>{quote.category}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#947ebf", marginTop: "72px" }}>No quotes saved yet. Start collecting words that matter.</div>
          )}
        </div>
      );
    }

    if (activeSection === "timeline") {
      return (
        <div style={pageFrameStyle}>
          <div style={sectionHeaderStyle}>
            <button onClick={() => setActiveSection("hub")} style={{ border: "none", background: "transparent", color: "#cdb0eb", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600 }}>
              <ArrowLeft size={18} /> Back
            </button>
            <h2 style={{ margin: 0, color: sectionAccent, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800 }}>Our Timeline</h2>
            <button onClick={() => setShowTimelineForm((value) => !value)} style={{ border: "none", background: "linear-gradient(90deg, #a855f7, #7c3aed)", color: "white", borderRadius: "999px", padding: "14px 20px", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 700 }}>
              <Plus size={18} /> Add Event
            </button>
          </div>

          {showTimelineForm && (
            <div style={{ ...sectionPanelStyle, padding: "22px", marginBottom: "22px" }}>
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Event Title</div>
                  <input value={eventTitle} onChange={(e) => setEventTitle(e.target.value)} placeholder="First meeting, First gift, etc." style={inputStyle} />
                </div>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Description</div>
                  <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Write about the moment..." rows={4} style={{ ...inputStyle, resize: "none", minHeight: "124px" }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div>
                    <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Date</div>
                    <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} style={inputStyle} />
                  </div>
                  <div>
                    <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Type</div>
                    <select value={eventType} onChange={(e) => setEventType(e.target.value)} style={inputStyle}>
                      <option>Milestone</option>
                      <option>Memory</option>
                      <option>Trip</option>
                      <option>Special Day</option>
                    </select>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!eventTitle.trim()) return;
                    setTimeline((items) => [
                      ...items,
                      { id: crypto.randomUUID(), title: eventTitle.trim(), description: eventDescription.trim(), date: eventDate, type: eventType },
                    ]);
                    setEventTitle("");
                    setEventDescription("");
                    setShowTimelineForm(false);
                  }}
                  style={{ border: "none", borderRadius: "16px", padding: "16px", fontSize: "1rem", fontWeight: 700, color: "white", background: "linear-gradient(90deg, #a855f7, #c084fc)", cursor: "pointer" }}
                >
                  Save Event
                </button>
              </div>
            </div>
          )}

          {timeline.length > 0 ? (
            <div style={{ display: "grid", gap: "16px", maxWidth: "900px", margin: "0 auto" }}>
              {timeline.map((event) => (
                <div key={event.id} style={{ ...sectionPanelStyle, padding: "18px 20px", color: "#efe4ff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ fontSize: "1.06rem", fontWeight: 700 }}>{event.title}</div>
                    <div style={{ color: "#a88bd8" }}>{event.date}</div>
                  </div>
                  <div style={{ marginTop: "10px", color: "#cbb8ec" }}>{event.description}</div>
                  <div style={{ marginTop: "12px", color: "#8da2e6", fontSize: "0.92rem" }}>{event.type}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#947ebf", marginTop: "72px" }}>No events yet. Start documenting your journey together.</div>
          )}
        </div>
      );
    }

    if (activeSection === "letters") {
      return (
        <div style={pageFrameStyle}>
          <div style={sectionHeaderStyle}>
            <button onClick={() => setActiveSection("hub")} style={{ border: "none", background: "transparent", color: "#cdb0eb", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600 }}>
              <ArrowLeft size={18} /> Back
            </button>
            <h2 style={{ margin: 0, color: sectionAccent, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800 }}>Future Letters</h2>
            <button onClick={() => setShowLetterForm((value) => !value)} style={{ border: "none", background: "linear-gradient(90deg, #ec4899, #d946ef)", color: "white", borderRadius: "999px", padding: "14px 20px", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 700 }}>
              <Plus size={18} /> Write Letter
            </button>
          </div>

          {showLetterForm && (
            <div style={{ ...sectionPanelStyle, padding: "22px", marginBottom: "22px" }}>
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Letter Title</div>
                  <input value={letterTitle} onChange={(e) => setLetterTitle(e.target.value)} placeholder="A message for the future..." style={inputStyle} />
                </div>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>When to Open</div>
                  <select value={letterOpenWhen} onChange={(e) => setLetterOpenWhen(e.target.value)} style={inputStyle}>
                    <option>Open when you miss me</option>
                    <option>Open on a special day</option>
                    <option>Open after a long trip</option>
                    <option>Open whenever you need me</option>
                  </select>
                </div>
                <div>
                  <div style={{ color: "#ddd0f2", fontSize: "0.95rem", fontWeight: 700, marginBottom: "10px" }}>Letter Content</div>
                  <textarea value={letterContent} onChange={(e) => setLetterContent(e.target.value)} placeholder="Write your message from the heart..." rows={5} style={{ ...inputStyle, resize: "none", minHeight: "146px" }} />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (!letterTitle.trim()) return;
                    setLetters((items) => [
                      ...items,
                      { id: crypto.randomUUID(), title: letterTitle.trim(), openWhen: letterOpenWhen, content: letterContent.trim() },
                    ]);
                    setLetterTitle("");
                    setLetterContent("");
                    setShowLetterForm(false);
                  }}
                  style={{ border: "none", borderRadius: "16px", padding: "16px", fontSize: "1rem", fontWeight: 700, color: "white", background: "linear-gradient(90deg, #ff4fc3, #ec4899)", cursor: "pointer" }}
                >
                  Save Letter
                </button>
              </div>
            </div>
          )}

          {letters.length > 0 ? (
            <div style={{ display: "grid", gap: "16px", maxWidth: "900px", margin: "0 auto" }}>
              {letters.map((letter) => (
                <div key={letter.id} style={{ ...sectionPanelStyle, padding: "20px 22px", color: "#efe4ff" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                    <div style={{ fontSize: "1.06rem", fontWeight: 700 }}>{letter.title}</div>
                    <div style={{ color: "#d79be7" }}>{letter.openWhen}</div>
                  </div>
                  <div style={{ marginTop: "12px", color: "#c8b7ea", lineHeight: 1.7 }}>{letter.content}</div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#947ebf", marginTop: "72px" }}>No letters yet. Write messages for the future.</div>
          )}
        </div>
      );
    }

    if (activeSection === "random") {
      return (
        <div style={pageFrameStyle}>
          <div style={sectionHeaderStyle}>
            <button onClick={() => setActiveSection("hub")} style={{ border: "none", background: "transparent", color: "#cdb0eb", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "1rem", fontWeight: 600 }}>
              <ArrowLeft size={18} /> Back
            </button>
            <h2 style={{ margin: 0, color: sectionAccent, fontSize: "clamp(2rem, 3vw, 2.8rem)", fontWeight: 800 }}>Random Memory</h2>
            <button onClick={handleRandomMemory} style={{ border: "none", background: "linear-gradient(90deg, #ff9800, #ff7a00) ", color: "white", borderRadius: "999px", padding: "14px 20px", display: "inline-flex", alignItems: "center", gap: "8px", cursor: "pointer", fontWeight: 700 }}>
              <Sparkles size={18} /> Take Me Back
            </button>
          </div>

          {currentMemory ? (
            <div style={{ maxWidth: "800px", margin: "0 auto" }}>
              <MemoryCard memory={currentMemory} />
            </div>
          ) : (
            <div style={{ textAlign: "center", color: "#947ebf", marginTop: "72px" }}>No memories saved yet. Add one first, then pick a random memory.</div>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div style={topShellStyle}>
      <div style={glowStyle("-140px", "-120px", "460px", "rgba(184, 45, 255, 0.34)")} />
      <div style={glowStyle("240px", "68%", "360px", "rgba(255, 46, 148, 0.18)")} />

      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        {activeSection === "hub" ? renderHub() : renderSection()}
      </div>
    </div>
  );
};
