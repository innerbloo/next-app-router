'use client';

import { useActionState, useEffect, useRef } from 'react';

import { deleteReviewAction } from '@/actions/delete-review.action';

type Props = {
    bookId: number;
    reviewId: number;
};

export default function ReviewItemDeleteButton(props: Props) {
    const { bookId, reviewId } = props;
    const formRef = useRef<HTMLFormElement>(null);

    const [state, formAction, isPending] = useActionState(
        deleteReviewAction,
        null,
    );

    useEffect(() => {
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state]);

    return (
        <form ref={formRef} action={formAction}>
            <input name="bookId" value={bookId} hidden readOnly />
            <input name="reviewId" value={reviewId} hidden readOnly />
            {isPending ? (
                <div>...</div>
            ) : (
                <div onClick={() => formRef.current?.requestSubmit()}>
                    삭제하기
                </div>
            )}
        </form>
    );
}
