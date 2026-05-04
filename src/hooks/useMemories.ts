import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export interface Memory {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

type MemoryRow = {
  id: string;
  title: string;
  content: string;
  date: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
};

const toMemory = (row: MemoryRow): Memory => ({
  id: row.id,
  title: row.title,
  content: row.content,
  date: row.date,
  imageUrl: row.image_url ?? undefined,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const toRow = (memory: Omit<Memory, "id" | "createdAt" | "updatedAt">) => ({
  title: memory.title,
  content: memory.content,
  date: memory.date,
  image_url: memory.imageUrl || null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
});

export const useMemories = () => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMemories = async () => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setMemories((data as MemoryRow[] | null)?.map(toMemory) ?? []);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch memories";
      setError(message);
      console.error("Error fetching memories:", err);
    } finally {
      setLoading(false);
    }
  };

  const addMemory = async (memory: Omit<Memory, "id" | "createdAt" | "updatedAt">) => {
    try {
      const { data, error: insertError } = await supabase
        .from("memories")
        .insert([toRow(memory)])
        .select();

      if (insertError) throw insertError;
      await fetchMemories();
      return data?.[0] ? toMemory(data[0] as MemoryRow) : undefined;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add memory";
      setError(message);
      console.error("Error adding memory:", err);
    }
  };

  const deleteMemory = async (id: string) => {
    try {
      const { error: deleteError } = await supabase
        .from("memories")
        .delete()
        .eq("id", id);

      if (deleteError) throw deleteError;
      await fetchMemories();
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete memory";
      setError(message);
      console.error("Error deleting memory:", err);
    }
  };

  const updateMemory = async (id: string, updates: Partial<Memory>) => {
    try {
      const { createdAt, updatedAt, imageUrl, ...rest } = updates;
      const { data, error: updateError } = await supabase
        .from("memories")
        .update({
          ...rest,
          image_url: imageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

      if (updateError) throw updateError;
      await fetchMemories();
      return data?.[0] ? toMemory(data[0] as MemoryRow) : undefined;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to update memory";
      setError(message);
      console.error("Error updating memory:", err);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, []);

  return { memories, loading, error, addMemory, deleteMemory, updateMemory, fetchMemories };
};
