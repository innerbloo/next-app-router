import { Metadata } from 'next';
import Link from 'next/link';

import style from './page.module.css';

import BookItem from '@/components/book-item';
import type { BookData } from '@/types';

async function AllBooks() {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
        { next: { tags: [`book`] } },
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
                <div className={style.section_title}>
                    <h3>지금 추천하는 도서</h3>
                </div>
                <RecoBooks />
            </section>
            <section>
                <div className={style.section_title}>
                    <h3>등록된 모든 도서</h3>
                    <button>
                        <Link href={'/write'}>추가</Link>
                    </button>
                </div>
                <AllBooks />
            </section>
        </div>
    );
}
