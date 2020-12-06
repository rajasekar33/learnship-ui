import React, { useState, useEffect } from "react";
import moment from 'moment'
import { BrowserRouter } from "react-router-dom";

import { Switch, Route, Link , useRouteMatch } from "react-router-dom";

import BlogService from "../services/blog.service";

import Img from "../assets/images/pasta.jpg"

import Blog from "./Blog"

const Home = () => {
  const [content, setContent] = useState("");

  const { url, path } = useRouteMatch();

  useEffect(() => {
    BlogService.getBlogs().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <div className="row">
      {content && content.map(data => {

        return(
          <React.Fragment key={data.id}>
            <div className="col-12 col-sm-8 col-md-6 col-lg-4 blog-col">
              <div className="card">
                <img className="card-img" src={Img} alt="Bologna" />
                <div className="card-img-overlay">
                  <button className="btn btn-light btn-sm">blog</button>
                </div>
                <div className="card-body">
                  <h4 className="card-title">{data.title}</h4>
                  <p className="card-text">{data.description}</p>
                </div>
                <div className="card-footer text-muted d-flex justify-content-between bg-transparent border-top-0">
                  <div className="views">{moment(data.updatedAt).format("ddd, mm, hA")}</div>
                  <div className="stats">
                  <i className="far fa-eye"></i> 
                    <i className="far fa-comment"></i> {data.comments.length}
                  </div>
                  
                </div>
              </div>
                <Link to={`/blog/${data.id}`}> <button className="btn btn-info blog-read-more-btn"> Read More</button> </Link>
          </div>
          </React.Fragment>
        )

      })}
            </div>
      
      </div>
  );
};

export default Home;
