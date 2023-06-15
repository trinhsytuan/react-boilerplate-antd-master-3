import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';

import './CustomColorPicker.scss';

export default function CustomColorPicker({ value, disabled, ...props }) {

  const ref = useRef(null);
  const [displayColorPicker, setDisplayColorPicker] = useState(null);
  const [color, setColor] = useState();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setColor(value);
  }, [value]);

  function handleChangeColor(e) {
    setColor(e.hex);
    props.onChange(e);
  }

  function handleClick() {
    if (disabled) return;
    setDisplayColorPicker(!displayColorPicker);
  }

  function handleClickOutside(event) {
    if (!ref?.current?.contains(event.target)) {
      setDisplayColorPicker(false);
    }
  }

  return (
    <div className={`color-picker ${disabled ? 'disabled' : ''}`} ref={ref}>
      <div onClick={handleClick} className="color-picker__preview">
        <div style={{ background: color }}/>
      </div>

      {displayColorPicker && <div className="position-absolute mt-2">
        <SketchPicker color={color} onChange={handleChangeColor}/>
      </div>}
    </div>
  );
}
