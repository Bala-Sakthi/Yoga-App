import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = (props) => {
  const {
    label,
    name,
    id,
    type,
    placeholder,
    htmlFor,
    lableClassName,
    value,
    onChange,
    onBlur,
    disabled,
    className,
    lg,
    md,
    xxl,
    xl,
    sm,
    validation,
    star,
    ref,
    accept,
    labelColor,
    inputBgColor,
    borderStyle,
    placeholderColor, 
  } = props;

  return (
    <Form.Group>
      <Form.Label
        htmlFor={htmlFor}
        className={lableClassName}
        style={{ color: labelColor }}
      >
        {label}
        <span className={`color-white ${star === 'none' ? `d-${star}` : ''}`}>
          *
        </span>
      </Form.Label>
      <Form.Control
        name={name}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className={className}
        lg={lg}
        md={md}
        xxl={xxl}
        xl={xl}
        sm={sm}
        ref={ref}
        accept={accept ?? ''}
        style={{
          backgroundColor: inputBgColor,
          border: borderStyle || 'none',
        }}
      />
      {/* Add CSS for placeholder color */}
      <style jsx>{`
        input::placeholder {
          color: ${placeholderColor || 'gray'}; 
        }
      `}</style>
      {validation}
    </Form.Group>
  );
};

export default TextInput;
