import { apiCall } from "@/helper/apiCall";
import * as React from "react";

interface IArticleDetailPageProps {
    params: { title: string };
}

const getDetail = async (title: string) => {

    try {

        const res = await apiCall.get(
            `/articles?where=%60title%60%20%3D%20'${title}'`
        );
        console.log(res.data[0]);

        return res.data[0];

    } catch (error) {
        console.log(error)

    }

}

const ArticleDetailPage: React.FunctionComponent<
    IArticleDetailPageProps
> = async (props) => {

    const detailData = await getDetail(props.params.title);

    return (
        <div className="flex justify-center px-4 py-10 font-sans bg-white text-gray-800">
            <div className="w-full max-w-3xl space-y-8">
                <h1 className="text-4xl font-bold leading-snug">{detailData?.title}</h1>

                <p className="text-sm text-gray-500 uppercase tracking-wide 
                text-left">
                    {detailData?.category}
                </p>

                <div className="w-full overflow-hidden rounded-2xl">
                    <img
                        src={detailData.thumbnail}
                        alt="Thumbnail"
                        className="w-full object-cover aspect-video"
                    />
                </div>

                <p className="text-lg leading-relaxed text-justify">
                    {detailData?.content}
                </p>
            </div>
        </div>

    );
};

export default ArticleDetailPage;