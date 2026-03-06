export async function getSeo(page) {

    try {

        const res = await fetch(
            `http://143.110.244.163:5000/api/seo/${page}`,
            { cache: "no-store" }
        );

        const data = await res.json();

        const seo = data?.seo || {};

        return {
            title: seo.title || "Dhakad Matrimony",
            description: seo.description || "Find your perfect match",
            keywords: seo.keywords || "",
            openGraph: {
                title: seo.ogTitle || seo.title,
                description: seo.ogDescription || seo.description,
                images: seo.ogImage ? [seo.ogImage] : []
            }
        };

    } catch (error) {

        return {
            title: "Dhakad Matrimony",
            description: "Find your perfect match"
        };

    }

}