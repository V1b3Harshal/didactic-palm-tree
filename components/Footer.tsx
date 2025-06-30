import Image from "next/image"
import localFont from "next/font/local"
// Load your local FibraLight font
const fibra = localFont({
  src: "../assets/fonts/FibraLight.otf",
  display: "swap",
})
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white w-full">
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              
              <span className="${fibra.className} text-xl ">
                 CONVIS <span className="${fibra.className} text-blue-400">AI</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Transforming businesses with AI-driven automation solutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Process Automation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Data Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  AI Integration
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Consulting
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025  Convis. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
