export function WorkProcess() {
  const steps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We start with a consultation to understand your business goals, target audience, and project requirements.",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "I create a tailored project plan outlining timelines, deliverables, and the technical approach.",
      icon: "📝",
    },
    {
      number: "03",
      title: "Design & Development",
      description:
        "Your website comes to life with custom design and clean, performant code.",
      icon: "💻",
    },
    {
      number: "04",
      title: "Testing & Launch",
      description:
        "Thorough testing ensures everything works perfectly before your site goes live.",
      icon: "🚀",
    },
  ];

  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">How We Work Together</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          A simple, transparent process that delivers results
        </p>
      </div>

      <div className="relative">
        {/* Connection line */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-green-200 hidden md:block"
          style={{ transform: "translateX(-50%)" }}
        ></div>

        <div className="space-y-12 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } gap-8 items-center`}
            >
              <div
                className={`md:w-1/2 ${
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                } space-y-2`}
              >
                <div className="text-green-600 font-semibold">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              <div className="md:w-12 flex justify-center relative">
                <div className="w-12 h-12 bg-white border-4 border-green-500 rounded-full flex items-center justify-center text-xl z-10">
                  {step.icon}
                </div>
              </div>

              <div className="md:w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
