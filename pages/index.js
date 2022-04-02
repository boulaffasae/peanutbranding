import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import anime from "animejs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { fetchEntries } from "../utils/contentful";

export default function Home() {
  const [changeComplete, setChangeComplete] = useState(false);
  const [res, setRes] = useState([]);

  useEffect(() => {
    // Wrap every letter in a span
    var textsWrapper = document.querySelectorAll(".ml7 > span");

    textsWrapper.forEach(function (textWrapper) {
      textWrapper.innerHTML = textWrapper.textContent.replace(
        /\S/g,
        "<span class='inline-block letter origin-[0_100%]'>$&</span>"
      );
    });

    anime.timeline({ loop: false }).add({
      targets: ".ml7 .letter",
      translateY: ["1.1em", 0],
      translateX: ["0.55em", 0],
      translateZ: 0,
      rotateZ: [180, 0],
      duration: 750,
      easing: "easeOutExpo",
      delay: (el, i) => 50 * i,
      changeComplete: () => setChangeComplete(true),
    });

    fetchEntries().then((res) => {
      setRes(res);
    });
  }, []);

  return (
    <div>
      <Head>
        <title>Peanut Branding</title>
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
      <Header />

      <div className="bg-secondary h-screen">
        <div className="top-1/3 right-0 left-0 fixed">
          <h1 className="ml7 lg:text-8xl md:text-6xl text-primary font-bold text-4xl font-axiforma text-center">
            <span className="overflow-hidden leading-tight inline-block px-6 text-secondary bg-primary">
              Creativity
            </span>
            <span className="overflow-hidden leading-tight block">
              is our identity.
            </span>
          </h1>

          {changeComplete && (
            <p className="md:w-96 text-white font-light font-axiforma text-center px-8 mt-12 mx-auto animate__animated animate__fadeInUp">
              Welcome! I&rsquo;m&nbsp;
              <a
                className="text-tertiary font-bold"
                href="https://www.instagram.com/kaw.brr/"
                rel="noopener noreferrer nofollow"
                target="_blank"
              >
                Kawtar Barraz
              </a>
              , a brand identity designer for funded startups and small
              businesses.
            </p>
          )}

          {changeComplete && (
            <div className="border-white border-2 rounded-2xl w-8 h-12 mt-12 mx-auto animate__animated animate__fadeInUp">
              <div className="bg-tertiary rounded-full animate-mouse w-1.5 h-1.5 mt-1.5 mx-auto"></div>
            </div>
          )}
        </div>
      </div>

      <div className="lg:pt-16 pt-8 bg-white z-10 relative">
        <div className="px-8 mx-auto container">
          <h2 className="lg:text-5xl lg:mb-16 md:text-4xl font-bold text-2xl font-axiforma text-center mb-4">
            Featured work
          </h2>
          <div className="flex-wrap flex">
            {res?.data?.projectCollection.items.map((post) => (
              <Link
                href={`/work/${encodeURIComponent(post.slug)}`}
                key={post.slug}
              >
                <a
                  className="group lg:h-[400px] md:w-1/2 md:h-[250px] w-full h-[200px] relative"
                  style={{ "background-color": post.hex }}
                >
                  <div className="z-10 top-8 left-8 absolute">
                    <h3 className="lg:text-4xl text-white text-3xl group-hover:underline">
                      {post.title}
                    </h3>
                    <div className="text-white text-sm">{post.subtitle}</div>
                  </div>
                  <div className="lg:bottom-8 lg:right-8 w-2/3 h-2/3 bottom-2 right-2 absolute">
                    {post.coverCollection.items.map((cover) => (
                      <Image
                        src={cover.url}
                        alt={cover.description}
                        height={cover.height}
                        width={cover.width}
                        key={cover.url}
                      />
                    ))}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
