import { PropsWithChildren } from "react";

function Header() {
  return (
    <header className="w-full text-center py-6 border-b dark:text-white border-gray-200 mb-4">
      <h1 className="text-2xl font-semibold">SmartRecruiters</h1>
    </header>
  );
}

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body className={`antialiased bg-gray-100`}>
        <main className="min-h-screen flex flex-col items-center">
          <Header />
          <div className="flex-grow flex items-center justify-center ">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
