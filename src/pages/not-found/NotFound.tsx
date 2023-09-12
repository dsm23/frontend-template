import errorIllustration from "../../assets/images/errorIllustration.svg";

const NotFound = () => (
  <div className="container">
    <h1 className="sr-only">Error 404: Not Found</h1>

    <img src={errorIllustration} alt="No content error" />
  </div>
);

export default NotFound;
