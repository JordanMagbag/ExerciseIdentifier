import React, { Component } from "react";

class DisplayImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null
    };

    // if we are using arrow function binding is not required
    //  this.onImageChange = this.onImageChange.bind(this);
  }

  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      let formData = new FormData();
      formData.append("file", img);
      this.setState({
        image: URL.createObjectURL(img)
      });
      fetch('/upload', { method: 'POST', body: formData })
        .then((response) => {
          response.json()
            .then((data) => {
              this.props.setGuesses(data)
              if (data.length === 0) {
                this.props.setIsOpenNo(true);
              }
            })
        });
    }
  };

  render() {
    return (
      <div>
        <div>
          <div>
            <img class="image" src={this.state.image} />
            <br></br>
            <input type="file" name="myImage" onChange={this.onImageChange} />
          </div>
        </div>
      </div>
    );
  }
}
export default DisplayImage;