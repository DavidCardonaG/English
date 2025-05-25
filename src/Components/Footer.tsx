import { forwardRef } from "react";

const Footer = forwardRef<HTMLDivElement>((props, ref) => {
  const phoneNumber = "+573194151961";
  const whatsappMessage = "Hello! I have a question about English Phonetics";

  return (
    <footer 
      ref={ref}
      className="py-12 px-6 bg-gray-900/50 mt-20"
      id="contact-footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold mb-4">English Phonetics</h4>
            <p className="text-gray-400">
              A space to showcase my work and projects in English phonetics.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Contact</h4>
            <p className="text-gray-400">melissagoez.z@gmail.com</p>
            <p className="text-gray-400">{phoneNumber}</p>
          </div>
          <div>
            <h4 className="text-xl font-bold mb-4">Social Media</h4>
            <div className="flex space-x-4">
              {/* Facebook Icon */}
              <a 
                href="https://www.facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>

              {/* WhatsApp Icon */}
              <a 
                href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-6.29 3.617c-.545 0-1.06-.113-1.53-.318l-.114-.04-1.12.294.3-1.092-.072-.114c-.338-.506-.53-1.093-.53-1.72 0-2.084 1.696-3.78 3.78-3.78.99 0 1.89.384 2.56 1.01.67.626 1.05 1.496 1.05 2.48 0 2.084-1.696 3.78-3.78 3.78m6.29-12.998c-5.523 0-10 4.477-10 10 0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10" />
                </svg>
              </a>

              {/* Twitter Icon (existente) */}
              <a 
                href="#" 
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} EnglishPhonetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;