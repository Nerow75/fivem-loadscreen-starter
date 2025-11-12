// NewsPanel.jsx
import PropTypes from "prop-types";
import { THEME } from "../../config";

const liquidGlass = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
  border: "1px solid rgba(255,255,255,0.18)",
  boxShadow: `
    0 8px 32px rgba(0,0,0,0.4),
    inset 0 1px 1px rgba(255,255,255,0.25),
    inset 0 -1px 1px rgba(0,0,0,0.1),
    0 0 0 1px rgba(34,167,232,0.15)
  `,
  backdropFilter: "blur(12px) saturate(180%)",
  WebkitBackdropFilter: "blur(12px) saturate(180%)",
};

const NewsItem = ({ item, isLast }) => {
  if (!item) return null;
  return (
    <li
      style={{
        marginBottom: isLast ? 0 : 8,
        paddingBottom: isLast ? 0 : 8,
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,.1)",
        listStyle: "none",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8 }}>
        <span aria-hidden="true" style={{ fontSize: "clamp(14px,3.5vw,16px)" }}>
          {item.icon}
        </span>
        <div>
          {item.title && (
            <h3
              style={{
                color: "#fff",
                fontSize: "clamp(12px,3.2vw,13px)",
                fontWeight: 600,
                margin: "0 0 2px",
              }}
            >
              {item.title}
            </h3>
          )}
          {item.description && (
            <p
              style={{
                color: "rgba(255,255,255,.82)",
                fontSize: "clamp(11px,3vw,12px)",
                lineHeight: 1.45,
                margin: 0,
              }}
            >
              {item.description}
            </p>
          )}
          {item.date && (
            <div
              style={{
                color: THEME?.primaryLight || "#9ad1ff",
                fontSize: "clamp(10px,2.8vw,11px)",
                marginTop: 3,
              }}
            >
              {item.date}
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

NewsItem.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.node,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }),
  isLast: PropTypes.bool,
};

export const NewsPanel = ({ news }) => {
  const list = Array.isArray(news) ? news.filter(Boolean) : [];
  if (!list.length) return null;

  const sliced = list.slice(0, 3);

  return (
    <section
      aria-label="Dernières actualités"
      style={{
        position: "fixed",
        zIndex: 5,
        right: "var(--news-gap)",
        bottom: "clamp(120px, 16vh, 160px)",
        width: "min(var(--news-width), 92vw)",
        padding: "12px 14px",
        borderRadius: 16,
        ...liquidGlass,
      }}
    >
      <header
        style={{
          color: THEME?.accent || "#fff",
          fontSize: "clamp(12px,3.2vw,13px)",
          fontWeight: 600,
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <i
          className="fa-solid fa-newspaper"
          aria-hidden="true"
          style={{ fontSize: "clamp(11px,3vw,12px)" }}
        />
        <span>DERNIÈRES ACTUALITÉS</span>
      </header>

      <ul
        role="list"
        aria-label="Liste des actualités"
        style={{ margin: 0, padding: 0 }}
      >
        {sliced.map((item, i) => (
          <NewsItem
            key={`${item.title || "news"}-${i}`}
            item={item}
            isLast={i === sliced.length - 1}
          />
        ))}
      </ul>

      <style>{`
        /* Mobile : recentre le panneau et libère le bord droit */
        @media (max-width: 720px) {
          [aria-label="Dernières actualités"]{
            right: 50% !important;
            transform: translateX(50%);
            width: min(96vw, 540px) !important;
            bottom: clamp(96px, 16vh, 132px) !important;
            padding: 10px 12px !important;
          }
        }
      `}</style>
    </section>
  );
};

NewsPanel.propTypes = {
  news: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};
