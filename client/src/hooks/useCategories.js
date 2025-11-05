// useCategories.js

import { useState, useEffect } from 'react';
import { categoryService } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getAllCategories();
  // `categoryService.getAllCategories()` returns response.data
  // which is already the categories array (not wrapped in `data`).
  setCategories(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const createCategory = async (categoryData) => {
    try {
  const data = await categoryService.createCategory(categoryData);
  // service returns the created category in response.data
  const created = data?.data ?? data;
  setCategories((prev) => [...prev, created]);
  return { success: true, data: created };
    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.error || 'Failed to create category',
      };
    }
  };

  return {
    categories,
    loading,
    error,
    fetchCategories,
    createCategory,
  };
};