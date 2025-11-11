import { render, screen } from '@testing-library/react';
import Home from '../page';

describe('Home Page', () => {
  it('renders the get started message', () => {
    render(<Home />);

    const heading = screen.getByText(
      /To get started, edit the page.tsx file./i
    );
    expect(heading).toBeInTheDocument();
  });

  it('renders Next.js logo', () => {
    render(<Home />);

    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });
});
