// Search.jsx
import React, { useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Select,
  Popover,
  Typography,
  InputAdornment,
  Box,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "../icons/SearchIcon";
import styles from "../../main/main.module.css";

const Search = ({
  searchQuery,
  setSearchQuery,
  filters,
  setFilters,
  applyFilters,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [priceFrom, setPriceFrom] = useState(filters.minPrice || "");
  const [priceTo, setPriceTo] = useState(filters.maxPrice || "");

  const sortOptions = [
    { value: "date_desc", label: "Новинки" },
    { value: "price_asc", label: "Дешевле" },
    { value: "price_desc", label: "Дороже" },
    { value: "rating_desc", label: "Высокий рейтинг" },
    { value: "popular_desc", label: "Популярные" },
  ];

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  const handleSortSelect = (e) => {
    setFilters({ ...filters, sortBy: e.target.value });
    applyFilters();
  };

  const applyPriceFilter = () => {
    setFilters({
      ...filters,
      minPrice: priceFrom ? Number(priceFrom) : null,
      maxPrice: priceTo ? Number(priceTo) : null,
    });
    applyFilters();
    handleFilterClose();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const open = Boolean(anchorEl);
  const id = open ? "filter-popover" : undefined;

  return (
    <div className={styles.searchWrapper}>
      {/* Поле поиска */}
      <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
        <button type="submit" className={styles.searchIcon}>
          <SearchIcon />
        </button>
        <input
          type="text"
          placeholder="Поиск по каталогу"
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* Кнопка фильтра */}
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleFilterClick}
        sx={{
          minWidth: "40px",
          height: "40px",
          borderRadius: "12px",
          padding: "8px",
          marginLeft: "8px",
        }}
      >
        <FilterListIcon />
      </Button>

      {/* Поповер с фильтрами */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleFilterClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "12px",
            padding: "16px",
            width: "300px",
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Сортировка */}
          <div>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Сортировка
            </Typography>
            <Select
              value={filters.sortBy || "date_desc"}
              onChange={handleSortSelect}
              fullWidth
              size="small"
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </div>

          {/* Цена */}
          <div>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Цена
            </Typography>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <TextField
                label="От"
                type="number"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₽</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="До"
                type="number"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                size="small"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">₽</InputAdornment>
                  ),
                }}
              />
            </Box>
          </div>

          {/* Кнопка применения */}
          <Button
            variant="contained"
            onClick={applyPriceFilter}
            fullWidth
            sx={{
              borderRadius: "12px",
              textTransform: "none",
            }}
          >
            Применить фильтры
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default Search;
