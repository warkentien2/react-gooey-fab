import React, { Component } from "react";
import { findDOMNode } from "react-dom";
import { TimelineMax, Power2, Elastic } from "gsap";
import { MdFavorite, MdTurnedIn, MdVideocam } from "react-icons/md";
import "./FAB.scss";

class FabChild extends Component {
  shouldComponentUpdate() {
    findDOMNode(this).classList.toggle("hide");
    return true;
  }

  render() {
    return (
      <li
        className={`fab__child`}
        onClick={() => console.log("button clicked")}
      >
        <a className="fab__link fab__child-link">{this.props.children}</a>
      </li>
    );
  }
}

class FAB extends Component {
  state = {
    isOpen: false
  };

  shouldComponentUpdate() {
    const fab = findDOMNode(this);
    const linksAndButtons = fab.querySelectorAll(".fab__link");
    const line1 = fab.getElementsByTagName("line")[0];
    const line2 = fab.getElementsByTagName("line")[1];
    const tlOpen = new TimelineMax({ paused: true });
    const tlClose = new TimelineMax({ paused: true });

    tlOpen
      .addLabel("setup")
      .set([line1], { attr: { x1: 7, x2: 13, y1: 10, y2: 10 } }, "setup")
      .set([line2], { attr: { x1: 10, x2: 10, y1: 7, y2: 13 } }, "setup")
      .set(fab, { scale: 1 }, "setup")
      .set(linksAndButtons, { scale: 1 }, "setup")
      .addLabel("shrink", "setup+=0.125")
      .to(
        line1,
        0.25,
        {
          attr: { x1: 10, x2: 10, y1: 10, y2: 10 },
          ease: Power2.easeOut
        },
        "shrink"
      )
      .to(
        line2,
        0.25,
        {
          attr: { x1: 10, x2: 10, y1: 10, y2: 10 },
          ease: Power2.easeOut
        },
        "shrink"
      )
      .to(
        linksAndButtons,
        0.25,
        { scale: 1.25, ease: Power2.easeOut },
        "shrink"
      )
      .to(fab, 0.25, { scale: 0.8, ease: Power2.easeOut }, "shrink")
      .to([line1, line2], 0.125, { rotation: 45 })
      .addLabel("grow")
      .to(
        line1,
        0.25,
        { attr: { x1: 7, x2: 13, y1: 10, y2: 10 }, ease: Power2.easeIn },
        "grow"
      )
      .to(
        line2,
        0.25,
        { attr: { x1: 10, x2: 10, y1: 7, y2: 13 }, ease: Power2.easeIn },
        "grow"
      );

    tlClose
      .addLabel("setup")
      .set([line1], { attr: { x1: 7, x2: 13, y1: 10, y2: 10 } }, "setup")
      .set([line2], { attr: { x1: 10, x2: 10, y1: 7, y2: 13 } }, "setup")
      .set(fab, { scale: 0.8 }, "setup")
      .set(linksAndButtons, { scale: 1.25 }, "setup")
      .addLabel("shrink-back")
      .to(
        line1,
        0.25,
        { attr: { x1: 10, x2: 10, y1: 10, y2: 10 }, ease: Power2.easeOut },
        "shrink-back"
      )
      .to(
        line2,
        0.25,
        { attr: { x1: 10, x2: 10, y1: 10, y2: 10 }, ease: Power2.easeOut },
        "shrink-back"
      )
      .to([line1, line2], 0.125, { rotation: 0 })
      .addLabel("grow-back")
      .to(
        line1,
        0.25,
        {
          attr: { x1: 7, x2: 13, y1: 10, y2: 10 },
          ease: Power2.easeIn
        },
        "grow-back"
      )
      .to(
        line2,
        0.25,
        {
          attr: { x1: 10, x2: 10, y1: 7, y2: 13 },
          ease: Power2.easeIn
        },
        "grow-back"
      )
      .to(
        linksAndButtons,
        0.25,
        { scale: 1.25, ease: Elastic.easeOut },
        "grow-back"
      )
      .to(fab, 0.25, { scale: 1, ease: Elastic.easeOut }, "grow-back");

    if (this.state.isOpen) {
      tlOpen.play(0);
    } else {
      tlClose.play(0);
    }

    return true;
  }

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <div className="fab is-open" isOpen={this.state.isOpen}>
        <button
          className="fab__button fab__parent-button"
          onClick={this.handleClick}
        >
          <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <line
              x1="7"
              y1="10"
              x2="13"
              y2="10"
              stroke="white"
              stroke-linecap="round"
            />
            <line
              x1="10"
              y1="7"
              x2="10"
              y2="13"
              stroke="white"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <ul className="fab__children">
          {[<MdFavorite />, <MdTurnedIn />, <MdVideocam />].map(
            (icon, index) => (
              <FabChild key={index} hide={!this.state.isOpen}>
                {icon}
              </FabChild>
            )
          )}
        </ul>
        <svg
          id="fab-gooey-effect"
          xmlns="http://www.w3.org/2000/svg"
          version="0.8"
        >
          <defs>
            <filter id="fab-goo" x="-10%" y="-10%" height="400%" width="400%">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feGaussianBlur in="goo" stdDeviation="5" result="shadow" />
              <feColorMatrix
                in="shadow"
                mode="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
                result="shadow"
              />
              <feOffset in="shadow" dx="1" dy="2" result="shadow" />
              <feComposite in2="shadow" in="goo" result="goo" />
              <feComposite in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </div>
    );
  }
}

export default FAB;
