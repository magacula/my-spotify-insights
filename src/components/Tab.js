import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

class Tab extends Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  onClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      onClick,
      props: { activeTab, label },
    } = this;
    console.log(this.onCLick);
    console.log(this.props);

    let className = "tab-list-item";

    if (activeTab === label) {
      className += " tab-list-active";
    }

    return (
      <Link className={className} onClick={onClick} style={{ color: "#fff" }}>
        {label}
      </Link>
    );
  }
}

export default Tab;
