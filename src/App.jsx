import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const SORT_BY_ALPHABET = 'alpha';
const SORT_BY_LENGTH = 'length';

function preparedGoods(goods, field, reverse) {
  const updatedGoods = [...goods].sort((goods1, goods2) => {
    switch (field) {
      case SORT_BY_ALPHABET:
        return goods1.localeCompare(goods2);

      case SORT_BY_LENGTH:
        return goods1.length - goods2.length;

      default:
        return 0;
    }
  });

  return reverse ? updatedGoods.reverse() : updatedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [reverse, setReverse] = useState(false);

  const viewGoods = preparedGoods(goodsFromServer, sortField, reverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField(SORT_BY_ALPHABET)}
          type="button"
          className={
            sortField === SORT_BY_ALPHABET
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_BY_LENGTH)}
          type="button"
          className={
            sortField === SORT_BY_LENGTH
              ? 'button is-success'
              : 'button is-success is-light'
          }
        >
          Sort by length
        </button>

        <button
          onClick={() => {
            setReverse(!reverse);
          }}
          type="button"
          className={
            reverse ? 'button is-warning' : 'button is-warning is-light'
          }
        >
          Reverse
        </button>

        {sortField || reverse ? (
          <button
            onClick={() => {
              setSortField('');
              setReverse(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        ) : null}
      </div>

      <ul>
        {viewGoods.map(goodsItem => {
          return <li data-cy="Good">{goodsItem}</li>;
        })}
      </ul>
    </div>
  );
};
