
import React from 'react';

interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, title, description }) => {
  return (
    <div className="text-center mb-16 animate-on-scroll">
      <span className="inline-block bg-honey-100 dark:bg-charcoal-700 text-honey-600 dark:text-honey-400 px-4 py-1 rounded-full text-sm font-medium mb-4">
        {badge}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800 dark:text-white">
        {title}
      </h2>
      <p className="text-lg text-charcoal-600 dark:text-charcoal-300 max-w-2xl mx-auto">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
