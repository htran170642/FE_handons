const navTabs = [
  {
    label: "Stays",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M3 20v-8l9-6 9 6v8"/><path d="M9 20v-6h6v6"/>
      </svg>
    ),
  },
  {
    label: "Flights",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="m5 11 1 10 6-3 6 3 1-10"/><path d="m5 11 7-9 7 9"/>
      </svg>
    ),
  },
  {
    label: "Car rentals",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3"/><rect x="9" y="11" width="14" height="10" rx="2"/><circle cx="12" cy="21" r=".5" fill="currentColor"/><circle cx="20" cy="21" r=".5" fill="currentColor"/>
      </svg>
    ),
  },
  {
    label: "Attractions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    label: "Airport taxis",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
        <path d="M14 18V6a2 2 0 00-2-2H4a2 2 0 00-2 2v11a1 1 0 001 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 001-1v-3.65a1 1 0 00-.22-.624l-3.48-4.35A1 1 0 0017.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
      </svg>
    ),
  },
]

function Navbar({ activeTab = "Stays" }) {
  return (
    <header className="bg-[#003580] sticky top-0 z-40">
      <div className="max-w-[1140px] mx-auto px-6 h-14 flex items-center gap-4">

        {/* Logo */}
        <a href="/" className="flex items-center gap-1 text-white text-xl font-bold shrink-0">
          <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
            <rect width="32" height="32" rx="4" fill="#fff"/>
            <path d="M8 8h4v10H8V8zm0 12h4v4H8v-4zm6-12h4v4h-4V8zm0 6h4v10h-4V14z" fill="#003580"/>
            <path d="M20 8h4v16h-4V8z" fill="#003580"/>
          </svg>
          booking.com
        </a>

        {/* Nav tabs */}
        <nav className="flex items-center gap-1 ml-2">
          {navTabs.map((tab) => (
            <a
              key={tab.label}
              href="#"
              className={`flex items-center gap-1.5 text-white text-[13px] font-medium px-2.5 py-1.5 rounded border cursor-pointer whitespace-nowrap transition-colors hover:bg-white/10 ${
                activeTab === tab.label ? "border-white" : "border-transparent"
              }`}
            >
              {tab.icon}
              {tab.label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <a href="#" className="text-white text-[13px] font-medium px-2.5 py-1.5 rounded hover:bg-white/10 whitespace-nowrap">
            List your property
          </a>
          <a href="#" className="text-white text-[13px] font-medium px-2.5 py-1.5 rounded hover:bg-white/10">
            EN
          </a>
          <a href="#" className="text-white text-[13px] font-semibold px-3.5 py-1.5 rounded border-2 border-white hover:bg-white/10 whitespace-nowrap">
            Sign in
          </a>
          <a href="#" className="text-[#003580] bg-white text-[13px] font-semibold px-3.5 py-1.5 rounded border-2 border-white hover:bg-gray-100 whitespace-nowrap">
            Register
          </a>
        </div>

      </div>
    </header>
  )
}

export default Navbar
