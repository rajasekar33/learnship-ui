import React, { useState, useEffect } from "react";

import moment from 'moment'

import { useParams } from "react-router-dom";

import BlogService from "../services/blog.service";

import Img from "../assets/images/pasta.jpg"

const Comments = (props) => {
    console.log(props)

    return (
        <div className="blog-comments">
            <ul>
                {
                    props.comments.map(ele => {

                        return (
                            <li>
                                {ele.content}
                                <div className="blog-comments-owner">
                                    <div >
                                       <span>Added By: {ele.commenter_username}</span>
                                    </div>
                                    <div>{moment(ele.updatedAt).format("ddd, mm, hA")}</div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const Blog = () => {
  const [content, setContent] = useState("");
//   const user = AuthService.getCurrentUser();

  const { id } = useParams();

  useEffect(() => {
    BlogService.getBlogById(id).then(
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
    <div className="container blog-details-container">
        <div>
            <div >
                <h2 className="blog-title">{content.title}</h2>
                <div className="img-wrapper">
                    <img className="img" src={Img}/>
                </div>
                <p>{content.description}</p>
            </div>
            <div>
                {content.comments && <Comments comments={content.comments} />}
            </div>
        </div>
        <div>
            {/* <Comment id={content.id} userName={user.userName} /> */}
        </div>
    
    </div>
  );
};

export default Blog;
