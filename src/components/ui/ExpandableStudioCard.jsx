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
  {
    id: "aftrshift-cap",
    title: "Aftrshift Cap",
    price: "30.00",
    currency: "GBP",
    sizes: ["ONE SIZE"],
  },
];

export default function ExpandableStudioCard() {
  // Navigation View State: 'menu' | 'shop' | 'works' | 'info'
  const [currentView, setCurrentView] = useState("menu");

  // Shop States
  const scrollRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [cart, setCart] = useState([]);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [pulsingId, setPulsingId] = useState(null);

  // Rack Scroll Handler
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Product Tap Pulse
  const handleProductClick = (product) => {
    setPulsingId(product.id);
    setTimeout(() => setPulsingId(null), 180);
    setSelectedProduct(product);
  };

  // Cart Handlers
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
    <div className="w-full max-w-md mx-auto bg-[#ffffff] border-2 border-[#000000] rounded-none overflow-hidden font-mono text-[#000000] select-none shadow-2xl">
      
      {/* GLOBAL HEADER BAR */}
      <div className="bg-[#ffffff] border-b-2 border-[#000000] p-3 flex justify-between items-center rounded-none font-bold text-xs">
        {currentView === "menu" ? (
          <>
            <span className="uppercase tracking-widest font-black text-sm">NorthDreamStudio</span>
            <span className="bg-[#e2ff70] px-2 py-0.5 border border-[#000000] text-[10px] rounded-none uppercase">
              Online
            </span>
          </>
        ) : (
          <button
            onClick={() => {
              setCurrentView("menu");
              setSelectedProduct(null);
              setShowCartDrawer(false);
            }}
            className="w-full bg-[#000000] text-[#ffffff] py-1.5 px-3 font-mono text-xs font-bold uppercase rounded-none flex items-center justify-between active:bg-[#222222]"
          >
            <span>← Back To Menu</span>
            <span className="text-[10px] text-[#e2ff70]">[ {currentView.toUpperCase()} ]</span>
          </button>
        )}
      </div>

      {/* VIEW 1: MAIN MENU GRID */}
      {currentView === "menu" && (
        <div className="p-3 space-y-3 bg-[#f2f2f2]">
          {/* Top Banner */}
          <div className="bg-[#ffffff] border-2 border-[#000000] p-3 rounded-none">
            <p className="text-[11px] leading-tight font-medium uppercase">
              Digital Visual Identity & Sound Architecture Studio.
            </p>
          </div>

          {/* Interactive Menu Grid */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* SHOP TILE */}
            <div
              onClick={() => setCurrentView("shop")}
              className="bg-[#e2ff70] border-2 border-[#000000] p-4 flex flex-col justify-between cursor-pointer hover:brightness-95 active:scale-[0.98] transition-all rounded-none min-h-[120px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-xl">🛒</span>
                <span className="text-[10px] bg-[#000000] text-[#ffffff] px-1.5 py-0.5 font-bold">
                  STORE
                </span>
              </div>
              <div>
                <span className="font-black text-xs uppercase tracking-tight block">Shop</span>
                <span className="text-[10px] opacity-80 uppercase">Apparel & Assets</span>
              </div>
            </div>

            {/* WORKS TILE */}
            <div
              onClick={() => setCurrentView("works")}
              className="bg-[#ffffff] border-2 border-[#000000] p-4 flex flex-col justify-between cursor-pointer hover:bg-[#f8f8f8] active:scale-[0.98] transition-all rounded-none min-h-[120px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-xl">⚡</span>
                <span className="text-[10px] border border-[#000000] px-1.5 py-0.5 font-bold">
                  03
                </span>
              </div>
              <div>
                <span className="font-black text-xs uppercase tracking-tight block">Works</span>
                <span className="text-[10px] opacity-60 uppercase">Selected Projects</span>
              </div>
            </div>

            {/* INFO TILE */}
            <div
              onClick={() => setCurrentView("info")}
              className="bg-[#ffffff] border-2 border-[#000000] p-4 flex flex-col justify-between cursor-pointer hover:bg-[#f8f8f8] active:scale-[0.98] transition-all rounded-none min-h-[120px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-xl">📁</span>
              </div>
              <div>
                <span className="font-black text-xs uppercase tracking-tight block">Info</span>
                <span className="text-[10px] opacity-60 uppercase">About & Specs</span>
              </div>
            </div>

            {/* LINKS TILE */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[#000000] text-[#ffffff] border-2 border-[#000000] p-4 flex flex-col justify-between cursor-pointer active:scale-[0.98] transition-all rounded-none min-h-[120px]"
            >
              <div className="flex justify-between items-start">
                <span className="text-xl">↗</span>
              </div>
              <div>
                <span className="font-black text-xs uppercase tracking-tight block text-[#e2ff70]">
                  Social
                </span>
                <span className="text-[10px] opacity-80 uppercase">Connect</span>
              </div>
            </a>

          </div>
        </div>
      )}

      {/* VIEW 2: HEADLESS RACK SHOP */}
      {currentView === "shop" && (
        <div className="relative w-full h-[75vh] bg-[#f2f2f2] flex flex-col justify-between overflow-hidden rounded-none">
          
          {/* Sub Header */}
          <div className="bg-[#ffffff] border-b-2 border-[#000000] p-2 flex justify-between items-center z-10 text-[11px] font-bold">
            <span className="uppercase">Rack View</span>
            <span className="bg-[#e2ff70] px-2 py-0.5 border border-[#000000] rounded-none">
              11,305 Views
            </span>
          </div>

          {/* Main Shop Canvas */}
          {selectedProduct ? (
            /* PRODUCT DETAIL MODAL */
            <div className="relative flex-1 bg-[#ffffff] flex flex-col justify-between p-3 z-10 overflow-hidden rounded-none">
              <div className="flex-1 flex items-center justify-center relative my-2">
                <div className="w-full h-full max-h-[45vh] bg-[#e5e5e5] border-2 border-[#000000] flex items-center justify-center font-mono text-xs uppercase rounded-none">
                  [ {selectedProduct.title} Close-up ]
                </div>
              </div>

              {/* Sticky Controls */}
              <div className="bg-[#ffffff] border-2 border-[#000000] p-2.5 space-y-2 z-20 rounded-none">
                <div className="flex justify-between items-center text-xs font-black">
                  <span>{selectedProduct.title}</span>
                  <span>{selectedProduct.price} {selectedProduct.currency}</span>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="bg-[#e2ff70] border border-[#000000] px-2 py-0.5 text-[10px] font-bold uppercase rounded-none"
                  >
                    Close
                  </button>
                </div>

                {/* Size Grid */}
                <div className="flex gap-1">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex-1 py-1.5 text-xs font-bold border border-[#000000] rounded-none ${
                        selectedSize === size ? "bg-[#e2ff70]" : "bg-[#ffffff]"
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
                className="absolute left-2 z-20 bg-[#e2ff70] border-2 border-[#000000] p-2 font-black text-xs rounded-none active:scale-90"
              >
                ←
              </button>
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-2 z-20 bg-[#e2ff70] border-2 border-[#000000] p-2 font-black text-xs rounded-none active:scale-90"
              >
                →
              </button>

              <div
                ref={scrollRef}
                className="w-full h-full flex items-center gap-5 overflow-x-auto px-10 scrollbar-none snap-x snap-mandatory"
                style={{ scrollbarWidth: "none" }}
              >
                {PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className={`shrink-0 w-[200px] h-[310px] bg-[#ffffff] border-2 border-[#000000] p-3 flex flex-col justify-between cursor-pointer snap-center transition-all rounded-none ${
                      pulsingId === product.id ? "scale-95 bg-[#f0f0f0]" : "hover:scale-[1.01]"
                    }`}
                  >
                    <div className="w-full h-1.5 bg-[#000000] mb-2 rounded-none" />
                    <div className="flex-1 bg-[#f5f5f5] border border-dashed border-[#888888] flex items-center justify-center text-[11px] uppercase rounded-none">
                      [ {product.title} ]
                    </div>
                    <div className="mt-2 pt-2 border-t-2 border-[#000000] flex justify-between items-center text-xs font-black">
                      <span>{product.title}</span>
                      <span className="bg-[#e2ff70] px-2 py-0.5 border border-[#000000] rounded-none">
                        Buy
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cart Drawer */}
          {showCartDrawer && (
            <div className="absolute inset-0 z-30 bg-[#000000]/70 flex items-end p-2 rounded-none">
              <div className="w-full bg-[#ffffff] border-2 border-[#000000] p-3 space-y-3 rounded-none">
                <div className="flex justify-between items-center border-b-2 border-[#000000] pb-2 font-black text-xs uppercase">
                  <span>Bag ({cart.length})</span>
                  <button
                    onClick={() => setShowCartDrawer(false)}
                    className="bg-[#000000] text-[#ffffff] px-2 py-0.5 text-xs font-bold rounded-none"
                  >
                    ✕
                  </button>
                </div>

                <div className="max-h-32 overflow-y-auto space-y-1.5 divide-y divide-[#e5e5e5]">
                  {cart.length === 0 ? (
                    <p className="text-xs text-[#777777] py-2">Your bag is empty.</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.cartId} className="pt-1 flex justify-between text-xs font-bold">
                        <span>{item.title} ({item.size})</span>
                        <span>{item.price} {item.currency}</span>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <button
                    onClick={handleShopifyCheckout}
                    className="w-full bg-[#e2ff70] border-2 border-[#000000] py-2 font-black text-xs uppercase rounded-none active:scale-[0.99]"
                  >
                    Checkout
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Bottom Bar */}
          <div className="bg-[#ffffff] border-t-2 border-[#000000] p-2 flex justify-between items-center z-20 text-xs font-bold rounded-none">
            <span className="bg-[#e2ff70] px-2 py-0.5 border border-[#000000] rounded-none uppercase text-[10px]">
              Products
            </span>
            <button
              onClick={() => setShowCartDrawer(!showCartDrawer)}
              className="flex items-center gap-2 bg-[#ffffff] border border-[#000000] px-2.5 py-0.5 rounded-none"
            >
              <span>{String(cart.length).padStart(2, "0")}</span>
              <span>🛒</span>
            </button>
          </div>

        </div>
      )}

      {/* VIEW 3: WORKS PLACEHOLDER */}
      {currentView === "works" && (
        <div className="p-4 space-y-3 bg-[#f2f2f2] min-h-[50vh]">
          <h3 className="font-black text-xs uppercase border-b-2 border-[#000000] pb-1">
            Selected Works
          </h3>
          <div className="space-y-2">
            {["WAV App Layout", "Zoey Vale Identity", "3D Floating Gallery"].map((work, i) => (
              <div key={i} className="bg-[#ffffff] border-2 border-[#000000] p-3 flex justify-between items-center rounded-none text-xs font-bold">
                <span>{work}</span>
                <span className="text-[10px] bg-[#e2ff70] border border-[#000000] px-1.5 py-0.5">
                  2026
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 4: INFO PLACEHOLDER */}
      {currentView === "info" && (
        <div className="p-4 space-y-3 bg-[#ffffff] min-h-[50vh]">
          <h3 className="font-black text-xs uppercase border-b-2 border-[#000000] pb-1">
            Studio Information
          </h3>
          <p className="text-xs leading-relaxed">
            NorthDreamStudio operates across web architecture, brand identity design, and customized headless digital storefronts.
          </p>
        </div>
      )}

    </div>
  );
}
