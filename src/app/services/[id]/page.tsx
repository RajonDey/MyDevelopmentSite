// app/services/[id]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import { services, reviews } from "@/data/mock-data";

// Define the params interface
interface ServiceParams {
  id: string;
}

// Update the page component to handle Promise params
export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<ServiceParams>;
}) {
  // Await the params since they're a Promise in Next.js 15
  const resolvedParams = await params;

  const service = services.find((svc) => svc.id === Number(resolvedParams.id));

  if (!service) {
    return notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title and Overview */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{service.title}</h1>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xl font-semibold">From ${service.price}</span>
          <button className="px-4 py-2 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors">
            Continue (${service.price})
          </button>
        </div>
      </div>

      {/* Service Details and Seller Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Service Details */}
        <div className="col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Image
              src={service.image}
              alt={service.title}
              width={800}
              height={400}
              className="object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-bold mb-4">About This Gig</h2>
            <p className="text-gray-700">{service.description}</p>

            {/* Features */}
            <h3 className="text-lg font-semibold mt-6 mb-2">What I Will Do:</h3>
            <ul className="list-disc list-inside text-gray-700">
              {service.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>

            {/* Technologies */}
            {service.technologies.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mt-6 mb-2">
                  Technologies I Use:
                </h3>
                <ul className="list-disc list-inside text-gray-700">
                  {service.technologies.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-6 mt-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4">FAQ</h2>
            {service.faqs.map((faq, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-semibold text-gray-800">{faq.question}</h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Seller Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-bold mb-4">About The Seller</h2>
          <div className="flex items-center mb-4">
            <Image
              src="/placeholder.svg"
              alt="Seller Avatar"
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <div>
              <h3 className="font-bold text-gray-800">Rajon Dey</h3>
              <p className="text-sm text-gray-600">Level 2 Seller</p>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-yellow-500">★</span> 4.9{" "}
            <span className="text-gray-600">(150 reviews)</span>
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition-colors">
            Contact Me
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>
        {reviews.map((review, index) => (
          <div key={index} className="mb-4 p-4 border-b border-gray-200">
            <div className="flex items-center mb-2">
              <Image
                src={review.avatar}
                alt={`${review.name}'s Avatar`}
                width={40}
                height={40}
                className="rounded-full mr-2"
              />
              <div>
                <span className="font-bold text-gray-800">{review.name}</span>
                <span className="text-gray-600 ml-2">{review.rating}★</span>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Add static params generation
export async function generateStaticParams(): Promise<ServiceParams[]> {
  return services.map((service) => ({
    id: service.id.toString(), // Convert to string since params expects strings
  }));
}
