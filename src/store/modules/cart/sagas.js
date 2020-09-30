import { call, select, put, all, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '../../../services/history';
import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';

import { addToCartSuccess, updateAmountSuccess } from './actions';

// * +- o async
function* addToCart({ id }) {
  // yield +- o await
  const productExists = yield select((state) =>
    state.cart.find((p) => p.id === id)
  );

  const stock = yield call(api.get, `stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productExists ? productExists.amount : 0;

  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    toast.error('Estoque insuficiente');
    return;
  }

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFomatted: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
    history.push('/cart');
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const stock = yield call(api.get, `stock/${id}`);
  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Estoque insuficiente');
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  // takeLastet = Caso o usuário faça mais requisições enquanto uma estiver em execução,
  // a primeira é descartada e apenas a última é válida. takeEvery executa todas.
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
