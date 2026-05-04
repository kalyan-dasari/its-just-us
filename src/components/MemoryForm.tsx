import { useState } from "react";
import { X, Plus } from "lucide-react";
import { Memory } from "../hooks/useMemories";

interface MemoryFormProps {
  onSubmit: (memory: Omit<Memory, "id" | "createdAt" | "updatedAt">) => void;
  onCancel: () => void;
  initialValues?: Partial<Memory>;
}

export const MemoryForm = ({ onSubmit, onCancel, initialValues }: MemoryFormProps) => {
  const [formData, setFormData] = useState({
    title: initialValues?.title || "",
    content: initialValues?.content || "",
    date: initialValues?.date || new Date().toISOString().split("T")[0],
    imageUrl: initialValues?.imageUrl || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit({
        ...formData,
        id: "",
        createdAt: "",
        updatedAt: "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1.25rem",
    background: "rgba(106, 27, 154, 0.5)",
    border: "1px solid rgba(142, 36, 170, 0.3)",
    borderRadius: "0.75rem",
    color: "white",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        background: "linear-gradient(to bottom right, rgba(106, 27, 154, 0.5), rgba(88, 24, 126, 0.3))",
        backdropFilter: "blur(12px)",
        borderRadius: "1.5rem",
        boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
        padding: "2rem",
        border: "1px solid rgba(142, 36, 170, 0.3)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.875rem", fontWeight: "bold", color: "white" }}>Add a Memory</h2>
        <button
          onClick={onCancel}
          style={{
            background: "none",
            border: "none",
            color: "#ce93d8",
            cursor: "pointer",
            fontSize: "1.75rem",
            padding: "0",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ff1493")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#ce93d8")}
        >
          <X size={28} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Title */}
        <div>
          <label style={{ display: "block", color: "white", fontWeight: "600", marginBottom: "0.75rem" }}>
            Memory Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g., Our first date, Coffee at..."
            style={{
              ...inputStyle,
              color: "white",
              outline: "none",
            } as React.CSSProperties}
            disabled={isSubmitting}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255, 20, 147, 0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Date */}
        <div>
          <label style={{ display: "block", color: "white", fontWeight: "600", marginBottom: "0.75rem" }}>
            Memory Date *
          </label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) =>
              setFormData({ ...formData, date: e.target.value })
            }
            style={{
              ...inputStyle,
              color: "white",
              outline: "none",
            } as React.CSSProperties}
            disabled={isSubmitting}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255, 20, 147, 0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Image URL */}
        <div>
          <label style={{ display: "block", color: "white", fontWeight: "600", marginBottom: "0.75rem" }}>
            Image URL (optional)
          </label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            placeholder="https://example.com/image.jpg"
            style={{
              ...inputStyle,
              color: "white",
              outline: "none",
            } as React.CSSProperties}
            disabled={isSubmitting}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255, 20, 147, 0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Content */}
        <div>
          <label style={{ display: "block", color: "white", fontWeight: "600", marginBottom: "0.75rem" }}>
            Memory Details *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Write about this special moment..."
            rows={5}
            style={{
              width: "100%",
              padding: "0.75rem 1.25rem",
              background: "rgba(106, 27, 154, 0.5)",
              border: "1px solid rgba(142, 36, 170, 0.3)",
              borderRadius: "0.75rem",
              color: "white",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
              outline: "none",
            } as React.CSSProperties}
            disabled={isSubmitting}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(255, 20, 147, 0.5)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              flex: 1,
              background: "linear-gradient(to right, #da2d93, #e91e63)",
              color: "white",
              fontWeight: "bold",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "none",
              cursor: "pointer",
              fontSize: "1rem",
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            <Plus size={20} />
            {isSubmitting ? "Saving..." : "Save Memory"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            style={{
              flex: 1,
              background: "rgba(88, 24, 126, 0.5)",
              color: "white",
              fontWeight: "600",
              padding: "0.75rem 1rem",
              borderRadius: "0.75rem",
              border: "1px solid rgba(142, 36, 170, 0.3)",
              cursor: "pointer",
              fontSize: "1rem",
              opacity: isSubmitting ? 0.5 : 1,
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
