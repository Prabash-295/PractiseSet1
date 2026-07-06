import './Button.css';

function Button({ children, variant, size, onClick, type, disabled, className }) {
  const classes = [
    'btn',
    variant ? `btn-${variant}` : '',
    size ? `btn-${size}` : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type || 'button'}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
