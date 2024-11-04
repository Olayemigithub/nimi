import { render, screen } from '@testing-library/react';
import App from './App';

test('renders homepage', () => {
    render(<App />);
    const linkElement = screen.getByText(/Welcome to Your Dashboard/i);
    expect(linkElement).toBeInTheDocument();
});

// Add more test cases for login, payment process, etc.
