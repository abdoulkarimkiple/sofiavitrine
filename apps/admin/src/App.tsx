import {
  BarChart3,
  Bell,
  Bike,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  ChefHat,
  Crown,
  DollarSign,
  Gift,
  Grid2X2,
  MessageCircle,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Users,
  Utensils,
  Warehouse,
} from "lucide-react";
import attiekeImage from "../../web/src/assets/plats/Attieke.jpg";
import brochetteImage from "../../web/src/assets/plats/brochette_alloco.png";
import dibiImage from "../../web/src/assets/plats/dibi_simple.png";
import rizImage from "../../web/src/assets/plats/riz_au_gras.jpeg";
import yassaImage from "../../web/src/assets/plats/sauce_yassa.png";
import logoImage from "../../web/src/assets/branding/african-restaurant-sofia-logo.jpeg";

type Metric = {
  label: string;
  value: string;
  change: string;
  icon: React.ComponentType<{ size?: number }>;
  tone: "green" | "gold" | "orange";
  points: number[];
};

const metrics: Metric[] = [
  {
    label: "Commandes du jour",
    value: "128",
    change: "18% vs hier",
    icon: ShoppingBag,
    tone: "green",
    points: [12, 22, 18, 34, 29, 42, 39, 52],
  },
  {
    label: "Chiffre d'affaires",
    value: "$3,742.50",
    change: "22% vs hier",
    icon: DollarSign,
    tone: "gold",
    points: [18, 25, 24, 32, 29, 37, 40, 56],
  },
  {
    label: "En préparation",
    value: "24",
    change: "En cours",
    icon: ChefHat,
    tone: "orange",
    points: [16, 28, 24, 30, 27, 33, 35, 43],
  },
  {
    label: "Livrées aujourd'hui",
    value: "89",
    change: "15% vs hier",
    icon: Bike,
    tone: "green",
    points: [20, 22, 34, 29, 36, 32, 44, 59],
  },
];

const navItems = [
  { label: "Tableau de bord", icon: Grid2X2, active: true },
  { label: "Commandes", icon: ShoppingBag },
  { label: "Menu", icon: Utensils },
  { label: "Catégories", icon: Tag },
  { label: "Clients", icon: Users },
  { label: "Promotions", icon: Gift },
  { label: "Messages WhatsApp", icon: MessageCircle },
  { label: "Analytique", icon: BarChart3 },
  { label: "Stocks", icon: Warehouse },
  { label: "Paramètres", icon: Settings },
];

const revenuePoints = [
  { day: "18 mai", revenue: 1400, orders: 28 },
  { day: "19 mai", revenue: 2600, orders: 58 },
  { day: "20 mai", revenue: 2300, orders: 44 },
  { day: "21 mai", revenue: 4200, orders: 104 },
  { day: "22 mai", revenue: 3200, orders: 78 },
  { day: "23 mai", revenue: 4500, orders: 118 },
  { day: "24 mai", revenue: 3400, orders: 68 },
];

const orderStatuses = [
  { label: "Nouvelles", count: 12, icon: Package, orders: ["#2456 10:24", "#2457 10:28", "#2458 10:31"] },
  { label: "En préparation", count: 24, icon: ChefHat, orders: ["#2451 10:05", "#2452 10:10", "#2453 10:15"] },
  { label: "Prêtes", count: 8, icon: ShoppingBag, orders: ["#2447 09:50", "#2448 09:55", "#2449 10:00"] },
  { label: "Livrées", count: 89, icon: Bike, orders: ["#2440 09:00", "#2441 09:15", "#2442 09:25"] },
];

const topDishes = [
  { name: "Chicken Yassa", sold: 234, price: "$18.50", image: yassaImage },
  { name: "Jollof Rice", sold: 189, price: "$16.00", image: rizImage },
  { name: "Mafé (Boeuf)", sold: 156, price: "$17.50", image: dibiImage },
  { name: "Suya (Brochettes)", sold: 142, price: "$15.00", image: brochetteImage },
  { name: "Plantain frit", sold: 128, price: "$6.50", image: attiekeImage },
];

const messages = [
  ["Awa Diop", "Bonjour, j'aimerais passer une commande...", "10:32", "2"],
  ["Koffi Mensah", "Merci, la livraison était parfaite", "10:28", ""],
  ["Fatoumata Camara", "Pouvez-vous me dire si le mafé est épicé ?", "10:20", "1"],
  ["Ibrahim Diallo", "Je serai là dans 15 minutes pour le pickup.", "10:15", ""],
];

