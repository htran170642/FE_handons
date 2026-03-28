const footerColumns = [
  {
    title: "Support",
    links: ["FAQ", "Contact us", "Safety resource centre"],
  },
  {
    title: "Discover",
    links: [
      "Genius loyalty programme",
      "Seasonal and holiday deals",
      "Travel articles",
      "Booking.com for Business",
      "Car hire",
      "Flight finder",
    ],
  },
  {
    title: "Terms and settings",
    links: [
      "Privacy & cookies",
      "Terms & conditions",
      "Partner dispute",
      "Modern Slavery Statement",
    ],
  },
  {
    title: "Partners",
    links: [
      "Extranet login",
      "Become an affiliate",
      "List your property",
      "Partner Hub",
    ],
  },
  {
    title: "About",
    links: [
      "About Booking.com",
      "How We Work",
      "Sustainability",
      "Press centre",
      "Careers",
    ],
  },
]

function Footer() {
  return (
    <footer className="border-t border-[#e7e7e7] mt-12">

      {/* 5 cột links */}
      <div className="max-w-[1140px] mx-auto px-6 py-8 grid grid-cols-5 gap-6">
        {footerColumns.map((col) => (
          <div key={col.title}>
            <h5 className="font-semibold text-sm text-[#1a1a1a] mb-3">{col.title}</h5>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-[#595959] hover:underline">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e7e7e7]">
        <div className="max-w-[1140px] mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-3">
          <p className="text-sm text-[#595959]">
            Copyright © 1996–2026 Booking.com™. All rights reserved.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {["About Booking.com", "Terms & conditions", "Privacy & cookies", "Cookie settings"].map((link) => (
              <a key={link} href="#" className="text-sm text-[#595959] hover:underline">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer
