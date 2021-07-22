import React from "react";

const ShowCard = ({ val }) => {
  let rating1 = val.Ratings[0] ? val.Ratings[0].Value : "";
  let rating1Src = val.Ratings[0] ? val.Ratings[0].Source : "";
  let rating2 = val.Ratings[1] ? val.Ratings[1].Value : "";
  let rating2Src = val.Ratings[1] ? val.Ratings[1].Source : "";
  return (
    <div className="movieWrap">
      <div className="movieLeft">
        <img src={val.Poster} alt={val.Title} />
      </div>
      <div className="movieRight">
        <div className="topData">
          <div className="dataLeft">
            <div className="title">{val.Title}</div>
            <div className="details">
              <span>{val.Genre}</span>
              <span>{val.Runtime}</span>
            </div>
          </div>
          <div className="dataRight">
            <div className="ratings"><em className="ratingTitle">{rating1Src}:</em> {rating1}</div>
            <div className="ratings"><em className="ratingTitle">{rating2Src}:</em> {rating2}</div>
          </div>
        </div>
        <div className="para plot">{val.Plot}</div>
        <div className="para"><em>Released Date</em>: {val.Released}</div>
        <div className="para"><em>Language</em>: {val.Language}</div>
        <div className="para"><em>Director</em>: {val.Director}</div>
        <div className="para"><em>Actors</em>: {val.Actors}</div>
      </div>
    </div>
  );
};

export default ShowCard;
