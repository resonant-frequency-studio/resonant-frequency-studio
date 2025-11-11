import { render, screen } from '@testing-library/react';
import { Button } from './index';

describe('Button Component', () => {
  it('renders with label', () => {
    render(<Button label="Click me" />);

    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders primary variant correctly', () => {
    render(<Button label="Primary Button" primary />);

    const button = screen.getByRole('button', { name: /Primary Button/i });
    expect(button).toHaveClass('bg-indigo-600');
  });

  it('renders secondary variant correctly', () => {
    render(<Button label="Secondary Button" />);

    const button = screen.getByRole('button', { name: /Secondary Button/i });
    expect(button).not.toHaveClass('bg-indigo-600');
    expect(button).toHaveClass('border');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /Click me/i });
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom background color', () => {
    render(<Button label="Custom" backgroundColor="#ff0000" />);

    const button = screen.getByRole('button', { name: /Custom/i });
    expect(button).toHaveStyle({ backgroundColor: '#ff0000' });
  });

  it('renders different sizes', () => {
    const { rerender } = render(<Button label="Test" size="small" />);
    let button = screen.getByRole('button', { name: /Test/i });
    expect(button).toHaveClass('px-4', 'py-2.5', 'text-xs');

    rerender(<Button label="Test" size="medium" />);
    button = screen.getByRole('button', { name: /Test/i });
    expect(button).toHaveClass('px-5', 'py-3', 'text-sm');

    rerender(<Button label="Test" size="large" />);
    button = screen.getByRole('button', { name: /Test/i });
    expect(button).toHaveClass('px-6', 'py-3', 'text-base');
  });
});
