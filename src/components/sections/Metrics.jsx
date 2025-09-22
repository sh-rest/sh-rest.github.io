import React from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, GitCommit } from 'lucide-react';

const metrics = [
  { icon: GitCommit, value: "10+", label: "Projects Shipped" },
  { icon: Code, value: "50,000+", label: "Lines of Code" },
  { icon: Coffee, value: "∞", label: "Coffee Cups" },
];

const Metrics = () => {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <metric.icon className="w-10 h-10 text-blue-500 mb-2" />
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Metrics;