import React, { Component } from "react";

import "./Introduction.scss";

const videoLink = "https://www.youtube.com/embed/reYwbnuhFU0";

class Introduction extends Component {
  render() {
    return (
      <div className="Introduction">
        <div className="IntroText">
          <h2 className="description" tabIndex={0}>
            Lorem Ipsum
          </h2>

          <p className="description" tabIndex={0}>
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <p className="description" tabIndex={0}>
            Et odio pellentesque diam volutpat. Vestibulum mattis ullamcorper
            velit sed ullamcorper morbi tincidunt ornare massa. Auctor elit sed
            vulputate mi sit amet mauris. Varius quam quisque id diam vel quam
            elementum pulvinar. Et ligula ullamcorper malesuada proin libero
            nunc consequat. Id cursus metus aliquam eleifend mi in nulla
            posuere. Sapien pellentesque habitant morbi tristique senectus et
            netus et malesuada. Quam id leo in vitae turpis. Ante in nibh mauris
            cursus mattis molestie a iaculis at. Nisl rhoncus mattis rhoncus
            urna neque. Tempor nec feugiat nisl pretium fusce id. Eget nullam
            non nisi est. Lobortis elementum nibh tellus molestie nunc non.
            Ligula ullamcorper malesuada proin libero nunc consequat interdum
            varius. Lacus vel facilisis volutpat est velit egestas dui id
            ornare.
          </p>
          <p className="description" tabIndex={0}>
            Non tellus orci ac auctor. Sit amet justo donec enim. Et tortor at
            risus viverra adipiscing at in tellus integer. Porta lorem mollis
            aliquam ut porttitor leo a diam. Elit at imperdiet dui accumsan sit
            amet nulla facilisi morbi. A arcu cursus vitae congue mauris rhoncus
            aenean vel elit. Ultricies mi eget mauris pharetra et ultrices. Est
            velit egestas dui id ornare arcu. Nisi est sit amet facilisis magna
            etiam tempor orci eu. Consequat nisl vel pretium lectus quam id leo
            in. Vivamus arcu felis bibendum ut tristique. Ullamcorper a lacus
            vestibulum sed arcu. Blandit massa enim nec dui nunc mattis. Nunc
            non blandit massa enim nec dui nunc mattis enim.
          </p>
        </div>
      </div>
    );
  }
}

export default Introduction;
