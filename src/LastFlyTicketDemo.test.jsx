import React from 'react';
import { render, screen } from '@testing-library/react';
import LastFlyTicketDemo from './LastFlyTicketDemo';

test('renders LastFlyTicketDemo component', () => {
	render(<LastFlyTicketDemo />);
	const linkElement = screen.getByText(/Last Fly Ticket Demo/i);
	expect(linkElement).toBeInTheDocument();
});