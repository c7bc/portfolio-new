import type { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Line, Logo, Row, Text } from "@once-ui-system/core";

type L = "en" | "pt";
// Correção: selecionar 'pt' apenas quando locale inicia com 'pt'
const pickLocale = (locale?: string): L => (locale?.startsWith("pt") ? "pt" : "en");

/* PERSON */
const person: Record<L, Person> = {
  en: {
    firstName: "Daniel",
    lastName: "Neri",
    name: "Daniel Neri",
    role: "Software & Product Engineer",
    avatar: "/images/avatar.jpg",
    email: "nerilogic@gmail.com",
    location: "America/Sao_Paulo",
    languages: ["English", "Portuguese"],
  },
  pt: {
    firstName: "Daniel",
    lastName: "Neri",
    name: "Daniel Neri",
    role: "Engenheiro de Software & Produto",
    avatar: "/images/avatar.jpg",
    email: "nerilogic@gmail.com",
    location: "America/Sao_Paulo",
    languages: ["Inglês", "Português"],
  },
};

/* NEWSLETTER */
const newsletter: Record<L, Newsletter> = {
  en: {
    display: true,
    title: <>Subscribe to {person.en.firstName}'s Newsletter</>,
    description: <>Weekly insights on architecture, AI orchestration and product engineering.</>,
  },
  pt: {
    display: true,
    title: <>Assine a newsletter de {person.pt.firstName}</>,
    description: <>Insights semanais sobre arquitetura, orquestração de IA e engenharia de produto.</>,
  },
};

/* SOCIAL */
const social: Record<L, Social> = {
  en: [
    { name: "GitHub", icon: "github", link: "https://github.com/c7bc" },
    { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/daniel-neri-51a7b12b3/" },
    { name: "Email", icon: "email", link: `mailto:${person.en.email}` },
  ],
  pt: [
    { name: "GitHub", icon: "github", link: "https://github.com/c7bc" },
    { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/daniel-neri-51a7b12b3/" },
    { name: "E-mail", icon: "email", link: `mailto:${person.pt.email}` },
  ],
};

/* HOME */
const home: Record<L, Home> = {
  en: {
    path: "/",
    image: "/images/d-logo.svg",
    label: "Home",
    title: `${person.en.name}'s Portfolio`,
    description: `Portfolio website showcasing work as a ${person.en.role}`,
    headline: <>Engineering products from idea to resilient platform</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">Vettano</strong>
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Featured platform
          </Text>
        </Row>
      ),
      href: "/work/vettano-real-time-drawing-platform",
    },
    subline: (
      <>
        I'm Daniel, a product‑minded software engineer building multi‑vertical platforms
        <br /> across gaming, AI, marketplaces, events and agro technology.
      </>
    ),
  },
  pt: {
    path: "/",
    image: "/images/d-logo.svg",
    label: "Início",
    title: `Portfólio de ${person.pt.name}`,
    description: `Site portfólio mostrando meu trabalho como ${person.pt.role}`,
    headline: <>Engenharia de produtos da ideia à plataforma resiliente</>,
    featured: {
      display: true,
      title: (
        <Row gap="12" vertical="center">
          <strong className="ml-4">Vettano</strong>
          <Line background="brand-alpha-strong" vert height="20" />
          <Text marginRight="4" onBackground="brand-medium">
            Plataforma em destaque
          </Text>
        </Row>
      ),
      href: "/work/vettano-real-time-drawing-platform",
    },
    subline: (
      <>
        Sou Daniel, engenheiro de produto construindo plataformas multi‑verticais
        <br /> em gaming, IA, marketplaces, eventos e tecnologia agro.
      </>
    ),
  },
};

