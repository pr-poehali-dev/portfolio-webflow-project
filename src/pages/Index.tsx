import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/e1337c39-573d-4cd2-b5cb-b82d130c6a67/files/0efbfeae-d96c-40be-8809-e1f77d307560.jpg";

const navItems = ["Главная", "Обо мне", "Услуги", "Кейсы", "Отзывы", "Контакты"];

const services = [
  { icon: "Layers", title: "Webflow", desc: "Разрабатываю сайты любой сложности на Webflow — от лендингов до корпоративных порталов с CMS." },
  { icon: "Zap", title: "Webstudio", desc: "Создаю быстрые и SEO-оптимизированные сайты в Webstudio с современными анимациями." },
  { icon: "Smartphone", title: "TapTop", desc: "Мобильные и адаптивные решения на TapTop. Удобно для малого бизнеса и стартапов." },
  { icon: "Palette", title: "UI/UX дизайн", desc: "Прототипирование и дизайн интерфейсов. Figma-макеты готовые к разработке." },
  { icon: "Globe", title: "SEO-оптимизация", desc: "Настройка мета-тегов, скорости загрузки и структуры для продвижения в поиске." },
  { icon: "RefreshCw", title: "Поддержка", desc: "Техническая поддержка и обновления сайта после запуска. Работаем на долгосрок." },
];

const cases = [
  { tag: "Webflow", title: "Лендинг для IT-компании", desc: "Разработка одностраничного сайта с анимациями и формой заявки. Конверсия выросла на 34%.", color: "#00E5FF" },
  { tag: "Webstudio", title: "Интернет-магазин одежды", desc: "Каталог 200+ позиций, интеграция с платёжной системой, мобильная версия.", color: "#AAFF00" },
  { tag: "TapTop", title: "Сайт ресторана", desc: "Меню, бронирование столиков, интеграция с картами и соцсетями.", color: "#FF6B6B" },
  { tag: "Webflow", title: "Корпоративный портал", desc: "Многостраничный сайт с CMS, блогом и личным кабинетом для клиентов.", color: "#00E5FF" },
  { tag: "Webstudio", title: "Портфолио фотографа", desc: "Галерея, автоматическая оптимизация изображений, быстрая загрузка.", color: "#AAFF00" },
  { tag: "TapTop", title: "Сайт фитнес-клуба", desc: "Расписание занятий, онлайн-запись, интеграция с инстаграм.", color: "#FF6B6B" },
];

const reviews = [
  { name: "Анна Михайлова", role: "Директор маркетинга", text: "Сайт сделали быстро и качественно. Дизайн получился современный, клиенты хвалят. Однозначно рекомендую!", rating: 5 },
  { name: "Дмитрий Козлов", role: "Основатель стартапа", text: "Работали с нами оперативно, учли все пожелания. Сайт запустили вовремя, конверсия превзошла ожидания.", rating: 5 },
  { name: "Елена Соколова", role: "Владелец ресторана", text: "Очень доволен результатом. Сайт работает без сбоев, выглядит профессионально. Поддержка всегда на связи.", rating: 5 },
];

