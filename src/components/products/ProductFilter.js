"use client";

import { Portal, Select, createListCollection } from "@chakra-ui/react";
import useProductStore from '@/store/productStore';

export default function ProductFilter({ categories }) {
  const { selectedCategory, setCategory } = useProductStore();

  const categoryList = createListCollection({
    items: categories.map((category) => ({
      label: category === "all" ? "All Categories" : category,
      value: category,
    })),
  });

  return (
    <Select.Root
      collection={categoryList}
      value={selectedCategory ? [selectedCategory] : []} 
      onValueChange={(e) => {
        const selectedValue = e.value;
        setCategory(selectedValue === "all" ? "All Categories" : selectedValue); 
      }}
      width="320px"
    >
      <Select.HiddenSelect />
      
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select category" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {categoryList.items.map((category) => (
              <Select.Item item={category} key={category.value}>
                {category.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
}
