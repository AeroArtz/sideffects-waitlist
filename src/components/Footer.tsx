import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-black to-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-8 sm:grid-cols-3 px-6">
        {/* Branding Section */}
        <div className="flex flex-col items-start">
          <img
            src="/meraxes logo.png"
            alt="Meraxes Logo"
            className="h-12 mb-4"
          />
          <p className="text-sm leading-relaxed">
            Empowering creators with cutting-edge AI tools to generate viral
            content in real-time.
          </p>
        </div>

        {/* Links Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <Link href="/about" className="hover:text-orange-500">
            About Us
          </Link>
          <Link href="/features" className="hover:text-orange-500">
            Features
          </Link>
          <Link href="/pricing" className="hover:text-orange-500">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-orange-500">
            Contact
          </Link>
        </div>

        {/* Social Media Section */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            Twitter
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            Instagram
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-orange-500"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} Meraxes. All rights reserved.
      </div>
    </footer>
  )
}
