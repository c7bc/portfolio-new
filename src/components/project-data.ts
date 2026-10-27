export type Locale = 'pt' | 'en';
type Copy = Record<Locale, string>;
export type Project = {
  id: string; name: string; logo: string; category: Copy; description: Copy; status: Copy;
  role: Copy; stack: string[]; image: string; film?: string; duration?: string;
  url?: string; source?: string; challenge: Copy; architecture: Copy;
  built: Record<Locale, string[]>; gallery: string[]; accent: string;
};
export const projects: Project[] = [
  {
    id: 'vettano', name: 'Vettano', logo:'/media/brands/vettano.svg', category: {pt:'Jogo social · tempo real',en:'Social game · real time'},
    description: {pt:'Um ateliê onde desenhar vira uma experiência compartilhada. Um mundo em 2.5D, sustentado por uma arquitetura de serviços em Go.',en:'An atelier where drawing becomes a shared experience. A 2.5D world, supported by a Go services architecture.'},
    status: {pt:'No ar · reboot em Godot/C#',en:'Live · Godot/C# reboot'}, role:{pt:'Fundador · design e engenharia',en:'Founder · design & engineering'},
    stack:['Godot / C#','Go','PostgreSQL','Redis','NATS','Kubernetes','AWS'],
    image:'/media/cinema/vettano-poster.webp',film:'/films/vettano.mp4',duration:'01:05',url:'https://vettano.com',accent:'#dcb166',
    challenge:{pt:'Fazer clientes e serviços concordarem sobre o estado de uma partida em tempo real, sem perder o cuidado com a experiência visual.',en:'Keep clients and services in agreement on real-time match state, while giving the visual experience the same care.'},
    architecture:{pt:'Mais de dez microsserviços em Go organizam autenticação, lobby, partidas e recursos sociais. PostgreSQL, Redis e NATS apoiam persistência, estado e comunicação. O cliente, antes em React, está sendo reconstruído em Godot/C# com direção visual 2.5D. Kubernetes, AWS e Cloudflare fazem parte do trabalho de infraestrutura. A arquitetura foi projetada para evoluir com a demanda do produto.',en:'More than ten Go microservices organize authentication, lobbies, matches and social features. PostgreSQL, Redis and NATS support persistence, state and communication. Previously built in React, the client is being rebuilt in Godot/C# with a 2.5D visual direction. Infrastructure work includes Kubernetes, AWS and Cloudflare. The architecture was designed to evolve with product demand.'},
    built:{pt:['Arquitetura e implementação dos serviços de backend.','Cliente Godot/C#, interface e direção visual do reboot.','Integração entre partidas, recursos sociais e operação da infraestrutura.'],en:['Backend services architecture and implementation.','Godot/C# client, interface and reboot visual direction.','Integration of matches, social features and infrastructure operations.']},
    gallery:['/media/cinema/vettano-home.webp','/media/cinema/vettano-gallery.webp','/media/vettano-dev.webp'],
  },
  {
    id:'zapyflow',name:'Zapyflow', logo:'/media/brands/zapyflow.svg',category:{pt:'SaaS · automação e IA',en:'SaaS · automation & AI'},
    description:{pt:'Conversas, agentes e operação no mesmo lugar. Atendimento pelo WhatsApp com IA, CRM e automações visuais.',en:'Conversations, agents and operations in one place. WhatsApp support with AI, CRM and visual automation.'},
    status:{pt:'No ar · desenvolvimento contínuo',en:'Live · ongoing development'},role:{pt:'Fundador · produto e engenharia',en:'Founder · product & engineering'},
    stack:['React','TypeScript','Fastify','Prisma','BullMQ','WhatsApp API'],image:'/media/cinema/zapyflow-poster.webp',film:'/films/zapyflow.mp4',duration:'00:39',url:'https://zapyflow.com.br',accent:'#d3ef70',
    challenge:{pt:'Conectar conversas, leads e automações sem perder o contexto quando o atendimento passa para uma pessoa.',en:'Connect conversations, leads and automation without losing context when a human takes over.'},
    architecture:{pt:'O frontend em React organiza a operação. A API em TypeScript/Fastify conecta persistência com Prisma, filas e integrações de mensagens. Agentes com base de conhecimento e fluxos visuais trabalham junto ao atendimento humano. Falhas de integração, estado da conversa e retomada fazem parte do desenho do sistema.',en:'The React frontend organizes operations. A TypeScript/Fastify API connects Prisma persistence, queues and messaging integrations. Knowledge-based agents and visual flows work alongside human support. Integration failures, conversation state and recovery are part of the system design.'},
    built:{pt:['Painel de atendimento, CRM e editor visual de fluxos.','Backend, integrações de mensagens e agentes de IA.','Deploy, monitoramento e operação técnica do produto.'],en:['Support dashboard, CRM and visual flow editor.','Backend, messaging integrations and AI agents.','Deployment, monitoring and technical operations.']},
    gallery:['/media/cinema/zapyflow-conversation.webp','/media/cinema/zapyflow-channels.webp'],
  },
  {
    id:'orvunia',name:'Orvunia', logo:'/media/brands/orvunia.svg',category:{pt:'Desktop · IA contextual',en:'Desktop · contextual AI'},
    description:{pt:'Uma camada de assistência ao lado da conversa. Experiência desktop que reúne contexto, transcrição e modelos de IA.',en:'An assistance layer alongside the conversation. A desktop experience bringing context, transcription and AI models together.'},
    status:{pt:'No ar · código aberto',en:'Live · open source'},role:{pt:'Produto próprio · design e engenharia',en:'Independent product · design & engineering'},
    stack:['TypeScript','Bun','Elysia','SQLite','PostgreSQL','LLMs'],image:'/media/cinema/orvunia-poster.webp',film:'/films/orvunia.mp4',duration:'00:42',url:'https://orvunia.com',source:'https://github.com/c7bc/orvunia',accent:'#93cbb5',
    challenge:{pt:'Reunir contexto e assistência em uma interface desktop leve, sem transformar a conversa em uma tela de configurações.',en:'Bring context and assistance into a focused desktop interface without turning the conversation into a settings screen.'},
    architecture:{pt:'A experiência reúne transcrição, contexto de conversas, respostas e histórico. O ecossistema usa TypeScript/Bun, APIs em Elysia, SQLite e PostgreSQL em seus respectivos componentes. O núcleo público e os serviços cloud têm responsabilidades distintas.',en:'The experience combines transcription, conversation context, responses and history. The ecosystem uses TypeScript/Bun, Elysia APIs, SQLite and PostgreSQL across its components. The public core and cloud services have distinct responsibilities.'},
    built:{pt:['Experiência desktop, onboarding e configurações.','Integração de modelos de IA e contexto de conversas.','Organização entre núcleo público e serviços cloud.'],en:['Desktop experience, onboarding and preferences.','AI model and conversation-context integration.','Separation of the public core and cloud services.']},
    gallery:['/media/cinema/orvunia-home.webp','/media/cinema/orvunia-settings.webp'],
  },
  {
    id:'kalevo',name:'Kalevo', logo:'/media/brands/kalevo.svg',category:{pt:'Eventos · ingressos',en:'Events · ticketing'},
    description:{pt:'Da descoberta do evento ao controle de acesso. Plataforma de ingressos, gestão e streaming, antes chamada Bregashow.',en:'From discovering an event to entry control. A ticketing, management and streaming platform, formerly Bregashow.'},
    status:{pt:'Projeto comercial encerrado',en:'Commercial project discontinued'},role:{pt:'Sócio · toda a parte técnica',en:'Partner · full technical responsibility'},stack:['Next.js','TypeScript','Supabase','PostgreSQL','Mux'],image:'/media/kalevo.jpg',url:'https://kalevo.com.br',accent:'#a7a4e0',
    challenge:{pt:'Conectar publicação de eventos, venda de ingressos e operação de acesso em uma experiência consistente.',en:'Connect event publication, ticket sales and entry operations in a consistent experience.'},
    architecture:{pt:'Next.js/TypeScript no frontend, Supabase/PostgreSQL para os dados, Mux para streaming e QR code para validação de acesso. O domínio preserva uma versão do produto; não representa continuidade comercial.',en:'Next.js/TypeScript frontend, Supabase/PostgreSQL data, Mux streaming and QR-code entry validation. The domain preserves a version of the product, without implying ongoing commercial operations.'},
    built:{pt:['Frontend público e painel de gestão.','Fluxos de ingressos e validação por QR code.','Integrações de dados e streaming.'],en:['Public frontend and management dashboard.','Ticketing and QR-code validation flows.','Data and streaming integrations.']},gallery:['/media/kalevo.jpg'],
  },
  {
    id:'infinity',name:'Infinity Boost', logo:'/media/brands/infinity.svg',category:{pt:'Marketplace · jogos',en:'Marketplace · games'},
    description:{pt:'Ofertas, pedidos, pagamentos e conversas em um marketplace de serviços para jogos.',en:'Offers, orders, payments and conversations in a marketplace for gaming services.'},
    status:{pt:'Projeto comercial encerrado',en:'Commercial project discontinued'},role:{pt:'Sócio · toda a parte técnica',en:'Partner · full technical responsibility'},stack:['Next.js','Go / Gin','PostgreSQL','WebSocket','Stripe'],image:'/media/infinity-home.jpg',accent:'#b7c7ec',
    challenge:{pt:'Conectar compradores e prestadores ao longo da negociação e da entrega de um serviço.',en:'Connect buyers and providers throughout the negotiation and delivery of a service.'},
    architecture:{pt:'Frontend Next.js e API Go/Gin. PostgreSQL para persistência, WebSocket para comunicação e Stripe para pagamentos. As capturas registram o produto construído, sem representar operação atual.',en:'Next.js frontend and Go/Gin API. PostgreSQL persistence, WebSocket communication and Stripe payments. The captures document the built product, without implying current operations.'},
    built:{pt:['Frontend, backend e ferramentas administrativas.','Fluxos de ofertas, pedidos e comunicação.','Pagamentos e operação técnica.'],en:['Frontend, backend and administrative tools.','Offers, orders and communication flows.','Payments and technical operations.']},gallery:['/media/infinity-order.jpg','/media/infinity-offer.jpg'],
  },
];
