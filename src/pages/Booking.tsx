import React from 'react';
import { motion } from 'motion/react';
import BookingForm from '../components/BookingForm';
import { Calendar, ShieldCheck, Clock, Phone } from 'lucide-react';

export default function Booking() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Side: Info */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-4xl md:text-6xl text-slate-900 mb-8">Book Your Professional Plumber</h1>
              <p className="text-lg text-slate-600 mb-12 leading-relaxed">
                Schedule your appointment in less than 60 seconds. Our expert engineers are ready to help with any plumbing or heating issue.
              </p>

              <div className="space-y-8">
                {[
                  { icon: Clock, title: 'Same Day Service', desc: 'Book before 10 AM for same-day emergency visits across London.' },
                  { icon: ShieldCheck, title: 'Fully Guaranteed', desc: 'All our work is insured and comes with a 12-month workmanship guarantee.' },
                  { icon: Calendar, title: 'Flexible Scheduling', desc: 'Choose a date and time that works best for your busy schedule.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 rounded-3xl bg-slate-50 border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Need urgent help?
                </h4>
                <p className="text-slate-600 text-sm mb-4">For immediate emergency assistance, call our 24/7 hotline:</p>
                <a href="tel:02012345678" className="text-2xl font-display font-bold text-primary hover:text-primary-dark transition-colors">
                  020 1234 5678
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
            >
              <BookingForm />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
