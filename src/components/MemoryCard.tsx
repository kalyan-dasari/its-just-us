import { Memory } from "../hooks/useMemories";
import { Calendar } from "lucide-react";

interface MemoryCardProps {
  memory: Memory;
}

export const MemoryCard = ({ memory }: MemoryCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(23, 30, 100, 0.95), rgba(44, 31, 112, 0.92))",
        backdropFilter: "blur(14px)",
        borderRadius: "1.35rem",
        boxShadow: "0 18px 42px rgba(0, 0, 0, 0.24)",
        overflow: "hidden",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(80, 116, 255, 0.22)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = "0 24px 56px rgba(0, 0, 0, 0.3)";
        el.style.borderColor = "rgba(130, 168, 255, 0.42)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 18px 42px rgba(0, 0, 0, 0.24)";
        el.style.borderColor = "rgba(80, 116, 255, 0.22)";
      }}
    >
      {/* Image */}
      {memory.imageUrl && (
        <img
          src={memory.imageUrl}
          alt={memory.title}
          style={{
            width: "100%",
            height: "13rem",
            objectFit: "cover",
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          padding: "1.4rem 1.45rem 1.3rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <h3
          style={{
            fontSize: "1.22rem",
            fontWeight: "bold",
            color: "#d8e5ff",
            marginBottom: "0.65rem",
          }}
        >
          {memory.title}
        </h3>

        <p
          style={{
            color: "#cfd8ff",
            fontSize: "0.96rem",
            lineHeight: 1.6,
            marginBottom: "1rem",
            flex: 1,
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            overflow: "auto",
          }}
        >
          {memory.content}
        </p>

        {/* Meta Info */}
        <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(109, 132, 255, 0.18)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#8db1ff",
              fontSize: "0.88rem",
              fontWeight: "500",
              marginBottom: "0.75rem",
            }}
          >
            <Calendar size={16} color="#8db1ff" />
            <span>{formatDate(memory.date)}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "12px",
              alignItems: "center",
              color: "#9ab0e8",
              fontSize: "0.76rem",
            }}
          >
            <span>Added on {formatDate(memory.createdAt)}</span>
            <span style={{ color: "#7cb8ff", fontWeight: 600 }}>Memory</span>
          </div>
        </div>
      </div>
    </div>
  );
};