function useInView(ref: React.RefObject<Element>, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function Section({ id, children, className = "" }: { id: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

const Index = () => {
  const [activeNav, setActiveNav] = useState("Главная");
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const scrollTo = (item: string) => {
    const map: Record<string, string> = {
      "Главная": "hero",
      "Обо мне": "about",
      "Услуги": "services",
      "Кейсы": "cases",
      "Отзывы": "reviews",
      "Контакты": "contacts",
    };
    const el = document.getElementById(map[item] || "hero");
    el?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(item);
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#080B10] text-white overflow-x-hidden" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#080B10]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
          <span style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold tracking-widest text-[#00E5FF]">
            DEV<span className="text-white">FOLIO</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {navItems.map(item => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-sm tracking-wide transition-colors hover:text-[#00E5FF] ${activeNav === item ? "text-[#00E5FF]" : "text-white/60"}`}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            onClick={() => scrollTo("Контакты")}
            className="hidden md:block bg-[#00E5FF] text-[#080B10] font-bold px-5 py-2 text-sm tracking-widest hover:bg-[#AAFF00] transition-colors"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            СВЯЗАТЬСЯ
          </button>
          <button className="md:hidden text-white/60" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#0D1117] border-t border-white/5 px-6 py-4 flex flex-col gap-4">
            {navItems.map(item => (
              <button key={item} onClick={() => scrollTo(item)} className="text-left text-white/70 hover:text-[#00E5FF] transition-colors py-1">
                {item}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <div id="hero" className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-[#080B10] via-[#080B10]/80 to-[#00E5FF]/10" />
        <div className="absolute top-1/3 right-0 w-96 h-96 rounded-full bg-[#00E5FF]/5 blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-[#AAFF00]/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 border border-[#00E5FF]/30 px-4 py-2 mb-8 text-[#00E5FF] text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] animate-pulse" />
              Доступен для новых проектов
            </div>
            <h1 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-6xl md:text-8xl font-bold leading-none mb-6 uppercase tracking-tight">
              Делаю сайты,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#AAFF00]">
                которые продают
              </span>
            </h1>
            <p className="text-white/60 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Разработчик сайтов на Webflow, Webstudio и TapTop. Создаю современные, быстрые и конверсионные сайты для бизнеса.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("Кейсы")}
                className="bg-[#00E5FF] text-[#080B10] font-bold px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#AAFF00] transition-all duration-300 hover:scale-105"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                СМОТРЕТЬ КЕЙСЫ
              </button>
              <button
                onClick={() => scrollTo("Контакты")}
                className="border border-white/20 text-white font-bold px-8 py-4 text-sm tracking-widest uppercase hover:border-[#00E5FF] hover:text-[#00E5FF] transition-all duration-300"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                НАПИСАТЬ МНЕ
              </button>
            </div>
            <div className="flex gap-12 mt-16 pt-8 border-t border-white/10">
              {[["50+", "проектов"], ["4 года", "опыта"], ["100%", "довольных клиентов"]].map(([num, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-3xl font-bold text-[#00E5FF]">{num}</div>
                  <div className="text-white/40 text-sm mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <Section id="about" className="py-24 bg-[#0D1117]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-[#00E5FF] text-sm tracking-widest uppercase mb-4">Обо мне</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-5xl md:text-6xl font-bold uppercase leading-tight mb-6">
                Привет, я —<br />
                <span className="text-[#AAFF00]">веб-разработчик</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                Уже 4 года я создаю сайты для бизнеса — от простых лендингов до сложных корпоративных порталов. Специализируюсь на no-code и low-code платформах: Webflow, Webstudio и TapTop.
              </p>
              <p className="text-white/60 text-base leading-relaxed mb-8">
                Каждый проект — это не просто красивая картинка, а инструмент для привлечения клиентов и роста бизнеса. Работаю прозрачно, сдаю в срок.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Webflow", "Webstudio", "TapTop", "Figma", "SEO", "CMS"].map(skill => (
                  <span key={skill} className="border border-white/10 text-white/70 px-4 py-2 text-sm hover:border-[#00E5FF] hover:text-[#00E5FF] transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#00E5FF]/10 to-[#AAFF00]/5 border border-white/5 flex items-center justify-center min-h-64">
                <div className="text-center px-8 py-16">
                  <Icon name="User" size={80} className="text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-sm">Фото разработчика</p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 border border-[#00E5FF]/30 bg-[#080B10] px-6 py-4">
                <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-2xl font-bold text-[#00E5FF]">50+</div>
                <div className="text-white/50 text-xs">завершённых проектов</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SERVICES */}
      <Section id="services" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-[#00E5FF] text-sm tracking-widest uppercase mb-4">Что я делаю</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-5xl md:text-6xl font-bold uppercase">Услуги</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/5">
            {services.map((s, i) => (
              <div key={i} className="bg-[#080B10] p-8 group hover:bg-[#0D1117] transition-colors cursor-default">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#00E5FF] transition-colors">
                  <Icon name={s.icon} size={20} className="text-white/40 group-hover:text-[#00E5FF] transition-colors" />
                </div>
                <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase mb-3 group-hover:text-[#00E5FF] transition-colors">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CASES */}
      <Section id="cases" className="py-24 bg-[#0D1117]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-[#AAFF00] text-sm tracking-widest uppercase mb-4">Мои работы</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-5xl md:text-6xl font-bold uppercase">Кейсы</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cases.map((c, i) => (
              <div key={i} className="group relative bg-[#080B10] border border-white/5 p-8 hover:border-white/20 transition-all duration-300 cursor-pointer">
                <span
                  className="inline-block text-xs tracking-widest px-3 py-1 mb-6 font-bold uppercase"
                  style={{ fontFamily: "'Oswald', sans-serif", color: c.color, border: `1px solid ${c.color}40` }}
                >
                  {c.tag}
                </span>
                <h3 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-xl font-bold uppercase mb-3 group-hover:text-[#00E5FF] transition-colors">{c.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">{c.desc}</p>
                <div className="flex items-center gap-2 text-white/30 group-hover:text-[#00E5FF] transition-colors text-xs">
                  <span>Смотреть подробнее</span>
                  <Icon name="ArrowRight" size={14} />
                </div>
                <div
                  className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: c.color }}
                />
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* REVIEWS */}
      <Section id="reviews" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-[#00E5FF] text-sm tracking-widest uppercase mb-4">Говорят клиенты</div>
            <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-5xl md:text-6xl font-bold uppercase">Отзывы</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-[#0D1117] border border-white/5 p-8 relative">
                <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-[#00E5FF] text-5xl font-bold absolute top-4 right-6 opacity-10 select-none">"</div>
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-[#AAFF00]" />
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-8 italic">"{r.text}"</p>
                <div className="border-t border-white/5 pt-6">
                  <div style={{ fontFamily: "'Oswald', sans-serif" }} className="font-bold text-base">{r.name}</div>
                  <div className="text-white/40 text-xs mt-1">{r.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* CONTACTS */}
      <Section id="contacts" className="py-24 bg-[#0D1117]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <div style={{ fontFamily: "'Oswald', sans-serif" }} className="text-[#AAFF00] text-sm tracking-widest uppercase mb-4">Давай работать вместе</div>
              <h2 style={{ fontFamily: "'Oswald', sans-serif" }} className="text-5xl md:text-6xl font-bold uppercase leading-tight mb-6">
                Есть проект?<br />
                <span className="text-[#00E5FF]">Пиши!</span>
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-10">
                Расскажи о своём проекте — обсудим задачи, сроки и бюджет. Первая консультация бесплатно.
              </p>
              <div className="flex flex-col gap-4">
                {[
                  { icon: "Mail", text: "hello@devfolio.ru" },
                  { icon: "MessageCircle", text: "Telegram: @devfolio" },
                  { icon: "Phone", text: "+7 (999) 000-00-00" },
                ].map(({ icon, text }) => (
                  <div key={text} className="flex items-center gap-4 text-white/60 hover:text-[#00E5FF] transition-colors cursor-pointer">
                    <Icon name={icon} size={18} className="text-[#00E5FF]" />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="bg-[#080B10] border border-white/10 text-white placeholder:text-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
              <input
                type="email"
                placeholder="Email или Telegram"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="bg-[#080B10] border border-white/10 text-white placeholder:text-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#00E5FF] transition-colors"
              />
              <textarea
                placeholder="Расскажите о проекте"
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="bg-[#080B10] border border-white/10 text-white placeholder:text-white/30 px-5 py-4 text-sm focus:outline-none focus:border-[#00E5FF] transition-colors resize-none"
              />
              <button
                className="bg-[#00E5FF] text-[#080B10] font-bold px-8 py-4 text-sm tracking-widest uppercase hover:bg-[#AAFF00] transition-all duration-300 hover:scale-[1.02] active:scale-100"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                ОТПРАВИТЬ ЗАЯВКУ
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span style={{ fontFamily: "'Oswald', sans-serif" }} className="text-lg font-bold tracking-widest text-[#00E5FF]">
            DEV<span className="text-white">FOLIO</span>
          </span>
          <span className="text-white/30 text-sm">© 2026 — Разработчик сайтов. Все права защищены.</span>
          <div className="flex gap-4">
            {["Telegram", "Instagram", "Behance"].map(s => (
              <span key={s} className="text-white/30 text-sm hover:text-[#00E5FF] cursor-pointer transition-colors">{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