const reviews = [
  ["Aminata T.", "Délicieux comme toujours ! Le Yassa est incroyable.", "Il y a 1h"],
  ["David K.", "Service rapide et nourriture authentique.", "Il y a 3h"],
  ["Sarah L.", "Meilleur restaurant africain à New York !", "Il y a 5h"],
];

const stockAlerts = [
  ["🌶️", "Piment frais", "2.1 kg"],
  ["🌿", "Feuilles de laurier", "0.5 kg"],
  ["🧴", "Huile de palme", "1.2 L"],
  ["🍚", "Riz étuvé", "3.0 kg"],
  ["🍅", "Tomates fraîches", "1.5 kg"],
];

function Sparkline({ points, tone }: { points: number[]; tone: Metric["tone"] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = Math.max(max - min, 1);
  const path = points
    .map((point, index) => {
      const x = (index / (points.length - 1)) * 100;
      const y = 42 - ((point - min) / span) * 34;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg className={`sparkline sparkline-${tone}`} viewBox="0 0 100 48" aria-hidden="true">
      <path d={path} />
    </svg>
  );
}

function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon;

  return (
    <article className="metric-card">
      <div className={`metric-icon metric-${metric.tone}`}>
        <Icon size={28} />
      </div>
      <div className="metric-copy">
        <p>{metric.label}</p>
        <strong>{metric.value}</strong>
        <span className={metric.tone === "orange" ? "muted-change" : ""}>{metric.change}</span>
      </div>
      <Sparkline points={metric.points} tone={metric.tone} />
    </article>
  );
}

function RevenueChart() {
  const maxRevenue = 5000;
  const maxOrders = 150;
  const revenuePath = revenuePoints
    .map((point, index) => {
      const x = 8 + (index / (revenuePoints.length - 1)) * 84;
      const y = 84 - (point.revenue / maxRevenue) * 64;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  const orderPath = revenuePoints
    .map((point, index) => {
      const x = 8 + (index / (revenuePoints.length - 1)) * 84;
      const y = 84 - (point.orders / maxOrders) * 64;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <section className="panel revenue-panel">
      <PanelHeader title="Revenus & commandes" action="7 derniers jours" />
      <div className="legend">
        <span><i className="green-line" /> Revenus (USD)</span>
        <span><i className="gold-line" /> Commandes</span>
      </div>
      <svg className="revenue-chart" viewBox="0 0 100 100" role="img" aria-label="Graphique revenus et commandes">
        {[20, 36, 52, 68, 84].map((line) => (
          <line key={line} x1="8" y1={line} x2="92" y2={line} />
        ))}
        <path className="chart-fill" d={`${revenuePath} L 92 84 L 8 84 Z`} />
        <path className="revenue-line" d={revenuePath} />
        <path className="orders-line" d={orderPath} />
        {revenuePoints.map((point, index) => {
          const x = 8 + (index / (revenuePoints.length - 1)) * 84;
          const y = 84 - (point.revenue / maxRevenue) * 64;
          return <circle key={point.day} className="revenue-dot" cx={x} cy={y} r="1.3" />;
        })}
      </svg>
      <div className="chart-days">
        {revenuePoints.map((point) => <span key={point.day}>{point.day}</span>)}
      </div>
    </section>
  );
}

function PanelHeader({ title, action = "Voir tout" }: { title: string; action?: string }) {
  return (
    <div className="panel-header">
      <h2>{title}</h2>
      <button>{action}</button>
    </div>
  );
}

function OrderStatusPanel() {
  return (
    <section className="panel status-panel">
      <PanelHeader title="Statut des commandes" action="" />
      <div className="status-grid">
        {orderStatuses.map((status, index) => {
          const Icon = status.icon;

          return (
            <div className="status-column" key={status.label}>
              <div className="status-flow">
                <span className="status-icon"><Icon size={20} /></span>
                {index < orderStatuses.length - 1 && <span className="status-arrow">→</span>}
              </div>
              <p>{status.label}</p>
              <strong>{status.count}</strong>
              <div className="mini-orders">
                {status.orders.map((order) => {
                  const [number, time] = order.split(" ");
                  return <span key={order}><b>{number}</b><em>{time}</em></span>;
                })}
              </div>
              <button className="text-link">Voir tout ({status.count})</button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function TopDishesPanel() {
  return (
    <section className="panel">
      <PanelHeader title="Top plats" />
      <div className="dish-list">
        {topDishes.map((dish, index) => (
          <div className="dish-row" key={dish.name}>
            <span className="rank">{index + 1}</span>
            <img src={dish.image} alt="" />
            <div>
              <strong>{dish.name}</strong>
              <small>{dish.sold} vendus</small>
            </div>
            <b>{dish.price}</b>
          </div>
        ))}
      </div>
    </section>
  );
}

function ChannelsPanel() {
  return (
    <section className="panel channels-panel">
      <PanelHeader title="Canaux de commande" action="" />
      <div className="donut">
        <span>Total<br /><b>128</b><br />commandes</span>
      </div>
      <div className="channel-list">
        <span><i className="whatsapp" /> WhatsApp <b>58% (74)</b></span>
        <span><i className="web" /> Site Web <b>30% (38)</b></span>
        <span><i className="pickup" /> Pickup <b>12% (16)</b></span>
      </div>
    </section>
  );
}

function MessagesPanel() {
  return (
    <section className="panel">
      <PanelHeader title="Messages WhatsApp récents" />
      <div className="message-list">
        {messages.map(([name, text, time, badge], index) => (
          <div className="message-row" key={name}>
            <span className="avatar">{name.charAt(0)}</span>
            <div>
              <strong>{name}</strong>
              <small>{text}</small>
            </div>
            <time>{time}</time>
            {badge && <b>{badge}</b>}
          </div>
        ))}
      </div>
      <button className="panel-footer">Voir tous les messages <ChevronRight size={16} /></button>
    </section>
  );
}

function ReviewsPanel() {
  return (
    <section className="panel">
      <PanelHeader title="Avis récents" />
      <div className="review-list">
        {reviews.map(([name, text, time]) => (
          <div className="review-row" key={name}>
            <span className="avatar warm">{name.charAt(0)}</span>
            <div>
              <strong>{name}</strong>
              <span className="stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} size={12} fill="currentColor" />)}</span>
              <small>{text}</small>
            </div>
            <time>{time}</time>
          </div>
        ))}
      </div>
      <button className="panel-footer">Voir tous les avis <ChevronRight size={16} /></button>
    </section>
  );
}

function StockPanel() {
  return (
    <section className="panel">
      <PanelHeader title="Stock faible" />
      <div className="stock-list">
        {stockAlerts.map(([emoji, name, qty]) => (
          <div className="stock-row" key={name}>
            <span>{emoji}</span>
            <strong>{name}</strong>
            <b>{qty}</b>
          </div>
        ))}
      </div>
      <div className="alert-box">10 articles en alerte</div>
    </section>
  );
}

export function App() {
  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div className="brand">
          <img src={logoImage} alt="" />
          <div>
            <strong>African<br />Restaurant</strong>
            <span>SOFIA</span>
          </div>
        </div>
        <div className="admin-pill"><Crown size={14} /> Admin</div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button className={item.active ? "active" : ""} key={item.label}>
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="location-card">
          <img src={logoImage} alt="" />
          <div>
            <strong>African Restaurant Sofia</strong>
            <span>New York, USA</span>
          </div>
          <ChevronRight size={18} />
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <label className="search">
            <Search size={18} />
            <input placeholder="Rechercher (commandes, clients, plats...)" />
            <span>⌘ K</span>
          </label>
          <div className="actions">
            <button className="primary"><Plus size={18} /> Nouvelle commande</button>
            <button><Utensils size={18} /> Ajouter un plat</button>
            <button className="promo"><Gift size={18} /> Promotion</button>
            <button className="whatsapp"><MessageCircle size={19} /></button>
            <button className="notification"><Bell size={20} /><span>3</span></button>
            <button className="profile"><span>AK</span><b>Admin</b><small>Administrateur</small><ChevronDown size={16} /></button>
          </div>
        </header>

        <div className="date-row">
          <button><CalendarDays size={16} /> 18 mai - 24 mai 2025 <ChevronDown size={16} /></button>
        </div>

        <section className="metrics-grid">
          {metrics.map((metric) => <MetricCard metric={metric} key={metric.label} />)}
        </section>

        <section className="main-grid">
          <RevenueChart />
          <OrderStatusPanel />
        </section>

        <section className="bottom-grid">
          <TopDishesPanel />
          <ChannelsPanel />
          <MessagesPanel />
          <ReviewsPanel />
          <StockPanel />
        </section>

        <footer className="page-footer">Cuisine africaine authentique • New York, USA</footer>
      </section>
    </main>
  );
}
