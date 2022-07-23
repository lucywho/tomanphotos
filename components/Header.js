import Head from "next/head"

export default function Header() {
    return (
        <>
            <Head>
                <title>Toman Photos</title>
                <meta name="description" content="family photo site" />
                <link rel="icon" href="camera.ico" />
            </Head>
            <div id="strapline">Toman Family Photos</div>
        </>
    )
}
