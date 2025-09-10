import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { debounce } from '../utils/helpers';

const SearchInput = ({ 
  placeholder = "Search...",
  onSearch,
  onClear,
  debounceMs = 500,
  showClearButton = true,
  size = "middle",
  className = "",
  style = {}
}) => {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((searchValue) => {
      if (onSearch) {
        setIsSearching(true);
        onSearch(searchValue).finally(() => setIsSearching(false));
      }
    }, debounceMs),
    [onSearch, debounceMs]
  );

  // Handle input change
  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSearch(newValue);
  }, [debouncedSearch]);

  // Handle clear
  const handleClear = useCallback(() => {
    setValue('');
    if (onClear) {
      onClear();
    }
    if (onSearch) {
      onSearch('');
    }
  }, [onClear, onSearch]);

  // Handle enter key
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  }, [value, onSearch]);

  return (
    <div className={`search-input ${className}`} style={style}>
      <Input
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        size={size}
        prefix={<SearchOutlined />}
        suffix={
          showClearButton && value && (
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={handleClear}
              style={{ border: 'none', boxShadow: 'none' }}
            />
          )
        }
        loading={isSearching}
      />
    </div>
  );
};

export default SearchInput;
