'use server';

import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateBookAction(formData: FormData, bookId: string) {
    const payload = {
        title: formData.get('title')?.toString(),
        subTitle: formData.get('subTitle')?.toString(),
        author: formData.get('author')?.toString(),
        publisher: formData.get('publisher')?.toString(),
        description: formData.get('description')?.toString(),
    };

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
        {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        },
    );

    if (!res.ok) {
        throw new Error(`Update failed: ${res.status}`);
    }

    await revalidateTag(`book`);

    redirect(`/book/${bookId}`);
}
