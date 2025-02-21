export default async function Page({
    params,
}: {
    params: Promise<{ id: number }>;
}) {
    const { id } = await params;

    return <div>book/[id]페이지 : {id}</div>;
}
