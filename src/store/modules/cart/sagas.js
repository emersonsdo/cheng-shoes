import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

// * +- o async
function* addToCart({ id }) {
  // yield +- o await
  const response = yield call(api.get, `/products/${id}`);

  yield put(addToCartSuccess(response.data));
}

export default all([
  // Caso o usuário faça mais requisições enquanto uma estiver em execução,
  // a primeira é descartada e apenas a última é válida. takeEvery executa todas.
  takeLatest('@cart/ADD_REQUEST', addToCart),
]);
