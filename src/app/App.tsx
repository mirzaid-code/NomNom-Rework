import { useState } from "react";

type Page = "login" | "register" | "dashboard" | "detail" | "profile";

interface FoodItem {
  id: number;
  emoji: string;
  name: string;
  price: number;
  desc: string;
  category: "Makanan" | "Minuman";
  color: string;
}

const MENU: FoodItem[] = [
  { id: 1, emoji: "🍔", name: "Burger Smash", price: 35000, desc: "Beef patty juicy dengan saus smoky spesial dan keju leleh", category: "Makanan", color: "#ff5c2b" },
  { id: 2, emoji: "🍗", name: "Geprek Crispy", price: 28000, desc: "Ayam goreng renyah, level pedas bisa dipilih sesuai selera", category: "Makanan", color: "#ef476f" },
  { id: 3, emoji: "🍜", name: "Mie Ayam Bakso", price: 25000, desc: "Mie kenyal dengan ayam suwir, bakso, dan kuah gurih", category: "Makanan", color: "#ffd166" },
  { id: 4, emoji: "🍚", name: "Nasi Goreng Spesial", price: 30000, desc: "Nasi goreng telur dengan ayam, sayuran, dan sambal kecap", category: "Makanan", color: "#06d6a0" },
  { id: 5, emoji: "🧋", name: "Boba Brown Sugar", price: 22000, desc: "Brown sugar boba dengan susu segar dan pearl tapioka kenyal", category: "Minuman", color: "#aa8b6b" },
  { id: 6, emoji: "☕", name: "Es Kopi Susu", price: 18000, desc: "Kopi arabika single origin dengan susu segar dingin", category: "Minuman", color: "#c17c3c" },
  { id: 7, emoji: "🥤", name: "Es Teh Manis", price: 8000, desc: "Teh hitam segar dengan es batu dan gula aren", category: "Minuman", color: "#4ecdc4" },
  { id: 8, emoji: "🌮", name: "Taco Crispy", price: 32000, desc: "Taco renyah isi daging cincang, salsa segar, dan guacamole", category: "Makanan", color: "#ff9f1c" },
];

const PAYMENT_METHODS = [
  { id: "transfer", icon: "🏦", label: "Transfer Bank" },
  { id: "qris", icon: "📲", label: "QRIS" },
  { id: "gopay", icon: "💚", label: "GoPay / OVO" },
  { id: "cod", icon: "💵", label: "Bayar di Tempat" },
];

