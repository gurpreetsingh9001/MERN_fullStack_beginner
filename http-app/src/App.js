import React, { Component } from "react";
import http_axios from "./services/httpService";   //http_axios is just placeholder and not another library than axios
import config from "./config.json";           // contains our endPoints and other configurations
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  //right place to call server
  async componentDidMount() {
    // pending > resolved (success) OR rejected (failure)
    // get request returns promise object along with status of resolved or failure
    // but now a days we dont work with promise rather we use async in function and await in get call

    // const { data: posts } = await axios.get(apiEndpoint);  
    const { data: posts } = await http_axios.get(config.apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    // const { data: post } = await axios.post(apiEndpoint, obj);
    const { data: post } = await http_axios.post(config.apiEndpoint, obj);

    const posts = [post, ...this.state.posts];
    this.setState({ posts })
  };

  //below in update and delete we are using passimistic approach where we are updating the state before getting response of suceess from server
  //pessimistic approach is faster because the state is rendered and waiting is done afterwards
  handleUpdate = async post => {
    const originalPost = { ...post };
    post.title = "UPDATED";

    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });

    try {
      // await axios.put(apiEndpoint + "/" + post.id, post);
      await http_axios.put(config.apiEndpoint + "/" + post.id, post);
    } catch (ex) {
      console.log('Reverting failed update for post:' + post.id);
      posts[index] = { ...originalPost };
      this.setState({ posts });
    }
  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;

    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({ posts });

    try {
      // await axios.delete(apiEndpoint + "/" + post.id);
      await http_axios.delete(config.apiEndpoint + "/" + post.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted.");
      this.setState({ posts: originalPosts });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
