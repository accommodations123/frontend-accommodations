import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterPanel({ filters, onChange }) {
  const [open, setOpen] = useState({
    all: false,
    price: false,
    condition: false,
    category: false,
  });

  // ✅ ONLY RESET WHAT MARKETPLACE PAGE USES
  const handleClear = () => {
    onChange({
      priceMin: "",
      priceMax: "",
      condition: "",
      category: "",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 mb-6 shadow-sm">
      {/* TOP ROW */}
      <div className="flex flex-col md:flex-row gap-4 items-start justify-start">
        {/* Search (UI only, not affecting filters) */}
        <div className="relative flex-1 w-full border border-gray-300 rounded-lg">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search for items..."
            className="pl-9 h-10 bg-white border-gray-300 text-gray-900"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(o => ({ ...o, all: !o.all }))}
          >
            <SlidersHorizontal className="h-3.5 w-3.5 mr-2 text-[#00152d]" />
            All Filters
          </Button>

          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(o => ({ ...o, price: !o.price }))}
          >
            Price Range
            <ChevronDown className="h-3.5 w-3.5 ml-1 text" />
          </Button> */}

          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(o => ({ ...o, condition: !o.condition }))}
          >
            Condition
            <ChevronDown className="h-3.5 w-3.5 ml-1" />
          </Button> */}

          {/* <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(o => ({ ...o, category: !o.category }))}
          >
            Category
            <ChevronDown className="h-3.5 w-3.5 ml-1" />
          </Button> */}

          {/* ✅ CLEAR BUTTON */}
          {/* <Button
            size="sm"
            onClick={handleClear}
          >
            <X className="h-3.5 w-3.5 mr-1" />
            Clear
          </Button> */}
        </div>
      </div>

      {/* FILTER PANELS */}
      {(open.all || open.price || open.condition || open.category) && (
        <div className="mt-4 grid grid-cols-1 text-[#00152d] text-md  md:grid-cols-3 gap-4 border-t pt-4">

          {/* PRICE */}
          {(open.all || open.price) && (
            <div>
              <h4 className="text-sm font-semibold  text-gray-700 mb-2">Price Range</h4>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.priceMin}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMin: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.priceMax}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      priceMax: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* CONDITION */}
          {(open.all || open.condition) && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Condition</h4>
              <select
                value={filters.condition}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    condition: e.target.value,
                  })
                }
                className="w-full h-10 border text-[#00152d] border-gray-300 rounded-lg px-3"
              >
                <option value="">All</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          )}

          {/* CATEGORY */}
          {(open.all || open.category) && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Category</h4>
              <select
                value={filters.category}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    category: e.target.value,
                  })
                }
                className="w-full h-10 border text-[#00152d] border-gray-300 rounded-lg px-3"
              >
                <option value="">All</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="moving">Moving</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          )}
        </div>
      )}
      
    </div>
  );
}
