import BookItemSkeleton from '@/components/skeleton/book-item-skeleton';

type Props = {
    count: number;
};

export default function BookLiteSkeleton(props: Props) {
    const { count } = props;

    return new Array(count)
        .fill(0)
        .map((_, idx) => (
            <BookItemSkeleton key={`book-item-skeleton-${idx}`} />
        ));
}
