import "./globals.css";

export const metadata = {
  title: "NORTHDREAMSTUDIO",
  description: "A creative studio focused on playing with all things digital, virtual identities, and interactive experiences.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
