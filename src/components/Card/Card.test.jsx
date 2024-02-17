import { render, screen } from '@testing-library/react';
import Card from '.';
import userEvent from '@testing-library/user-event';

const item = {
  name: 'Chocolate',
  imagePath: '/images/chocolate.png',
};

const basket = [
  {
    name: 'Chocolate',
    imagePath: '/images/chocolate.png',
    id: 'c3ad',
  },
  {
    name: 'Chocolate',
    imagePath: '/images/chocolate.png',
    id: 'c3ad',
  },
  {
    name: 'Vanilla',
    imagePath: '/images/vanilla.png',
    id: 'ad58',
  },
];

// Prop olarak veri alan bileşenleri test ediyorsak
// Aldıkları propların benzerini göndermemiz gerekir
test('Miktar alanı sepet verisine uygundur ve gönderdiğimiz item verisne göre kart içeriği basılır ', async () => {
  render(<Card item={item} basket={basket} setBasket={() => {}} />);

  const amount = screen.getByTestId('amount');

  expect(amount.textContent).toBe('2');

  screen.getByText(item.name);

  const image = screen.getByAltText('çeşit-resim');

  expect(image).toHaveAttribute('src', item.imagePath);
});

test('Butonlara tıklanca setMehodu doğru parametrelerle tetiklenir', async () => {

  const mockFn = jest.fn();

  const user = userEvent.setup();

  render(<Card item={item} basket={basket} setBasket={mockFn} />);

  const addBtn = screen.getByRole('button', { name: 'Ekle' });
  const delBtn = screen.getByRole('button', { name: 'Sıfırla' });

  await user.click(addBtn);

  expect(mockFn).toHaveBeenCalledWith([...basket, item]);

  await user.click(delBtn);

  expect(mockFn).toHaveBeenCalledWith([
    {
      name: 'Vanilla',
      imagePath: '/images/vanilla.png',
      id: 'ad58',
    },
  ]);
});
