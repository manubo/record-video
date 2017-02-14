import React, { Component, PropTypes } from 'react'
import css from './styles.scss'

export default class Video extends Component {
  static propTypes = {
    stream: PropTypes.object,
  }

  componentWillUnmount() {
    window.URL.revokeObjectURL(this.video.src);
  }

  render() {
    const {stream, children, ...restProps} = this.props;

    return (
      <div className={css.video}>
        <video
          ref={node => this.video = node}
          src={stream && window.URL.createObjectURL(stream)}
          autoPlay
          {...restProps}
        />
        {children}
      </div>
    );
  }
}
