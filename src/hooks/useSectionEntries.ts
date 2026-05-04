import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export type ChatEntry = {
  id: string;
  side: "Him" | "Her";
  time: string;
  text: string;
};

export type QuoteEntry = {
  id: string;
  quote: string;
  author: string;
  category: string;
};

export type TimelineEntry = {
  id: string;
  title: string;
  description: string;
  date: string;
  type: string;
};

export type LetterEntry = {
  id: string;
  title: string;
  openWhen: string;
  content: string;
};

type SectionKey = "chat" | "quote" | "timeline" | "letter";

type SectionPayload = {
  side?: "Him" | "Her";
  time?: string;
  text?: string;
  quote?: string;
  author?: string;
  category?: string;
  title?: string;
  description?: string;
  date?: string;
  type?: string;
  openWhen?: string;
  content?: string;
};

type SectionRow = {
  id: string;
  section: SectionKey;
  payload: SectionPayload;
  created_at: string;
  updated_at: string;
};

const toChatEntry = (row: SectionRow): ChatEntry => ({
  id: row.id,
  side: row.payload.side ?? "Him",
  time: row.payload.time ?? "11:11",
  text: row.payload.text ?? "",
});

const toQuoteEntry = (row: SectionRow): QuoteEntry => ({
  id: row.id,
  quote: row.payload.quote ?? "",
  author: row.payload.author ?? "Unknown",
  category: row.payload.category ?? "Personal",
});

const toTimelineEntry = (row: SectionRow): TimelineEntry => ({
  id: row.id,
  title: row.payload.title ?? "",
  description: row.payload.description ?? "",
  date: row.payload.date ?? "",
  type: row.payload.type ?? "Milestone",
});

const toLetterEntry = (row: SectionRow): LetterEntry => ({
  id: row.id,
  title: row.payload.title ?? "",
  openWhen: row.payload.openWhen ?? "",
  content: row.payload.content ?? "",
});

const insertSectionEntry = async (section: SectionKey, payload: SectionPayload) => {
  const now = new Date().toISOString();

  const { error } = await supabase.from("section_entries").insert([
    {
      section,
      payload,
      created_at: now,
      updated_at: now,
    },
  ]);

  if (error) {
    throw error;
  }
};

export const useSectionEntries = () => {
  const [chats, setChats] = useState<ChatEntry[]>([]);
  const [quotes, setQuotes] = useState<QuoteEntry[]>([]);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [letters, setLetters] = useState<LetterEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = async () => {
    try {
      setLoading(true);

      const { data, error: fetchError } = await supabase
        .from("section_entries")
        .select("*")
        .order("created_at", { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      const rows = (data as SectionRow[] | null) ?? [];
      setChats(rows.filter((row) => row.section === "chat").map(toChatEntry));
      setQuotes(rows.filter((row) => row.section === "quote").map(toQuoteEntry));
      setTimeline(rows.filter((row) => row.section === "timeline").map(toTimelineEntry));
      setLetters(rows.filter((row) => row.section === "letter").map(toLetterEntry));
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch section entries";
      setError(message);
      console.error("Error fetching section entries:", err);
    } finally {
      setLoading(false);
    }
  };

  const addChat = async (entry: Omit<ChatEntry, "id">) => {
    try {
      await insertSectionEntry("chat", entry);
      await fetchEntries();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add chat";
      setError(message);
      console.error("Error adding chat:", err);
    }
  };

  const addQuote = async (entry: Omit<QuoteEntry, "id">) => {
    try {
      await insertSectionEntry("quote", entry);
      await fetchEntries();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add quote";
      setError(message);
      console.error("Error adding quote:", err);
    }
  };

  const addTimelineEntry = async (entry: Omit<TimelineEntry, "id">) => {
    try {
      await insertSectionEntry("timeline", entry);
      await fetchEntries();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add timeline entry";
      setError(message);
      console.error("Error adding timeline entry:", err);
    }
  };

  const addLetter = async (entry: Omit<LetterEntry, "id">) => {
    try {
      await insertSectionEntry("letter", entry);
      await fetchEntries();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add letter";
      setError(message);
      console.error("Error adding letter:", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return {
    chats,
    quotes,
    timeline,
    letters,
    loading,
    error,
    fetchEntries,
    addChat,
    addQuote,
    addTimelineEntry,
    addLetter,
  };
};