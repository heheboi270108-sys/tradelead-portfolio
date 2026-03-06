import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Phone, ShieldCheck, Clock, CheckCircle2, Droplets, Flame, Search, Bath, Hammer } from 'lucide-react';
import { Link } from 'react-router-dom';
import TrustBadges from '../components/TrustBadges';
import { SERVICES } from '../constants';

const ICON_MAP: Record<string, any> = {
  Droplets,
  Flame,
  Search,
  Bath,
  Hammer
};

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&q=80&w=2000" 
            alt="Plumbing Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-light text-xs font-bold uppercase tracking-wider mb-6 border border-primary/30 backdrop-blur-sm">
                <Clock className="w-3.5 h-3.5" />
                24/7 Emergency Response
              </span>
              <h1 className="text-5xl md:text-7xl text-white mb-6 leading-[1.1]">
                London's Most <span className="text-primary-light">Trusted</span> Plumber
              </h1>
              <p className="text-xl text-slate-300 mb-10 max-w-lg leading-relaxed">
                Fast, reliable plumbing services — available 24/7. From emergency leaks to new boiler installations, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/booking" 
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl hover:shadow-primary/30"
                >
                  Book Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a 
                  href="tel:02012345678" 
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  020 1234 5678
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust Signals Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TrustBadges />
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl text-slate-900 mb-6">Expert Services for Every Need</h2>
            <p className="text-lg text-slate-600">
              We provide a comprehensive range of plumbing and heating services across London. No job is too big or too small.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, index) => {
              const Icon = ICON_MAP[service.icon] || Droplets;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-8 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-slate-900">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  <Link to="/services" className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link to="/services" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary font-medium transition-colors">
              View all plumbing services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl mb-8">Why Londoners Choose Swift Flow Plumbing</h2>
              <div className="space-y-6">
                {[
                  { title: 'Fully Insured & Certified', desc: 'All our engineers are Gas Safe registered and fully insured for your peace of mind.' },
                  { title: 'Transparent Pricing', desc: 'No hidden fees. We provide clear, upfront quotes before any work begins.' },
                  { title: 'Rapid Response Time', desc: 'We aim to be at your London property within 60 minutes for emergency calls.' },
                  { title: 'Guaranteed Workmanship', desc: 'All our repairs and installations come with a minimum 12-month guarantee.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-primary-light" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur-2xl" />
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=1000" 
                alt="Plumber working" 
                className="relative rounded-3xl shadow-2xl border border-white/10"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-dark/50 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl text-white mb-8">Ready to get your plumbing sorted?</h2>
          <p className="text-xl text-white/80 mb-12">
            Don't wait for a small leak to become a big problem. Book your professional plumber online today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/booking" 
              className="bg-white text-primary hover:bg-slate-100 px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all"
            >
              Book Online Now
            </Link>
            <a 
              href="tel:02012345678" 
              className="bg-primary-dark text-white hover:bg-slate-900 px-10 py-5 rounded-full font-bold text-lg shadow-xl transition-all border border-white/10"
            >
              Call 020 1234 5678
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
