import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Footer from "../../components/Footer";
import { fetchEntrie } from "../../utils/contentful";

export default function Work() {
  const [res, setRes] = useState([]);
  const {
    query: { work },
  } = useRouter();

  useEffect(() => {
    fetchEntrie(work).then((res) => {
      setRes(res);
    });
  }, [work]);

  const post = res?.data?.projectCollection.items[0];

  if (!post) return "";
  return (
    <div>
      <Head>
        <title>{post.title} — Peanut Branding</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
      </Head>

      <div className="pt-16 px-8 mx-auto container">
        <ul className="flex mb-4">
          <li>
            <Link href="/">
              <a className="group flex items-center font-axiforma font-bold hover:text-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="group-hover:-translate-x-1 transition-transform"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span className="pl-2">Peanut</span>
              </a>
            </Link>
          </li>
          <li>
            <span>&nbsp; &#47; &nbsp; {post.title}</span>
          </li>
        </ul>
        <div className="prose max-w-none">
          {documentToReactComponents(post.body.json)}
        </div>
      </div>

      <Footer />
    </div>
  );
}
