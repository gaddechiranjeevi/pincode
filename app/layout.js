import "./globals.css";

export const metadata = {
  verification: {
    google: "DUaeSaZ75y6ZgvySA6UQDJveRQoC8Cs4wWejBkzLdoA",
  },
  title: "India Pincode Search",
  description: "Search Indian pincodes by post office, district or state",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8505787671532796"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        {/* HEADER */}
        <header className="site-header">
          <div className="header-inner">
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/states">States</a>
              <a href="/districts">Districts</a>
              <a href="/about">About</a>
              <a href="/contact">Contact</a>
            </nav>
          </div>
        </header>

        {/* MAIN */}
        <main className="site-main">{children}</main>

        {/* FOOTER */}
        <footer className="site-footer">
          <p>© 2026 PincodeSearch India ❤️</p>
          <nav className="footer-links">
            <a href="/privacy-policy">Privacy Policy</a>
            <a href="/terms">Terms & Conditions</a>
            <a href="/contact">Contact</a>
          </nav>
        </footer>
      </body>
    </html>
  );
}
