import "@/styles/os/theme.css";

export default function OsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="os-theme fixed inset-0 z-50 overflow-auto bg-os-bg font-rdx text-os-text antialiased">
      {children}
    </div>
  );
}
