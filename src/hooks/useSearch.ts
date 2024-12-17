import { useState } from 'react';


type Props = {
  initialValue?: string;
  array: object[];
  searchFields: string[];

};

// TODO: fix search

export const useSearch = ({ initialValue, array, searchFields }: Props) => {
  const [search, setSearch] = useState(initialValue || '');


  const filteredArray = array.filter((item: object) => {
    console.log(item, 'item 1');
    return searchFields.some((field: string) => {
      console.log(item, field, 'item 2');
      return (item as Record<string, unknown>)[field]?.toString().toLowerCase().includes(search.toLowerCase());
    });
  });

  console.log(filteredArray, 'filteredArray');

  return { search, setSearch, filteredArray };
};

