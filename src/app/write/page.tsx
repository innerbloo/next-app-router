'use client';

import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';

import style from './page.module.css';

import { createBookAction } from '@/actions/create-book.action';

export default function Page() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [state, formAction, isPending] = useActionState(
        createBookAction,
        null,
    );

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const file = e.target.files[0];

        setPreviewUrl(URL.createObjectURL(file));
    };

    function ImageComponent() {
        if (!previewUrl) return null;

        return (
            <div
                className={style.cover_img_container}
                style={{ backgroundImage: `url('${previewUrl}')` }}
            >
                <Image
                    src={previewUrl}
                    width={240}
                    height={300}
                    alt={`도서 표지 이미지`}
                />
            </div>
        );
    }

    useEffect(() => {
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state]);

    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    return (
        <div className={style.container}>
            <h3>도서 등록</h3>
            <form action={formAction} className={style.form_container}>
                <ImageComponent />
                <input type="file" accept="image/*" onChange={handleUpload} />
                <input required name="title" type="text" placeholder="제목" />
                <input
                    required
                    name="subTitle"
                    type="text"
                    placeholder="설명"
                />
                <div className={style.input_container}>
                    <input
                        required
                        name="author"
                        type="text"
                        placeholder="저자"
                    />
                    <input
                        required
                        name="publisher"
                        type="text"
                        placeholder="출판사"
                    />
                </div>
                <textarea required name="description" placeholder="내용" />
                <div className={style.button_container}>
                    <button type="submit">등록</button>
                </div>
            </form>
        </div>
    );
}
