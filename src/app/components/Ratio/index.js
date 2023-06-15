import React from 'react';
import PropTypes from 'prop-types';

function Ratio({ children, type, ...props }) {

  let paddingTop;
  switch (type) {
    case '1:1':
      paddingTop = '100%';
      break;
    case '16:9':
      paddingTop = '56.25%';
      break;
    case '4:3':
      paddingTop = '75%';
      break;
    case '3:2':
      paddingTop = '66.66%';
      break;
    default:
      paddingTop = '100%';
      break;
  }

  return <>
    <div style={{ width: '100%', paddingTop, position: 'relative' }}>
      <div style={{ position: 'absolute', top: '0', left: '0', bottom: '0', right: '0' }}>
        {children}
      </div>
    </div>
  </>;
}

Ratio.propTypes = {
  style: PropTypes.object,
  onClick: PropTypes.func,
};

Ratio.defaultProps = {
  style: {},
  onClick: () => null,
};


export default Ratio;
