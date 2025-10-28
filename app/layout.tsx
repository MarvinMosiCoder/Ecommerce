export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body className="mx-auto max-w-5xl p-6">
      <header className="flex items-center justify-between py-4">
        <a href="/" className="text-xl font-bold">mini‑shop</a>
        <nav className="space-x-4">
          <a href="/cart">Cart</a>
          <a href="/account">Account</a>
        </nav>
      </header>
      {children}
    </body>
    </html>
  )
}