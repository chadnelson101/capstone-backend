import {pool} from '../config/config.js'

const getCart = async ()=>{
    const [cart] = await pool.query(`SELECT * FROM cart`)
    return cart
};

const addToCart = async (userId, productId, quantity) => {
    await pool.query(`INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)`, [userId, productId, quantity]);
};

// Get user's cart
const getUserCart = async (userId) => {
    const [cartItems] = await pool.query(`SELECT * FROM cart WHERE user_id = ?`, [userId]);
    return cartItems;
};

// Update cart item quantity
const updateCartItemQuantity = async (cartId, quantity) => {
    await pool.query(`UPDATE cart SET quantity = ? WHERE cart_id = ?`, [quantity, cartId]);
};

// Remove item from cart
const removeFromCart = async (cartId) => {
    await pool.query(`DELETE FROM cart WHERE cart_id = ?`, [cartId]);
};

export {addToCart,getUserCart,updateCartItemQuantity,removeFromCart,getCart}