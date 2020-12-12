import React, { Component } from "react";
import PropTypes from "prop-types";
import BookmarksContext from "../BookmarksContext";
import config from "../config";
import "./EditBookmark.css";

const Required = () => <span className="EditBookmark__required">*</span>;

class EditBookmark extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.object,
    }),
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  static contextType = BookmarksContext;

  state = {
    error: null,
    id: "",
    title: "",
    url: "",
    description: "",
    rating: 1,
  };

  componentDidMount() {
    const { bookmarkId } = this.props.match.params;
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));

        return res.json();
      })
      .then((responseData) => {
        this.setState({
          id: responseData.id,
          title: responseData.title,
          url: responseData.url,
          description: responseData.description,
          rating: responseData.rating,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleClickCancel = () => {
    this.props.history.push("/");
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { bookmarkId } = this.props.match.params;
    const { id, title, url, description, rating } = this.state;
    const newB = { id, title, url, description, rating };
    fetch(config.API_ENDPOINT + `/${bookmarkId}`, {
      method: "PATCH",
      body: JSON.stringify(newB),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${config.API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((error) => Promise.reject(error));
      })
      .then(() => {
        this.resetFields(newB);
        this.context.updateBookmark(newB);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = (RF) => {
    this.setState({
      id: RF.id || "",
      title: RF.title || "",
      url: RF.url || "",
      description: RF.description || "",
      rating: RF.rating || "",
    });
  };

  render() {
    const { error, title, url, description, rating } = this.state;
    return (
      <section className="EditBookmark">
        <h2>Edit bookmark</h2>
        <form className="EditBookmark__form" onSubmit={this.handleSubmit}>
          <div className="EditBookmark__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <input type="hidden" name="id" />
          <div>
            <label htmlFor="title">
              Title <Required />
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Great website!"
              required
              value={title}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label htmlFor="url">
              URL <Required />
            </label>
            <input
              type="url"
              name="url"
              id="url"
              placeholder="https://www.great-website.com/"
              required
              value={url}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={this.onChange}
            />
          </div>
          <div>
            <label htmlFor="rating">
              Rating <Required />
            </label>
            <input
              type="number"
              name="rating"
              id="rating"
              min="1"
              max="5"
              required
              value={rating}
              onChange={this.onChange}
            />
          </div>
          <div className="EditBookmark__buttons">
            <button type="button" onClick={this.handleClickCancel}>
              Cancel
            </button>{" "}
            <button type="submit">Save</button>
          </div>
        </form>
      </section>
    );
  }
}

export default EditBookmark;
