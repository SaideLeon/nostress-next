// src/components/FeatureSection.tsx
import React from 'react';
import Link from 'next/link';
import { Calculator, DollarSign, BarChart2, ArrowRight } from 'lucide-react';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Calculator,
    title: 'Cálculo Preciso',
    color: 'emerald',
    description: 'Análise detalhada de custos e margens de lucro para decisões mais acertadas'
  },
  {
    icon: DollarSign,
    title: 'Multi-moeda',
    color: 'blue',
    description: 'Suporte para várias moedas dos países lusófonos, facilitando negócios internacionais'
  },
  {
    icon: BarChart2,
    title: 'Análise Visual',
    color: 'purple',
    description: 'Visualize suas margens e lucros com gráficos intuitivos e relatórios detalhados'
  }
];

const FeatureSection: React.FC = () => {
  const [activeFeature, setActiveFeature] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map(({ icon: Icon, title, color, description }, index) => (
          <div 
            key={title}
            className={`group relative transform transition-all duration-500 ${
              index === activeFeature ? 'scale-105' : 'scale-100'
            }`}
            role="region"
            aria-label={`Recurso: ${title}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-emerald-900/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 rounded-xl border border-gray-800 group-hover:border-emerald-500/50 transition-colors duration-500" />
            
            <div className="relative p-6 space-y-4">
              <Icon className={`h-12 w-12 text-${color}-400`} aria-hidden="true" />
              <h3 className="text-xl font-semibold text-white">{title}</h3>
              <p className="text-gray-400">{description}</p>
              
              <Link 
                href="/recursos"
                className="inline-flex items-center text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-300"
                aria-label={`Saiba mais sobre ${title}`}
              >
                <span>Saiba mais</span>
                <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;