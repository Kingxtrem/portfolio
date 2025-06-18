export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="container mx-auto px-4 text-center">
        <span className="block text-xs sm:text-sm">
          © {new Date().getFullYear()} <span className="font-semibold text-white">MyPortfolio</span>. All rights reserved.
        </span>
      </div>
    </footer>
  );
}