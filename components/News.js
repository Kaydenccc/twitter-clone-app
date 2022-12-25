const News = ({ article }) => {
  return (
    <a className="inline-block p-2 px-4 hover:bg-gray-200 transition duration-200" href={article.url} target="_blank">
      <div className="">
        <div className="space-y-0.5">
          <h6 className="font-bold">{article.title}</h6>
          <p className="text-sm font-medium text-gray-500">{article.source.name}</p>
        </div>
        <img className="rounded-lg my-1" src={article.urlToImage} alt={article.Livemint} />
      </div>
    </a>
  );
};
export default News;
