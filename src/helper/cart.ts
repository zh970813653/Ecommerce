import { Product } from "../models/product";
import { getStorage, setStorage } from "../utils";

const KEY = 'cart'

export interface CartItem extends Product {
  count: number
}

export const addProductItem = (productItem: Product, callback: () => void) => {
  // let cart: CartItem[] = []
  // if (getStorage(KEY)) {
  //     cart = getStorage(KEY) as CartItem[]
  //     cart.push({
  //         ...productItem,
  //         count: 1
  //     })
  // }

  // let cartArray = Array.from(new Set(cart.map(item => item._id)))

  // cart = cartArray.map(item => {
  //     return cart.find(product => product._id === item)
  // }) as CartItem  []
  // callback()
  let cart: CartItem[] = []
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart")!)
    }
    cart.push({
      ...productItem,
      count: 1
    })
  }
  cart = Array.from(new Set(cart.map(item => item._id))).map(item => {
    return cart.find(product => product._id === item)
  }) as CartItem[]
  localStorage.setItem("cart", JSON.stringify(cart))
  callback()
}

export const getCart = () => {
  const cart = getStorage(KEY) || []
  return cart
}

export const updateCart = (productId: string, count: number) => {
  let cart: CartItem[] = []
  if (getStorage(KEY)) {
    cart = getStorage(KEY)
    const findIndex = cart.findIndex(item => item._id === productId)
    cart[findIndex].count = count
  }
  setStorage(KEY, cart)
  return cart
}

export const deleteCartItem = (productId: string) => {
  let cart: CartItem[] = []
  if (getStorage(KEY)) {
    cart = getStorage(KEY)
    const findIndex = cart.findIndex(item => item._id === productId)
    cart.splice(findIndex, 1)
  }
  setStorage(KEY, cart)
  return cart
}

export const itemCount = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")!).length
    }
  }
  return 0
}
