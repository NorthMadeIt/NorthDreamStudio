"use client";

import React, { useState, useRef } from "react";

const PRODUCTS = [
  {
    id: "dogs-tee",
    title: "Dogs Tee",
    price: "45.00",
    currency: "GBP",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "5yr-hoodie",
    title: "5yr Hoodie",
    price: "80.00",
    currency: "GBP",
    sizes: ["XS", "S", "M", "L"],
  },
];

export default function ShopSection() {
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cart, setCart] = useState([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [pulsingId, setPulsingId] = useState(null);

  // Horizontal scroll for the rack
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Pulse animation on tap/click
  const handleProductClick = (product) => {
    setPulsingId(product.id);
    setTimeout(() => setPulsingId(null), 180);
    setSelectedProduct(product);
  };

  const addToCart = () => {
    if (!selectedProduct) return;
    const item = {
      ...selectedProduct,
      size: selectedSize,
      cartId: `${selectedProduct.id}-${selectedSize}-${Date.now()}`,
    };
    setCart((prev) => [...prev, item]);
    setSelectedProduct(null);
  };

  const handleShopifyCheckout = () => {
    window.open("https://twomuch-supplies.myshopify.com", "_blank");
  };

  return (
    <div className="relative w-full h-[82vh] bg-[#f2f2f2] flex flex-col justify-between overflow-hidden text-[#000000] border-2 border-[#000000] rounded-none">
      
      {/* Top Header Bar */}
      <div className="bg-[#ffffff] border-b-2 border-[#000000] p-2.5 flex justify-between items-center z-20 font-mono text-xs font-bold rounded-none">
        <span className="uppercase tracking-wider">Shop</span>
        <span className="bg-[#e2ff70] px-2 py-0.5 border border-[#000000] rounded-none">
          11,305 Views
        </span>
      </div>

      {/* Main View Area */}
      {selectedProduct ? (
        /* PRODUCT DETAIL IN-PAGE MODAL */
        <div className="relative flex-1 bg-[#ffffff] flex flex-col justify-between p-3 z-10 overflow-hidden rounded-none">
          <div className="flex-1 flex items-center justify-center relative my-2">
            <div className="w-full h-full max-h-[50vh] bg-[#e5e5e5] border-2 border-[#000000] flex items-center justify-center font-mono text-xs uppercase rounded-none">
              [ {selectedProduct.title} Detail View ]
            </div>
          </div>

          {/* Size & Action Bar */}
          <div className="bg-[#ffffff] border-2 border-[#000000] p-3 space-y-2 z-20 font-mono rounded-none">
            <div className="flex justify-between items-center text-xs font-black">
              <span>{selectedProduct.title}</span>
              <span>
                {selectedProduct.price} {selectedProduct.currency}
              </span>
              <button
                onClick={() => setSelectedProduct(null)}
                className="bg-[#e2ff70] border border-[#000000] px-3 py-1 text-[11px] font-bold uppercase rounded-none"
              >
                Close
              </button>
            </div>

            {/* Size Selectors */}
            <div className="flex gap-1.5">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-1.5 text-xs font-mono font-bold border border-[#000000] rounded-none transition-colors ${
                    selectedSize === size
                      ? "bg-[#e2ff70]"
                      : "bg-[#ffffff] hover:bg-[#f0f0f0]"
                  }`}
                >
                  {size}
                </button>
              ))}
              <button
                onClick={addToCart}
                className="bg-[#e2ff70] border border-[#000000] px-4 font-black text-xs rounded-none active:bg-[#cbf230]"
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* HORIZONTAL RACK TRACK */
        <div className="relative flex-1 flex items-center overflow-hidden">
          <button
            onClick={() => handleScroll("left")}
            className="absolute left-2 z-20 bg-[#e2ff70] border-2 border-[#000000] p-2.5 font-black text-sm active:scale-95 transition-transform rounded-none"
          >
            ←
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="absolute right-2 z-20 bg-[#e2ff70] border-2 border-[#000000] p-2.5 font-black text-sm active:scale-95 transition-transform rounded-none"
          >
            →
          </button>

          <div
            ref={scrollRef}
            className="w-full h-full flex items-center gap-6 overflow-x-auto px-12 scrollbar-none snap-x snap-mandatory"
            style={{ scrollbarWidth: "none" }}
          >
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className={`shrink-0 w-[220px] h-[330px] bg-[#ffffff] border-2 border-[#000000] p-3 flex flex-col justify-between cursor-pointer snap-center transition-transform duration-150 select-none rounded-none ${
                  pulsingId === product.id ? "scale-95 bg-[#f0f0f0]" : "hover:scale-[1.01]"
                }`}
              >
                <div className="w-full h-2 bg-[#000000] mb-2 rounded-none" />
                <div className="flex-1 bg-[#f5f5f5] border border-dashed border-[#888888] flex items-center justify-center font-mono text-xs uppercase rounded-none">
                  [ {product.title} ]
                </div>
                <div className="mt-3 pt-2 border-t-2 border-[#000000] flex justify-between items-center text-xs font-black">
                  <span>{product.title}</span>
                  <span className="bg-[#e2ff70] px-2.5 py-1 border border-[#000000] rounded-none">
                    Buy
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Cart Drawer Modal */}
      {showCartDrawer && (
        <div className="absolute inset-0 z-30 bg-[#000000]/70 flex items-end p-2 rounded-none">
          <div className="w-full bg-[#ffffff] border-2 border-[#000000] p-3 space-y-3 font-mono rounded-none">
            <div className="flex justify-between items-center border-b-2 border-[#000000] pb-2 font-black text-xs uppercase">
              <span>Bag ({cart.length})</span>
              <button
                onClick={() => setShowCartDrawer(false)}
                className="bg-[#000000] text-[#ffffff] px-2 py-0.5 text-xs font-bold rounded-none"
              >
                ✕
              </button>
            </div>

            <div className="max-h-36 overflow-y-auto space-y-2 divide-y divide-[#e5e5e5]">
              {cart.length === 0 ? (
                <p className="text-xs text-[#777777] py-2">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="pt-1.5 flex justify-between text-xs font-bold">
                    <span>{item.title} ({item.size})</span>
                    <span>{item.price} {item.currency}</span>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <button
                onClick={handleShopifyCheckout}
                className="w-full bg-[#e2ff70] border-2 border-[#000000] py-2.5 font-black text-xs uppercase rounded-none hover:brightness-95 active:scale-[0.99]"
              >
                Checkout
              </button>
            )}
          </div>
        </div>
      )}

      {/* Bottom Sticky Control Bar */}
      <div className="bg-[#ffffff] border-t-2 border-[#000000] p-2 flex justify-between items-center z-20 font-mono text-xs font-bold rounded-none">
        <span className="bg-[#e2ff70] px-2.5 py-1 border border-[#000000] rounded-none uppercase">
          Products
        </span>
        
        <button
          onClick={() => setShowCartDrawer(!showCartDrawer)}
          className="flex items-center gap-2 bg-[#ffffff] border border-[#000000] px-3 py-1 rounded-none hover:bg-[#f5f5f5]"
        >
          <span>{String(cart.length).padStart(2, "0")}</span>
          <span>🛒</span>
        </button>
      </div>

    </div>
  );
}
