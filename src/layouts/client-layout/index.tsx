"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/molecules/header";
import Footer from "@/components/molecules/footer";
import DisableCopyPaste from "@/utils/disable-copy-paste";
import DisableDevtool from "disable-devtool";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideHeaderFooter = pathname?.match(/^\/series\/[^\/]+\/[^\/]+$/);
  // DisableDevtool({
  //   disableSelect: true,
  //   disableCopy: true,
  //   disableCut: true,
  //   disableMenu: true,
  //   clearLog: true,
  // });
  return (
    <>
      {/* <DisableCopyPaste /> */}
      {!hideHeaderFooter && <Header />}
      {children}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}
