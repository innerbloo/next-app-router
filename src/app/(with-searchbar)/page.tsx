import { Metadata } from 'next';
import { Suspense } from 'react';

import style from './page.module.css';

import BookItem from '@/components/book-item';
import BookLiteSkeleton from '@/components/skeleton/book-lite-skeleton';
import type { BookData } from '@/types';
import { delay } from '@/util/delay';

export const dynamic = 'force-dynamic';

async function AllBooks() {
    // await delay(1500);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { cache: 'force-cache' },
    );

    if (!response.ok) {
        return <div>오류가 발생했습니다...</div>;
    }

    const allBooks: BookData[] = await response.json();

    return (
        <div>
            {allBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

async function RecoBooks() {
    // await delay(3000);

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
        { next: { revalidate: 3 } },
    );

    if (!response.ok) {
        return <div>오류가 발생했습니다...</div>;
    }

    const recoBooks: BookData[] = await response.json();

    return (
        <div>
            {recoBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

export const metadata: Metadata = {
    title: '한입 북스',
    description: '한입 북스에 등록된 도서를 만나보세요',
    openGraph: {
        title: '한입 북스',
        description: '한입 북스에 등록된 도서를 만나보세요',
        images: ['/thumbnail.png'],
    },
};

export default function Home() {
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <Suspense fallback={<BookLiteSkeleton count={3} />}>
                    <RecoBooks />
                </Suspense>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <Suspense fallback={<BookLiteSkeleton count={10} />}>
                    <AllBooks />
                </Suspense>
            </section>
        </div>
    );
}
