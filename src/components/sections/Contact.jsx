import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Mail, href: 'mailto:theshresthjain@gmail.com', name: 'Email', subtitle: 'theshresthjain@gmail.com', brandBg: 'bg-red-50 dark:bg-red-500/10', brandText: 'text-red-500', brandHover: 'hover:border-red-200 dark:hover:border-red-500/20' },
  { icon: Linkedin, href: 'https://linkedin.com/in/jainshresth', name: 'LinkedIn', subtitle: 'in/jainshresth', brandBg: 'bg-blue-50 dark:bg-blue-500/10', brandText: 'text-blue-600', brandHover: 'hover:border-blue-200 dark:hover:border-blue-500/20' },
  { icon: Github, href: 'https://github.com/sh-rest', name: 'GitHub', subtitle: 'sh-rest', brandBg: 'bg-gray-100 dark:bg-gray-500/10', brandText: 'text-gray-800 dark:text-gray-300', brandHover: 'hover:border-gray-300 dark:hover:border-gray-600' },
];

const Contact = () => {
  // Form handler to send entries to backend
  const [status, setStatus] = React.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements[0].value;
    const email = form.elements[1].value;
    const message = form.elements[2].value;
    setStatus('Sending...');
    try {
      const res = await fetch('https://portfolio-theta-orpin-17.vercel.app/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('Message sent successfully!');
        form.reset();
      } else {
        setStatus(data.error || 'Failed to send message.');
      }
    } catch (err) {
      setStatus('Failed to send message.');
    }
  };
  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-4">Let's Connect</h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of something amazing.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input type="text" placeholder="Your Name" className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
              <Input type="email" placeholder="Your Email" className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
              <Textarea placeholder="Your Message" rows={5} className="bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700" />
              <Button type="submit" size="lg" className="w-full bg-teal-600 hover:bg-teal-700 text-white">
                <Send className="mr-2 h-5 w-5" /> Send Message
              </Button>
              {status && (
                <div className="text-center text-sm mt-2 text-gray-700 dark:text-gray-300">{status}</div>
              )}
            </form>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-3">
              {socialLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-4 p-4 rounded-xl border border-transparent ${link.brandHover} hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 group`}
                >
                  <span className={`p-2.5 rounded-lg ${link.brandBg} transition-colors`}>
                    <link.icon className={`w-5 h-5 ${link.brandText}`} />
                  </span>
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white block">{link.name}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{link.subtitle}</span>
                  </div>
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
              Based in Bangalore, available worldwide.
            </p>
          </motion.div>
        </div>
      </div>
      <footer className="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Shresth Jain. Built with React, deployed on GitHub Pages.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </section>
  );
};

export default Contact;