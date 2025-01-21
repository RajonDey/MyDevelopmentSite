// components/service-details/AboutService.tsx
interface AboutServiceProps {
  description: string;
}

export function AboutService({ description }: AboutServiceProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">About This Service</h2>
      <p className="text-secondary">{description}</p>
      <ul className="list-disc list-inside mt-4 text-secondary">
        <li>Custom website design and development</li>
        <li>Responsive and mobile-friendly layouts</li>
        <li>Integration with WordPress or other CMS</li>
        <li>SEO optimization</li>
        <li>Fast and reliable support</li>
      </ul>
    </div>
  );
}
