import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  MdRemoveCircleOutline,
  MdAddCircleOutline,
  MdDelete,
} from 'react-icons/md';

import * as CartActions from '../../store/modules/cart/actions';
import { Container, ProductTable, Total } from './styles';

function Cart({ cart, removeFromCart }) {
  // const dispatch = useDispatch();

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QUANTIDADE</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map((product) => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.formattedPrice}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline size={20} color="#00468c" />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline size={20} color="#00468c" />
                  </button>
                </div>
              </td>
              <td>
                <strong>R$259,80</strong>
              </td>
              <td>
                <button
                  type="button"
                  onClick={
                    () => removeFromCart(product.id)
                    // dispatch(CartActions.removeFromCart(product.id))
                  }
                >
                  <MdDelete size={20} color="#00468c" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$567,93</strong>
        </Total>
      </footer>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
