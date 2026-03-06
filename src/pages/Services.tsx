import React from 'react';
import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { Droplets, Flame, Search, Bath, Hammer, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ICON_MAP: Record<string, any> = {
  Droplets,
  Flame,
  Search,
  Bath,
  Hammer
};

export default function Services() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl text-slate-900 mb-6"
          >
            Our Professional Services
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            From minor repairs to major installations, Swift Flow Plumbing provides expert solutions across all aspects of plumbing and heating.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = ICON_MAP[service.icon] || Droplets;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-10 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h3>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-10">
                  {['Qualified Engineers', 'Guaranteed Work', 'Fast Response'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-slate-500">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link 
                  to="/booking" 
                  className="w-full bg-slate-50 group-hover:bg-primary group-hover:text-white text-primary py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Custom Quote Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-light rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
          
          <h2 className="text-3xl md:text-5xl text-white mb-6 relative z-10">Need a custom installation?</h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto relative z-10">
            We specialize in bespoke bathroom designs and complex heating systems. Contact us for a free, no-obligation consultation.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex bg-primary hover:bg-primary-dark text-white px-10 py-5 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-primary/20 relative z-10"
          >
            Get a Free Quote
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
