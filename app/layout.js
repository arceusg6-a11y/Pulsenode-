import './globals.css'

export const metadata = {
  title: 'Pulse Node - NFT Portfolio Tracker',
  description: 'Professional NFT portfolio tracking with real-time floor prices and P&L analysis',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{__html:'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'}} />
      </head>
      <body className="bg-slate-950 text-white">
        {children}
      </body>
    </html>
  )
}
