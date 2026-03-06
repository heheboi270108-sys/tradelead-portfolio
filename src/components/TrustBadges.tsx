import React from 'react';
import { Award, ShieldCheck, Star, Clock } from 'lucide-react';
import { motion } from 'motion/react';

const signals = [
  { label: '10+ Years Experience', icon: Award, color: 'text-blue-600' },
  { label: 'Gas Safe Registered', icon: ShieldCheck, color: 'text-emerald-600' },
  { label: '5 Star Google Reviews', icon: Star, color: 'text-amber-500' },
  { label: '24/7 Emergency Service', icon: Clock, color: 'text-rose-600' }
];

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {signals.map((signal, index) => (
        <motion.div
          key={signal.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="flex flex-col items-center text-center p-4 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
        >
          <div className={`p-3 rounded-full bg-slate-50 mb-3 ${signal.color}`}>
            <signal.icon className="w-6 h-6" />
          </div>
          <span className="text-sm font-bold text-slate-700 leading-tight">
            {signal.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}
