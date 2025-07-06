import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useNavigate } from 'react-router-dom'; // 添加 useNavigate
import './Services.css';

// ===== 常數 =====
const API_ROOT =
  import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const PLACEHOLDER_IMAGE =
  'https://via.placeholder.com/140/f0f0f0/666?text=Service';
const REQUEST_TIMEOUT = 8000;
const MAX_RETRIES = 3;
const IMAGE_LOAD_TIMEOUT = 5000;

// =====color (match to strapi) =====
const getBackgroundStyle = (colorName = 'yellow') => {
  const c = colorName.toLowerCase();
  const map = {
    yellow: '#FFC785',
    red: '#FDAB9E',
    blue: '#AFDDFF',
  };
  return { background: map[c] || map.yellow };
};

// ===== 後端無回傳時的預設 =====
const FALLBACK_SERVICES = [
  { id: 1, title: 'Dental Care', duration: 20, price: 25, backgroundColor: 'yellow' },
  { id: 2, title: 'Check-up', duration: 30, price: 100, backgroundColor: 'red' },
  { id: 3, title: 'Grooming', duration: 35, price: 35, backgroundColor: 'yellow' },
  { id: 4, title: 'Pain Management', duration: 45, price: 45, backgroundColor: 'red' },
  { id: 5, title: 'Vaccinations', duration: 15, price: 60, backgroundColor: 'blue' },
  { id: 6, title: 'Behaviour Consult', duration: 90, price: 200, backgroundColor: 'blue' },
];

// ===== 共用工具 =====
const getImageUrl = (img, root) => {
  if (!img) return PLACEHOLDER_IMAGE;
  const url =
    typeof img === 'string'
      ? img
      : img?.url ||
        img?.data?.attributes?.url ||
        img?.attributes?.url ||
        '';
  if (!url) return PLACEHOLDER_IMAGE;
  return url.startsWith('http') ? url : `${root}${url}`;
};

const normalizeService = (svc, root) => {
  const s = svc.attributes || svc;
  const bg =
    s.backgroundColor ??
    s.backgroundcolor ??
    s.background_color ??
    s.bgColor ??
    'yellow';

  return {
    id: svc.id ?? crypto.randomUUID(),
    title: s.title ?? 'Untitled',
    duration: Number(s.duration) || 0,
    price: Number(s.price) || 0,
    backgroundColor: bg,
    imageURL: getImageUrl(s.image, root),
  };
};

// ===== 影像預載 Hook =====
const useImgStatus = (url) => {
  const [status, set] = useState('loading');
  const to = useRef(null);

  useEffect(() => {
    if (!url || url === PLACEHOLDER_IMAGE) return set('loaded');
    set('loading');

    const img = new Image();
    to.current = setTimeout(() => set('error'), IMAGE_LOAD_TIMEOUT);

    img.onload = () => {
      clearTimeout(to.current);
      set('loaded');
    };
    img.onerror = () => {
      clearTimeout(to.current);
      set('error');
    };
    img.src = url;
    return () => {
      clearTimeout(to.current);
    };
  }, [url]);

  return status;
};

// ===== 骨架 =====
const CardSkeleton = React.memo(() => (
  <div className="service-card skeleton">
    <div className="service-image-container skeleton-shimmer">
      <div className="service-image-wrapper">
        <div className="skeleton-circle" />
      </div>
    </div>
    <div className="skeleton-text skeleton-title" />
    <div className="skeleton-text skeleton-meta" />
    <div className="skeleton-text skeleton-price" />
    <div className="skeleton-button" />
  </div>
));
CardSkeleton.displayName = 'CardSkeleton';

// ===== 服務卡片 =====
const ServiceCard = React.memo(({ service, onBook }) => {
  const imgStatus = useImgStatus(service.imageURL);
  const displayUrl =
    imgStatus === 'error' ? PLACEHOLDER_IMAGE : service.imageURL;

  return (
    <div className="service-card">
      <div
        className="service-image-container"
        style={getBackgroundStyle(service.backgroundColor)}
      >
        <div className="service-image-wrapper">
          {imgStatus === 'loading' && (
            <div className="image-loading-spinner">
              <div className="spinner" />
            </div>
          )}
          <img
            src={displayUrl}
            alt={service.title}
            className={`service-image ${imgStatus === 'loaded' ? 'loaded' : ''}`}
            loading="lazy"
          />
        </div>
      </div>

      <h3 className="service-title">{service.title}</h3>
      <p className="service-meta">{service.duration} min</p>
      <p className="service-price">${service.price}</p>

      <button
        className="book-now-button"
        onClick={() => onBook(service)}
      >
        Book Now
      </button>
    </div>
  );
});
ServiceCard.displayName = 'ServiceCard';

// ===== 主要元件 =====
export default function Services() {
  const [rawServices, setRaw] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);
  const [retry, setRetry] = useState(0);
  const retryTimer = useRef(null);
  const navigate = useNavigate(); // 添加 navigate hook

  const fetchServices = async () => {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), REQUEST_TIMEOUT);

    const res = await fetch(
      `${API_ROOT}/api/services?populate=*`,
      { signal: ctl.signal }
    ).finally(() => clearTimeout(t));

    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return res.json();
  };

  const load = useCallback(async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await fetchServices();
      setRaw(Array.isArray(data) ? data : data.data ?? []);
      setRetry(0);
    } catch (e) {
      console.error(e);
      setErr(e);
      if (retry < MAX_RETRIES) {
        retryTimer.current = setTimeout(() => {
          setRetry((r) => r + 1);
          load();
        }, 2 ** retry * 1000);
      }
    } finally {
      setLoading(false);
    }
  }, [retry]);

  useEffect(() => {
    load();
    return () => clearTimeout(retryTimer.current);
  }, [load]);

  const services = useMemo(
    () =>
      (rawServices.length ? rawServices : FALLBACK_SERVICES).map((s) =>
        normalizeService(s, API_ROOT)
      ),
    [rawServices]
  );

  // 修改 handleBooking 函數
  const handleBooking = (service) => {
    // 使用 navigate 跳轉到 schedule 頁面，並傳遞服務資料
    navigate('/schedule', { state: { selectedService: service } });
  };

  return (
    <div className="page-content">
      <h1>Pet Pal Services</h1>

      {loading && (
        <div className="services-container">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      )}

      {!loading && (
        <div className="services-container">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
              onBook={handleBooking} // 使用新的處理函數
            />
          ))}
        </div>
      )}

      {err && (
        <div className="error-container">
          <div className="error-message">
            <h3>⚠️ {err.message}</h3>
            <button className="retry-button" onClick={load}>
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}