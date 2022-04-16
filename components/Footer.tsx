export default function Footer() {
  
  const TWITTER_HANDLE = '_buildspace';
  const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

  return (
    <footer className="flex w-full justify-center  bg-opacity-25 bg-violet-900 p-5">
            <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built with @${TWITTER_HANDLE}`}</a>
    </footer>
  )
}
