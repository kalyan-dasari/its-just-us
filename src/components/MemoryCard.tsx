import { Memory } from "../hooks/useMemories";
import { Calendar, Eye } from "lucide-react";

interface MemoryCardProps {
  memory: Memory;
  onViewFull?: () => void;
}

export const MemoryCard = ({ memory, onViewFull }: MemoryCardProps) => {
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
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(80, 116, 255, 0.22)",
        transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
        width: "100%",
        height: "420px",
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
            marginBottom: "0.8rem",
            flex: 1,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {memory.content}
        </p>

        {/* Meta Info */}
        <div style={{ paddingTop: "0.8rem", borderTop: "1px solid rgba(109, 132, 255, 0.18)" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#8db1ff",
              fontSize: "0.88rem",
              fontWeight: "500",
              marginBottom: "0.6rem",
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
            }}
          >
            <span style={{ color: "#9ab0e8", fontSize: "0.76rem" }}>Added on {formatDate(memory.createdAt)}</span>
            {onViewFull && (
              <button
                onClick={onViewFull}
                style={{
                  border: "none",
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  color: "white",
                  borderRadius: "8px",
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  transition: "transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Eye size={14} />
                View Full
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
