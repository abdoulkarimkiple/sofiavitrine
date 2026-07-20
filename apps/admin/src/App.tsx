import {
  BarChart3,
  Bell,
  Bike,
  ChevronDown,
  ChevronRight,
  ChefHat,
  Crown,
  DollarSign,
  Gift,
  Grid2X2,
  MessageCircle,
  Package,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Users,
  Utensils,
  Warehouse,
} from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
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

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  _count?: {
    products: number;
  };
};

type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  isAvailable: boolean;
  isFeatured: boolean;
  sortOrder: number;
  category: {
    name: string;
  };
};

type AuthState = {
  accessToken: string;
  user: AdminUser;
};

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const authStorageKey = "sofia-admin-auth";

const imageBySlug = new Map([
  ["riz-au-gras", rizImage],
  ["riz-sauce-yassa", yassaImage],
  ["dibi-simple", dibiImage],
  ["brochette-alloco", brochetteImage],
  ["attieke", attiekeImage],
]);

async function apiRequest<T>(path: string, token?: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function formatDollars(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

function LoginScreen({ onLogin }: { onLogin: (auth: AuthState) => void }) {
  const [email, setEmail] = useState("admin@africanrestaurantsofia.com");
  const [password, setPassword] = useState("ChangeMe123!");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const auth = await apiRequest<AuthState>("/auth/login", undefined, {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem(authStorageKey, JSON.stringify(auth));
      onLogin(auth);
    } catch {
      setError("Connexion impossible. Vérifiez l'API ou les identifiants.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-panel">
        <div className="brand login-brand">
          <img src={logoImage} alt="" />
          <div>
            <strong>African<br />Restaurant</strong>
            <span>SOFIA</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <h1>Connexion admin</h1>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" autoComplete="email" />
          </label>
          <label>
            Mot de passe
            <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" autoComplete="current-password" />
          </label>
          {error && <p className="login-error">{error}</p>}
          <button disabled={isSubmitting}>{isSubmitting ? "Connexion..." : "Se connecter"}</button>
        </form>
      </section>
    </main>
  );
}

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

function TopDishesPanel({ products }: { products: AdminProduct[] }) {
  const dishes = products.length
    ? [...products]
        .filter((product) => product.category.name === "Plats")
        .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.sortOrder - b.sortOrder)
        .slice(0, 5)
        .map((product) => ({
        name: product.name,
        sold: product.isFeatured ? 234 : 128,
        price: formatDollars(product.priceCents),
        image: imageBySlug.get(product.slug) ?? topDishes[0].image,
      }))
    : topDishes;

  return (
    <section className="panel">
      <PanelHeader title="Top plats" />
      <div className="dish-list">
        {dishes.map((dish, index) => (
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

function MenuManagementPanel({ products, categories, isLoading }: { products: AdminProduct[]; categories: AdminCategory[]; isLoading: boolean }) {
  return (
    <section className="panel menu-management-panel">
      <PanelHeader title="Menu connecté" action={isLoading ? "Chargement" : `${products.length} plats`} />
      <div className="menu-summary">
        <span><b>{categories.length}</b> catégories</span>
        <span><b>{products.filter((product) => product.isAvailable).length}</b> disponibles</span>
        <span><b>{products.filter((product) => product.isFeatured).length}</b> populaires</span>
      </div>
      <div className="admin-product-list">
        {[...products]
          .sort((a, b) => a.category.name.localeCompare(b.category.name) || a.sortOrder - b.sortOrder)
          .slice(0, 8)
          .map((product) => (
          <div className="admin-product-row" key={product.id}>
            <div>
              <strong>{product.name}</strong>
              <small>{product.category.name} • {product.slug}</small>
            </div>
            <b>{formatDollars(product.priceCents)}</b>
            <span className={product.isAvailable ? "status-badge available" : "status-badge"}>
              {product.isAvailable ? "Disponible" : "Masqué"}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CategoriesPanel({ categories }: { categories: AdminCategory[] }) {
  return (
    <section className="panel categories-panel">
      <PanelHeader title="Catégories" action={`${categories.length} actives`} />
      <div className="category-list">
        {categories.map((category) => (
          <div className="category-row" key={category.id}>
            <span><Tag size={18} /></span>
            <div>
              <strong>{category.name}</strong>
              <small>{category.slug}</small>
            </div>
            <b>{category._count?.products ?? 0} plats</b>
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

export function App() {
  const [auth, setAuth] = useState<AuthState | null>(() => {
    const stored = localStorage.getItem(authStorageKey);
    return stored ? (JSON.parse(stored) as AuthState) : null;
  });
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    if (!auth?.accessToken) {
      return;
    }

    let isMounted = true;
    setIsLoadingMenu(true);
    setApiError("");

    Promise.all([
      apiRequest<AdminProduct[]>("/admin/products", auth.accessToken),
      apiRequest<AdminCategory[]>("/admin/categories", auth.accessToken),
    ])
      .then(([nextProducts, nextCategories]) => {
        if (!isMounted) {
          return;
        }
        setProducts(nextProducts);
        setCategories(nextCategories);
      })
      .catch(() => {
        if (!isMounted) {
          return;
        }
        setApiError("Les données admin ne sont pas disponibles pour le moment.");
      })
      .finally(() => {
        if (isMounted) {
          setIsLoadingMenu(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [auth]);

  const dashboardMetrics = useMemo(() => {
    if (!products.length) {
      return metrics;
    }

    return [
      {
        ...metrics[0],
        label: "Plats en ligne",
        value: String(products.filter((product) => product.isAvailable).length),
        change: `${categories.length} catégories`,
      },
      {
        ...metrics[1],
        label: "Valeur moyenne menu",
        value: formatDollars(Math.round(products.reduce((sum, product) => sum + product.priceCents, 0) / products.length)),
        change: "Prix depuis PostgreSQL",
      },
      {
        ...metrics[2],
        label: "Plats populaires",
        value: String(products.filter((product) => product.isFeatured).length),
        change: "Mis en avant",
      },
      metrics[3],
    ];
  }, [categories.length, products]);

  if (!auth) {
    return <LoginScreen onLogin={setAuth} />;
  }

  function handleLogout() {
    localStorage.removeItem(authStorageKey);
    setAuth(null);
  }

  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div className="brand sidebar-brand">
          <img src={logoImage} alt="" />
          <div>
            <strong>SOFIA</strong>
            <span>Admin</span>
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
            <button className="notification"><Bell size={20} /><span>3</span></button>
            <button className="profile" onClick={handleLogout}><span>{auth.user.name.slice(0, 2).toUpperCase()}</span><b>{auth.user.name}</b><small>{auth.user.role}</small><ChevronDown size={16} /></button>
          </div>
        </header>

        {apiError && <div className="api-banner">{apiError}</div>}

        <section className="metrics-grid">
          {dashboardMetrics.map((metric) => <MetricCard metric={metric} key={metric.label} />)}
        </section>

        <section className="main-grid">
          <RevenueChart />
          <OrderStatusPanel />
        </section>

        <section className="admin-data-grid">
          <MenuManagementPanel products={products} categories={categories} isLoading={isLoadingMenu} />
          <CategoriesPanel categories={categories} />
        </section>

        <section className="bottom-grid">
          <TopDishesPanel products={products} />
          <ChannelsPanel />
          <MessagesPanel />
          <ReviewsPanel />
        </section>

        <footer className="page-footer">Cuisine africaine authentique • New York, USA</footer>
      </section>
    </main>
  );
}
