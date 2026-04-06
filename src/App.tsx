import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Bot, 
  Zap, 
  Target, 
  CheckCircle2, 
  Mail, 
  Phone, 
  Terminal, 
  TrendingUp, 
  Palette, 
  Menu, 
  X,
  ChevronRight,
  Globe,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      isScrolled ? "bg-surface/80 backdrop-blur-xl py-4 shadow-lg" : "bg-transparent py-6"
    )}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          {!logoError ? (
            <img 
              src="https://storage.googleapis.com/static.aistudio.google.com/content/file-1.png" 
              alt="DeltaX" 
              className="h-14 w-auto"
              onError={() => setLogoError(true)}
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex items-center">
              <span className="text-2xl font-bold font-headline tracking-tighter text-white">
                DeltaX
              </span>
            </div>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.name}
              to={link.path}
              className={cn(
                "font-headline tracking-tight transition-colors hover:text-white",
                location.pathname === link.path ? "text-primary-pulse-end border-b-2 border-primary-pulse-end pb-1" : "text-gray-400"
              )}
            >
              {link.name}
            </Link>
          ))}
          <button className="primary-gradient text-black font-bold px-6 py-2.5 rounded-lg text-sm active:scale-95 transition-transform">
            Book Your Audit
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-surface-high border-t border-white/5 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "font-headline text-xl tracking-tight",
                    location.pathname === link.path ? "text-primary-pulse-end" : "text-gray-400"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <button className="primary-gradient text-black font-bold px-6 py-4 rounded-lg text-lg">
                Book Your Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  const [logoError, setLogoError] = useState(false);
  return (
    <footer className="w-full border-t border-white/5 bg-surface py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <div className="mb-4">
            {!logoError ? (
              <img 
                src="https://storage.googleapis.com/static.aistudio.google.com/content/file-1.png" 
                alt="DeltaX" 
                className="h-10 w-auto"
                onError={() => setLogoError(true)}
                referrerPolicy="no-referrer"
              />
          ) : (
            <div className="flex items-center">
              <span className="text-xl font-bold font-headline tracking-tighter text-white">
                DeltaX
              </span>
            </div>
          )}
          </div>
          <p className="text-gray-500 text-sm">© 2024 DeltaX. All rights reserved.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
          <a href="#" className="hover:text-primary-pulse-end transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-pulse-end transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-pulse-end transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary-pulse-end transition-colors">Careers</a>
        </div>
      </div>
    </footer>
  );
};

// --- Pages ---

