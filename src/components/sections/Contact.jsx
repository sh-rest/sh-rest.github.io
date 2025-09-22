import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Github, Linkedin, Mail, Send } from 'lucide-react';

const socialLinks = [
  { icon: Mail, href: 'mailto:theshresthjain@gmail.com', name: 'Email' },
  { icon: Linkedin, href: 'https://linkedin.com/in/shresth-jain', name: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/shresth-jain', name: 'GitHub' },
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
      const res = await fetch('/api/contact', {
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
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">Let's Connect</h2>
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
              <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
            <div className="space-y-4">
              {socialLinks.map(link => (
                <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <link.icon className="w-6 h-6 text-blue-500" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <footer className="text-center mt-20 text-gray-500 dark:text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Shresth Jain. Built with passion.
      </footer>
    </section>
  );
};

export default Contact;