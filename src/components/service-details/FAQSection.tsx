interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index}>
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-secondary">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
