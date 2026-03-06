import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { supabase } from '../lib/supabase';

const services = [
  'Emergency Plumbing',
  'Boiler Repair',
  'Leak Detection',
  'Bathroom Installation',
  'Drain Unblocking',
  'General Maintenance',
  'Other'
];

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service_type: '',
    preferred_date: '',
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');
    setErrorMessage(null);

    try {
      console.log('Starting booking submission...', formData);

      if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
        throw new Error('Supabase configuration is missing. Please check your VITE_SUPABASE_ANON_KEY secret.');
      }

      // 1. Insert into Supabase
      console.log('Inserting into Supabase...');
      const { error: insertError, data } = await supabase
        .from('bookings')
        .insert([{
          full_name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service_type: formData.service_type,
          preferred_date: formData.preferred_date,
          message: formData.message
        }])
        .select();

      if (insertError) {
        console.error('Supabase Insert Error:', insertError);
        throw new Error(`Database error: ${insertError.message}`);
      }
      console.log('Insert successful:', data);

      // 2. Call Supabase Edge Function for email (Non-blocking)
      console.log('Calling Edge Function at:', 'https://bldbnbydvywcsqpoetlr.supabase.co/functions/v1/send-booking-email');
      try {
        const edgeResponse = await fetch('https://bldbnbydvywcsqpoetlr.supabase.co/functions/v1/send-booking-email', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            record: {
              full_name: formData.name,
              phone: formData.phone,
              email: formData.email,
              service_type: formData.service_type,
              preferred_date: formData.preferred_date,
              message: formData.message
            }
          })
        });

        if (!edgeResponse.ok) {
          const edgeError = await edgeResponse.text();
          console.warn('Edge Function returned error status:', edgeResponse.status, edgeError);
        } else {
          const result = await edgeResponse.json();
          console.log('Edge Function call successful:', result);
        }
      } catch (emailErr) {
        console.error('Edge Function Fetch Error (Likely CORS or Network):', emailErr);
        console.warn('If you see "Failed to fetch", ensure your Edge Function has CORS headers enabled.');
      }

      setStatus('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        service_type: '',
        preferred_date: '',
        message: ''
      });
    } catch (err) {
      console.error('Booking error:', err);
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl text-center"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-display font-bold text-emerald-900 mb-2">Booking Received!</h3>
        <p className="text-emerald-700 mb-6">Thank you for choosing Swift Flow. We'll contact you shortly to confirm your appointment.</p>
        <button 
          onClick={() => setStatus('idle')}
          className="text-emerald-600 font-bold hover:underline"
        >
          Make another booking
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Full Name</label>
          <input
            required
            type="text"
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Phone Number</label>
          <input
            required
            type="tel"
            placeholder="07123 456 789"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
          <input
            required
            type="email"
            placeholder="john@example.com"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-slate-700 ml-1">Service Type</label>
          <select
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white"
            value={formData.service_type}
            onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
          >
            <option value="">Select a service</option>
            {services.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Preferred Date</label>
        <input
          required
          type="date"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
          value={formData.preferred_date}
          onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-700 ml-1">Message / Details</label>
        <textarea
          placeholder="Tell us about the issue..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-rose-600 bg-rose-50 p-4 rounded-xl text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        disabled={loading}
        type="submit"
        className={cn(
          "w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/20",
          loading && "opacity-70 cursor-not-allowed"
        )}
      >
        {loading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Send className="w-5 h-5" />
            Book My Appointment
          </>
        )}
      </button>
    </form>
  );
}
