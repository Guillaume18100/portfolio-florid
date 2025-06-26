import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">
              Florie Deramchi
            </h3>
            <p className="text-stone-400 leading-relaxed">
              Discover the creative universe of an emerging artist through her 
              unique and inspiring creations.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-amber-400 transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-amber-400 transition-colors">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <div className="space-y-2">
              <p className="text-stone-400">
                Email: florie.deramchi@art-school.fr
              </p>
              <p className="text-stone-400">
                Visual Arts Student
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              {/* Social Media Icons */}
              <a
                href="#"
                title="Instagram"
                aria-label="Follow on Instagram"
                className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="#"
                title="Pinterest"
                aria-label="Follow on Pinterest"
                className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.162-1.499-.698-2.436-2.888-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.017.001z"/>
                </svg>
              </a>
              <a
                href="#"
                title="Behance"
                aria-label="View portfolio on Behance"
                className="w-10 h-10 bg-stone-700 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.504 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.76-.61.16-1.25.24-1.91.24H0V4.51h6.938v-.007zM3.495 8.88h2.77c.438 0 .795-.12 1.047-.36.253-.24.38-.57.38-.95 0-.37-.107-.67-.32-.9-.21-.23-.49-.35-.84-.35H3.495v2.56zm0 4.94h3.23c.52 0 .932-.15 1.234-.44.3-.29.45-.65.45-1.08 0-.48-.16-.85-.48-1.12-.32-.27-.76-.4-1.29-.4H3.495v3.04zm9.27-2.36c.328-.4.61-.84.82-1.32.21-.48.315-.99.315-1.53 0-.53-.105-1.05-.315-1.53-.21-.48-.49-.92-.82-1.32-.33-.4-.73-.72-1.18-.95-.45-.23-.94-.35-1.46-.35-.52 0-1.01.12-1.46.35-.45.23-.85.55-1.18.95-.33.4-.61.84-.82 1.32-.21.48-.315.99-.315 1.53 0 .54.105 1.05.315 1.53.21.48.49.92.82 1.32.33.4.73.72 1.18.95.45.23.94.35 1.46.35.52 0 1.01-.12 1.46-.35.45-.23.85-.55 1.18-.95zm8.24-2.77c-.328 0-.61.06-.82.19-.21.13-.39.31-.52.54-.13.23-.2.49-.2.78 0 .29.07.55.2.78.13.23.31.41.52.54.21.13.49.19.82.19.33 0 .61-.06.82-.19.21-.13.39-.31.52-.54.13-.23.2-.49.2-.78 0-.29-.07-.55-.2-.78-.13-.23-.31-.41-.52-.54-.21-.13-.49-.19-.82-.19z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-700 mt-8 pt-8 text-center">
          <p className="text-stone-400">
            © {new Date().getFullYear()} Florie Deramchi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
