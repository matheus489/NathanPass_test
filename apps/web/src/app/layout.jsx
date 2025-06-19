import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/providers/auth-provider"
import { ToastProvider } from "@/components/providers/toast-provider"
import { Navbar } from "@/components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "NathanPass - Plataforma de Bem-Estar e Gestão",
  description: "Plataforma integrada de bem-estar e gestão para pequenas e médias empresas",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <ToastProvider />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 