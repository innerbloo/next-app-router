import { notFound, redirect } from 'next/navigation';

import style from './page.module.css';

import { updateBookAction } from '@/actions/update-book.action';

export default async function EditBookPage({
    params,
}: {
    params: { id: string };
}) {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`,
    );

    const updateFormAction = async (formData: FormData) => {
        'use server';
        return updateBookAction(formData, params.id);
    };

    if (!response.ok) notFound();

    const book = await response.json();

    return (
        <form action={updateFormAction} className={style.form_container}>
            <input name="title" defaultValue={book.title} required />
            <input name="subTitle" defaultValue={book.subTitle} required />
            <div className={style.input_container}>
                <input name="author" defaultValue={book.author} required />
                <input
                    name="publisher"
                    defaultValue={book.publisher}
                    required
                />
            </div>
            <textarea
                name="description"
                defaultValue={book.description}
                required
            />
            <div className={style.button_container}>
                <button type="submit">저장</button>
            </div>
        </form>
    );
}
