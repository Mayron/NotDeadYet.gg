import Moment from "react-moment";
import Author from "./author";

interface INewsArticlePreviewProps {
  data: NewsArticle;
}

const NewsArticlePreview: React.FC<INewsArticlePreviewProps> = ({ data }) => (
  <article>
    <header>
      <h4>{data.title}</h4>
      <div>
        <Moment format="dddd, Do MMMM, YYYY">{data.sys.publishedAt}</Moment>
        {" - "}
        <Moment fromNow>{data.sys.publishedAt}</Moment>
      </div>

      <Author data={data.author} />
    </header>
    <p>{data.excerpt}</p>
  </article>
);

export default NewsArticlePreview;
