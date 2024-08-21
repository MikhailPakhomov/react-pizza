
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    >
    <circle cx="140" cy="120" r="120" />
    <rect x="0" y="247" rx="10" ry="10" width="280" height="27" />
    <rect x="-2" y="294" rx="10" ry="10" width="280" height="88" />
    <rect x="8" y="409" rx="11" ry="11" width="89" height="27" />
    <rect x="126" y="399" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
);

export default MyLoader;
