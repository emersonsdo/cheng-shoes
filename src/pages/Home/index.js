import React, { useEffect, useState } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as CartActions from '../../store/modules/cart/actions';
import { formatPrice } from '../../utils/format';
import { ProductList } from './styles';
import api from '../../services/api';

function Home() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    async function loadProducts() {
      const res = await api.get('products');
      const data = res.data.map((product) => ({
        ...product,
        formattedPrice: formatPrice(product.price),
      }));
      setProducts(data);
    }

    loadProducts();
  }, []);

  function handleCartChange(product) {
    dispatch(CartActions.addToCart(product));
    // Em teoria seria assim com o bindActionCreators
    // addToCart()
  }

  return (
    <ProductList>
      {products.map((product) => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.formattedPrice}</span>

          <button type="button" onClick={() => handleCartChange(product)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" /> 3
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(CartActions, dispatch);

// Primeiro parâmetro seria o mapStateToProps
export default connect(null, mapDispatchToProps)(Home);
