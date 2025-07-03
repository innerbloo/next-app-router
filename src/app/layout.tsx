import Link from 'next/link';
import Script from 'next/script';

import './globals.css';
import style from './layout.module.css';

import { gtmInitCode, gtmScriptIframe } from '@/constants/platform-commons';
import { BookData } from '@/types';

async function Footer() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: 'force-cache' },
    );

    if (!response.ok) {
        return <footer>제작 @innerbloo</footer>;
    }

    const books: BookData[] = await response.json();
    const bookCount = books.length;

    return (
        <footer>
            <div>제작 @innerbloo</div>
            <div>{bookCount}개의 도서가 등록되어 있습니다.</div>
        </footer>
    );
}

export default function RootLayout({
    children,
    modal,
}: Readonly<{
    children: React.ReactNode;
    modal: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-5N1D1TVQQF"
                    strategy="afterInteractive"
                />
                <Script
                    id={'gtag-init'}
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5N1D1TVQQF', {
                page_path: window.location.pathname,
              });
            `,
                    }}
                />
                <Script
                    id={'gtm-script'}
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: gtmInitCode }}
                />
            </head>
            <body>
                <noscript
                    dangerouslySetInnerHTML={{
                        __html: gtmScriptIframe,
                    }}
                />
                <div className={style.container}>
                    <header>
                        <Link href={'/'}>📚 ONEBITE BOOKS</Link>
                    </header>
                    <main>{children}</main>
                    <Footer />
                </div>
                {modal}
                <div id="modal-root" />
            </body>
        </html>
    );
}
