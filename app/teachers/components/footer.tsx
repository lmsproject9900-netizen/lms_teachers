export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-300 mt-10">
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center">
        
        <p className="text-sm">
          © {new Date().getFullYear()} LMS Portal. All rights reserved.
        </p>

        <div className="flex gap-4 mt-3 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
          <span className="hover:text-white cursor-pointer">Support</span>
        </div>

      </div>
    </div>
  );
}