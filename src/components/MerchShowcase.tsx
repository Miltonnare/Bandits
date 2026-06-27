"use client";

import React, { useState } from "react";
import { AnimatePresence as FramerAnimatePresence, motion as framerMotion } from "framer-motion";
import { ShoppingBag, X, Plus, Minus, Check, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

interface MerchItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes?: string[];
  limited: boolean;
}

export default function MerchShowcase() {
  const merchItems: MerchItem[] = [
    {
      id: "m1",
      name: "Silence Has a Sound Hoodie",
      price: 85.0,
      category: "APPARAL",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Ccircle cx='100' cy='100' r='50' fill='%23C1121F' opacity='0.25'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-style='italic' fill='%23D4AF37' font-size='12'%3E254B HOODIE%3C/text%3E%3C/svg%3E",
      description: "Premium heavy-weight 450gsm organic cotton hoodie in washed carbon black. Features high-density puff print lyrics on back and embroidered signature Bandit icon on chest.",
      sizes: ["S", "M", "L", "XL"],
      limited: true,
    },
    {
      id: "m2",
      name: "Bandits Neo-Noir Tee",
      price: 45.0,
      category: "APPARAL",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Cpath d='M50,150 L100,50 L150,150 Z' fill='%23D4AF37' opacity='0.15'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' fill='%23F9F9F9' font-size='12'%3ENEO-NOIR TEE%3C/text%3E%3C/svg%3E",
      description: "Boxy luxury-fit tee in high-grade 240gsm jersey cotton. Front screen-printed vintage band composite artwork with distressed finishes.",
      sizes: ["M", "L", "XL"],
      limited: false,
    },
    {
      id: "m3",
      name: "Silence Has a Sound Vinyl (Gatefold)",
      price: 60.0,
      category: "MUSIC",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Ccircle cx='100' cy='100' r='60' fill='%23050505' stroke='%23D4AF37' stroke-width='2'/%3E%3Ccircle cx='100' cy='100' r='20' fill='%23C1121F'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' fill='%23050505' font-size='10'%3EVINYL%3C/text%3E%3C/svg%3E",
      description: "Limited collector's edition double vinyl. 180g gold-splattered crimson vinyl in matte-coated gatefold sleeve with 24-page editorial lyric booklet.",
      limited: true,
    },
    {
      id: "m4",
      name: "Signature Bandit Distressed Cap",
      price: 35.0,
      category: "ACCESSORIES",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='100%25' height='100%25' fill='%231F1F1F'/%3E%3Ctext x='50%25' y='52%25' dominant-baseline='middle' text-anchor='middle' font-family='monospace' fill='%23A5A5A5' font-size='12'%3E254B CAP%3C/text%3E%3C/svg%3E",
      description: "Low-profile unstructured strapback cap with heavy wash distress details. Finished with brass buckle closure and metallic signature branding.",
      sizes: ["One Size"],
      limited: false,
    },
  ];

  interface CartItem {
    item: MerchItem;
    size?: string;
    quantity: number;
  }

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MerchItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [isSuccessCheckout, setIsSuccessCheckout] = useState(false);

  // Cart operations
  const addToCart = (item: MerchItem, size?: string) => {
    const sizeToUse = size || (item.sizes ? item.sizes[0] : undefined);
    
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (c) => c.item.id === item.id && c.size === sizeToUse
      );
      if (existingIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { item, size: sizeToUse, quantity: 1 }];
    });
    
    // Close quick view
    setSelectedItem(null);
    setSelectedSize("");
    // Open cart drawer
    setIsCartOpen(true);
  };

  const updateQuantity = (index: number, diff: number) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity += diff;
      if (newCart[index].quantity <= 0) {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const cartCount = cart.reduce((acc, c) => acc + c.quantity, 0);
  const cartSubtotal = cart.reduce((acc, c) => acc + c.item.price * c.quantity, 0);

  const handleCheckout = () => {
    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#C1121F", "#F9F9F9"],
    });
    setIsSuccessCheckout(true);
    setTimeout(() => {
      setCart([]);
      setIsCartOpen(false);
      setIsSuccessCheckout(false);
    }, 3500);
  };

  return (
    <div className="relative">
      {/* Merch Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {merchItems.map((item) => (
          <div
            key={item.id}
            className="frosted-card relative flex flex-col group select-none overflow-hidden"
          >
            {/* Limited Tag */}
            {item.limited && (
              <span className="absolute top-3 left-3 z-10 bg-accent-red text-white-editorial text-[9px] font-mono tracking-widest px-2 py-0.5 uppercase">
                LIMITED EDITION
              </span>
            )}

            {/* Image section */}
            <div className="relative aspect-square overflow-hidden bg-secondary-dark/60">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Hover overlay CTA */}
              <div className="absolute inset-0 bg-background-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <button
                  onClick={() => {
                    setSelectedItem(item);
                    if (item.sizes) setSelectedSize(item.sizes[0]);
                  }}
                  className="px-6 py-2.5 bg-gold-primary text-background-dark font-display font-medium text-xs tracking-widest hover:bg-transparent hover:text-gold-primary border border-gold-primary transition-all duration-300"
                >
                  QUICK VIEW
                </button>
              </div>
            </div>

            {/* Description card */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-mono text-gold-primary tracking-widest block uppercase">
                  {item.category}
                </span>
                <h4 className="font-serif italic text-lg text-white-editorial mt-1 leading-snug group-hover:text-gold-primary transition-colors">
                  {item.name}
                </h4>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-border-dark/30">
                <span className="font-mono text-sm font-semibold text-white-editorial">
                  ${item.price.toFixed(2)}
                </span>
                <button
                  onClick={() => addToCart(item)}
                  className="text-xs font-mono tracking-widest text-muted-text hover:text-gold-primary transition-colors flex items-center space-x-1.5"
                >
                  <span>ADD TO BAG</span>
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating cart trigger */}
      {cartCount > 0 && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gold-primary text-background-dark p-4 rounded-none shadow-lg border border-gold-primary hover:bg-background-dark hover:text-gold-primary transition-all duration-300 flex items-center space-x-2.5"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-mono text-xs font-semibold tracking-widest bg-background-dark text-gold-primary px-2 py-0.5 rounded-none group-hover:bg-gold-primary group-hover:text-background-dark transition-colors">
            {cartCount}
          </span>
        </button>
      )}

      {/* Quick View Modal */}
      <FramerAnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background-dark/95 backdrop-blur-md">
            <framerMotion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-secondary-dark border border-border-dark/80 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 relative overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 p-2 text-muted-text hover:text-white-editorial transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <div className="aspect-square bg-surface-dark flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-border-dark/40">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.name}
                  className="w-full h-full object-contain max-h-75 md:max-h-full"
                />
              </div>

              {/* Product Details */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div className="space-y-6">
                  <div>
                    <span className="text-xs font-mono text-gold-primary tracking-widest uppercase">
                      {selectedItem.category}
                    </span>
                    <h3 className="font-serif italic text-2xl md:text-3xl text-white-editorial mt-2">
                      {selectedItem.name}
                    </h3>
                    <span className="font-mono text-xl font-semibold text-white-editorial block mt-3">
                      ${selectedItem.price.toFixed(2)}
                    </span>
                  </div>

                  <p className="text-sm text-muted-text leading-relaxed">
                    {selectedItem.description}
                  </p>

                  {/* Size selector if available */}
                  {selectedItem.sizes && (
                    <div className="space-y-3">
                      <span className="text-xs font-mono text-muted-text uppercase tracking-widest">
                        SELECT SIZE
                      </span>
                      <div className="flex gap-3">
                        {selectedItem.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-10 h-10 border text-xs font-mono transition-all ${
                              selectedSize === size
                                ? "border-gold-primary text-gold-primary bg-gold-primary/5"
                                : "border-border-dark text-muted-text hover:border-muted-text"
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-8 border-t border-border-dark/30">
                  <button
                    onClick={() => addToCart(selectedItem, selectedSize)}
                    className="magnetic-btn w-full py-4 bg-gold-primary text-background-dark hover:bg-transparent hover:text-gold-primary border border-gold-primary font-display font-medium text-xs tracking-widest transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <span>ADD TO SHOPPING BAG</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </framerMotion.div>
          </div>
        )}
      </FramerAnimatePresence>

      {/* Cart Drawer */}
      <FramerAnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-background-dark/60 backdrop-blur-sm">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <framerMotion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="pointer-events-auto w-screen max-w-md border-l border-border-dark bg-secondary-dark flex flex-col justify-between"
                >
                  {/* Cart Header */}
                  <div className="p-6 border-b border-border-dark/60 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="w-5 h-5 text-gold-primary" />
                      <h3 className="font-display font-medium text-md tracking-wider text-white-editorial">
                        SHOPPING BAG ({cartCount})
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="p-1 text-muted-text hover:text-white-editorial transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Cart Items list */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {isSuccessCheckout ? (
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full border border-gold-primary flex items-center justify-center text-gold-primary bg-gold-primary/10">
                          <Check className="w-6 h-6" />
                        </div>
                        <h4 className="font-serif italic text-xl text-white-editorial">
                          Order Received.
                        </h4>
                        <p className="text-xs text-muted-text tracking-widest uppercase">
                          PREPARING NOIR FREQUENCIES...
                        </p>
                      </div>
                    ) : cart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center text-muted-text space-y-3 font-mono text-xs">
                        <ShoppingBag className="w-8 h-8 opacity-40 text-muted-text" />
                        <span>YOUR SHOPPING BAG IS EMPTY</span>
                      </div>
                    ) : (
                      cart.map((cartItem, idx) => (
                        <div
                          key={`${cartItem.item.id}-${cartItem.size || ""}`}
                          className="flex items-center space-x-4 border-b border-border-dark/30 pb-4"
                        >
                          <div className="w-16 h-16 bg-surface-dark border border-border-dark/40 shrink-0 p-2">
                            <img
                              src={cartItem.item.image}
                              alt={cartItem.item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div className="flex-1 space-y-1">
                            <h4 className="text-xs font-serif italic text-white-editorial leading-tight">
                              {cartItem.item.name}
                            </h4>
                            {cartItem.size && (
                              <span className="text-[10px] font-mono text-muted-text">
                                Size: {cartItem.size}
                              </span>
                            )}
                            <div className="flex items-center justify-between mt-2">
                              {/* Quantity selectors */}
                              <div className="flex items-center border border-border-dark/80">
                                <button
                                  onClick={() => updateQuantity(idx, -1)}
                                  className="p-1 text-muted-text hover:text-gold-primary"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono text-white-editorial">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(idx, 1)}
                                  className="p-1 text-muted-text hover:text-gold-primary"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-mono text-xs font-semibold text-white-editorial">
                                ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Cart Footer */}
                  {cart.length > 0 && !isSuccessCheckout && (
                    <div className="p-6 border-t border-border-dark/60 space-y-4">
                      <div className="flex justify-between items-center text-sm font-mono text-muted-text">
                        <span>SUBTOTAL</span>
                        <span className="text-white-editorial font-semibold">
                          ${cartSubtotal.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={handleCheckout}
                        className="magnetic-btn w-full py-4 bg-gold-primary text-background-dark hover:bg-transparent hover:text-gold-primary border border-gold-primary font-display font-medium text-xs tracking-widest transition-all duration-300"
                      >
                        PROCEED TO CHECKOUT
                      </button>
                    </div>
                  )}
                </framerMotion.div>
              </div>
            </div>
          </div>
        )}
      </FramerAnimatePresence>
    </div>
  );
}
