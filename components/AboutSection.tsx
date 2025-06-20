export const AboutSection = () => {
  return (
    <section id="about" className="relative overflow-hidden px-6 py-20 bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50">
      {/* Background text element */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-full text-center">
          <span 
            className="text-[180px] md:text-[240px] lg:text-[300px] font-bold text-transparent"
            style={{
              WebkitTextStroke: "2px rgba(99, 102, 241, 0.15)", // Subtle indigo stroke
              letterSpacing: '0.05em'
            }}
          >
             Convis AI
          </span>
        </div>
      </div>

      {/* Content container with relative positioning */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
      
        <h2 className="text-4xl md:text-5xl font-raleway text-gray-800 mb-8">Who We Are</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed relative">
          We are{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 font-semibold">
             Convis AI
          </span>
          , a leading AI Automation Agency dedicated to transforming businesses with cutting-edge technology and
          innovative solutions. Our team is committed to driving efficiency and growth for your business through
          intelligent automation and AI-powered voice agents.
        </p>
        <button className="neumorphic-button-primary px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Learn More
        </button>
      </div>
    </section>
  )
}
