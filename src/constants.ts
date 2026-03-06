import { Droplets, Flame, Search, Bath, Hammer } from 'lucide-react';

export const SERVICES = [
  {
    id: 'emergency',
    title: 'Emergency Plumbing',
    description: 'Available 24/7 for burst pipes, severe leaks, and urgent repairs to protect your home.',
    icon: 'Droplets'
  },
  {
    id: 'boiler',
    title: 'Boiler Repair',
    description: 'Expert diagnostics and repairs for all major boiler brands to restore your heating and hot water.',
    icon: 'Flame'
  },
  {
    id: 'leak',
    title: 'Leak Detection',
    description: 'Non-invasive technology to pinpoint hidden leaks behind walls or under floors accurately.',
    icon: 'Search'
  },
  {
    id: 'bathroom',
    title: 'Bathroom Installation',
    description: 'Complete bathroom renovations, from plumbing and tiling to fitting luxury suites.',
    icon: 'Bath'
  },
  {
    id: 'drain',
    title: 'Drain Unblocking',
    description: 'Professional clearing of blocked sinks, toilets, and external drains using high-pressure jetting.',
    icon: 'Hammer'
  }
];

export const TRUST_SIGNALS = [
  { label: '10+ Years Experience', icon: 'Award' },
  { label: 'Gas Safe Registered', icon: 'ShieldCheck' },
  { label: '5 Star Google Reviews', icon: 'Star' },
  { label: '24/7 Emergency Service', icon: 'Clock' }
];
