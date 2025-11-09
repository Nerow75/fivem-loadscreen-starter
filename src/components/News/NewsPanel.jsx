import { THEME } from '../../config';
import { glassBoxStyle } from '../../utils/constants';

const NewsItem = ({ news, isLast }) => {
  return (
    <div
      style={{
        marginBottom: isLast ? 0 : 10,
        paddingBottom: isLast ? 0 : 10,
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 8,
          marginBottom: 4,
        }}
      >
        <span style={{ fontSize: 16 }}>{news.icon}</span>
        <div style={{ flex: 1 }}>
          <div
            style={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 2,
            }}
          >
            {news.title}
          </div>
          <div
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 11,
              lineHeight: 1.4,
            }}
          >
            {news.description}
          </div>
          <div
            style={{
              color: THEME.primaryLight,
              fontSize: 10,
              marginTop: 2,
            }}
          >
            {news.date}
          </div>
        </div>
      </div>
    </div>
  );
};

export const NewsPanel = ({ news }) => {
  if (!news || news.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 80,
        right: 18,
        zIndex: 5,
        width: 320,
        padding: '14px 16px',
        borderRadius: 16,
        ...glassBoxStyle,
      }}
    >
      <div
        style={{
          color: THEME.accent,
          fontSize: 13,
          fontWeight: 600,
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <i className="fa-solid fa-newspaper" style={{ fontSize: 12 }} />
        DERNIÈRES ACTUALITÉS
      </div>

      {news.slice(0, 3).map((item, index) => (
        <NewsItem key={index} news={item} isLast={index === Math.min(2, news.length - 1)} />
      ))}
    </div>
  );
};
