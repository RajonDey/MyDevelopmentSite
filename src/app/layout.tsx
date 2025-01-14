export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <div>
          {/* <Header /> */}
          <main>{children}</main>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
