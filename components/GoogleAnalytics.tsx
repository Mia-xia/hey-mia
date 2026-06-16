import { Suspense } from "react";
import Script from "next/script";
import GoogleAnalyticsPageView from "@/components/GoogleAnalyticsPageView";

type GoogleAnalyticsProps = {
  measurementId?: string;
};

export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  if (!measurementId) return null;

  return (
    <>
      <Script
        id="google-tag-manager"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${measurementId}', { send_page_view: false });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView measurementId={measurementId} />
      </Suspense>
    </>
  );
}