function fmt(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

export default function App() {
  const [page, setPage] = useState<Page>("login");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regErr, setRegErr] = useState("");

  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [qty, setQty] = useState(1);
  const [activeCategory, setActiveCategory] = useState<"Semua" | "Makanan" | "Minuman">("Semua");

  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [orderDone, setOrderDone] = useState(false);

  function handleLogin() {
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginErr("Email dan password wajib diisi.");
      return;
    }
    const raw = loginEmail.split("@")[0];
    const name = raw.charAt(0).toUpperCase() + raw.slice(1);
    setUserName(name);
    setUserEmail(loginEmail);
    setLoginErr("");
    setPage("dashboard");
  }

  function handleRegister() {
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegErr("Semua kolom wajib diisi.");
      return;
    }
    setUserName(regName.trim());
    setUserEmail(regEmail.trim());
    setRegErr("");
    setPage("dashboard");
  }

  function openDetail(food: FoodItem) {
    setSelectedFood(food);
    setQty(1);
    setPage("detail");
  }

  function confirmOrder() {
    if (!selectedPayment) return;
    setOrderDone(true);
    setTimeout(() => {
      setOrderDone(false);
      setShowPayment(false);
      setSelectedPayment("");
      setPage("dashboard");
    }, 2200);
  }

  const filteredMenu =
    activeCategory === "Semua" ? MENU : MENU.filter((f) => f.category === activeCategory);

  const isApp = page !== "login" && page !== "register";

  return (
    <div
      className="min-h-screen bg-background flex justify-center items-start"
      style={{ fontFamily: "'Nunito', sans-serif" }}
    >
      <div className="w-full max-w-sm min-h-screen flex flex-col relative overflow-hidden bg-background">

        {/* ── LOGIN ── */}
        {page === "login" && (
          <div className="flex flex-col min-h-screen px-6 pt-16 pb-10">
            {/* Logo */}
            <div className="mb-10 text-center">
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl mb-4"
                style={{ background: "#ff5c2b" }}
              >
                <span className="text-3xl">🍽️</span>
                <span
                  className="text-3xl text-white tracking-wide"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  NomNom
                </span>
              </div>
              <p className="text-muted-foreground text-sm">Pesan makanan & minuman favoritmu</p>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-6">Masuk ke akun</h2>

            <div className="flex flex-col gap-4">
              <input
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary text-sm"
                placeholder="Email kamu"
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <input
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary text-sm"
                placeholder="Password"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              {loginErr && <p className="text-xs text-destructive-foreground" style={{ color: "#ef476f" }}>{loginErr}</p>}
              <button
                onClick={handleLogin}
                className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-transform active:scale-95"
                style={{ background: "#ff5c2b" }}
              >
                Masuk
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Belum punya akun?{" "}
              <button
                className="font-bold"
                style={{ color: "#ffd166" }}
                onClick={() => setPage("register")}
              >
                Daftar sekarang
              </button>
            </p>

            {/* Memphis decoration */}
            <div className="absolute bottom-0 right-0 opacity-10 pointer-events-none select-none">
              <div
                className="w-40 h-40 rounded-full"
                style={{ background: "#ff5c2b", transform: "translate(40%, 40%)" }}
              />
            </div>
            <div className="absolute top-20 -left-6 opacity-10 pointer-events-none select-none">
              <div
                className="w-24 h-24 rounded-full"
                style={{ background: "#ffd166" }}
              />
            </div>
          </div>
        )}

        {/* ── REGISTER ── */}
        {page === "register" && (
          <div className="flex flex-col min-h-screen px-6 pt-16 pb-10">
            <div className="mb-8 text-center">
              <div
                className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl mb-4"
                style={{ background: "#ff5c2b" }}
              >
                <span className="text-3xl">🍽️</span>
                <span
                  className="text-3xl text-white tracking-wide"
                  style={{ fontFamily: "'Fredoka One', cursive" }}
                >
                  NomNom
                </span>
              </div>
            </div>

            <h2 className="text-xl font-bold text-foreground mb-6">Buat akun baru</h2>

            <div className="flex flex-col gap-4">
              <input
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary text-sm"
                placeholder="Nama lengkap"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary text-sm"
                placeholder="Email kamu"
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />
              <input
                className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 ring-primary text-sm"
                placeholder="Buat password"
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
              />
              {regErr && <p className="text-xs" style={{ color: "#ef476f" }}>{regErr}</p>}
              <button
                onClick={handleRegister}
                className="w-full py-3.5 rounded-xl font-bold text-white text-base transition-transform active:scale-95"
                style={{ background: "#ff5c2b" }}
              >
                Daftar
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Sudah punya akun?{" "}
              <button
                className="font-bold"
                style={{ color: "#ffd166" }}
                onClick={() => setPage("login")}
              >
                Masuk
              </button>
            </p>
          </div>
        )}

        {/* ── DASHBOARD ── */}
        {page === "dashboard" && (
          <div className="flex flex-col flex-1 pb-20">
            {/* Header */}
            <div className="px-5 pt-8 pb-4">
              <p className="text-muted-foreground text-sm mb-0.5">Halo, 👋</p>
              <h1
                className="text-2xl text-foreground"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                {userName || "Teman"}!
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Mau makan apa hari ini?</p>
            </div>

            {/* Banner */}
            <div
              className="mx-5 rounded-2xl px-5 py-4 mb-5 flex items-center justify-between overflow-hidden relative"
              style={{ background: "linear-gradient(135deg, #ff5c2b 0%, #ff8c42 100%)" }}
            >
              <div>
                <p className="text-white text-xs font-semibold opacity-80 mb-0.5">Menu Terbaik</p>
                <p className="text-white text-lg font-bold leading-tight">
                  Pilihan Segar<br />Setiap Hari 🔥
                </p>
              </div>
              <span className="text-5xl select-none">🍔</span>
              <div
                className="absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-20"
                style={{ background: "#ffffff" }}
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 px-5 mb-4">
              {(["Semua", "Makanan", "Minuman"] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
                  style={
                    activeCategory === cat
                      ? { background: "#ff5c2b", color: "#ffffff" }
                      : { background: "#242424", color: "#888888" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            <div className="px-5 grid grid-cols-2 gap-3">
              {filteredMenu.map((food) => (
                <button
                  key={food.id}
                  onClick={() => openDetail(food)}
                  className="bg-card rounded-2xl p-4 text-left transition-transform active:scale-95 flex flex-col gap-2 border border-border"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: food.color + "22" }}
                  >
                    {food.emoji}
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm leading-tight">{food.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{food.desc}</p>
                  </div>
                  <p className="text-sm font-bold mt-auto" style={{ color: "#ff5c2b" }}>
                    {fmt(food.price)}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── DETAIL ── */}
        {page === "detail" && selectedFood && (
          <div className="flex flex-col flex-1 pb-24">
            {/* Back */}
            <div className="px-5 pt-8 pb-2 flex items-center gap-3">
              <button
                onClick={() => setPage("dashboard")}
                className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center text-foreground text-lg transition-transform active:scale-95"
              >
                ←
              </button>
              <span className="text-foreground font-bold">Detail Pesanan</span>
            </div>

            {/* Food Card */}
            <div className="mx-5 mt-4 rounded-2xl overflow-hidden border border-border">
              <div
                className="h-36 flex items-center justify-center text-7xl"
                style={{ background: selectedFood.color + "22" }}
              >
                {selectedFood.emoji}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h2 className="text-xl font-bold text-foreground">{selectedFood.name}</h2>
                  <span
                    className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: selectedFood.color + "33", color: selectedFood.color }}
                  >
                    {selectedFood.category}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{selectedFood.desc}</p>

                {/* Qty */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-muted-foreground text-sm">Jumlah</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-lg bg-secondary text-foreground font-bold text-lg flex items-center justify-center transition-transform active:scale-90"
                    >
                      −
                    </button>
                    <span className="text-foreground font-bold w-4 text-center">{qty}</span>
                    <button
                      onClick={() => setQty((q) => q + 1)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-lg text-white transition-transform active:scale-90"
                      style={{ background: "#ff5c2b" }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-3 border-t border-border">
                  <span className="text-muted-foreground text-sm">Total</span>
                  <span className="text-xl font-bold" style={{ color: "#ff5c2b" }}>
                    {fmt(selectedFood.price * qty)}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Button */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm px-5 pb-6 pt-3 bg-background">
              <button
                onClick={() => setShowPayment(true)}
                className="w-full py-4 rounded-2xl font-bold text-white text-base transition-transform active:scale-95"
                style={{ background: "linear-gradient(90deg, #ff5c2b, #ff8c42)" }}
              >
                Pesan Sekarang — {fmt(selectedFood.price * qty)}
              </button>
            </div>
          </div>
        )}

        {/* ── PROFILE ── */}
        {page === "profile" && (
          <div className="flex flex-col flex-1 pb-20">
            <div className="px-5 pt-8 pb-6">
              <h1
                className="text-2xl text-foreground"
                style={{ fontFamily: "'Fredoka One', cursive" }}
              >
                Profil
              </h1>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center mb-6">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3"
                style={{ background: "linear-gradient(135deg, #ff5c2b, #ffd166)" }}
              >
                {userName ? userName.charAt(0).toUpperCase() : "?"}
              </div>
              <p className="text-foreground text-xl font-bold">{userName || "—"}</p>
              <p className="text-muted-foreground text-sm mt-0.5">{userEmail || "—"}</p>
            </div>

            {/* Info Cards */}
            <div className="px-5 flex flex-col gap-3">
              <div className="bg-card rounded-2xl px-5 py-4 border border-border flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Nama</p>
                  <p className="text-foreground font-semibold">{userName || "—"}</p>
                </div>
                <span className="text-xl">👤</span>
              </div>
              <div className="bg-card rounded-2xl px-5 py-4 border border-border flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs mb-0.5">Email</p>
                  <p className="text-foreground font-semibold">{userEmail || "—"}</p>
                </div>
                <span className="text-xl">📧</span>
              </div>

              <button
                onClick={() => {
                  setUserName("");
                  setUserEmail("");
                  setLoginEmail("");
                  setLoginPassword("");
                  setPage("login");
                }}
                className="mt-4 w-full py-3.5 rounded-xl font-bold text-sm transition-transform active:scale-95 border border-border text-muted-foreground"
              >
                Keluar
              </button>
            </div>
          </div>
        )}

        {/* ── BOTTOM NAV ── */}
        {isApp && page !== "detail" && (
          <div
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm flex bg-card border-t border-border"
            style={{ zIndex: 40 }}
          >
            {[
              { id: "dashboard", icon: "🏠", label: "Home" },
              { id: "profile", icon: "👤", label: "Profil" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setPage(tab.id as Page)}
                className="flex-1 py-3.5 flex flex-col items-center gap-1 transition-opacity"
                style={{ opacity: page === tab.id ? 1 : 0.45 }}
              >
                <span className="text-xl">{tab.icon}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: page === tab.id ? "#ff5c2b" : "#888" }}
                >
                  {tab.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* ── PAYMENT MODAL ── */}
        {showPayment && (
          <div
            className="fixed inset-0 flex items-end justify-center"
            style={{ zIndex: 50, background: "rgba(0,0,0,0.6)" }}
            onClick={(e) => {
              if (e.target === e.currentTarget && !orderDone) setShowPayment(false);
            }}
          >
            <div className="w-full max-w-sm bg-card rounded-t-3xl px-6 py-6 pb-8">
              {orderDone ? (
                <div className="flex flex-col items-center py-6 gap-3">
                  <div className="text-6xl">✅</div>
                  <h3 className="text-foreground font-bold text-xl">Pesanan Berhasil!</h3>
                  <p className="text-muted-foreground text-sm text-center">
                    Pesananmu sedang diproses. Tunggu sebentar ya!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h3
                      className="text-foreground text-lg"
                      style={{ fontFamily: "'Fredoka One', cursive" }}
                    >
                      Pilih Pembayaran
                    </h3>
                    <button
                      onClick={() => setShowPayment(false)}
                      className="text-muted-foreground text-xl w-8 h-8 flex items-center justify-center rounded-lg bg-secondary"
                    >
                      ×
                    </button>
                  </div>

                  {selectedFood && (
                    <div
                      className="flex items-center gap-3 p-3 rounded-xl mb-5"
                      style={{ background: "#242424" }}
                    >
                      <span className="text-2xl">{selectedFood.emoji}</span>
                      <div className="flex-1">
                        <p className="text-foreground text-sm font-bold">{selectedFood.name}</p>
                        <p className="text-muted-foreground text-xs">{qty}x item</p>
                      </div>
                      <p className="font-bold text-sm" style={{ color: "#ff5c2b" }}>
                        {fmt(selectedFood.price * qty)}
                      </p>
                    </div>
                  )}

                  <p className="text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-3">
                    Metode Bayar
                  </p>
                  <div className="flex flex-col gap-2 mb-6">
                    {PAYMENT_METHODS.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setSelectedPayment(m.id)}
                        className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all border text-left"
                        style={
                          selectedPayment === m.id
                            ? { borderColor: "#ff5c2b", background: "#ff5c2b18" }
                            : { borderColor: "rgba(255,255,255,0.08)", background: "#1a1a1a" }
                        }
                      >
                        <span className="text-xl">{m.icon}</span>
                        <span
                          className="font-semibold text-sm"
                          style={{ color: selectedPayment === m.id ? "#ff5c2b" : "#f5f0eb" }}
                        >
                          {m.label}
                        </span>
                        {selectedPayment === m.id && (
                          <span className="ml-auto text-xs font-bold" style={{ color: "#ff5c2b" }}>
                            ✓
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={confirmOrder}
                    disabled={!selectedPayment}
                    className="w-full py-4 rounded-2xl font-bold text-white text-base transition-all"
                    style={
                      selectedPayment
                        ? { background: "linear-gradient(90deg, #ff5c2b, #ff8c42)" }
                        : { background: "#333", color: "#555" }
                    }
                  >
                    Bayar Sekarang
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