const HomePage = () => (
  <div className="relative">
    {/* Hero */}
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden px-6 md:px-12">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="font-headline text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-[0.95] tracking-tight mb-8">
            All Your Business Needs.<br />
            <span>One Powerful System.</span>
          </h1>
          <p className="text-gray-400 text-xl md:text-2xl leading-relaxed max-w-2xl mb-12">
            Transform complexity into clarity. We synchronize your strategy, tech, and creative execution into a high-performance growth engine.
          </p>
          <div className="flex flex-wrap gap-6">
            <button className="primary-gradient text-black font-bold px-8 py-4 rounded-lg text-lg flex items-center gap-3 active:scale-95 transition-all shadow-[0_0_30px_rgba(0,122,255,0.3)]">
              Book Your Audit
              <ArrowRight size={20} />
            </button>
            <button className="border border-white/10 hover:border-primary-pulse-end transition-colors text-white font-semibold px-8 py-4 rounded-lg text-lg active:scale-95">
              Explore Services
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* Philosophy */}
    <section className="py-32 px-6 md:px-12 bg-surface-low">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <span className="text-primary-pulse-end font-headline font-bold uppercase tracking-[0.2em] text-sm">The Philosophy</span>
          <h2 className="font-headline text-5xl md:text-7xl font-bold mt-4">The Integrated System</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Bot className="text-primary-pulse-end" />, title: "One Unified Team", desc: "No more managing multiple agencies. Our integrated model brings strategists, engineers, and designers into a single, cohesive strike force." },
            { icon: <Zap className="text-primary-pulse-end" />, title: "Streamlined Workflow", desc: "We remove friction by eliminating hand-off delays. Your vision flows seamlessly from initial audit to final scale-up phases." },
            { icon: <Target className="text-primary-pulse-end" />, title: "Clear Execution", desc: "Data-driven decisions and transparent metrics. We don't just \"do work\"—we execute systems that drive measurable business outcomes." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-surface-highest flex items-center justify-center rounded-xl">
                {item.icon}
              </div>
              <h3 className="font-headline text-2xl font-bold">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Services Ecosystem */}
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="font-headline text-5xl md:text-7xl font-bold">Our Service Ecosystem</h2>
          <p className="text-gray-400 text-xl mt-6 max-w-2xl">High-precision tools for every stage of your business journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { tag: "CoreXs", title: "Strategy & Audit", items: ["Business Audit", "Market Analysis", "Strategic Planning"] },
            { tag: "CodeXs", title: "Development", items: ["Web & App Build", "Workflow Automation", "Tech Infrastructure"] },
            { tag: "ScaleXs", title: "Marketing & Growth", items: ["Paid Media Ads", "Social & Content", "Growth Analytics"] },
            { tag: "StyleXs", title: "Branding & Design", items: ["Brand Identity", "UI/UX Systems", "Visual Narratives"] }
          ].map((service, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="glass-card p-8 rounded-xl border-t-2 border-primary-pulse-start/30 group transition-all duration-500"
            >
              <span className="text-primary-pulse-end text-xs font-bold tracking-widest uppercase mb-4 block">{service.tag}</span>
              <h4 className="font-headline text-2xl font-bold mb-6">{service.title}</h4>
              <ul className="space-y-4 text-gray-400">
                {service.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-primary-pulse-end" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Protocol */}
    <section className="py-32 px-6 md:px-12 bg-surface-lowest">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <span className="text-primary-pulse-end font-headline font-bold uppercase tracking-[0.2em] text-sm">Our Process</span>
            <h2 className="font-headline text-5xl md:text-7xl font-bold mt-4">The DeltaX Protocol</h2>
          </div>
          <p className="text-gray-400 max-w-md leading-relaxed">
            A systematic approach to evolution. No guesswork, just documented progress through four critical phases.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block absolute top-[1.25rem] left-0 w-full h-[1px] bg-white/5" />
          {[
            { step: "1", title: "Audit", desc: "Deconstruct your current operations to find bottlenecks and hidden opportunities." },
            { step: "2", title: "Build", desc: "Engineer the infrastructure and creative assets required for your specific trajectory." },
            { step: "3", title: "Launch", desc: "Deploy systems with precision monitoring and tactical marketing support." },
            { step: "4", title: "Optimize", desc: "Analyze performance data to refine and scale what is working most efficiently." }
          ].map((phase, i) => (
            <div key={i} className="relative pt-12">
              <div className={cn(
                "absolute top-0 left-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold z-10",
                i === 0 ? "primary-gradient text-black" : "bg-surface-highest border border-white/10 text-white"
              )}>
                {phase.step}
              </div>
              <h4 className="font-headline text-xl font-bold mb-4">{phase.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{phase.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
        <div className="lg:col-span-5">
          <h2 className="font-headline text-5xl md:text-7xl font-bold mb-10">Start Your Project</h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-12">Ready to implement the powerful system your business deserves? Let's discuss your audit.</p>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-lg bg-surface-highest flex items-center justify-center">
                <Mail className="text-primary-pulse-end" />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Email Us</p>
                <p className="text-lg font-medium">hello@deltax.agency</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-lg bg-surface-highest flex items-center justify-center">
                <Phone className="text-primary-pulse-end" />
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest font-bold">Call Us</p>
                <p className="text-lg font-medium">+1 (555) 0123-4567</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass-card p-10 rounded-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-surface-highest/50 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-pulse-end/50 text-white placeholder-gray-600" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full bg-surface-highest/50 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-pulse-end/50 text-white placeholder-gray-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Your Message</label>
                <textarea rows={5} placeholder="Tell us about your business goals..." className="w-full bg-surface-highest/50 border-none rounded-lg p-4 focus:ring-2 focus:ring-primary-pulse-end/50 text-white placeholder-gray-600 resize-none" />
              </div>
              <button className="w-full primary-gradient text-black font-bold py-4 rounded-lg text-lg active:scale-95 transition-all">
                Send Brief
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const AboutPage = () => (
  <div className="pt-32 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <header className="mb-24">
        <h1 className="text-6xl md:text-8xl font-bold font-headline leading-none tracking-tighter mb-8">
          Architecture for <br />
          <span className="text-gradient">Scale.</span>
        </h1>
        <p className="text-gray-400 text-xl leading-relaxed max-w-2xl">
          The catalyst for modern enterprise evolution, merging strategic rigor with futuristic execution to redefine what business growth looks like.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start mb-32">
        <div className="md:col-span-4">
          <span className="text-primary-pulse-end font-mono text-sm tracking-[0.2em] mb-4 block">01 / GENESIS</span>
          <h2 className="text-4xl font-headline font-bold">The DeltaX Story</h2>
        </div>
        <div className="md:col-span-8">
          <div className="glass-card p-10 rounded-xl border-t border-white/5">
            <h3 className="text-2xl font-headline font-semibold mb-6">A Unified Convergence</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Founded on the principle that fragmented solutions lead to fractured growth, DeltaX was born from the integration of four distinct powerhouses: elite strategy consultants, visionary technologists, data-driven marketers, and award-winning designers.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Target />, label: "Strategy" },
                { icon: <Terminal />, label: "Technology" },
                { icon: <TrendingUp />, label: "Marketing" },
                { icon: <Palette />, label: "Design" }
              ].map((item, i) => (
                <div key={i} className="bg-surface-low p-6 rounded-lg flex items-center gap-4">
                  <div className="text-primary-pulse-end">{item.icon}</div>
                  <span className="font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 text-center">
        <span className="text-primary-pulse-end font-headline font-bold uppercase tracking-[0.2em] text-sm">The Purpose</span>
        <h2 className="font-headline text-5xl md:text-7xl font-bold mt-4 mb-8">Streamlining Complexity</h2>
        <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-20">
          In an era of hyper-competition, our mission is to remove the friction of growth. We simplify the complex, allowing businesses to move at the speed of their ambition.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Identify", desc: "We audit the structural inefficiencies holding back your market potential." },
            { step: "02", title: "Synthesize", desc: "Cross-departmental integration of tools and processes to create a single source of truth." },
            { step: "03", title: "Accelerate", desc: "Continuous optimization loops that ensure growth is both rapid and sustainable." }
          ].map((item, i) => (
            <div key={i} className="bg-surface-low p-12 text-left space-y-6">
              <div className="text-6xl font-headline font-bold text-surface-highest">{item.step}</div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

const ServicesPage = () => (
  <div className="pt-32 px-6 md:px-12">
    <div className="max-w-7xl mx-auto">
      <header className="mb-24">
        <span className="text-primary-pulse-end font-medium tracking-[0.2em] text-xs uppercase mb-4 block">Engineered for Excellence</span>
        <h1 className="text-6xl md:text-8xl font-bold font-headline leading-none tracking-tighter mb-8">
          The Service <br />
          <span className="text-gradient">Ecosystem</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl">
          Precision-grade business solutions designed for the digital vanguard. We dismantle complexity and rebuild it into high-performance kinetic monoliths.
        </p>
      </header>

      <div className="space-y-32 pb-32">
        {[
          { 
            id: "corexs", 
            tag: "CoreXs", 
            title: "Strategy & Business Audit", 
            icon: <Layers />, 
            desc: "The foundation of every monolith. We perform deep structural analysis to identify friction and engineer pathways for absolute market dominance.",
            items: ["Comprehensive Market Gap Analysis", "Structural Operational Audit", "Kinetic Growth Roadmap", "Revenue Stream Engineering"],
            plans: [
              { name: "Base Audit", price: "$5,000", desc: "Focus on core bottlenecks and immediate structural repairs." },
              { name: "Enterprise Strategy", price: "$12,000", desc: "Full-scale ecosystem analysis and 12-month implementation plan." }
            ],
            img: "https://picsum.photos/seed/strategy/1200/800"
          },
          { 
            id: "codexs", 
            tag: "CodeXs", 
            title: "Development & Tech Stack", 
            icon: <Terminal />, 
            desc: "Hard-coded excellence. We build digital infrastructure that doesn't just work—it dominates. High-performance, scalable, and immutable code.",
            items: ["Custom SaaS Development", "Architecture Migration", "System Integration & API Design", "Performance Optimization"],
            plans: [
              { name: "MVP Sprint", price: "$15k+", desc: "Rapid deployment of high-performance core functionality." },
              { name: "Custom Scale", price: "Contact", desc: "Tailored infrastructure for enterprise-level demands." }
            ],
            img: "https://picsum.photos/seed/code/1200/800",
            reverse: true
          },
          { 
            id: "scalexs", 
            tag: "ScaleXs", 
            title: "Marketing & Growth", 
            icon: <TrendingUp />, 
            desc: "Aggressive velocity. We don't just find customers; we engineer ecosystems where your brand is the only logical choice.",
            items: ["Precision Ad Campaigns", "Social Identity Management", "Authority-Based SEO", "Conversion Funnel Engineering"],
            plans: [
              { name: "Performance Retainer", price: "$3,500/mo", desc: "Fully managed growth engine focused on ROI and brand expansion." },
              { name: "Scale-Up Phase", price: "Custom", desc: "Aggressive market penetration for established systems." }
            ],
            img: "https://picsum.photos/seed/marketing/1200/800"
          },
          { 
            id: "stylexs", 
            tag: "StyleXs", 
            title: "Branding & Visual Design", 
            icon: <Palette />, 
            desc: "Visual authority. We craft identities that command respect and environments that evoke emotion. Aesthetic meets function at the highest level.",
            items: ["Logo & Visual ID Systems", "Brand Style Architecture", "High-end UI/UX Design", "Motion Design & Assets"],
            plans: [
              { name: "Visual ID", price: "$7,500", desc: "Complete brand identity system and visual guidelines." },
              { name: "Digital UI", price: "$10k+", desc: "High-end user interface design for complex platforms." }
            ],
            img: "https://picsum.photos/seed/design/1200/800",
            reverse: true
          }
        ].map((service, i) => (
          <section key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className={cn("lg:col-span-4 sticky top-32", service.reverse && "lg:order-2")}>
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary-pulse-end">{service.icon}</div>
                <h2 className="text-4xl font-headline font-bold">{service.tag}</h2>
              </div>
              <p className="text-primary-pulse-end mb-8 text-sm uppercase tracking-widest font-semibold">{service.title}</p>
              <p className="text-gray-400 mb-12 leading-relaxed">{service.desc}</p>
              <button className="w-full py-4 border border-white/10 hover:border-primary-pulse-end transition-all flex justify-between items-center px-6">
                <span>Get Started</span>
                <ArrowRight size={20} />
              </button>
            </div>
            <div className={cn("lg:col-span-8", service.reverse && "lg:order-1")}>
              <div className="glass-card rounded-xl p-8 border-t-2 border-primary-pulse-start/30">
                <img src={service.img} alt={service.tag} className="w-full h-[400px] object-cover rounded-lg mb-8 grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
                <h3 className="text-2xl font-headline font-bold mb-8">Service Deliverables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                  {service.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-3 py-4 border-b border-white/5">
                      <CheckCircle2 size={18} className="text-primary-pulse-end" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  {service.plans.map((plan, k) => (
                    <div key={k} className="flex-1 p-6 bg-surface-low rounded-lg border border-white/5 hover:border-primary-pulse-end/30 transition-colors">
                      <span className="text-xs font-bold text-primary-pulse-end mb-2 block uppercase">{plan.name}</span>
                      <div className="text-3xl font-headline font-bold mb-4">{plan.price}<span className="text-sm font-normal text-gray-500">/project</span></div>
                      <p className="text-sm text-gray-400">{plan.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 px-6 md:px-12 pb-32">
    <div className="max-w-7xl mx-auto">
      <header className="mb-20 max-w-2xl">
        <h1 className="text-6xl font-bold font-headline tracking-tighter mb-6 leading-[1.1]">
          Start Your Project
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed">
          Have a vision for the future? Our elite team is ready to transform your complex business challenges into sleek, high-momentum digital reality.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7">
          <div className="glass-card p-10 rounded-xl border-t-2 border-primary-pulse-start/30 shadow-[0_0_40px_rgba(0,122,255,0.1)]">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500 tracking-wider uppercase">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-surface-highest/50 border-none rounded-lg p-4 text-white focus:ring-1 focus:ring-primary-pulse-end/50 placeholder:text-gray-600" />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-500 tracking-wider uppercase">Email Address</label>
                  <input type="email" placeholder="john@company.com" className="w-full bg-surface-highest/50 border-none rounded-lg p-4 text-white focus:ring-1 focus:ring-primary-pulse-end/50 placeholder:text-gray-600" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500 tracking-wider uppercase">Project Type</label>
                <select className="w-full bg-surface-highest/50 border-none rounded-lg p-4 text-white focus:ring-1 focus:ring-primary-pulse-end/50 appearance-none cursor-pointer">
                  <option>Strategic Consulting</option>
                  <option>Digital Infrastructure</option>
                  <option>Brand Transformation</option>
                  <option>Market Intelligence</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-500 tracking-wider uppercase">Your Message</label>
                <textarea rows={5} placeholder="Tell us about your objectives..." className="w-full bg-surface-highest/50 border-none rounded-lg p-4 text-white focus:ring-1 focus:ring-primary-pulse-end/50 placeholder:text-gray-600 resize-none" />
              </div>
              <button className="w-full primary-gradient text-black py-5 rounded-lg font-bold text-lg tracking-tight hover:brightness-110 active:scale-[0.98] transition-all flex justify-center items-center gap-3">
                Initialize Project
                <ArrowRight size={24} />
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-6">
            {[
              { icon: <Mail />, title: "Electronic Mail", val: "connect@deltax.agency", sub: "24/7 Priority Support" },
              { icon: <Globe />, title: "Global Headquarters", val: "101 Monolith Drive, Tech District", sub: "San Francisco, CA 94105" },
              { icon: <Phone />, title: "Direct Line", val: "+1 (888) DELTA-X-0", sub: "Mon - Fri, 9am - 6pm EST" }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-6 p-6 rounded-xl bg-surface-low transition-colors hover:bg-surface-highest border-l-2 border-primary-pulse-end">
                <div className="bg-primary-pulse-end/10 p-3 rounded-lg text-primary-pulse-end">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xl mb-1">{item.title}</h3>
                  <p className="text-gray-300 font-medium">{item.val}</p>
                  <p className="text-gray-500 text-sm mt-1">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-primary-pulse-end/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl" />
            <div className="relative rounded-xl overflow-hidden aspect-video bg-surface-highest border border-white/5">
              <img src="https://picsum.photos/seed/map/800/450?grayscale" alt="Map" className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-primary-pulse-end rounded-full animate-pulse" />
                <span className="text-sm font-bold tracking-widest uppercase font-headline">Live Tracking Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface selection:bg-primary-pulse-start/30">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
