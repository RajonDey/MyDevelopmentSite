// components/service-details/AboutService.tsx
interface AboutServiceProps {
  description: string;
  features?: string[];
}

export function AboutService({ description, features }: AboutServiceProps) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">About This Service</h2>
      {/* Render HTML content safely */}
      <div
        className="text-secondary"
        dangerouslySetInnerHTML={{ __html: description }}
      />
      {features && (
        <ul className="list-disc list-inside mt-4 text-secondary">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
