import { useEffect, useState } from 'react';
import useProductStore from '@/store/productStore';
import { Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
export default function ProductSearch() {
  const { searchTerm, setSearchTerm } = useProductStore();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchTerm(localSearch);
    }, 300);
    
    return () => clearTimeout(debounceTimer);
  }, [localSearch, setSearchTerm]);
  
  return (
    <InputGroup flex="1" startElement={<LuSearch />} >
    <Input 
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"

     value={localSearch}
     onChange={e => setLocalSearch(e.target.value)}
    placeholder="Search products" />
  </InputGroup>
 
  );
}