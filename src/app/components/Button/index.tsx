import React from 'react';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-block cursor-pointer border-0 rounded-full font-bold';

  const sizeStyles = {
    small: 'px-4 py-2.5 text-xs',
    medium: 'px-5 py-3 text-sm',
    large: 'px-6 py-3 text-base',
  };

  const variantStyles = primary
    ? 'bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors'
    : 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors';

  return (
    <button
      type="button"
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles}`}
      style={backgroundColor ? { backgroundColor } : undefined}
      onClick={onClick}
      {...props}
    >
      {label}
    </button>
  );
};
