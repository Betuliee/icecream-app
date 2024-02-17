import { fireEvent, render, screen } from '@testing-library/react';
import Form from '.';
import userEvent from '@testing-library/user-event';

test('Koşulların onaylanmasına göre buton aktifliği', async () => {
  // user kurulumu yap
  const user = userEvent.setup();

  render(<Form />);

  const checkBox = screen.getByRole('checkbox');
  const button = screen.getByRole('button');

  expect(checkBox).not.toBeChecked();

  expect(button).toBeDisabled();

  await user.click(checkBox);

  expect(button).toBeEnabled();

  await user.click(checkBox);

  expect(button).toBeDisabled();
});

test('Onay butonu hover durumuna göre bildirim gözükür', async () => {
  const user = userEvent.setup();

  render(<Form />);

  const checkBox = screen.getByRole('checkbox');
  const button = screen.getByRole('button');

  const popup = screen.getByText(/size gerçekten/i); // i > insensetive

  await user.click(checkBox);

  expect(popup).not.toBeVisible(); // opacity > 0 || display !== none || visibty !== hidden

  fireEvent.mouseEnter(button);

  expect(popup).toBeVisible();

  fireEvent.mouseLeave(button);

  expect(popup).not.toBeVisible();
});