/* ABOUT */
const about: Record<L, About> = {
  en: {
    path: "/about",
    label: "About",
    title: `About – ${person.en.name}`,
    description: `Meet ${person.en.name}, ${person.en.role} from ${person.en.location}`,
    tableOfContent: { display: true, subItems: true },
    avatar: { display: true },
    calendar: { display: true, link: "https://cal.com/danielneri" },
    intro: {
      display: true,
      title: "Introduction",
      description: (
        <>
          Software Developer and Product Engineer with 3+ years of end‑to‑end experience building
          interfaces, distributed backends and vertical SaaS ecosystems. By 19 I led personal and
          freelance projects spanning UI design, real‑time infrastructure, AI orchestration and domain
          modeling. I turn raw ideas into products that align code, architecture, usability and
          strategic positioning. Currently Founder/CEO or CTO across multiple platforms reusing a
          shared core: authentication, event buses, vector search, observability hooks and data workflows.
        </>
      ),
    },
    work: {
      display: true,
      title: "Founder & Technical Leadership",
      experiences: [
        {
          company: "Vettano",
          timeframe: "2024 – Present",
          role: "Founder & CEO (Real‑Time Drawing Platform)",
          achievements: [
            "Designed low‑latency architecture (multi‑region WebSockets, event routing, room coordination).",
            "Implemented Go + TypeScript services for session routing, matchmaking and live telemetry.",
            "Introduced event-driven patterns for horizontal scaling under burst traffic.",
            "Established observability baseline (structured logs, metrics hooks, tracing stubs).",
          ],
          images: [],
        },
        {
          company: "Infinity Boost",
          timeframe: "2025 – Present",
          role: "Co‑Founder & CTO (Boosting Marketplace)",
          achievements: [
            "Architected secure order lifecycle (request → offers → selection → execution → delivery).",
            "Implemented pricing, escrow logic and dispute / reputation workflows.",
            "High‑throughput order events with PostgreSQL, Redis queues and Go workers.",
            "Planned anti‑fraud & audit logging pipeline.",
          ],
          images: [],
        },
        {
          company: "NexoAI",
          timeframe: "2024 – Present",
          role: "Founder & CEO (Applied AI Integrations)",
          achievements: [
            "Integrated external AI/Next AI SDK services to accelerate feature delivery (summaries, assist flows).",
            "Designed modular prompt + response adapters without maintaining custom model hosting.",
            "Implemented safe fallback & rate limiting layers over third‑party AI APIs.",
            "Added contextual augmentation (basic repository & metadata extraction) for guided code suggestions.",
          ],
          images: [],
        },
        {
          company: "NexoEvent",
          timeframe: "2025 – Present",
          role: "Founder & CTO (Event Operations Platform)",
          achievements: [
            "Scheduling, ticketing, access control, permissions and analytics domains.",
            "Isolated multi‑tenant boundaries with PostgreSQL RLS and clear domain modules.",
            "Webhook + storage export pipeline for third‑party BI tools.",
            "Progressive modularization enabling future add‑ons.",
          ],
          images: [],
        },
        {
          company: "NexoAgro",
          timeframe: "2025 – Present",
            role: "Founder & CEO (Agro Operations & Telemetry)",
          achievements: [
            "Ingested field / operational data into normalized pipelines for task & resource coordination.",
            "Used spatial + time series extensions for agronomic insight queries.",
            "Queued ingestion services feeding analytics & recommendation layer.",
            "Defined blueprint for predictive anomaly & yield estimation modules.",
          ],
          images: [],
        },
        {
          company: "Workana",
          timeframe: "2023 – 2025",
          role: "Freelance Software Engineer (Marketplace)",
          achievements: [
            "Delivered diverse freelance projects: marketing sites, custom dashboards and multi-tenant SaaS platforms.",
            "Led end-to-end architecture (frontend, backend, database, CI) with focus on scalability and maintainability.",
            "Implemented security, performance tuning, caching and automated deployment workflows for client solutions.",
            "Collaborated closely with non-technical stakeholders translating business goals into technical deliverables.",
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Learning & Growth",
      institutions: [
        { name: "Technical High School (Integrated)", description: <>Foundations in programming, systems logic and applied projects.</> },
        { name: "Associate Degree – Systems Analysis & Development (2024–2026)", description: <>In progress: software engineering practices, databases, networking and systems analysis.</> },
        { name: "Specialization Courses (Alura & Udemy)", description: <>Deep dives across Go, Next.js, TypeScript, architecture patterns, testing and DevOps fundamentals.</> },
        { name: "Self‑Directed Engineering Path", description: <>Full‑stack web, distributed concepts and product iteration since age 16.</> },
        { name: "Continuous Practice", description: <>Applying Go, TypeScript, cloud services and pragmatic architecture in multi‑vertical prototypes.</> },
      ],
    },
    technical: {
      display: true,
      title: "Technical Stack & Capabilities",
      skills: [
        {
          title: "Frontend Engineering",
          description: <>Next.js (App Router), React, Angular, performance tuning, accessibility, design systems, Tailwind CSS integration.</>,
          tags: [
            { name: "Next.js", icon: "nextjs" },
            { name: "React", icon: "react" },
            { name: "Angular", icon: "angular" },
            { name: "TypeScript", icon: "typescript" },
            { name: "TailwindCSS", icon: "tailwindcss" },
            { name: "CSS", icon: "css" },
          ],
          images: [],
        },
        {
          title: "Backend & Architecture",
          description: <>Go services, Node.js (Nest.js / Express), modular monolith & microservice patterns, queues, resilience & security layers.</>,
          tags: [
            { name: "Go", icon: "go" },
            { name: "Node.js", icon: "nodejs" },
            { name: "Nest.js", icon: "nestjs" },
            { name: "Express", icon: "nodejs" },
            { name: "C#", icon: "csharp" },
            { name: ".NET", icon: "dotnet" },
          ],
          images: [],
        },
        {
          title: "Data & Persistence",
          description: <>PostgreSQL, MySQL, SQLite, Prisma, GORM, caching, search strategies, pragmatic modeling & migrations.</>,
          tags: [
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "MySQL", icon: "mysql" },
            { name: "SQLite", icon: "sqlite" },
            { name: "Prisma", icon: "prisma" },
            { name: "GORM", icon: "database" },
          ],
          images: [],
        },
        {
          title: "Cloud & Infrastructure",
          description: <>AWS (core services), Firebase, containers, CI/CD, baseline observability, cost‑aware decisions.</>,
          tags: [
            { name: "AWS", icon: "aws" },
            { name: "Firebase", icon: "firebase" },
            { name: "Docker", icon: "docker" },
          ],
          images: [],
        },
        {
          title: "AI Integration",
          description: <>Integration of external AI SDKs (e.g. Next AI SDK) for augmenting features (summaries, assist flows) with safe fallback, prompt shaping and rate limits — no custom model hosting or embeddings stack.</>,
          tags: [
            { name: "AI", icon: "spark" },
            { name: "SDK", icon: "spark" },
          ],
          images: [],
        },
        {
          title: "Mobile Engineering",
          description: <>Prototyping with Flutter & React Native, navigation patterns, state management and integration with shared backend services.</>,
          tags: [
            { name: "Flutter", icon: "flutter" },
            { name: "React Native", icon: "react" },
          ],
          images: [],
        },
        {
          title: "Design Systems & UX",
          description: <>Figma workflows, component libraries, token systems, interaction specs, iterative UX flows supporting engineering delivery.</>,
          tags: [
            { name: "Figma", icon: "figma" },
          ],
          images: [],
        },
      ],
    },
  },
  pt: {
    path: "/about",
    label: "Sobre",
    title: `Sobre – ${person.pt.name}`,
    description: `Conheça ${person.pt.name}, ${person.pt.role} em ${person.pt.location}`,
    tableOfContent: { display: true, subItems: true },
    avatar: { display: true },
    calendar: { display: true, link: "https://cal.com/danielneri" },
    intro: {
      display: true,
      title: "Introdução",
      description: (
        <>
          Engenheiro de Software e Produto com 3+ anos de experiência ponta a ponta construindo
          interfaces, backends distribuídos e ecossistemas SaaS verticais. Aos 19 liderei projetos
          pessoais e freelances cobrindo design de interface, infraestrutura em tempo real,
          orquestração de IA e modelagem de domínios. Transformo ideias em produtos que alinham
          código, arquitetura, usabilidade e estratégia. Atuo como Founder/CEO ou CTO em múltiplas
          plataformas reaproveitando um core compartilhado: autenticação, barramento de eventos,
          busca vetorial, ganchos de observabilidade e pipelines de dados.
        </>
      ),
    },
    work: {
      display: true,
      title: "Atuação como Founder & Liderança Técnica",
      experiences: [
        {
          company: "Vettano",
          timeframe: "2024 – Atual",
          role: "Founder & CEO (Plataforma de Desenho em Tempo Real)",
          achievements: [
            "Arquitetura de baixa latência (WebSockets multi‑região, roteamento de eventos, coordenação de salas).",
            "Serviços em Go + TypeScript para roteamento de sessão, matchmaking e telemetria ao vivo.",
            "Padrões event‑driven garantindo escalabilidade horizontal em picos.",
            "Baseline de observabilidade (logs estruturados, métricas, tracing inicial).",
          ],
          images: [],
        },
        {
          company: "Infinity Boost",
          timeframe: "2025 – Atual",
          role: "Co‑Founder & CTO (Marketplace de Boosting)",
          achievements: [
            "Arquitetura do ciclo completo de pedidos (solicitação → ofertas → seleção → execução → entrega).",
            "Engine de preços, lógica de escrow e fluxo de disputa / reputação.",
            "Eventos de pedido em alto volume com PostgreSQL, filas Redis e workers Go.",
            "Planejamento de pipeline antifraude e auditoria.",
          ],
          images: [],
        },
        {
          company: "NexoAI",
          timeframe: "2024 – Atual",
          role: "Founder & CEO (Integrações de IA Aplicada)",
          achievements: [
            "Integração de SDKs externos (ex: Next AI SDK) para recursos de resumo e assistência contextual.",
            "Adapters modulares de prompt + resposta sem hospedar modelos próprios.",
            "Camadas de fallback seguro e rate limiting sobre APIs de IA terceiras.",
            "Augmentação contextual básica (metadados / repositório) para sugestões guiadas.",
          ],
          images: [],
        },
        {
          company: "NexoEvent",
          timeframe: "2025 – Atual",
          role: "Founder & CTO (Plataforma de Operações de Eventos)",
          achievements: [
            "Domínios: agendamento, ticketing, controle de acesso, permissões e analytics.",
            "Isolamento multi‑tenant com PostgreSQL RLS e módulos de domínio claros.",
            "Pipeline de exportação (webhooks + storage) para BI externo.",
            "Modularização progressiva permitindo extensões futuras.",
          ],
          images: [],
        },
        {
          company: "NexoAgro",
          timeframe: "2025 – Atual",
          role: "Founder & CEO (Operações & Telemetria Agro)",
          achievements: [
            "Ingestão de dados de campo em pipelines normalizados para coordenação de tarefas e recursos.",
            "Uso de extensões espaciais e séries temporais para consultas e insights agronômicos.",
            "Serviços de ingestão em fila alimentando camada de analytics e recomendações.",
            "Blueprint para módulos preditivos (anomalias e estimativa de safra).",
          ],
          images: [],
        },
        {
          company: "Workana",
          timeframe: "2023 – 2025",
          role: "Desenvolvedor Freelancer (Marketplace)",
          achievements: [
            "Entrega de projetos variados: sites institucionais, dashboards customizados e SaaS multi‑tenant complexos.",
            "Arquitetura ponta a ponta (frontend, backend, banco, CI) com foco em escalabilidade e manutenção.",
            "Implementação de segurança, performance, caching e automação de deploy para clientes.",
            "Colaboração direta com stakeholders não técnicos traduzindo objetivos de negócio em entregas técnicas.",
          ],
          images: [],
        },
      ],
    },
    studies: {
      display: true,
      title: "Aprendizado & Evolução",
      institutions: [
        { name: "Ensino Médio Técnico (Integrado)", description: <>Fundamentos de programação, lógica de sistemas e projetos aplicados.</> },
        { name: "Faculdade – Análise e Desenvolvimento de Sistemas (2024–2026)", description: <>Em andamento: engenharia de software, bancos de dados, redes e análise de sistemas.</> },
        { name: "Cursos de Especialização (Alura & Udemy)", description: <>Go, Next.js, TypeScript, padrões de arquitetura, testes e fundamentos de DevOps.</> },
        { name: "Trilha Autodidata", description: <>Full‑stack web, conceitos distribuídos e iteração de produto desde os 16 anos.</> },
        { name: "Prática Contínua", description: <>Aplicação de Go, TypeScript, serviços cloud e arquitetura pragmática em protótipos multi‑verticais.</> },
      ],
    },
    technical: {
      display: true,
      title: "Stack & Competências Técnicas",
      skills: [
        {
          title: "Frontend",
          description: <>Next.js (App Router), React, Angular, desempenho, acessibilidade, design systems e integração com Tailwind CSS.</>,
          tags: [
            { name: "Next.js", icon: "nextjs" },
            { name: "React", icon: "react" },
            { name: "Angular", icon: "angular" },
            { name: "TypeScript", icon: "typescript" },
            { name: "TailwindCSS", icon: "tailwindcss" },
            { name: "CSS", icon: "css" },
          ],
          images: [],
        },
        {
          title: "Backend & Arquitetura",
          description: <>Serviços em Go, Node.js (Nest.js / Express), padrões modular monolith & microservices, filas, resiliência e camadas de segurança.</>,
          tags: [
            { name: "Go", icon: "go" },
            { name: "Node.js", icon: "nodejs" },
            { name: "Nest.js", icon: "nestjs" },
            { name: "Express", icon: "nodejs" },
            { name: "C#", icon: "csharp" },
            { name: ".NET", icon: "dotnet" },
          ],
          images: [],
        },
        {
          title: "Dados & Persistência",
          description: <>PostgreSQL, MySQL, SQLite, Prisma, GORM, caching, estratégias de busca e modelagem pragmática.</>,
          tags: [
            { name: "PostgreSQL", icon: "postgresql" },
            { name: "MySQL", icon: "mysql" },
            { name: "SQLite", icon: "sqlite" },
            { name: "Prisma", icon: "prisma" },
            { name: "GORM", icon: "database" },
          ],
          images: [],
        },
        {
          title: "Cloud & Infra",
          description: <>AWS (serviços centrais), Firebase, containers, CI/CD, observabilidade básica e decisões orientadas a custo.</>,
          tags: [
            { name: "AWS", icon: "aws" },
            { name: "Firebase", icon: "firebase" },
            { name: "Docker", icon: "docker" },
          ],
          images: [],
        },
        {
          title: "Integração de IA",
          description: <>Integração de SDKs externos (ex: Next AI SDK) para features de resumo e assistência com fallback seguro, ajustes de prompts e rate limiting — sem hosting próprio ou stack de embeddings.</>,
          tags: [
            { name: "IA", icon: "spark" },
            { name: "SDK", icon: "spark" },
          ],
          images: [],
        },
        {
          title: "Mobile",
          description: <>Protótipos com Flutter & React Native, padrões de navegação, gestão de estado e integração com serviços compartilhados.</>,
          tags: [
            { name: "Flutter", icon: "flutter" },
            { name: "React Native", icon: "react" },
          ],
          images: [],
        },
        {
          title: "Design Systems & UX",
          description: <>Fluxos em Figma, bibliotecas de componentes, tokens, especificações de interação e UX iterativa apoiando a engenharia.</>,
          tags: [
            { name: "Figma", icon: "figma" },
          ],
          images: [],
        },
      ],
    },
  },
};

/* BLOG */
const blog: Record<L, Blog> = {
  en: {
    path: "/blog",
    label: "Blog",
    title: "Writing about architecture, AI & product...",
    description: `Read what ${person.en.name} has been exploring recently`,
  },
  pt: {
    path: "/blog",
    label: "Blog",
    title: "Escrevendo sobre arquitetura, IA e produto...",
    description: `Leia o que ${person.pt.name} tem explorado recentemente`,
  },
};

/* WORK */
const work: Record<L, Work> = {
  en: {
    path: "/work",
    label: "Work",
    title: `Projects – ${person.en.name}`,
    description: `Engineering & product platforms by ${person.en.name}`,
  },
  pt: {
    path: "/work",
    label: "Projetos",
    title: `Projetos – ${person.pt.name}`,
    description: `Plataformas de engenharia e produto de ${person.pt.name}`,
  },
};

/* GALLERY (unchanged placeholders) */
const gallery: Record<L, Gallery> = {
  en: {
    path: "/gallery",
    label: "Gallery",
    title: `Photo gallery – ${person.en.name}`,
    description: `A photo collection by ${person.en.name}`,
    // Currently only one gallery image exists physically. Add more files under public/images/gallery and list here.
    images: [
      { src: "/images/gallery/horizontal-1.jpg", alt: "image", orientation: "horizontal" }
    ],
  },
  pt: {
    path: "/gallery",
    label: "Galeria",
    title: `Galeria de fotos – ${person.pt.name}`,
    description: `Uma coleção de fotos de ${person.pt.name}`,
    images: [
      { src: "/images/gallery/horizontal-1.jpg", alt: "imagem", orientation: "horizontal" }
    ],
  },
};

/* EXPORT HELPERS */
export function getContent(locale?: string) {
  const l = pickLocale(locale);
  return {
    person: person[l],
    social: social[l],
    newsletter: newsletter[l],
    home: home[l],
    about: about[l],
    blog: blog[l],
    work: work[l],
    gallery: gallery[l],
  };
}

/* Backwards compatibility (default = en) */
export const personDefault = person.en;
export const homeDefault = home.en;
export const aboutDefault = about.en;
export const blogDefault = blog.en;
export const workDefault = work.en;
export const galleryDefault = gallery.en;
export const newsletterDefault = newsletter.en;
export const socialDefault = social.en;
// Compat legacy named exports
export { personDefault as person, socialDefault as social, homeDefault as home, aboutDefault as about, blogDefault as blog, workDefault as work, galleryDefault as gallery, newsletterDefault as newsletter };