export const CTASection = () => {
  return (
    <section className="px-6 py-20 bg-gradient-to-r from-slate-100 to-slate-200">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Ready to Transform Your Business?</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Join hundreds of companies that have revolutionized their operations with our AI automation solutions. Start
          your transformation today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="neumorphic-button-primary px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset">
            Get Started Now
          </button>
          <button className="neumorphic-button-secondary px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:shadow-neumorphic-pressed active:shadow-neumorphic-inset">
            Schedule a Demo
          </button>
        </div>
      </div>
    </section>
  )
}
