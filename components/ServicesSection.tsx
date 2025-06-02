export const ServicesSection = () => {
  const services = [
    {
      title: "Process Automation",
      description: "Streamline repetitive tasks and workflows with intelligent automation solutions",
      icon: "⚡",
    },
    {
      title: "Data Analytics",
      description: "Transform raw data into actionable insights with advanced AI analytics",
      icon: "📊",
    },
    {
      title: "Customer Experience",
      description: "Enhance customer interactions with AI-powered chatbots and personalization",
      icon: "💬",
    },
    {
      title: "Predictive Intelligence",
      description: "Forecast trends and make data-driven decisions with machine learning",
      icon: "🔮",
    },
    {
      title: "Document Processing",
      description: "Automate document analysis and processing with intelligent OCR and NLP",
      icon: "📄",
    },
    {
      title: "Quality Assurance",
      description: "Ensure consistent quality with AI-powered testing and monitoring",
      icon: "✅",
    },
  ]

  return (
    <section id="services" className="px-6 py-20 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block neumorphic-card px-6 py-3 rounded-2xl text-blue-600 text-sm font-medium mb-6">
            Services
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Next-Gen{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              AI Solutions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI services designed to transform every aspect of your business operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="neumorphic-card rounded-3xl p-8 transition-all duration-300 hover:shadow-neumorphic-hover transform hover:-translate-y-1"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
