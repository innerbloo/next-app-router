'use server';

export async function createBookAction(_: unknown, formData: FormData) {
    const title = formData.get('title')?.toString();
    const subTitle = formData.get('subTitle')?.toString();
    const author = formData.get('author')?.toString();
    const publisher = formData.get('publisher')?.toString();
    const description = formData.get('description')?.toString();

    if (!title || !subTitle || !author || !publisher || !description) {
        return {
            status: false,
            error: '빈칸을 모두 입력해주세요.',
        };
    }

    // try {
    //     const response = await fetch(
    //         `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    //         {
    //             method: 'post',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 title,
    //                 subTitle,
    //                 author,
    //                 publisher,
    //                 description,
    //                 coverImgUrl: '', // 현재는 빈 문자열로 설정, 추후 이미지 업로드 기능 추가 가능
    //             }),
    //         },
    //     );
    //
    //     if (!response.ok) {
    //         const errMessage = await response.text();
    //         throw new Error(`❌ 요청 실패: ${response.status} ${errMessage}`);
    //     }
    //
    //     return {
    //         status: true,
    //         error: '',
    //     };
    // } catch (err) {
    //     return {
    //         status: false,
    //         error: `도서 등록에 실패했습니다 : ${err}`,
    //     };
    // }
}
