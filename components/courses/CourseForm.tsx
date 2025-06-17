import React, { useState, useCallback } from 'react';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Course } from './types';

interface Category {
  id: string;
  name: string;
}

interface CourseFormProps {
  categories: Category[];
  initialData?: Partial<Course>;
  onSubmit: (data: Omit<Course, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => void;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function CourseForm({ 
  categories, 
  initialData = {}, 
  onSubmit, 
  isSubmitting, 
  onCancel 
}: CourseFormProps) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    thumbnail_url: initialData.thumbnail_url || '',
    is_premium: initialData.is_premium || false,
    categories: initialData.categories || [],
  });
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFormData(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      
      return {
        ...prev,
        categories: newCategories,
      };
    });
  };

  const handleAddNewCategory = () => {
    if (newCategory.trim() && !categories.some(cat => cat.id === newCategory.toLowerCase())) {
      const newCatId = newCategory.toLowerCase().replace(/\s+/g, '-');
      setFormData(prev => ({
        ...prev,
        categories: [...prev.categories, newCatId],
      }));
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      categories: formData.categories,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Course Title <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="title"
              id="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="e.g., Business Analysis Fundamentals"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Provide a detailed description of the course..."
            />
          </div>
        </div>

        {/* Thumbnail URL */}
        <div>
          <label htmlFor="thumbnail_url" className="block text-sm font-medium text-gray-700">
            Thumbnail URL
          </label>
          <div className="mt-1">
            <input
              type="url"
              name="thumbnail_url"
              id="thumbnail_url"
              value={formData.thumbnail_url}
              onChange={handleChange}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="https://example.com/thumbnail.jpg"
            />
          </div>
          {formData.thumbnail_url && (
            <div className="mt-2">
              <p className="text-xs text-gray-500">Preview:</p>
              <img 
                src={formData.thumbnail_url} 
                alt="Thumbnail preview" 
                className="mt-1 h-32 w-auto object-cover rounded"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Categories */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">Categories</span>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center">
                <input
                  id={`category-${category.id}`}
                  name="categories"
                  type="checkbox"
                  checked={formData.categories.includes(category.id)}
                  onChange={() => handleCategoryChange(category.id)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`category-${category.id}`} className="ml-2 block text-sm text-gray-700">
                  {category.name}
                </label>
              </div>
            ))}
            
            {showNewCategory ? (
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="New category name"
                />
                <button
                  type="button"
                  onClick={handleAddNewCategory}
                  className="ml-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => setShowNewCategory(false)}
                  className="ml-2 text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowNewCategory(true)}
                className="mt-2 inline-flex items-center text-sm text-blue-600 hover:text-blue-500"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                Add new category
              </button>
            )}
          </div>
        </div>

        {/* Premium Toggle */}
        <div className="flex items-center">
          <input
            id="is_premium"
            name="is_premium"
            type="checkbox"
            checked={formData.is_premium}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="is_premium" className="ml-2 block text-sm text-gray-700">
            This is a premium course
          </label>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </div>
    </form>
  );
}
