'use client';

import { Service } from '../app/services/servicesData';
import { ServiceCard } from './ServiceCard';

interface ServicesGridProps {
  services: Service[];
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {services.map((service, index) => (
        <ServiceCard key={service.slug} service={service} />
      ))}
    </div>
  );
}
