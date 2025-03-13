import ReviewItemDeleteButton from '@/components/review-item-delete-button';
import style from '@/components/review-item.module.css';
import type { ReviewData } from '@/types';

export default function ReviewItem(props: ReviewData) {
    const { id, content, author, createdAt, bookId } = props;

    return (
        <div className={style.container}>
            <div className={style.author}>{author}</div>
            <div className={style.content}>{content}</div>
            <div className={style.bottom_container}>
                <div className={style.date}>
                    {new Date(createdAt).toLocaleString('ko-KR')}
                </div>
                <div className={style.delete_btn}>
                    <ReviewItemDeleteButton bookId={bookId} reviewId={id} />
                </div>
            </div>
        </div>
    );
}
