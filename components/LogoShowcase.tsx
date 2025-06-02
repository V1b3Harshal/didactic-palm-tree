export const LogoShowcase = () => {
  const logos = [
    { name: "LOGOIPSUM", text: "LOGOIPSUM" },
    { name: "DOGO", text: "DOGO" },
    { name: "logoipsum", text: "logoipsum°" },
    { name: "LOGOIPSUM", text: "LOGOIPSUM" },
    { name: "logoipsum", text: "logoipsum°" },
    { name: "logomark", text: "∞∞∞" },
  ]

  return (
    <section className="px-6 py-16 bg-white/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-gray-500 mb-8 text-sm uppercase tracking-wide">
          Trusted by leading companies worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center">
          {logos.map((logo, index) => (
            <div key={index} className="opacity-60 hover:opacity-100 transition-opacity duration-300">
              <span className="text-gray-400 font-medium text-sm md:text-base">{logo.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
