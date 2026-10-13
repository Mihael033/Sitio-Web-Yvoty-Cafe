import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { iconFor } from "./components/Icons";
import { Flor, Logo } from "./components/Logo";
import { Photo } from "./components/Photo";
import { Reveal } from "./components/Reveal";
import { horarios, menu, razones, testimonios } from "./data";

const links = [
  ["Sobre", "#sobre"],
  ["Menú", "#menu"],
  ["Por qué", "#porque"],
  ["Visitanos", "#visitanos"],
];

const Navbar = () => {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const bg = solid || open ? "bg-espresso shadow-lg shadow-black/20" : "bg-transparent";
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${bg}`}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <a href="#inicio" aria-label="Yvoty Café, inicio">
          <Logo />
        </a>
        <ul className="hidden gap-8 text-sm font-medium text-crema md:flex">
          {links.map(([l, h]) => (
            <li key={h}>
              <a href={h} className="transition-colors hover:text-terracota">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={`h-0.5 w-6 bg-crema transition ${open ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`h-0.5 w-6 bg-crema transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-0.5 w-6 bg-crema transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>
      {open ? (
        <ul className="flex flex-col gap-1 px-5 pb-4 text-crema md:hidden">
          {links.map(([l, h]) => (
            <li key={h}>
              <a href={h} onClick={() => setOpen(false)} className="block py-2 text-lg">
                {l}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 120]);
  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden bg-espresso">
      <motion.div style={{ y }} className="absolute inset-x-0 -top-10 -bottom-32">
        <Photo name="foto-hero.png" alt="Taza de café en Yvoty Café" className="h-full w-full" eager />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-espresso/80 via-espresso/60 to-espresso/90" />
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-terracota"
        >
          <Flor size={20} /> Santa Rita · Alto Paraná
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-3xl font-display text-5xl font-bold leading-[1.05] text-crema sm:text-6xl md:text-7xl"
        >
          Acá el café florece.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-6 max-w-xl text-lg text-crema/85"
        >
          Café de especialidad, hecho en Santa Rita. Granos elegidos uno por uno, tostado con paciencia y servido como
          en casa — pero mejor.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <a
            href="#menu"
            className="rounded-full bg-terracota px-7 py-3.5 font-semibold text-white shadow-lg shadow-terracota/30 transition hover:-translate-y-0.5 hover:bg-[#b3531f]"
          >
            Ver menú
          </a>
          <a
            href="#visitanos"
            className="rounded-full border-2 border-crema/80 px-7 py-3 font-semibold text-crema transition hover:-translate-y-0.5 hover:bg-crema hover:text-espresso"
          >
            Cómo llegar
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Sobre = () => (
  <section id="sobre" className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
    <Reveal>
      <h2 className="font-display text-4xl font-bold md:text-5xl">Sobre Yvoty</h2>
      <p className="mt-6 text-lg leading-relaxed text-espresso/85">
        <em className="font-display not-italic text-terracota">Yvoty</em> significa flor en guaraní, y así pensamos el
        café: algo que se cuida hasta que se abre. Trabajamos con granos de origen, los tostamos en pequeñas tandas y
        los preparamos sin apuro. Somos el lugar donde venís a laburar con la compu, a charlar sin mirar la hora o a
        llevarte tu café de camino.
      </p>
    </Reveal>
    <Reveal delay={0.15}>
      <Photo name="foto-interior.png" alt="Interior de Yvoty Café" className="aspect-video w-full rounded-3xl shadow-xl" />
    </Reveal>
  </section>
);

const Menu = () => (
  <section id="menu" className="bg-espresso py-20 text-crema md:py-28">
    <div className="mx-auto max-w-6xl px-5">
      <Reveal>
        <h2 className="font-display text-4xl font-bold md:text-5xl">Menú destacado</h2>
        <p className="mt-3 text-crema/70">Lo que más se pide en la barra.</p>
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {menu.map((m, i) => (
          <motion.article
            key={m.nombre}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            whileHover={{ y: -6 }}
            className="flex flex-col justify-between rounded-2xl border border-crema/10 bg-crema/5 p-6 transition-colors hover:border-terracota/60 hover:bg-crema/10"
          >
            <div>
              <h3 className="font-display text-2xl font-bold">{m.nombre}</h3>
              <p className="mt-2 text-crema/75">{m.desc}</p>
            </div>
            <p className="mt-6 font-semibold text-terracota">{m.precio}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

const Porque = () => (
  <section id="porque" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
    <Reveal>
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">Por qué Yvoty</h2>
    </Reveal>
    <div className="mt-12 grid gap-8 md:grid-cols-3">
      {razones.map((r, i) => (
        <Reveal key={r.titulo} delay={i * 0.1} className="text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-hoja/15 text-hoja">
            {iconFor(r.icono)}
          </div>
          <h3 className="mt-5 font-display text-2xl font-bold">{r.titulo}</h3>
          <p className="mt-2 text-espresso/80">{r.texto}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

const Visitanos = () => (
  <section id="visitanos" className="bg-espresso/[0.04] py-20 md:py-28">
    <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-2">
      <Reveal>
        <h2 className="font-display text-4xl font-bold md:text-5xl">Horarios y ubicación</h2>
        <p className="mt-5 text-lg">Av. Las Flores 1240 c/ Calle Itá, Santa Rita, Alto Paraná</p>
        <ul className="mt-6 divide-y divide-espresso/10 rounded-2xl bg-white/60">
          {horarios.map(([d, h]) => (
            <li key={d} className="flex justify-between gap-4 px-5 py-3">
              <span className="font-semibold">{d}</span>
              <span className="text-right">{h}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-espresso/80">
          Estacionamiento en la esquina y bici-rack en la entrada. Si venís con tu taza, te hacemos{" "}
          <strong className="text-terracota">10% de descuento</strong>.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <iframe
          title="Mapa de Santa Rita, Paraguay"
          src="https://www.google.com/maps?q=Santa+Rita,+Paraguay&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-80 w-full rounded-3xl border-0 shadow-xl md:h-full md:min-h-[24rem]"
        />
      </Reveal>
    </div>
  </section>
);

const Testimonios = () => (
  <section className="mx-auto max-w-6xl px-5 py-20 md:py-28">
    <Reveal>
      <h2 className="text-center font-display text-4xl font-bold md:text-5xl">Lo que dicen</h2>
    </Reveal>
    <div className="mt-12 grid gap-6 md:grid-cols-3">
      {testimonios.map((t, i) => (
        <Reveal key={t.autor} delay={i * 0.1}>
          <figure className="flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <blockquote className="font-display text-xl leading-snug">“{t.texto}”</blockquote>
            <figcaption className="mt-5 text-sm text-espresso/70">
              <strong className="text-espresso">{t.autor}</strong>, {t.rol}
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-espresso px-5 py-14 text-crema">
    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
      <div>
        <Logo />
        <p className="mt-3 text-crema/70">Café de especialidad, hecho en Santa Rita</p>
      </div>
      <ul className="space-y-2 text-crema/85">
        <li>
          <a href="https://instagram.com/yvotycafe" className="hover:text-terracota">
            Instagram: @yvotycafe
          </a>
        </li>
        <li>
          <a href="https://wa.me/595981123456" className="hover:text-terracota">
            WhatsApp: +595 981 123 456
          </a>
        </li>
        <li>Av. Las Flores 1240, Santa Rita, Alto Paraná</li>
      </ul>
      <p className="font-display text-2xl italic text-terracota">Vení, probá, quedate un rato.</p>
    </div>
    <p className="mx-auto mt-10 max-w-6xl border-t border-crema/10 pt-6 text-sm text-crema/50">
      © 2026 Yvoty Café · Proyecto de portfolio, marca ficticia.
    </p>
  </footer>
);

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Sobre />
        <Menu />
        <Porque />
        <Visitanos />
        <Testimonios />
      </main>
      <Footer />
    </>
  );
}
